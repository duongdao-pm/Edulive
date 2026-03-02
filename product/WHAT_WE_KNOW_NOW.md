# WHAT WE KNOW NOW — Edulive Ecosystem
# Bản tóm tắt nhanh cho PM. Cập nhật: 2026-02-24
# Đọc file này trước mọi meeting / báo cáo.

---

## 🗺️ BỨC TRANH TỔNG THỂ

Edulive = công ty EdTech ~20-25 người, sản phẩm hệ sinh thái giáo dục có tên thương mại là **Nexta**.

```
2 MÔ HÌNH TRIỂN KHAI
─────────────────────────────────────────────────────
Hội Hợp B (B2C)          │  Nexta B2B
Có internet/Cloud         │  100% Offline
Luồng code CŨ (Legacy)   │  Native Image
2 Server Biên + 70 Tablet │  Đóng gói cho trường học
```

---

## 📦 CÁC SẢN PHẨM — Tên CEO vs Tên Dev

| Tên CEO | Tên Dev/Kỹ thuật | Platform | Trạng thái |
|---------|-----------------|----------|-----------|
| **AI Teacher** | AiTeacher (BE) + Social (FE) | Web, Mobile | 🔨 Active — đang fix + build feature |
| **ViziStudio** | Tool tạo bài giảng AI? | Web + Desktop | ❓ Chưa confirm mapping |
| **I3Dpro** | ❓ | ❓ | 🔴 ZERO info |
| **Schoolaris.vn** | Web-School (School_203) + LMS + Smartroom + Apps | Web | 🔨 Active |
| └─ Smartroom | Smartroom_react (GV) + Smartroom_tablet (HS) | Desktop/Tablet | 🔨 VueJS→ReactJS |
| └─ LMS | Web-School/School_203 (Nghĩa) | Web | 🔨 Clean code |
| └─ Apps GV | Apps GV (Văn, Quang) | Desktop/Tablet/Mobile | 🔨 React+Native build |
| └─ Apps HS | Apps HS (Khánh, Hùng) | Mobile/Tablet | 🔨 Cần đẩy Store |
| └─ Apps PH | Apps PH (Khánh) | Mobile | 🔨 MVP stage |
| **Lớp học thông minh** | ❓ = ClassNova? | ❓ | ❓ |
| *DataWarehouse* | DataWarehouse + Data Lake | Server | ⏸️ TẠM DỪNG |
| *AI Tool nội bộ* | Tool AI + Kho ảnh KNTT | Server/Tool | 🔨 Active |

**Bộ đóng gói B2B** (chạy Server Biên, offline):
`ClassNova` · `AiTalkStudio` · `SynXR` · `Airlib` · `ViziStudio` · `I3Dpro`

---

## 👥 NHÂN SỰ KEY (+ risk level)

| Người | Role | Đang làm | Risk |
|-------|------|----------|------|
| **Anh Ngọc** | Architect | DataWarehouse (tạm dừng), approve workflows | 🔴 Bottleneck, 23 task |
| **Mr Diện** | Key BE | Kafka, Server Biên, PHP→Java, Native Image | 🔴 Overloaded |
| **Chiến** | Key FE | Social, API sync, Search, Approve | 🔴 Key person risk |
| **Văn** | Mobile | Apps GV, Smartroom, 3D, VueJS→ReactJS | 🟡 |
| **Khánh** | Mobile | Apps HS, Apps PH | 🟢 |
| **Nghĩa** | Web | Web-School, LMS, Parent-Pupil | 🟢 |
| **Thịnh/Tuyến** | AI | Tool bài giảng, prompt | 🟡 |
| **Đạt/Nam** | AI | Kho ảnh KNTT | 🟢 |

---

## ⚙️ TECH STACK (confirmed)

