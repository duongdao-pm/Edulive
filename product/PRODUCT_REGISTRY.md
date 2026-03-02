# PRODUCT REGISTRY — Edulive / Nexta Ecosystem
# Map toàn bộ sản phẩm. Nguồn chân lý duy nhất cho Product Knowledge.
# Cập nhật liên tục khi collect thêm thông tin.

---

## Tổng quan Hệ sinh thái

```
Edulive = Công ty EdTech (~20-25 nhân sự kỹ thuật)
Nexta   = Tên gọi chung hệ sinh thái sản phẩm giáo dục

2 mô hình triển khai:
  1. Hội Hợp B (B2C, có Cloud, luồng Legacy)
  2. Nexta B2B (100% Offline, Native Image, đóng gói Server Biên)
```

### ⚠️ HAI GÓC NHÌN SẢN PHẨM

```
GÓC CEO (Sếp TA) — TÊN THƯƠNG MẠI         GÓC DEV (Team) — TÊN KỸ THUẬT
──────────────────────────────────          ────────────────────────────────
AI Teacher (mạng xã hội)             ←→    Social (Chiến, Lực)
ViziStudio (tool tạo nội dung)       ←→    Tool tạo bài giảng AI (Thịnh, Tuyến)
I3Dpro (3D + game)                   ←→    ❓ Chưa map rõ — có thể là Smartroom 3D?
Schoolaris.vn (trường học TM)        ←→    Web-School + LMS + Smartroom + Apps
Lớp học thông minh                   ←→    ❓ = ClassNova? = Smartroom?
─────── BỘ ĐÓNG GÓI ──────
ClassNova                            ←→    ❓ = Phòng học thông minh đóng gói?
AiTalkStudio                         ←→    ❓ MỚI — phòng học ngoại ngữ offline
SynXR                                ←→    ❓ MỚI — STEM
Airlib                               ←→    ≈ "Đồng bộ thư viện Online/Offline"?

⚠️ MAPPING CHƯA CHẮC CHẮN — Cần confirm với Sếp TA + Anh Ngọc
```

---

## PHẦN A: PRODUCT VIEW TỪ CEO (Sếp Tuấn Anh, 24/02/2026)

### A1. AI Teacher — Mạng xã hội giáo dục

| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Tên thương mại** | AI Teacher | Sếp TA 24/02 | ✅ |
| **Mô tả** | Mạng xã hội giáo dục — nơi chia sẻ bài giảng, bộ bài giảng | Sếp TA | ✅ |
| **Analogy** | "Như SharePoint Online" (bài giảng) + "YouTube" (bộ bài giảng) + "OneDrive/GDrive" (Thư viện của tôi) | Sếp TA | ✅ |
| **💰 Có Thanh toán** | Có — chi tiết payment gateway chưa rõ | Sếp TA | ❓ Cần clarify |
| **Tên kỹ thuật (dev)** | **AiTeacher** (BE/API) + **Social** (FE) | Schedule + COMPANY_CONTEXT | ✅ CONFIRMED |
| **Dev phụ trách** | Chiến (FE), Lực (BE API) | COMPANY_CONTEXT | ✅ |
| **QC** | Phương Hoa, Vũ Hồng Anh | COMPANY_CONTEXT | ✅ |
| **Tính năng đã biết (FE)** | Search filter, kéo thả bài giảng, Approve luồng, API đồng bộ | COMPANY_CONTEXT | ✅ |
| **Vấn đề hiện tại** | Lỗi migrate data API ảnh, camelCase/snake_case | COMPANY_CONTEXT | ✅ |
| **B2B note** | Golive để merge tài khoản cũ sang | Sếp TA 24/02 | ✅ |

**Concept "Thư viện của tôi":**
- Là storage cá nhân kiểu GDrive/OneDrive
- Nội dung trên kênh khi được edit → quản lý toàn bộ ở "Thư viện của tôi"
- ViziStudio xây dựng nội dung cho "Thư viện của tôi"
- ✅ CONFIRMED: Có trong cả Social FE và Apps GV (Schedule data)

**Tính năng chi tiết (từ Schedule — AiTeacher BE):**
1. API like lesson_series (đánh giá bài giảng + bộ bài giảng)
2. Đồng bộ data lesson, lesson_seri tại các API liên quan
3. Quản lý trạng thái bài giảng theo account: isLike, **isPaid**, isSubscribed
4. Quản lý file/folder trùng + chuyển quyền sử dụng
5. Đọc file .docs, .pdf, .pptx, .xlsx
6. Master_search + filter
7. Đồng bộ trạng thái phê duyệt lesson-series

