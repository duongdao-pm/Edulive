# KNOWLEDGE BASE: HỆ SINH THÁI EDULIVE
*Cập nhật theo dữ liệu hệ thống năm 2026*
*Nguồn: Tổng hợp từ toàn bộ tài liệu sản phẩm Edulive (HDKT, HDSD, BRD, FRD, TDS, Bug logs, Testcase)*

---

## PHẦN 1: TỔNG QUAN SẢN PHẨM

- **SmartRoom là gì?** SmartRoom là một nền tảng phòng học trực tuyến và tương tác thời gian thực.
- **Giải quyết bài toán:** Hỗ trợ giảng dạy/học tập từ xa, tại chỗ hoặc hybrid. Giải quyết vấn đề tổ chức lớp học hiện đại bằng cách tích hợp: chia sẻ tài liệu, thuyết trình, tương tác đa chiều (bảng trắng, vẽ, game), kiểm tra đánh giá (quiz, tự luận, AI check), chia nhóm và quản lý lớp học.
- **Đối tượng người dùng:**
  - **Giáo viên (GV):** Soạn giảng, tổ chức lớp, điều khiển luồng học, giao bài, chấm điểm.
  - **Học sinh (HS):** Tham gia lớp, tương tác thời gian thực, thi đấu (Thách đấu), làm bài tập.
  - **Phụ huynh:** Theo dõi học tập, quản lý thời gian/thiết bị của con, giao tiếp với trường.
  - **Admin trường học:** Setup cấu hình, quản lý tài khoản, môn học, phân quyền.
- **Nền tảng hỗ trợ:** Web (Trình duyệt PC/Mobile), Desktop App (Windows, macOS), Mobile App / Tablet (iOS, Android).
- **Các phiên bản hệ thống (SmartRoom):**
  - **SmartRoom thường:** Giáo viên tự tạo lớp học thủ công qua modal (nhập Tên, Thời lượng, Ghi hình).
  - **SmartRoom School:** Lớp học được tạo trước từ Hệ thống quản trị (Admin). Giáo viên và Học sinh chỉ việc vào lớp đã được cấp sẵn, không cần tự tạo.
- **Product Tree (Cây sản phẩm):**
  1. **SmartRoom:** Phòng học tương tác Live (Bảng trắng, Video/Audio, Quiz, Chia nhóm).
  2. **Mạng xã hội (Social / MXH):** Thư viện chia sẻ học liệu, Kênh của tôi, Cộng đồng nội dung.
  3. **App Học sinh (Tích hợp "Thách đấu"):** Nền tảng cho HS học tập và thi đấu Gamification.
  4. **App Phụ huynh:** Quản lý thiết bị (MDM), theo dõi điểm danh/bài tập, xem cảm xúc AI.
  5. **Tool Soạn giảng (Vizistudio):** Desktop App cho GV thiết kế bài giảng tương tác (Kéo thả, Animation, Trigger).
  6. **Trang Quản trị Trường học:** Nơi Admin setup năm học, lớp, tài khoản GV/HS.

---

## PHẦN 2: KIẾN TRÚC HỆ THỐNG & TECH STACK

- **Cơ sở hạ tầng (Infrastructure):**
  - Hệ điều hành: Ubuntu Server 22.04 LTS.
  - Cấu hình khuyến nghị (50-150 users): CPU i5-12400 / Ryzen 5, 32GB RAM, 1TB NVMe, 2 cổng Gigabit LAN.
  - Thiết lập OS: Tăng `nofile` limit lên 65536, `fs.file-max` lên 100000. Dnsmasq cho Local DNS.
- **Các Services & Tech Stack (triển khai qua Docker):**
  - **Janus:** WebRTC Gateway xử lý Video, Audio, Share Screen.
  - **Wowza:** Streaming Server (VOD + Live stream).
  - **SeaweedFS:** Object storage phân tán (lưu file, hình ảnh).
  - **Nginx:** Reverse Proxy & Static file serving.
  - **Database & Cache:** PostgreSQL (Multi-DB), MongoDB, Redis, Elasticsearch.
  - **Microservices backend:** `school-service`, `social`, `lms`, `examination` (room-state), `edge-service` (Local control). Java (Quarkus) & PHP (Laravel) được sử dụng.
