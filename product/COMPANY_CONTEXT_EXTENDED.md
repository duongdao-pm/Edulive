# COMPANY CONTEXT — CHI TIẾT
# Chỉ đọc khi role yêu cầu (xem routing table trong COMPANY_CONTEXT.md)
# PM: đọc TẤT CẢ | Dev BE/FE: đọc §2,§3,§7 | QC: đọc §2,§4 | AI: đọc §2,§7
# Cập nhật: 2026-02-24

---

## §2. Nhân sự & Vai trò chi tiết

### Ban Giám Đốc & Tech Lead

**Sếp Tuấn Anh (TGĐ)**
- Định hướng: tập trung Agentic AI
- Phong cách: Micromanagement, ép tiến độ liên tục
- Hay yêu cầu: "Đóng gói ngay, bỏ qua lỗi nhỏ, release bản Secure"
- Muốn: Nexta B2B chạy 100% offline
- PM cần: báo cáo dạng "có tầm nhìn hệ thống" nhưng chi tiết micro

**Anh Ngọc (Tech Lead / Architect)**
- Quyết định kiến trúc toàn hệ thống
- Đang phụ trách: DataWarehouse, Data Lake, Recommendation, Approval workflow
- Quyết định dùng Kafka để đồng bộ
- CẢNH BÁO: Đang ôm 23 task, chỉ 2 hoàn thành, 3 quá hạn → bottleneck

### Backend Team (5 người)

| Tên | Chuyên môn | Đang làm | Risk level |
|-----|-----------|----------|------------|
| **Mr Diện** | Key BE, Kafka, Edge Server | Kafka Server Biên, Đóng gói Image NextJS, Tạo tiết offline, Chuyển PHP→Java | 🔴 Overloaded |
| **Lực** | API Social, Sync API | API đồng bộ Edge→Cloud (Content, Question, Slide, Media) | 🟡 |
| **Toại** | Support | Hỗ trợ Diện chuyển PHP→Java, chuẩn bị server demo, IT phần cứng | 🟢 |
| **Dũng** | Data sync | Đẩy data từ Server Biên lên Kafka → sync DB online | 🟡 |
| **Anh Ngọc** | Architect | DataWarehouse, Data Lake, Recommendation (nhiều task tạm dừng/tồn đọng) | 🔴 Bottleneck |

### Frontend Team (7 người)

| Tên | Chuyên môn | Đang làm | Risk level |
|-----|-----------|----------|------------|
| **Chiến** | Key FE, Social | Search filter, UI kéo thả bài giảng, Approve luồng, API đồng bộ | 🔴 Key person |
| **Mr Hưng** | UI, Demo, Tool 2d | Cấu hình Approve bài giảng, server demo, UI Tool AI, cài Tool 2d Bắc Ninh | 🟡 |
| **Nghĩa** | Web-School | LMS, trang Phụ huynh-Học sinh (News, Login, Dashboard) | 🟢 |
| **Khánh** | Mobile Apps | Apps Phụ huynh, Apps Học sinh (Dynamic layout, Firebase) | 🟢 |
| **Văn** | Mobile Apps | Apps Giáo viên, Smartroom, VueJS→ReactJS, 3D từ Server Biên, Sync offline | 🟡 |
| **Quang** | Mobile Apps | Apps Giáo viên, phòng học 3D, Classes AI, Ranking | 🟢 |
| **Hùng** | Mobile Apps | Apps Học sinh (vẽ/canvas) | 🟢 |

### AI Team (4 người)

| Tên | Chuyên môn | Đang làm |
|-----|-----------|----------|
| **Thịnh** | AI Logic | Tool tạo bài giảng, mapping JSON bài tập, prompt sinh ảnh |
| **Tuyến** | AI Logic | Tool tạo bài giảng, prompt engineering |
| **Đạt** | AI Image | Kho ảnh giáo viên (sách KNTT lớp 1-4), xoá watermark, gen ảnh |
| **Nam** | AI Image | Kho ảnh giáo viên, gen ảnh AI |