**Tính năng chi tiết (từ Schedule — Social FE):**
1. Master_search (tìm kiếm chính)
2. Đồng bộ trạng thái: lesson series, teacher channel, subject, grade, book series, topic
3. Bộ lọc UI file cho "Thư viện của tôi"
4. Cấu hình tệp đính kèm cho tạo/sửa bộ bài giảng
5. **Gen Slide AI** (tích hợp AI vào Social)
6. View + tương tác **canvas 3D** trên "Thư viện của tôi"
7. **Kéo thả** sắp xếp vị trí tài liệu, lesson_topic, topic
8. Phân quyền + phê duyệt nội dung bài giảng
9. API đồng bộ (LessonSeries, TeachChannel) từ online về server biên
10. Tách biệt giao diện Mobile và Desktop

**Dữ liệu từ FIGMA (Mạng xã hội edulive — 4,936 frames, 68 sections):**

📊 **Phân bổ design effort:**
- AI tạo nội dung: ~4,000 frames (81%) ← **Feature lớn nhất**
- Chia sẻ & Cộng tác: ~800 frames
- Quản lý thư viện: ~200 frames
- Tạo bài giảng: ~200 frames

🔑 **Tính năng xác nhận từ Figma:**
1. **"Thư viện của tôi"** — file/folder CRUD, rename, delete, move
2. **Sharing model 5 cấp**: Nội bộ GV, Public, Link-based, Restricted, Email-based + Revoke quyền + Edit/View permission
3. **AI tạo bài giảng** — "Quy trình 5 bước", 3 phiên bản iterate (v1→v3)
4. **AI tạo bài tập** — flow riêng, 1,052 frames
5. **Duplicate handling** — 3 scenario (không trùng, trùng→thay thế, trùng→giữ cả hai)
6. **"Bộ sưu tập"** (Collection) — 28 frames, feature mới chưa từng nhắc
7. **Upload tài liệu** — hỗ trợ .docs, .pdf, .pptx, .xlsx, audio
8. **Giao học liệu + Giao bài tập** — flow trực tiếp từ thư viện

→ **Confirm**: Analogy Sếp TA chính xác — đây là "GDrive + YouTube + SharePoint" cho giáo dục, với AI là lõi chính.

**Câu hỏi mở (cập nhật):**
- [x] ~~AI Teacher = Social?~~ → ✅ YES. AiTeacher = tên BE module, Social = tên FE. Cùng 1 sản phẩm.
- [x] ~~"Thư viện của tôi" có sharing?~~ → ✅ CÓ — 5 cấp quyền phức tạp (Figma confirm)
- [ ] Payment gateway nào? isPaid field đã confirm có thanh toán
- [ ] "Thư viện của tôi" sync offline qua Server Biên? → có API đồng bộ về server biên
- [ ] "Merge tài khoản cũ sang" — merge từ hệ thống nào?
- [ ] "Bộ sưu tập" — là gì? GV tạo collection? Hay mua từ marketplace?
- [ ] "Quy trình 5 bước" AI — 5 bước cụ thể là gì?

---

### A2. ViziStudio — Tool tạo nội dung

| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Tên thương mại** | ViziStudio | Sếp TA 24/02 | ✅ |
| **Mô tả** | Xây dựng nội dung cho "Thư viện của tôi" và các hệ bài giảng | Sếp TA | ✅ |
| **Platform** | Web + Desktop | Sếp TA | ✅ |
| **Đóng gói** | Có — bản đóng gói KHÔNG có webtool | Sếp TA | ✅ |
| **Tên kỹ thuật (dev)** | Tool tạo bài giảng AI? | COMPANY_CONTEXT | ❓ Cần confirm |
| **Dev phụ trách** | Thịnh, Tuyến (logic), Hưng (UI)? | COMPANY_CONTEXT | ❓ Cần confirm |
| **Tính năng đã biết** | Mapping JSON bài tập, prompt sinh ảnh, generate slide | COMPANY_CONTEXT | ❓ |

**Câu hỏi mở:**
- [ ] ViziStudio = "Tool tạo bài giảng AI" mà dev đang làm? Hay sản phẩm khác?
- [ ] Desktop version: Electron? Native? Đóng gói thế nào?
- [ ] "Không có webtool" khi đóng gói — webtool là gì trong context này?
- [ ] GV dùng trực tiếp hay chỉ content team nội bộ?

---

### A3. I3Dpro — Nội dung 3D và Game

| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Tên thương mại** | I3Dpro | Sếp TA 24/02 | ✅ |
| **Mô tả** | Xây dựng nội dung 3D và game | Sếp TA | ✅ |
| **Đóng gói** | Có — nằm trong bộ đóng gói | Sếp TA | ✅ |
| **Dev phụ trách** | ❓ | — | ⬜ Chưa rõ |

**Câu hỏi mở:**
- [ ] I3Dpro liên quan gì đến "phòng học 3D" và "Content 3D" trong COMPANY_CONTEXT?
- [ ] Ai đang phát triển? Quang? Văn? Hay team khác?
- [ ] Dùng engine gì? Unity? Three.js? Custom?
- [ ] Game giáo dục hay game engine cho GV tạo game?

---

### A4. Lớp học thông minh

| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Tên thương mại** | Lớp học thông minh | Sếp TA 24/02 | ✅ |
| **Mô tả** | Quản lý học sinh và bài tập, xem kết quả học sinh | Sếp TA | ✅ |

**Câu hỏi mở:**
- [ ] "Lớp học thông minh" = ClassNova (trong bộ đóng gói)?
- [ ] Khác gì so với Smartroom? Hay là Smartroom + LMS gộp lại?
- [ ] Đây là sản phẩm riêng hay feature trong Schoolaris.vn?

---

### A5. Schoolaris.vn — Trường học thông minh (HỆ THỐNG LỚN NHẤT)

| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Tên thương mại** | Schoolaris.vn | Sếp TA 24/02 | ✅ |
| **Mô tả** | Bộ công cụ quản trị cho nhà trường | Sếp TA | ✅ |
| **Tên kỹ thuật (dev)** | Web-School + LMS + Smartroom + Apps | COMPANY_CONTEXT | ❓ |
| **Dev phụ trách (tổng)** | Nghĩa (Web), Văn+Quang (Smartroom), Khánh+Hùng (Apps) | COMPANY_CONTEXT | ✅ |

#### Phân hệ Schoolaris.vn (từ Sếp TA):

```
Schoolaris.vn
├── 📱 Smartroom
│   ├── Tạo tiết học
│   ├── Desktop Giáo viên
│   └── Tablet Học sinh / Desktop Học sinh
│
├── 📊 Báo cáo (Ngọc phụ trách)
│   └── Bài học và bài giảng
│
├── 👥 Quản lý nhóm
│
├── ✅ Điểm danh
│
├── 📷 Cam AI ← MỚI, chưa từng đề cập
│
├── 📚 LMS
│   ├── Giao bài tập
│   ├── Giao học liệu
│   ├── Kết nối với Apps HS → trả kết quả
│   └── Thách đấu (gamification)
│
├── 👨‍👩‍👧 Module Phụ Huynh
│   ├── Tin tức
│   ├── Survey
│   ├── Tương tác với Apps Phụ huynh
│   └── Quản lý tablet tại nhà (MDM-like)
│       └── Cấu hình ứng dụng + quy định cho HS/PH
│
├── 👩‍🏫 Quản lý Giáo viên
│   ├── Thư viện của giáo viên
│   └── Login/đăng nhập giữa nhà trường và GV
│
└── 🔗 Kết nối
    ├── Nội dung + member School ↔ AiTeacher có thể liên quan
    └── Nội dung kênh khi edit → quản lý ở "Thư viện của tôi"
```

**Câu hỏi mở:**
- [ ] Schoolaris.vn = Web-School/LMS hiện tại (Nghĩa đang làm)?
- [ ] Cam AI: nhận diện gì? Khuôn mặt? Hành vi? Chấm điểm?
- [ ] Cam AI: ai đang phát triển? Tech stack?
- [ ] "Thách đấu" trong LMS: gamification cụ thể thế nào?
- [ ] Quản lý tablet tại nhà: MDM solution nào? Hay tự build?
- [ ] Báo cáo (Ngọc): = Data Lake Dashboard đang tạm dừng? Hay khác?

---

## PHẦN B: BỘ ĐÓNG GÓI (Deployment Packages)

Sản phẩm được đóng gói để triển khai cho khách hàng B2B (chạy trên Server Biên, offline).