- **Công nghệ Realtime & Đồng bộ:**
  - Giao tiếp chính qua **Socket events**.
  - Đồng bộ nét vẽ và thao tác qua cơ chế **`objectLog`**. Các log này được lưu thành stack để phục vụ Undo/Redo và Reconnect.
- **Cơ chế lưu trữ Client:**
  - Token lưu ở `localStorage` (nếu "Remember me") hoặc `sessionStorage` (nếu không tích).
  - File PDF được convert thành các file JSON (tối đa 5MB/file) để load lên bảng trắng.
- **Hệ thống Quản trị & Domain (Ví dụ triển khai):**
  - Domain dạng: `{local_dns}` (VD: `school.edu`).
  - Admin URL: `school-beta.edulive.net/dang-nhap` hoặc IP nội bộ cổng 8082.

---

## PHẦN 3: MODULE & TÍNH NĂNG CHI TIẾT (SMARTROOM)

### 3.1. Đăng nhập (Sign in)
- **Mục đích:** Xác thực người dùng (GV/HS/Admin) vào hệ thống.
- **Actor:** GV, HS.
- **Vị trí:** Màn hình đầu tiên khi mở App/Web.
- **Luồng chính:** Nhập Email -> Nhập Password -> Chọn "Remember me" (tùy chọn) -> Login.
- **API:** `POST /login` (Input: `email`, `password`. Output: 200 OK trả về token & user info).
- **Lưu ý kỹ thuật:** Không hiển thị token trên URL/log. Lỗi hiển thị rõ ràng (sai định dạng, để trống, sai pass).

### 3.2. Dashboard (Giao diện sau đăng nhập)
- **Mục đích:** Điều hướng các module chính.
- **Actor:** GV, HS.
- **Phân quyền hiển thị:**
  - **GV:** Sidebar có Create room, Dashboard, Classes, Class map config.
  - **HS:** Sidebar có Join room, Dashboard, Classes.
- **Lưu ý:** Giao diện Global Header chung có dropdown (Sign out, Đổi ngôn ngữ Eng/Vie).

### 3.3. Tạo lớp (Create Room)
- **Mục đích:** GV khởi tạo phòng học thủ công (chỉ áp dụng với SmartRoom thường).
- **Actor:** GV.
- **Vị trí:** Sidebar -> Create room.
- **Luồng chính:** Mở modal -> Nhập Tên lớp (*), Thời lượng (10-240 phút) (*), Checkbox Is recording -> Confirm.
- **Lưu ý kỹ thuật:** Nếu SmartRoom School, lớp tự động lấy từ Backend (Admin tạo), GV không cần tự tạo.

### 3.4. Join lớp học
- **Mục đích:** HS tham gia lớp qua mã code.
- **Actor:** HS.
- **Vị trí:** Sidebar -> Join room.
- **Luồng chính:** Mở modal -> Nhập room code -> Confirm -> API check code -> Chuyển vào lớp hoặc báo lỗi.

### 3.5. Danh sách lớp học (Classes)
- **Mục đích:** Xem các lớp đã tạo (GV) hoặc đã tham gia (HS).
- **Vị trí:** Sidebar -> Classes.
- **Luồng chính:** Hiển thị 2 tab: Incoming (chưa kết thúc) và Ended (đã kết thúc).
- **Hiển thị:** Thẻ (card) chứa Tên lớp, Thời lượng, Thời gian bắt đầu. **GV** thấy thêm Mã Room và icon Audio Record/Lịch sử.
- **Hành vi:** Click vào tên lớp -> Vào LiveRoom (nếu lớp đang trong giờ).

### 3.6. Class Map (Sơ đồ lớp)
- **Mục đích:** GV xem sơ đồ vật lý của HS trong phòng học.
- **Actor:** GV.
- **Cơ chế đồng bộ:** App đọc file JSON cấu hình thiết bị (`room_id`, `device_id`, `name`). Quét mạng LAN các thiết bị chung `room_id`. Kết hợp dữ liệu `LAYOUT_PARTICIPANTS` (tọa độ x,y) để render sơ đồ.
- **Hành vi:** HS đăng nhập -> Tên hiển thị trên đúng máy đó. GV có thể kéo thả thiết bị để đổi vị trí.