```
FE: ReactJS / VueJS (→ ReactJS) / Next.js (đóng gói) / Firebase (dynamic layout)
BE: Java (từ PHP) / PHP (legacy)
Queue: Kafka (Edge↔Cloud sync)
Mobile: Firebase Dynamic Layout / React Native (?) / VueJS → ReactJS
AI: LLM gen ảnh, KHBD slide generation
Servers: 202 (Native), 252 (LAN), EDGE (Server Biên)
Env: DEV, Beta
```

---

## 🔴 NÚT THẮT HIỆN TẠI (không đổi)

1. **Versioning Hell**: HHB = Legacy, Nexta B2B = Native. KHÔNG được lẫn.
2. **Edge Server Sync chưa xong**: GV phải online mới tạo lớp → sai yêu cầu
3. **Logic lệch**: Chiến (FE) và Anh Ngọc hiểu luồng Assignment khác nhau
4. **Resource**: Diện + Anh Ngọc + Chiến đang quá tải

---

## 🏫 STEM ROOM (mới — 24/02)

STEM Room = Smartroom + LMS + Social đóng gói offline. **CONFIRMED mapping:**
- Teacher's Stem Room (EDL750s) = **Smartroom_react** | Student's (EDL760s) = **Smartroom_tablet**
- **[MỚI] Tool 2d** = 28 công cụ tạo nội dung tương tác. Có thể = ViziStudio?
- **[MỚI] Mr Hiếu = CS** (nghiệm thu) | Bắc Ninh + Vĩnh Phúc đang deploy
- 60+ features, nhiều bug (search lỗi, upload lỗi, tool thiết kế chưa có)

## 🎨 FIGMA INSIGHT (mới — 24/02)

File "Mạng xã hội edulive" = Social FE → **4,936 frames, 68 sections**
- 81% design cho AI | Sharing 5 cấp | "Bộ sưu tập" mới | Duplicate handling

## ❓ TOP 5 CÂU HỎI CHƯA TRẢ LỜI

1. **ViziStudio = Tool AI bài giảng = Tool 2d (STEM)?** — 3 thứ hay 1? Hỏi Hưng + Thịnh
2. **I3Dpro + SynXR + AiTalkStudio** — gần như ZERO info
3. **"Quy trình 5 bước" AI** — Figma có 1,336 frames, 5 bước cụ thể là gì?
4. **STEM bugs nghiêm trọng** — search, upload, timer đều lỗi. Ai fix? Timeline?
5. **Repo list + Architecture diagram** — cần từ Anh Ngọc

---

## 📋 YÊUCẦU PM TỪ SẾP TA

- Focus: **Quy trình đóng gói + triển khai B2B**
- Báo cáo: **Daily** (trạng thái) + **Weekly** (nhân sự)
- Đánh giá nhân sự qua task (simple/lặp vs advance/sáng tạo)
- Rule: Task nhận → qua 50% thời gian → **không cho xác nhận vấn đề mới**
- Quy trình + phương án → **gửi email**

---

## 📅 NEXT ACTIONS (tuần này)

| # | Việc | Người | Deadline |
|---|------|-------|----------|
| 1 | ~~NotebookLM đọc Sheet 1+2~~ ✅ STEM Room Spec + Tuyên bố đáp ứng | PM | ✅ Done |
| 2 | Hỏi Sếp TA: ViziStudio? I3Dpro? ClassNova? AiTalkStudio? SynXR? | PM | 25/02 |
| 3 | Phỏng vấn Anh Ngọc: Architecture + Repo list + 5 sản phẩm chưa rõ | PM | 25/02 |
| 4 | ~~Export Figma~~ ✅ ĐÃ ĐỌC qua MCP (4,936 frames) | PM | ✅ Done |
| 5 | Clarify: tại sao task Apps HS/LMS bị QC hủy? | PM → QC | 25/02 |

---

*Nguồn: Meeting kickoff 23/02 + ALO Sếp TA 24/02 + Schedule_v1 (NLM) + Figma MCP + STEM Room Spec + Tuyên bố đáp ứng (NLM)*
*Chi tiết đầy đủ: `product/PRODUCT_REGISTRY.md`*