| # | Sản phẩm | Mô tả | Trạng thái | Dev | Ghi chú |
|---|----------|-------|-----------|-----|---------|
| 1 | **ViziStudio** | Tool tạo nội dung (không có webtool) | ❓ | ❓ | ❓ Có thể = Tool 2d (28 công cụ tạo nội dung) |
| 2 | **I3DPRO** | Nội dung 3D + game | ❓ | ❓ | |
| 3 | **Airlib** | Thư viện cá nhân đồng bộ chia sẻ không dây | 🔨 ĐANG PHÁT TRIỂN | ❓ | |
| 4 | **AiTalkStudio** | Phòng học ngoại ngữ — offline trên Server Biên | ❓ | ❓ | Ngoại ngữ |
| 5 | **SynXR** | ❓ | ❓ | ❓ | STEM |
| 6 | **ClassNova** | Phòng học thông minh | ❓ | ❓ | ≈ Lớp học thông minh? |

**B2B Deploy yêu cầu (từ Sếp TA):**
- Docker và bộ cài cần xử lý tài khoản read-only
- Clone (❓ clone gì? image? data?)
- Trang WordPress thông tin → anh Hiếu bổ sung

**Câu hỏi mở cho BỘ ĐÓNG GÓI:**
- [ ] 6 sản phẩm này là 6 package riêng biệt? Hay mix-and-match?
- [ ] Mỗi package chạy trên 1 Server Biên riêng?
- [ ] AiTalkStudio: đã có team chưa? Hay mới là concept?
- [ ] SynXR: STEM cụ thể gồm những gì?
- [ ] Airlib vs "Đồng bộ thư viện Online/Offline" (COMPANY_CONTEXT): cùng 1 thứ?
- [ ] ClassNova vs "Lớp học thông minh": cùng 1 sản phẩm?
- [ ] Docker read-only accounts: yêu cầu kỹ thuật cụ thể?
- [ ] "Clone" — clone image? clone data? clone environment?
- [ ] Anh Hiếu: vai trò gì? Marketing? Content? Chưa có trong DS nhân sự.

---

## PHẦN C: CHI TIẾT KỸ THUẬT (Góc Dev — enriched với Schedule data)

### C1. Apps Học Sinh / Smartroom_tablet
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Thuộc sản phẩm** | Schoolaris.vn → LMS (kết nối apps HS) | Sếp TA | ✅ |
| **Dev phụ trách** | Khánh, Hùng | COMPANY_CONTEXT + Schedule | ✅ |
| **Platform** | **Mobile / Tablet** | Schedule | ✅ |
| **Tech stack** | Firebase (Dynamic layout config) | Schedule | 🟡 Partial |
| **Alias** | Smartroom_tablet | Schedule | ✅ |

**Tính năng chi tiết (từ Schedule):**
1. **Dynamic layout**: bật/tắt module icon từ Firebase — KHÔNG cần build lại app
2. **Draw tool**: Text, Shape, Style Settings, Selection, Undo/Redo, Copy/Paste, Eraser, Delete, Close
3. Luồng làm bài tập (**Challenge** / thi đấu)
4. Luồng HS làm bài tập được giao từ **LMS** của GV
5. Chơi **Game**, làm **Exercise**, tương tác nội dung **3D** (xoay 360 độ)
6. Bật **Cam và Mic**
7. Đồng bộ màn hình (synctab)

**Trạng thái:** Cần đẩy lên Store, đang chuẩn bị **demo Vĩnh Phúc**
**⚠️ Issue:** Task "Apps HS nhận bài tập từ LMS" bị QC **HỦY BỎ** — chưa rõ nguyên nhân

---

### C2. Apps Giáo Viên
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Thuộc sản phẩm** | Schoolaris.vn → Smartroom (Desktop GV) | Sếp TA | ✅ |
| **Dev phụ trách** | Văn, Quang | COMPANY_CONTEXT + Schedule | ✅ |
| **Platform** | **Desktop / Tablet / Mobile** | Schedule | ✅ |
| **Tech stack** | **VueJS → ReactJS** (đang chuyển) | Schedule | ✅ |
| **⚠️ Có 2 bản build** | **React** và **Native** | Schedule | ✅ QUAN TRỌNG |

**Tính năng chi tiết (từ Schedule):**
1. Thống kê kết quả HS làm bài
2. Update trạng thái isPublic cho kênh
3. Kiểm duyệt lesson, lesson-series
4. **"Thư viện của tôi"**: Tạo folder, upload, delete, sắp xếp file theo loại
5. Bật/tắt đồng bộ content trên React (image, video, content)
6. Chuyển tab **3D** + Play 3D (Load 3D khi bắt đầu chơi)
7. Load thư viện xử lý **3D từ Server Biên**
8. Tool Draw (đang fix bug)
9. Get license info (bản quyền)
10. Nút **Sync Data** tại "Classes" để cập nhật dữ liệu
11. **Classes AI**, **Ranking**
12. Flag tắt/bật AI cho các dạng câu hỏi
13. Chuyển **Smartroom VueJS → ReactJS**
14. Xử lý lỗi nhiều thiết bị vào cùng 1 tài khoản

