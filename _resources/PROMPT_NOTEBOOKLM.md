# PROMPT CHO NOTEBOOKLM — Tổng hợp Knowledge Base Edulive

> Copy toàn bộ prompt dưới đây, paste vào NotebookLM và chạy.

---

```
Bạn là BA tổng của công ty Edulive — công ty EdTech phát triển nền tảng "SmartRoom – Phòng học thông minh".

Tôi đã upload toàn bộ tài liệu sản phẩm vào đây bao gồm:

📂 TÀI LIỆU KỸ THUẬT (HDKT):
- Cài đặt Ubuntu Server 22
- Cài đặt các Service của Edulive
- Cài đặt PM GV, HS, Tool soạn giảng
- Hướng dẫn chạy Test thông luồng kỹ thuật

📂 TÀI LIỆU SỬ DỤNG (HDSD):
- Phần mềm Giáo viên, Học sinh
- Tool Soạn giảng, Import Thư viện Local
- Triển khai hoạt động Lớp học

📂 MÔ TẢ SẢN PHẨM:
- Mô tả chung (SmartRoom: Whiteboard, Board, Content, Library, Exercise, Question, Upload, Share Screen, Tool, Mic, Camera, Draw, Transfer File, Chat, Participants...)
- Social (mạng xã hội nội bộ)
- Setup cấu hình trường học + trang quản trị

📂 TÀI LIỆU TÍNH NĂNG "THÁCH ĐẤU":
- BRD (Business Requirements Document) — App học sinh
- FRD (Functional Requirements Document)
- TDS (Technical Design Specification)
- Flow — App học sinh
- Tài liệu mô tả — App học sinh

📂 TÀI LIỆU APP PHỤ HUYNH:
- BRD — App phụ huynh
- FRD — App phụ huynh

📂 BUG & TESTCASE:
- Bug SmartRoom
- Bug MXH (Mạng xã hội)
- Testcase Social — CĐND Validation
- Tuyên bố đáp ứng — Rà soát phần mềm
- HS Tablet — Draw
- Teacher 251 — Devide Group

---

YÊU CẦU: Hãy đọc KỸ toàn bộ tài liệu trên và tổng hợp thành 1 bản **KNOWLEDGE BASE** hoàn chỉnh theo cấu trúc dưới đây. Viết bằng tiếng Việt, format Markdown. Mỗi phần phải chi tiết, chính xác theo nội dung tài liệu gốc — KHÔNG bịa thêm.

---

## CẤU TRÚC OUTPUT:

### PHẦN 1: TỔNG QUAN SẢN PHẨM
- SmartRoom là gì? Giải quyết bài toán gì?
- Đối tượng người dùng: Giáo viên, Học sinh, Phụ huynh, Admin trường
- Nền tảng hỗ trợ: Web, Desktop, Mobile, Tablet
- Các phiên bản hệ thống: SmartRoom thường vs SmartRoom School — khác nhau thế nào?
- Product tree: liệt kê TẤT CẢ sản phẩm/module con (SmartRoom, App phụ huynh, Social/MXH, Tool soạn giảng, Thách đấu, Trang quản trị trường...)

### PHẦN 2: KIẾN TRÚC HỆ THỐNG & TECH STACK
- Các service cần cài đặt (từ HDKT): liệt kê tên service, mục đích, port (nếu có)
- Cơ sở hạ tầng: Ubuntu Server 22, cấu hình tối thiểu
- Công nghệ realtime: Janus (WebRTC gateway) — dùng cho video/audio/share screen
- Công nghệ đồng bộ: Socket events, objectLog
- Cơ chế lưu trữ: file JSON cho exercise, localStorage/sessionStorage cho token
- Database & API: các endpoint REST được đề cập (POST /login, GET_FILES, GET_EXERCISE...)
- Hệ thống quản trị: URL admin, cách setup

### PHẦN 3: MODULE & TÍNH NĂNG CHI TIẾT
Với MỖI module/tính năng, ghi theo format:

```
#### [Tên Module]
- **Mục đích**: ...
- **Actor**: GV / HS / Cả hai
- **Vị trí giao diện**: nằm ở đâu trong UI
- **Luồng chính**: mô tả step-by-step
- **Phân quyền**: GV được làm gì, HS được làm gì
- **Socket/API events**: liệt kê event names
- **Cơ chế đồng bộ**: sync realtime thế nào
- **Xử lý reconnect**: khi mất mạng thì sao
- **Lưu ý kỹ thuật**: objectLog, data format, giới hạn...
```

Các module cần cover (KHÔNG bỏ sót):
1. **Đăng nhập (Sign in)** — luồng auth, token, remember me
2. **Dashboard** — GV vs HS khác nhau thế nào
3. **Tạo lớp (Create Room)** — GV, modal, duration, recording
4. **Join lớp** — HS, room code
5. **Danh sách lớp (Classes)** — tab Incoming / Ended, card info
6. **Class Map** — sơ đồ lớp, device config JSON, layout participants
7. **Whiteboard** — bảng trắng, multi-page (10 trang), Board navigation
8. **Content > Library** — mở tài nguyên: Video, Audio, Image, PDF, Exercise (chi tiết TỪNG loại)
9. **Content > Upload** — upload file từ máy cá nhân
10. **Content > Share Screen** — Janus stream, source selection
11. **Content > Question** — 5 loại câu hỏi (SCQ, MCQ, Fill blank, Essay, Speaking), chấm điểm, AI grammar/pronunciation check
12. **Content > History** — nếu có thông tin
13. **Tool > Draw** — bộ công cụ vẽ, phân quyền, objectLog, đồng bộ
14. **Tool > Transfer Files** — GV gửi file cho HS, chọn người nhận
15. **Tool > Watch** — nếu có thông tin
16. **Microphone** — bật/tắt, Janus audio, talking detection, GV mute HS
17. **Camera** — bật/tắt, Janus video, publish/subscribe, GV tắt cam HS
18. **Participants** — danh sách HS, cấp quyền vẽ, mute/unmute
19. **Chat** — nếu có thông tin
20. **Exercise (chi tiết)** — assign, làm bài, submit, stop, review, learner_state

### PHẦN 4: TÍNH NĂNG "THÁCH ĐẤU" (CHI TIẾT)
Từ BRD + FRD + TDS + Flow + Mô tả:
- Thách đấu là gì? Mục tiêu?
- Luồng tổng quan (flow): từ tạo thách đấu → tham gia → làm bài → kết quả
- Business requirements chính (từ BRD)
- Functional requirements chi tiết (từ FRD): từng màn hình, từng hành vi
- Technical design (từ TDS): data model, API, architecture
- App học sinh: UI flow, hành vi từng bước
- Các điểm chưa rõ hoặc MÂU THUẪN giữa BRD/FRD/TDS (nếu phát hiện)

### PHẦN 5: APP PHỤ HUYNH
Từ BRD + FRD:
- App phụ huynh có những tính năng gì?
- Business requirements (từ BRD)
- Functional requirements (từ FRD)
- Mối liên hệ với SmartRoom: phụ huynh xem gì từ hoạt động học của con?

### PHẦN 6: MẠNG XÃ HỘI (SOCIAL / MXH)
Từ file social.md + Bug MXH + Testcase Social:
- Social có những tính năng gì?
- Luồng chính: đăng bài, tương tác, validation
- Các bug đã phát hiện: phân loại theo severity
- Test coverage: những gì đã test, chưa test

### PHẦN 7: SETUP & CẤU HÌNH TRIỂN KHAI
Từ HDKT + Setup cấu hình:
- **Setup Server**: bước cài Ubuntu, cài service, cấu hình mạng, phân vùng ổ cứng
- **Setup Trường học**: tạo tài khoản admin, tạo trường, tạo năm học, tạo môn, tạo khối, tạo lớp, tạo phòng, tạo GV/HS, đồng bộ dữ liệu
- **Setup ứng dụng**: cài PM GV/HS, Tool soạn giảng, import thư viện local
- **Test thông luồng**: các bước verify hệ thống hoạt động đúng

### PHẦN 8: BẢNG TỔNG HỢP API & SOCKET EVENTS
Quét toàn bộ tài liệu, liệt kê TẤT CẢ API endpoint và socket event:

| # | Event/API | Loại | Actor | Module | Mô tả | Input | Output |
|---|-----------|------|-------|--------|-------|-------|--------|

Sắp xếp theo module. KHÔNG bỏ sót.

### PHẦN 9: BẢNG PHÂN QUYỀN TỔNG HỢP
Bảng ma trận quyền GV vs HS cho TỪNG tính năng:

| Tính năng | GV | HS | Ghi chú |
|-----------|----|----|---------|

### PHẦN 10: BUG & TEST STATUS
Từ các file CSV (Bug SmartRoom, Bug MXH, Testcase Social, Tuyên bố đáp ứng, HS Tablet Draw, Teacher 251):
- Tổng số bug theo module, theo severity (Critical/Major/Minor)
- Tổng số test case theo module, theo priority
- Module nào nhiều bug nhất?
- Luồng nào CHƯA có test case?
- Các bug OPEN quan trọng cần fix gấp
- Tuyên bố đáp ứng: những yêu cầu nào đã đáp ứng, chưa đáp ứng?

### PHẦN 11: RỦI RO & ĐIỂM CẦN LƯU Ý
Từ toàn bộ tài liệu, phát hiện:
- Các điểm MÂU THUẪN giữa các tài liệu (nếu có)
- Các tính năng được mô tả nhưng CHƯA có spec chi tiết
- Các luồng phức tạp dễ gây lỗi (reconnect, đồng bộ, race condition...)
- Các yêu cầu kỹ thuật khó (offline mode, realtime sync, large file...)
- Các tính năng phụ thuộc bên thứ 3 (Janus, AI grammar check, AI pronunciation...)

---

LƯU Ý QUAN TRỌNG:
1. Viết bằng tiếng Việt
2. Format Markdown chuẩn
3. KHÔNG bịa thêm — chỉ tổng hợp từ tài liệu đã upload
4. Nếu thông tin không có trong tài liệu → ghi rõ "Không có trong tài liệu"
5. Ghi nguồn tài liệu cho mỗi thông tin (VD: "Theo file Mô tả chung, mục 4.3.2")
6. Ưu tiên CHÍNH XÁC hơn là DÀI — ngắn gọn nhưng đủ thông tin
7. Output PHẢI đủ chi tiết để 1 developer mới hoặc BA mới đọc xong là hiểu được toàn bộ sản phẩm Edulive
```