### 3.7. Whiteboard (Bảng trắng) & Board Navigation
- **Mục đích:** Khu vực giảng dạy trung tâm. Bật/tắt bằng nút Content > Whiteboard.
- **Actor:** GV (Full quyền), HS (Chỉ xem, trừ khi được cấp quyền).
- **Cơ chế đa trang (Board):** Hỗ trợ tối đa 10 trang. Nút điều hướng (Prev / 1/10 Pages / Next) và Thumbnail panel bên trái.
- **Đồng bộ & Reconnect:** Khi HS vào sau/reconnect, nhận toàn bộ state hiện tại (nét vẽ, trang hiện tại).
- **Socket:** Emit `TOGGLE_WHITEBOARD`.

### 3.8. Content > Library (Mở tài nguyên)
- **Mục đích:** Mở tài liệu từ thư viện lên bảng trắng. GV chọn -> Gửi `GET_FILES` -> Mở.
- **Video / Audio:** Mở dạng canvas điều khiển (Play, Pause, Seek, Speed, Volume). GV thao tác -> *Ghi đè và đồng bộ ép buộc* xuống toàn bộ HS. ObjectLog ghi nhận.
- **Image:** Nằm ở Top Layer, đè lên nét vẽ. Không vẽ lên ảnh được. GV zoom/move -> đồng bộ xuống HS.
- **PDF:** File chia nhỏ JSON (max 5MB). Mỗi trang là một canvas. GV chuyển trang -> HS chuyển theo. Cả GV và HS (nếu có quyền) đều vẽ lên PDF được.
- **Exercise:** (Xem chi tiết ở mục 3.20).

### 3.9. Content > Upload
- **Mục đích:** GV đẩy file trực tiếp (.mp4, .mp3, .jpg, .png) từ máy tính lên kho lưu trữ và chiếu ngay.
- **Luồng chính:** Bấm Upload -> Modal kéo thả -> Chọn file -> Mở lên Whiteboard (file cũ bị ẩn).
- **Đồng bộ:** Giống hệt behavior của mục Library.

### 3.10. Content > Share Screen
- **Mục đích:** Chia sẻ màn hình GV (Ứng dụng, Thẻ trình duyệt, Toàn màn hình).
- **Actor:** GV (Only 1 person can share).
- **Socket events:** `SHARE_SCREEN` (mở modal) -> `SEND_SHARE_SCREEN` -> `RECEIVE_SHARE_SCREEN` (HS nhận) -> `STOP_SHARE_SCREEN`. Sử dụng Janus stream.
- **Hành vi HS:** Chỉ xem live view, không tương tác được.

### 3.11. Content > Question
- **Mục đích:** Tạo và gửi câu hỏi nhanh (Pop-up quiz).
- **Các loại:** Single Choice (SCQ), Multiple Choice (MCQ), Fill in the Blank, Essay, Speaking.
- **Socket events:** `ASSIGN_QUESTION` (GV gửi) -> `RECEIVE_QUESTION` (HS nhận) -> `SEND_ANSWER` (HS nộp) -> `RECEIVE_ANSWER` (GV nhận).
- **Đánh giá (Result panel):**
  - SCQ/MCQ/Fill blank: Chấm tự động (Xanh/Đỏ). GV click *Give Point* -> *Send Point*.
  - Essay/Speaking: Tự động gọi API AI Grammar Check (Essay) hoặc AI Pronunciation (Speaking). GV có thể bấm *Send to All* kết quả AI.

### 3.12. Content > History
- **Mục đích:** Lưu trữ lịch sử các tab/tài nguyên đã mở trong phiên để GV xem lại. (Theo Bug log, có chế độ Dark mode hỗ trợ).

### 3.13. Tool > Draw (Bộ công cụ vẽ)
- **Mục đích:** Bút (nét mảnh/đậm), color picker, shape (vuông, tròn, mũi tên), text, Undo, Redo, Eraser, Trash.
- **Phân quyền:** GV mặc định có. HS mặc định KHÔNG, GV cấp quyền qua tab *Participants*. (Gửi signal `grantDrawPermission`).
- **Lưu ý kỹ thuật:** Mỗi hành động tạo ra một `objectLog` kèm `timestamp`. Gửi qua server -> broadcast. Stack undo/redo riêng từng user.
- **Reconnect:** HS reconnect nhận lại toàn bộ `objectLog` và render lại tuần tự.