---

### C3. Apps Phụ Huynh
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Thuộc sản phẩm** | Schoolaris.vn → Module Phụ Huynh | Sếp TA | ✅ |
| **Dev phụ trách** | Khánh | COMPANY_CONTEXT + Schedule | ✅ |
| **Platform** | **Mobile** | Schedule | ✅ |
| **Trạng thái** | 🔨 **Đang build MVP** | Schedule | ✅ |

**Tính năng (từ Schedule — rất sơ khai):**
1. Cập nhật giao diện mới (theo Figma)
2. Màn hình **News** (Tin tức)
3. Build bản MVP

**Tính năng (từ Sếp TA — roadmap đầy đủ):**
- Tin tức, Survey, Tương tác Apps PH, Quản lý tablet tại nhà (MDM-like)
- → **GAP lớn** giữa MVP hiện tại và vision CEO

**Cần đẩy lên Store**

---

### C4. Smartroom (= phần Smartroom trong Apps GV + Apps HS)
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Thuộc sản phẩm** | Schoolaris.vn → Smartroom | Sếp TA | ✅ |
| **Phiên bản** | Desktop GV (**Smartroom_react**) + Tablet HS (**Smartroom_tablet**) + Desktop HS | Schedule + Sếp TA | ✅ |
| **Dev phụ trách** | Văn, Quang (GV side), Khánh, Hùng (HS side) | Schedule | ✅ |
| **QC** | Khánh Linh (React), Anh Đào (Tablet) | COMPANY_CONTEXT | ✅ |
| **Tech stack** | VueJS → **ReactJS** (đang chuyển) | Schedule | ✅ |

**Kết luận mapping:** Smartroom KHÔNG phải app riêng — nó là **mode/feature** nằm trong Apps GV và Apps HS.
- GV dùng: Smartroom_react (Desktop GV) → điều khiển lớp học
- HS dùng: Smartroom_tablet → tương tác, làm bài, 3D

**STEM Room Mapping (từ Tuyên bố đáp ứng — CONFIRMED):**
- Teacher's Stem Room (Model EDL750s) = **Smartroom_react** (Desktop GV)
- Student's Stem Room (Model EDL760s) = **Smartroom_tablet** (Tablet HS)
- Teacher's Stem LMS = **Web-School/LMS**
- Thư viện học liệu sync = **AI Teacher/Social**

**Tính năng STEM Room (từ Spec — 60+ features):**
Đã có: Tạo phòng học, thư viện file, trình chiếu đa phương tiện, bảng trắng (5+), chia sẻ màn hình, giao bài tập, chấm điểm tự động, chia nhóm, game hóa, bảng xếp hạng, quản lý account/lớp/điểm danh
Chưa có/Bug: Search không hoạt động, upload file lỗi, đồng hồ bấm giờ lỗi, xuất báo cáo chưa có, tool thiết kế thí nghiệm/bài giảng/trò chơi chưa có, bài thi HS chưa có

**[MỚI] Tool 2d** — Phần mềm tạo nội dung tương tác (kéo thả block, 28 công cụ). Cài trên máy GV. Có thể = ViziStudio?

---

### C5. Web-School / School_203 / LMS
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Thuộc sản phẩm** | **Schoolaris.vn** (toàn bộ) | Sếp TA | ✅ |
| **Alias** | School_203 | Schedule | ✅ |
| **Dev phụ trách** | **Nghĩa** (FE), **Diện+Toại** (BE PHP→Java) | Schedule | ✅ |
| **Platform** | **Web** | Schedule | ✅ |
| **Tech stack BE** | **PHP → Java** (đang chuyển) | Schedule | ✅ |

**Tính năng chi tiết (từ Schedule):**
1. Quản lý lớp học thông minh (nội dung lớp đã diễn ra, lịch sử câu hỏi)
2. Thống kê câu hỏi dạng **Speaking**
3. UI LMS: Chi tiết bài tập, thời gian câu hỏi
4. **LMS Học liệu**: Tìm kiếm + upload học liệu
5. Đồng bộ content, question, slide, media lên storage
6. Website cho **PH/HS**: Trang chủ, Tin tức, Login, Custom env
7. Luồng login check quyền School FE và BE

**Trạng thái:** Đang clean code + custom biến môi trường

---