### QC Team (4 người)

| Tên | Chuyên test |
|-----|------------|
| **Nguyễn Thị Khánh Linh** | Smartroom React, PHNN, School Server |
| **Phương Hoa** | Social, Cộng đồng nội dung |
| **Trần Thị Anh Đào** | Smartroom Tablet (Học sinh), Draw, Content 3D, Exercise |
| **Vũ Hồng Anh** | Apps Học sinh, Social |

### Nhân sự bổ sung

| Tên | Vai trò | Ghi chú | Nguồn |
|-----|---------|---------|-------|
| **Mr Hiếu** | CS (Customer Success) | Triển khai STEM Room tại Bắc Ninh + Vĩnh Phúc. Không phải Marketing. | STEM Room Spec 24/02 ✅ |
| **Hưng** | Triển khai + Tool 2d | Cài đặt Tool 2d cho Bắc Ninh, cấu hình Approve bài giảng, server demo | STEM Room Spec 24/02 |

---

## §3. Nút thắt & Rủi ro hiện tại

### 🔴 NÚT THẮT 1: Ma trận Phiên bản (Versioning Hell)

```
Hội Hợp B = Luồng code CŨ (Legacy)
Nexta      = Luồng code MỚI (Native)

⚠️ KHÔNG ĐƯỢC: Code đè luồng mới vào bản Hội Hợp B
⚠️ Sếp yêu cầu: "Đóng băng code, release ngay bản Secure, bỏ qua lỗi nhỏ"
⚠️ Dev báo: Chưa merge xong, lỗi migrate data (API ảnh Social)
```

### 🔴 NÚT THẮT 2: Edge Server Sync (Offline/Online)

```
Kỳ vọng Sếp: Không cần mạng → vẫn tạo lớp, giao bài, dạy
Thực tế: Phải có mạng mới tạo lớp Online → rồi kéo về Server Biên (SAI)
Kiến trúc chốt:
  ↑ Server Biên → Cloud: Kafka (ưu tiên kết quả bài tập)
  ↓ Cloud → Server Biên: Sync API (nội dung + STEM, KHÔNG sync "Kênh của tôi")
  Tần suất: 30 phút/lần
```

### 🔴 NÚT THẮT 3: Giao tiếp & Logic Luồng bị lệch

```
Vấn đề 1: "Lớp học sau bài giảng" (Assignment)
  Chiến (FE) và Anh Ngọc (Tech Lead) hiểu sai luồng của nhau
  → PM phải can thiệp: chốt bằng Document/Flowchart

Vấn đề 2: Chuyển PHP → Java
  API xong NHƯNG JSON format lệch: Java camelCase, PHP snake_case
  → FE (Chiến) đang rà soát UI vênh
```

### 🔴 NÚT THẮT 4: STEM Room — Bugs chặn triển khai (từ STEM Spec 24/02)

```
BUG CRITICAL: Search broken, Upload broken, Timer broken
5+ LMS tools thiếu: Thách đấu, Ranking, Chia nhóm, Video nhúng, Flashcard
60+ features document, nhiều "có nhưng lỗi" hoặc "cloud only chưa offline"
```

### 🟡 Người quá tải (Resource Bottleneck)

```
🔴 Mr Diện (BE): Kafka + Edge Server + PHP→Java + Native Image = quá nhiều
🔴 Anh Ngọc: 23 task, 3 quá hạn, architect + DW + Data Lake
🔴 Chiến (FE): Social + API Sync + Search + Approve = key person risk
```

---

## §4. STEM Room — Chi tiết (từ STEM Spec + Tuyên bố đáp ứng 24/02)