### 3.14. Tool > Transfer Files
- **Mục đích:** GV gửi file cho 1, nhiều hoặc tất cả HS. Giới hạn dung lượng (VD: 100MB).
- **Socket:** `OPEN_MODAL_TRANSFER_FILE` -> Chọn HS -> `ADD_UPLOAD_QUEUE` -> `RECEIVE_TRANSFER_FILE`.
- **Hành vi HS:** Nhận file tại tab *Files* trong modal ChatBox, có nút Download.

### 3.15. Tool > Watch (Stopwatch)
- **Mục đích:** Đồng hồ bấm giờ đếm ngược (Stopwatch) cho thảo luận/bài tập. Có các preset 30s, 1m, 15m, 30m.
- **Actor:** GV thiết lập, HS xem thời gian đếm ngược.

### 3.16. Microphone
- **Cơ chế:** Giao tiếp qua WebRTC (Janus).
- **Sự kiện Janus:** `joined`, `talking` (đang nói -> icon sáng sóng âm), `stop-talking`.
- **Phân quyền:** GV tắt mic từng HS / toàn bộ HS (`configure {muted: true}`). HS bị GV tắt có thể *tự bật lại*. HS reconnect phải tự bật lại.

### 3.17. Camera
- **Cơ chế:** WebRTC (Janus). `publish` (bật cam) -> subscribe feed. `unpublish` (tắt) -> dừng feed.
- **Phân quyền:** GV tắt cam HS. HS tự bật lại được.

### 3.18. Participants (Danh sách người tham gia)
- **Mục đích:** GV quản lý lớp.
- **Chức năng:** Xem ai đang online, xem trạng thái Mic/Cam. Cấp quyền vẽ (Draw), Mute All, Turn off Camera All.

### 3.19. Chat
- **Mục đích:** Nhắn tin trong lớp. (Theo Bug log, có Chat chung và Chat nhóm riêng khi chia nhóm).

### 3.20. Exercise (Làm bài tập)
- **Mục đích:** GV giao bài (chuẩn hóa file JSON từ thư viện).
- **Luồng:** GV gửi `SEND_OPEN_EXERCISE` -> Gọi Janus `sendDataPublic` -> Call API `GET_EXERCISE` lấy JSON render.
- **Hành vi:**
  - GV bấm *Start exercise*. (learner_state reset).
  - HS làm bài, update event `exerciseQuestionEdited`. Nút *Submit*.
  - GV bấm *Stop exercise*. Nút Submit biến mất. GV xem bảng *Result* (Tên, Câu đúng, Ratio, Status Pass/Fail, Points).
  - GV click Icon Chia sẻ (Mắt xem) -> Show bài làm của HS lên bảng trắng chung để cả lớp Review.

---

## PHẦN 4: TÍNH NĂNG "THÁCH ĐẤU" (APP HỌC SINH)

- **Mục tiêu:** Tính năng tương tác xã hội (Gamification) để HS thi đấu, ôn tập kiến thức, tăng DAU và Retention.
- **Luồng tổng quan (Flow):**
  1. **Tạo thách đấu:** HS chọn Môn học -> Chọn đối thủ (từ list, tìm kiếm, hoặc Quick Match) -> Đặt cược (Tỉ lệ 1/1, 1/2, 2/1 và Mức sức mạnh) -> Gửi. (Status: `PENDING`).
  2. **Nhận lời mời:** Đối thủ nhận push notification. Ấn "Đồng ý" hoặc "Từ chối". Hết 5 phút tự động `EXPIRED`.
  3. **Vào trận:** Người thách đấu bấm "Bắt đầu". Trận đấu tự động hủy nếu không bắt đầu trong 10 phút.
  4. **Thi đấu:** Hiển thị câu hỏi lần lượt. Chấm điểm realtime Đúng/Sai. HS có thể gửi Emoticon (hiển thị 3-5s).
  5. **Kết quả:** Hệ thống tính sức mạnh = Mức cược x Tỉ lệ cược. Thắng (+), Thua (-). Update bảng xếp hạng.