### C6. DataWarehouse / Data Lake
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Phụ trách** | Anh Ngọc | Schedule + COMPANY_CONTEXT | ✅ |
| **Platform** | Server | Schedule | ✅ |
| **Trạng thái** | ⏸️ Tạm dừng (nhiều task 0%) | Schedule | ✅ |

**Tính năng planned (từ Schedule — dù chưa triển khai):**
1. Thống kê tỉ lệ GV tạo học liệu theo tháng
2. Thống kê tỉ lệ GV sử dụng học liệu số / tổng thời lượng / theo môn
3. Thống kê tỉ lệ HS yếu/TB/khá/giỏi theo tuần
4. Phân tích đơn vị kiến thức HS hay mắc lỗi theo khối
5. Thống kê nhóm HS nguy cơ (tần suất sai, không làm/nộp muộn)

→ **Quan trọng**: Đây có thể là "Báo cáo" mà Sếp TA nhắc trong Schoolaris.vn (Ngọc phụ trách)

---

### C7. Tool tạo bài giảng AI / Kho ảnh GV (≈ ViziStudio?)
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Dev phụ trách** | **Thịnh, Tuyến** (logic AI), **Đạt, Nam** (ảnh AI), **Hưng** (UI) | Schedule | ✅ |
| **Platform** | Server / Tool (+ Web + Desktop theo Sếp TA) | Schedule + Sếp TA | ✅ |
| **Sách áp dụng** | **KNTT** (Kết nối tri thức) | Schedule | ✅ |
| **API port** | Host API json cổng **8503** | Schedule | ✅ |

**Tính năng chi tiết (từ Schedule):**
1. AI tạo lại ảnh mờ SGK KNTT → rõ nét, xóa watermark, tách nền
2. Đóng gói kho ảnh SGK **Toán lớp 1-4** (tập 1 & 2)
3. Mapping JSON bài tập: fill_in_plan, single_choice, matching
4. JSON tạo bài giảng dạng Nối hình với số
5. Ảnh AI minh họa bài tập Toán lớp 1 (mục 11-30)
6. Tạo slide: Khởi động, Khám phá, Vận dụng, Luyện tập theo **KHBD**
7. Phân tách câu hỏi lớn → câu nhỏ (a, b) trên slide
8. **Gen Slide AI** (cũng tích hợp trong Social FE)

**Ghi chú:** Dùng **LLM** gen ảnh. Đang phục vụ sách KNTT (Kết nối tri thức).

---

### C8. Hệ thống BE / Server Biên / Infrastructure
| Mục | Thông tin | Nguồn | Status |
|-----|-----------|-------|--------|
| **Dev phụ trách** | **Diện** (key), **Dũng** (Kafka push), **Toại** (PHP→Java), **Lực** (API sync) | Schedule | ✅ |
| **Kafka** | Consume từ EDGE (exercise, pupils) + Push Server Biên → Kafka → DB Online | Schedule | ✅ |
| **Servers** | Server 202 (Native), Server Lan 252, Edulive2.lan, EDGE Server | Schedule | ✅ |
| **Frontend đóng gói** | **Next.js** image chạy đa môi trường | Schedule | ✅ |

**Tính năng chi tiết (từ Schedule):**
1. Chuyển **PHP → Java**
2. Native BE **chống clone + crack**
3. Bộ đóng gói (**Installer**) tích hợp Smartroom chạy **Silent** trên Client
4. Service **On/Off từ xa** qua bộ cài
5. Consume Kafka từ EDGE: exercise, pupils
6. Đẩy data Server Biên → Kafka → DB Online
7. Setup Server 202, 252, Edulive2.lan
8. Đóng gói image **Next.js** đa môi trường
9. Docker + bộ cài cần **read-only accounts** (từ Sếp TA)

**Môi trường:** DEV, Beta. Chạy song song Online + Offline (EDGE).

---

## PHẦN D: SẢN PHẨM TẠM DỪNG / CHƯA TRIỂN KHAI

| # | Sản phẩm | Phụ trách | Trạng thái | Ghi chú |
|---|----------|-----------|-----------|---------|
| 1 | DataWarehouse | Anh Ngọc | ⏸️ Tạm dừng | |
| 2 | Data Lake - Reporting | Anh Ngọc | ⏸️ Tạm dừng | ❓ = "Báo cáo" trong Schoolaris? |
| 3 | Recommendation System | Anh Ngọc | ⏸️ Tạm dừng | |
| 4 | Generate Video | ❓ | ⬜ Chưa triển khai | |
| 5 | Audit Logs | ❓ | ⬜ Chưa triển khai | |