```
STEM Room = Bộ đóng gói chính B2B
├── Teacher's Stem Room (EDL750s) = Smartroom_react
├── Student's Stem Room (EDL760s) = Smartroom_tablet
├── Teacher's Stem LMS = Web-School/LMS
└── Hardware:
    ├── Server Biên: i5-12400F / 32GB RAM / Ubuntu
    ├── Tablet: Snapdragon 695 / 8GB RAM / Android 13
    └── Router: Wifi 6

Triển khai: Bắc Ninh (Mr Hiếu CS), Vĩnh Phúc (HHB Legacy)
Tool 2d: 28 công cụ tương tác (Hưng cài), có thể = ViziStudio
```

> Chi tiết 60+ features + bugs: xem `product/PRODUCT_REGISTRY.md` → Section C4

---

## §7. Tech Stack & Hạ tầng (confirmed từ Schedule data, 24/02/2026)

```
FRONTEND
├── ReactJS    — Social FE (Chiến), Smartroom_react (Văn, Quang)
├── VueJS      — Smartroom cũ → đang chuyển sang ReactJS
├── Next.js    — Đóng gói image Frontend đa môi trường
└── Firebase   — Dynamic layout config cho Apps HS

BACKEND
├── Java       — Đang chuyển từ PHP (Diện, Toại) [camelCase]
├── PHP        — Legacy Web-School (đang migrate) [snake_case]
└── API json   — Host cổng 8503 (AI Tool bài giảng)

MESSAGE QUEUE
└── Kafka      — Edge Server ↔ Cloud (Diện consume, Dũng push)

MOBILE
├── Apps GV    — VueJS → ReactJS, Desktop/Tablet/Mobile, React + Native build
├── Apps HS    — Firebase Dynamic Layout, Mobile/Tablet (Smartroom_tablet)
└── Apps PH    — MVP stage, Mobile

AI / ML
├── LLM        — Gen ảnh (Thịnh, Tuyến, Đạt, Nam)
└── Sách       — KNTT (Kết nối tri thức), Toán lớp 1-4

SERVERS
├── Server 202  — Native build
├── Server 252  — LAN
├── Edulive2.lan — Local env
└── EDGE Server — Server Biên tại trường học (i5-12400F/32GB/Ubuntu)

ENV: DEV, Beta
```

---

## §8. Yêu cầu PM Process (từ Sếp TA, 24/02/2026) — CHỈ PM ĐỌC

```
FOCUS CHÍNH: Quy trình Đóng gói và Triển khai cho khách hàng B2B

BÁO CÁO:
- Hàng tuần: Báo cáo công việc nhân sự
- Hàng ngày: Cập nhật trạng thái + daily report
- Đánh giá năng lực nhân sự dựa trên task

ĐẶC TÍNH TASK:
- Simple + lặp đi lặp lại
- Advance + khó + sáng tạo
- Phụ thuộc (dependency) phải rõ ràng
- Khi task nhận → quá 50% thời gian → không xác nhận vấn đề = ĐỎ
- Quy trình + phương án → GỬI QUA EMAIL

Phong cách báo cáo cho Sếp TA:
  1. Tổng quan 2-3 câu (big picture)
  2. Chi tiết từng line: ai làm gì, % bao nhiêu, blocker gì
  3. Risk & Đề xuất giải pháp
  4. Timeline commit rõ ràng (ngày cụ thể)
```

---

## §9. Workspace ↔ Google Sheet

```
WORKSPACE (PM + AI agents)              GOOGLE SHEET (Human team)
─────────────────────────               ──────────────────────────
Phân tích, tổ chức, ra quyết định       Nhân viên xem task, cập nhật status
Agent đọc data, tạo report              Daily task auto-refresh 5 phút
PM duyệt trước khi push                 Source of truth cho team

Nguyên tắc:
- Workspace = nơi tư duy, Sheet = nơi thực thi
- Sync agent chỉ đẩy task đã PM approve
- Không tự ý thay đổi data trên sheet
```

---

## Lịch sử cập nhật

| Ngày | Thay đổi | Bởi |
|------|---------|-----|
| 2026-02-24 | Tạo — tách từ COMPANY_CONTEXT.md để tối ưu token | PM (Ethan) |