- **Các tính năng đi kèm:**
  - **Chọc để nhắc (Poke):** Disable 30s sau mỗi lần bấm.
  - **Chat group:** Tự động xếp phòng chat dựa theo môn học có sức mạnh cao nhất (Max 10 phòng/môn).
  - **Bảng xếp hạng (Leaderboard):** Lọc theo Lớp/Khối/Trường, theo Ngày/Tuần/Tháng/Năm.
- **Technical Design (TDS & FRD):**
  - **API (REST):** `POST /v1/challenges/create`, `POST /v1/challenges/{id}/accept`, `POST /v1/battles/{id}/start`, `POST /v1/battles/{id}/answer`.
  - **WebSocket:** `challenge.received`, `battle.started`, `emoticon.received`.
  - **Anti-Spam:** Max 5 lời mời đến cùng người/giờ; Max 50 lời mời từ user/giờ; Max 1 lời mời đến cùng người/phút.

---

## PHẦN 5: APP PHỤ HUYNH

- **Mục tiêu:** Giúp phụ huynh quản lý thiết bị, theo dõi học tập và tương tác với trường.
- **Các tính năng chính (FRD):**
  - **Quản lý tài khoản:** Chuyển đổi giữa nhiều con, đổi Avatar/SĐT/Email/Mối quan hệ/Ngôn ngữ. Xem bản đồ từ nhà đến trường.
  - **Theo dõi học tập:** Nhận push điểm danh, xem bài tập về nhà (Nộp bài qua link Drive hoặc Upload max 5 files, <10MB/file). Đăng ký/Hủy sự kiện.
  - **Tương tác nhà trường:** Xem bài đăng (URL, Ảnh, Video, File đính kèm), Xác nhận đã đọc, Bình luận, Vote, Like, Ghim bài, Xem danh sách GV. Xin nghỉ học trực tuyến, Gửi góp ý.
  - **Quản lý thiết bị (MDM):**
    - **App & Web:** Bật/tắt quyền dùng app, thêm URL vào blacklist. Đồng bộ trong 30s.
    - **Cấu hình thời gian:** Giới hạn phút/ngày, giờ bắt đầu-kết thúc. Tăng thời gian tạm thời. Chế độ "Chơi thoải mái" (cuối tuần không đếm giờ).
    - **Thống kê:** Xem biểu đồ App/Web usage.
  - **AI Cảm xúc:** Nhận báo cáo phân tích cảm xúc từ camera AI (Vui, Buồn, Bình thường, Lo lắng, Giận dữ) dạng biểu đồ tròn và line chart.

---

## PHẦN 6: MẠNG XÃ HỘI (SOCIAL / MXH)

- **Mục tiêu:** Cộng đồng chia sẻ học liệu nội bộ cho GV.
- **Tính năng chính:**
  - **Thư viện của tôi (My Library):** Quản lý Folder/File. Upload đa định dạng. Tạo Nội dung bằng AI, tạo bài giảng/phiếu bài tập. Chức năng chia sẻ file (Phân quyền Viewer/Commenter/Editor, Share link "Bất kỳ ai có liên kết").
  - **Cộng đồng nội dung (Public):** Xem bài giảng public. Master Search, Filter (Tab khối lớp, Hình thức, Môn học, Xếp hạng).
  - **Kênh của tôi / Kênh đăng ký:** Custom avatar, background kênh. Đăng bộ bài giảng. Mua/bán (hiển thị giá).
- **Lưu ý Test & Bug (từ Testcase & Bug logs):**
  - Bug nghiêm trọng: Xóa folder nhưng quyền truy cập cũ không bị xóa (Tạo folder mới trùng tên bị dính quyền cũ). Folder share qua link cho phép user thấy các folder cha (lỗi bảo mật). File video/audio Wowza không xem được khi share.
  - Master search đôi khi trả kết quả trùng lặp, filter chưa map chính xác.

---

## PHẦN 7: SETUP & CẤU HÌNH TRIỂN KHAI