---

## PHẦN E: TỔNG HỢP GAPS & MAPPING (cập nhật sau Schedule data)

### ✅ Đã GIẢI QUYẾT sau Schedule data

| # | Câu hỏi cũ | Kết quả |
|---|-----------|---------|
| 1 | AI Teacher = Social? | ✅ **YES** — AiTeacher = BE module, Social = FE. Cùng 1 sản phẩm |
| 2 | Smartroom = app riêng? | ✅ **KHÔNG** — là mode/feature trong Apps GV (Smartroom_react) + Apps HS (Smartroom_tablet) |
| 3 | Apps HS platform? | ✅ **Mobile/Tablet** |
| 4 | Apps GV platform? | ✅ **Desktop/Tablet/Mobile** |
| 5 | Apps PH platform? | ✅ **Mobile** |
| 6 | Apps GV tech stack? | ✅ **VueJS → ReactJS** (đang chuyển) |
| 7 | Web-School alias? | ✅ **School_203** |
| 8 | Firebase dùng làm gì? | ✅ **Dynamic layout config** cho Apps HS |
| 9 | AI Tool sách nào? | ✅ **KNTT** (Kết nối tri thức), Toán lớp 1-4 |
| 10 | Bộ đóng gói có chống crack? | ✅ **Native BE chống clone + crack** |

### 🔴 VẪN CÒN GAPS (Critical — cần hỏi Anh Ngọc)

| # | Câu hỏi | Người biết | Ưu tiên |
|---|---------|-----------|---------|
| 1 | **ViziStudio** = Tool AI bài giảng (Thịnh/Tuyến)? = Tool 2d (STEM)? Hay 3 product khác nhau? | Anh Ngọc, Thịnh, Hưng | 🔴 |
| 2 | **I3Dpro** là gì? Ai làm? Liên quan 3D trong Apps GV? | Anh Ngọc, Văn | 🔴 |
| 3 | **ClassNova** vs **Lớp học thông minh** — cùng 1 không? | Sếp TA | 🔴 |
| 4 | **AiTalkStudio** — đã có team chưa? Hay chỉ concept? | Sếp TA, Anh Ngọc | 🔴 |
| 5 | **SynXR** (STEM) — gồm những gì? Ai làm? | Sếp TA, Anh Ngọc | 🔴 |
| 6 | **Airlib** — Ai phát triển? Timeline? | Sếp TA, Anh Ngọc | 🟡 |
| 7 | **Cam AI** — nhận diện gì? Ai phát triển? Tech stack? | Anh Ngọc | 🟡 |
| 8 | **Payment gateway** trong AI Teacher — tích hợp rồi chưa? | Anh Ngọc, Chiến | 🟡 |
| 9 | **Schoolaris.vn** = Web-School hiện tại? (confirm chính thức) | Sếp TA | 🟡 |
| 10 | **"Merge tài khoản cũ"** trong Social — từ hệ thống nào? | Chiến, Lực | 🟡 |
| 11 | **Repo list** — bao nhiêu repo? Tên gì? | Anh Ngọc, Diện | 🔴 |
| 12 | **Architecture diagram** tổng thể | Anh Ngọc | 🔴 |
| 13 | ~~**Anh Hiếu**~~ ✅ = Mr Hiếu, CS (Customer Success): triển khai demo STEM, nghiệm thu | Tuyên bố đáp ứng | ✅ RESOLVED |
| 14 | Task **"Apps HS nhận bài từ LMS" bị hủy** — nguyên nhân? | QC Team | 🟡 |
| 15 | **B2B pricing** model? | Sếp TA | 🟡 |

### Biểu đồ Ecosystem (Cập nhật — đã confirm một số mapping)