### 7.1. Setup Server (HDKT)
- **Cài OS & Mạng:** Cài Ubuntu 22.04. Cấu hình IP tĩnh. Cài `dnsmasq` làm Local DNS (VD: map `school.edu` về `192.168.10.88`).
- **Docker:** Cài Docker, login Private Registry (`registry.edulive.net`).
- **Pull Image & Run:** `janus_server`, `school-service`, `wowza-streaming-offline`, `examination`, `lms`. Sử dụng `docker compose up -d`. Khởi động Nginx (cấu hình proxy cho các service). Import database SQL dump.
- **Wowza:** Cấu hình Streaming VOD bằng cách add Media Cache trỏ về `minio_local`.

### 7.2. Setup Trường học (Hệ thống Quản trị Web)
1. Admin cấp cao tạo tài khoản GV -> Active account -> Tạo "Trường học gốc" -> Gán quyền admin trường cho GV vừa tạo.
2. Đăng nhập Admin trường -> Tạo Năm học -> Tạo Môn học -> Tạo Khối -> **Đồng bộ dữ liệu**.
3. Tạo Cấu hình Lớp học, Phòng học.
4. Upload danh sách GV/HS bằng file Excel.
5. Tạo Lớp học -> Gán GVCN, GV Bộ môn -> Gán HS vào lớp.
6. Tạo "Lớp học thông minh" (Phòng học ảo Live).

### 7.3. Setup App PC & Tool soạn giảng
- Cài file `.exe` / `.dmg`. Mở app nhập **Local Domain** -> Nhập **License Code** -> Login.
- **Vizistudio (Tool soạn giảng):** Hỗ trợ import nguyên file PowerPoint (`.ppt/.pptx`) convert vào hệ thống. Kéo thả trigger, animation. Export file `.zip` hoặc `.edu`. Import vào thư viện Local của phần mềm phòng học.

### 7.4. Test Thông luồng kỹ thuật
- Ping test server biên (<10ms).
- Mở bài giảng STEM (Cầu treo, Xe đẩy, Đèn pin, Xuồng máy) kiểm tra độ mượt video, mạch điện ảo.
- Test Pairing (HS join 100% không drop), Test Sync (GV next trang, màn HS nhảy theo <1s).

---

## PHẦN 8: BẢNG TỔNG HỢP API & SOCKET EVENTS

| # | Event / API | Loại | Actor | Module | Mô tả | Input | Output |
|---|-------------|------|-------|--------|-------|-------|--------|
| 1 | `POST /login` | REST | GV/HS | Auth | Đăng nhập hệ thống | email, password | Token, User info |
| 2 | `GET_FILES` | Socket/API | GV | Library | Lấy danh sách thư mục/file | Folder ID | List files JSON |
| 3 | `TOGGLE_WHITEBOARD` | Socket | GV | Whiteboard | Bật/tắt bảng trắng | Board ID | Broadcast state |
| 4 | `GET_EXERCISE` | API | Cả hai | Exercise | Load data bài tập | Exercise ID | JSON content |
| 5 | `SEND_OPEN_EXERCISE` | Socket | GV | Exercise | Bắt đầu bài tập | Exercise meta | HS mở bài tập |
| 6 | `exerciseQuestionEdited` | Socket | HS | Exercise | HS chọn đáp án | Answer data | Cập nhật canvas |
| 7 | `OPEN_UPLOAD_FILE` | Socket | GV | Content | Mở modal upload | None | Mở modal UI |
| 8 | `SHARE_SCREEN` | Socket | GV | Content | Khởi tạo share screen | Source (App/Tab) | Request Janus |
| 9 | `SEND_SHARE_SCREEN` | Socket | GV | Content | Phát screen cho HS | Source, userId | HS hiển thị screen |
| 10 | `STOP_SHARE_SCREEN` | Socket | GV | Content | Dừng share | None | HS đóng screen |
| 11 | `ASSIGN_QUESTION` | Socket | GV | Question | Giao câu hỏi (Quiz) | Question data | HS mở popup làm bài |
| 12 | `RECEIVE_QUESTION` | Socket | HS | Question | Nhận câu hỏi | None | Render UI tương ứng |
| 13 | `SEND_ANSWER` | Socket | HS | Question | Nộp đáp án câu hỏi | userId, answer | Trạng thái "Đã nộp" |
| 14 | `RECEIVE_ANSWER` | Socket | GV | Question | GV nhận bài | None | Cập nhật bảng Result |
| 15 | `grantDrawPermission` | Socket | GV | Draw | Cấp quyền vẽ cho HS | userId | Bật Draw Toolbar cho HS |
| 16 | `objectLog` (Sync) | Socket | Cả hai | Draw/Media | Đồng bộ vẽ, kéo thả, video | Object properties | Broadcast tới mọi client |
| 17 | `ADD_UPLOAD_QUEUE` | Socket | GV | Transfer File | GV gửi file | files[], targets[] | File lên Storage |
| 18 | `RECEIVE_TRANSFER_FILE` | Socket | HS | Transfer File | HS nhận file | File URL | Nút download hiển thị |
| 19 | `TOGGLE_STREAM_AUDIO` | Socket | Cả hai | Mic | Bật tắt mic | Muted state | Gọi Janus API |
| 20 | `TOGGLE_STREAM_VIDEO` | Socket | Cả hai | Camera | Bật tắt camera | Video state | Publish Janus feed |
| 21 | `/v1/challenges/create` | REST | HS | Thách đấu | Tạo lời mời | target_id, subject, bet | Challenge ID (PENDING) |
| 22 | `/v1/challenges/{id}/accept` | REST | HS | Thách đấu | Chấp nhận thách đấu | None | Status (ACCEPTED) |
| 23 | `/v1/battles/{id}/start` | REST | HS | Thách đấu | Bắt đầu trận đấu | None | Question data |
| 24 | `/v1/battles/{id}/answer` | REST | HS | Thách đấu | Submit đáp án | answer_id | is_correct, exp |
| 25 | `challenge.received` | WebSock | HS | Thách đấu | Noti có lời mời | Challenge info | In-app push |
| 26 | `emoticon.received` | WebSock | HS | Thách đấu | Gửi Emoji trong trận | Emoticon ID | Render UI 3-5s |

---

## PHẦN 9: BẢNG PHÂN QUYỀN TỔNG HỢP

| Tính năng | Giáo viên (GV) | Học sinh (HS) | Ghi chú |
|-----------|----------------|---------------|---------|
| **Tạo/Tham gia Lớp** | Tự tạo hoặc có sẵn | Chỉ có thể Tham gia (Join) | SmartRoom thường: GV tạo. SmartRoom School: Admin tạo sẵn. |
| **Bảng trắng (Board)** | Toàn quyền (vẽ, chuyển trang, xóa) | Chỉ xem. Vẽ khi được cấp quyền | - |
| **Share Media (PDF/Video)** | Chọn file, điều khiển Play/Zoom | Bị override theo thao tác của GV | Video/Image/Audio GV thao tác sẽ ép đồng bộ xuống HS. |
| **Share Screen** | Có (Chọn tab/ứng dụng) | KHÔNG | Chỉ 1 người (GV) được share trong 1 thời điểm. |
| **Công cụ Vẽ (Draw)** | Mặc định CÓ | Mặc định KHÔNG | GV phải vào *Participants* gửi `grantDrawPermission`. |
| **Giao bài/Câu hỏi** | Có (chọn Exercise, tạo Question) | Chỉ làm bài và Nộp (Submit) | Kết quả Question được AI chấm tự động với Essay/Speaking. |
| **Transfer File** | Có (gửi cho 1/nhiều HS) | Chỉ nhận và Download | - |
| **Mic / Camera** | Bật/Tắt của mình. **Tắt (Mute All) của HS**. | Bật/Tắt của mình. | Nếu bị GV tắt, HS *vẫn có thể tự bật lại*. |
| **Chia nhóm (Devide)** | Có (thủ công, Random) | KHÔNG | GV tạo phòng nhóm, Join từng phòng, chấm điểm nhóm. |
| **Thách đấu (Gamification)** | Không tham gia | Toàn quyền (Gửi, Nhận, Hủy, Thi đấu) | Nằm trong App riêng của HS. |

---

## PHẦN 10: BUG & TEST STATUS

Dựa trên phân tích các file Log và Testcase CSV:

### SmartRoom (Phòng học) Bugs:
- *Số lượng:* Rất nhiều bug liên quan đến Đồng bộ (Sync) và Reconnect.
- *Critical/High:* HS reconnect không nhận được trạng thái whiteboard, mất nét vẽ, kẹt ở nhóm cũ (Devide groups) sau khi GV chuyển. Bất đồng bộ nút Undo/Redo.
- *Module nhiều lỗi nhất:* Draw (Vẽ), Devide groups (Chia nhóm), Reconnect behavior.

### Mạng xã hội (Social / Thư viện) Bugs:
- *Critical/High:* Chia sẻ folder nhưng người nhận chỉ thấy folder rỗng. Lỗi bảo mật: Người nhận link folder con có thể backtrack ra folder cha. Đổi tên/tạo mới file trùng tên file đã xóa bị kế thừa quyền cũ.
- *Testcase Coverage:* Đã cover kỹ logic Lọc (Filter), Tab, Reset, Master Search, Empty state. Chưa có testcase cho luồng "Tạo nội dung AI" (AI Generator).

### Tuyên bố đáp ứng (Rà soát):
- *Đạt:* Tính năng cơ bản bảng trắng, chia sẻ file, giao bài, chấm điểm, quản lý MDM.
- *Không đạt / Chưa có:* Gửi file upload từ máy tính chiếu trực tiếp (Lỗi). Xóa nhiều đối tượng cùng lúc bằng tẩy. Xuất báo cáo lớp học (Chưa có). App HS tự nhập "Mã lớp" (Chưa có, đang dùng gán sẵn Admin). Tool soạn giảng: Mục lục hình cây (Chưa có).

### Thách đấu (Tablet Draw / Teacher 251):
- Các luồng test trên Tablet tập trung vào UI responsive và thao tác cảm ứng Draw (Phần lớn Pass, Undo/Redo chưa hoàn thiện). Testcase "Chia nhóm" của GV Pass phần tạo, nhưng luồng Random/Smart grouping đang No Run/Failed.

---

## PHẦN 11: RỦI RO & ĐIỂM CẦN LƯU Ý

1. **Vấn đề Đồng bộ & Reconnect (Race Condition):**
   - Khi HS rớt mạng và vào lại, việc đẩy toàn bộ `objectLog` cũ xuống client để render lại có thể gây treo máy nếu lượng nét vẽ quá lớn.
   - *Rủi ro:* GV thao tác Clear All trong lúc HS đang reconnect có thể gây sai lệch trạng thái bảng.

2. **Logic "Chia nhóm" (Divide Groups):**
   - Tính năng này đang dính nhiều bug ở mặt logic Socket khi chuyển HS từ phòng main -> sub-room -> main. HS thoát ra vào lại có thể kẹt ở sub-room.

3. **Tích hợp AI & API bên thứ 3:**
   - Cấu hình `.env` cho thấy phụ thuộc vào `FACE_RECOGNITION_PHOTO_ENDPOINT`, AI Grammar, `I_DOCTOR_API_KEY`. Cần đảm bảo các API này uptime tốt, nếu timeout sẽ block luồng trả bài Essay/Speaking của HS.
   - Janus WebRTC cần config STUN/TURN chuẩn, nếu mạng nội bộ trường học chặn Port UDP, Cam/Mic sẽ tịt.

4. **Lỗi bảo mật (Data Leakage) trên Social:**
   - Như báo cáo Bug, việc Access Control (Quyền chia sẻ folder) đang lỏng lẻo. Gửi link folder con nhưng view được file root là rủi ro lớn cần fix trước khi Go-live.

5. **Mâu thuẫn Spec:**
   - Trong BRD Phụ huynh có ghi "Quản lý cảm xúc AI", tuy nhiên trong danh sách API Backend của file Tech Stack (HDKT) chưa có endpoint rõ ràng xử lý luồng data stream từ Camera AI trường học đẩy về DB Phụ huynh.
   - Trong *Mô tả chung*, Bảng trắng nói có 10 trang (Board). Nhưng trong *Bug log* (ESD-227), "Ấn next ở trang cuối vẫn tăng số trang vượt quá giới hạn" -> Validation FE chưa chặn cứng limit này.