```
┌─────────────────────────────────────────────────────┐
│     AI Teacher = AiTeacher(BE) + Social(FE)         │
│   SharePoint-like + YouTube-like + 💰 Thanh toán    │
│         Tách Mobile / Desktop UI                    │
└───────────────┬─────────────────────────────────────┘
                │ "Thư viện của tôi" (GDrive-like)
    ┌───────────┴──────────────┐
    ▼                          ▼
┌────────────┐         ┌────────────┐
│ ViziStudio │         │  I3Dpro    │
│ (Tool AI   │         │ (3D+Game)  │
│ bài giảng?)│         │ ❓ ai làm? │
└────────────┘         └────────────┘
                │
┌───────────────▼──────────────────────────────────────┐
│             Schoolaris.vn                            │
│  ┌──────────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Smartroom   │  │   LMS    │  │  Module PH    │  │
│  │ _react (GV)  │  │Bài tập   │  │  News,Survey  │  │
│  │ _tablet (HS) │  │Học liệu  │  │  MDM tablet   │  │
│  └──────────────┘  │Thách đấu │  └───────────────┘  │
│  ┌───────────────┐ └──────────┘  ┌───────────────┐  │
│  │  Web-School   │               │  DataWarehouse │  │
│  │ (School_203)  │               │  ⏸️ Tạm dừng  │  │
│  │ PHP→Java(BE)  │               └───────────────┘  │
│  └───────────────┘                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Điểm danh│  │ Cam AI ❓│  │  Quản lý GV      │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────┬────────────────────────────────┘
                      │ Deploy
┌─────────────────────▼──────────────────────────┐
│      BỘ ĐÓNG GÓI B2B (Server Biên)            │
│  ClassNova  ·  SynXR  ·  AiTalkStudio         │
│  Airlib  ·  ViziStudio  ·  I3Dpro             │
│  [Docker + read-only accounts + anti-crack]    │
└────────────────────────────────────────────────┘
```

### Biểu đồ Ecosystem (Draft — cần xác nhận)

```
                    ┌──────────────────────────────────┐
                    │        AI Teacher (Social)        │
                    │  SharePoint + YouTube + GDrive    │
                    │        💰 Có Thanh toán           │
                    └──────────┬───────────────────────┘
                               │ Nội dung
                    ┌──────────▼───────────────────────┐
                    │       "Thư viện của tôi"          │
                    │    (Storage cá nhân GV/User)      │
                    └──────┬───────────────┬───────────┘
                           │               │
              ┌────────────▼──┐    ┌───────▼──────────┐
              │  ViziStudio   │    │     I3Dpro        │
              │ Web + Desktop │    │   3D + Game       │
              │ Tạo bài giảng │    │ Tạo content 3D    │
              └───────────────┘    └──────────────────┘
                               │
                    ┌──────────▼───────────────────────┐
                    │       Schoolaris.vn               │
                    │   (Trường học thông minh)         │
                    │                                   │
                    │  ┌─────────┐  ┌──────┐  ┌─────┐ │
                    │  │Smartroom│  │ LMS  │  │ PH  │ │
                    │  │Desktop  │  │Bài tập│ │Tablet│ │
                    │  │Tablet   │  │Học liệu│ │Tin tức││
                    │  └────┬────┘  └──┬───┘  └──┬──┘ │
                    │       │          │          │     │
                    │  ┌────▼────┐ ┌───▼──┐ ┌───▼───┐ │
                    │  │Điểm danh│ │CamAI │ │Survey │ │
                    │  └─────────┘ └──────┘ └───────┘ │
                    └──────────┬───────────────────────┘
                               │
                    ┌──────────▼───────────────────────┐
                    │    BỘ ĐÓNG GÓI (Server Biên)     │
                    │                                   │
                    │  ClassNova    SynXR    Airlib     │
                    │  AiTalkStudio  ViziStudio  I3Dpro│
                    └──────────────────────────────────┘
```

---

## Lịch sử cập nhật

| Ngày | Thay đổi | Nguồn |
|------|---------|-------|
| 2026-02-24 | Tạo bản đầu tiên từ COMPANY_CONTEXT + Meeting notes | PM (Ethan) |
| 2026-02-24 | **MAJOR UPDATE v2** — Product View từ Sếp TA: AI Teacher, ViziStudio, I3Dpro, Schoolaris.vn, 6 bộ đóng gói mới | ALO Sếp TA |
| 2026-02-24 | **MAJOR UPDATE v3** — Enriched từ Edulive_Schedule_v1 (NotebookLM): tech stack, platform, tính năng chi tiết tất cả sản phẩm, confirm AI Teacher = AiTeacher BE + Social FE, Smartroom = mode trong Apps GV+HS | Schedule data |
| 2026-02-24 | **UPDATE v4** — Figma "Mạng xã hội edulive": 4,936 frames, 68 sections. Confirm sharing 5 cấp, AI chiếm 81% design, phát hiện feature "Bộ sưu tập", duplicate handling 3 scenarios | Figma MCP |
| 2026-02-24 | **UPDATE v5** — STEM Room Spec + Tuyên bố đáp ứng (NotebookLM): STEM Room mapping confirmed, 60+ features cataloged, hardware specs, bugs/gaps identified, Tool 2d discovered, Mr Hiếu = CS, Bắc Ninh + Vĩnh Phúc deployments | NotebookLM |
