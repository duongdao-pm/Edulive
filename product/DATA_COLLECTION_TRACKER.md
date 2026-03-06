# DATA COLLECTION TRACKER
# Theo dõi tiến độ thu thập thông tin sản phẩm Edulive/Nexta
# Cập nhật: 2026-02-24 (sau 6 nguồn data)

---

## Tổng quan

| Metric | Giá trị |
|--------|---------|
| Nguồn đã thu thập | 6 / nhiều (Meeting, ALO, Schedule, Figma MCP, STEM Room Spec, Tuyên bố đáp ứng) |
| Sản phẩm đã có info cơ bản | 11 / ~16 |
| Sản phẩm vẫn ZERO info | 3 (I3Dpro, SynXR, Cam AI) |
| Mapping đã confirm | 13 / ~20 |
| Mapping vẫn chưa rõ | 5 critical |
| Phỏng vấn đã thực hiện | 0 / 7 sessions |
| Câu hỏi đã resolve | 1 (#13 Anh Hiếu = Mr Hiếu, CS) |

---

## Tiến độ theo sản phẩm

### 🔴 = Chưa có gì | 🟡 = Có một phần | 🟢 = Đủ dùng

| # | Sản phẩm | Mô tả | Tech | Platform | Dev | Features | Offline? | Tổng |
|---|----------|-------|------|----------|-----|----------|----------|------|
| 1 | **AI Teacher / Social** | 🟢 | 🟡 | 🟢 | 🟢 | 🟢 | 🟡 | **5/6** ↑↑ |
| 2 | **Apps GV / Smartroom_react (EDL750s)** | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | **6/6** ✅ |
| 3 | **Apps HS / Smartroom_tablet (EDL760s)** | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | **6/6** ✅ |
| 4 | **Apps PH** | 🟢 | 🔴 | 🟢 | 🟢 | 🟡 | 🔴 | **3/6** ↑ |
| 5 | **Web-School / School_203 (Stem LMS)** | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟡 | **5.5/6** ↑↑ |
| 6 | **DataWarehouse** | 🟢 | 🔴 | 🟢 | 🟢 | 🟢 | — | **4/5** ↑ |
| 7 | **AI Tool / Kho ảnh GV** | 🟢 | 🟡 | 🟡 | 🟢 | 🟢 | 🔴 | **4/6** ↑↑ |
| 8 | **Infrastructure / Server Biên** | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | **6/6** ✅ |
| 9 | **ViziStudio / Tool 2d (?)** | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | **3/6** ↑↑ |
| 10 | **I3Dpro** | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | **0/6** 🔴 |
| 11 | **Schoolaris.vn** | 🟢 | — | 🟢 | 🟢 | 🟢 | — | **4/4** (name only) |
| 12 | **ClassNova** | 🟡 | 🔴 | 🔴 | 🔴 | 🟡 | 🔴 | **1/6** |
| 13 | **AiTalkStudio** | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | 🟡 | **1/6** |
| 14 | **SynXR** | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | **0/6** 🔴 |
| 15 | **Airlib** | 🟡 | 🔴 | 🔴 | 🔴 | 🔴 | 🟡 | **1/6** |
| 16 | **Cam AI** | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | **0/6** 🔴 |
| 17 | **Tool 2d** *(NEW)* | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | **3/6** ↑ |
| 18 | **STEM Room (bộ đóng gói)** *(NEW)* | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | **6/6** ✅ |

---

## Nguồn data đã thu thập

| # | Nguồn | Ngày | Chất lượng | Thông tin chính |
|---|-------|------|-----------|----------------|
| 1 | Meeting Kickoff 23/02 | 23/02/2026 | 🟡 Trung bình | Kiến trúc tổng quan, Kafka, 2 mô hình deploy |
| 2 | ALO Sếp TA | 24/02/2026 | 🟢 Tốt | Tên thương mại, bộ đóng gói B2B, PM process |
| 3 | NotebookLM/Schedule_v1 | 24/02/2026 | 🟢 Tốt | Tech stack, features chi tiết, team assignment |
| 4 | Figma MCP (Mạng xã hội) | 24/02/2026 | 🟢 Tốt | UI flow AI Teacher, 68 sections, sharing 5 levels, AI 81% design, Bộ sưu tập |
| 5 | Sheet 1: STEM Room Spec | 24/02/2026 | 🟢 Rất tốt | Hardware specs (i5-12400F, Snap695), 60+ features, bugs/gaps, model EDL750s/760s |
| 6 | Sheet 2: Tuyên bố đáp ứng | 24/02/2026 | 🟢 Tốt | Ma trận tính năng đối tác, Tool 2d discovery, offline flow, deploy BN+VP |

---

## Nguon data tu BA + QC Team (MOI — 06/03/2026)

> **BA va QC dang collect thong tin de PM xay Product Roadmap + Backlogs + HLD.**
> Khi ho nop output, PM PHAI doc va tong hop vao quy trinh phan tich.

| # | Nguon | Duong dan | Noi dung | Trang thai |
|---|-------|----------|---------|-----------|
| BA-1 | Feature Map | `0.2 Team/0.1 BA/OUTPUT/EDU000-BA-001_FEATURE_MAP.md` | Ban do tinh nang theo san pham | Cho output |
| BA-2 | User Flows | `0.2 Team/0.1 BA/OUTPUT/EDU000-BA-001_USER_FLOWS.md` | Cac luong nghiep vu end-to-end | Cho output |
| BA-3 | HLD Draft | `0.2 Team/0.1 BA/OUTPUT/EDU000-BA-001_HLD.md` | Mo ta kien truc tong the (text) | Cho output |
| BA-4 | Gap Analysis | `0.2 Team/0.1 BA/OUTPUT/EDU000-BA-001_GAP_ANALYSIS.md` | CEO view vs Dev view, cau hoi can clarify | Cho output |
| QC-1 | Verified Features | `0.2 Team/0.2 QC/OUTPUT/EDU000-QC-001_VERIFIED_FEATURES.md` | Tinh nang da kiem chung tren thuc te | Cho output |
| QC-2 | Test Coverage | `0.2 Team/0.2 QC/OUTPUT/EDU000-QC-001_TEST_COVERAGE.md` | San pham nao da test, chua test | Cho output |
| QC-3 | Known Issues | `0.2 Team/0.2 QC/OUTPUT/EDU000-QC-001_KNOWN_ISSUES.md` | Van de da biet + recommendations | Cho output |

**PM workflow khi co output:**
1. Doc BA output → cap nhat PRODUCT_REGISTRY + KNOWLEDGE_BASE
2. Doc QC output → cross-check: cai nao THAT SU CHAY vs chi tren giay
3. Merge BA + QC → xay HLD tong the
4. Tu HLD → tao Product Roadmap + Backlogs

---

## Nguồn data chưa có

| # | Nguồn | Cần từ ai | Ưu tiên | Ghi chú |
|---|-------|----------|---------|---------|
| 1 | **Phỏng vấn Anh Ngọc** | Anh Ngọc | 🔴 | ViziStudio vs Tool 2d, I3Dpro, SynXR, Cam AI, repos |
| 2 | ~~Sheet 1: STEM Room Spec~~ | ~~linhntk~~ | ✅ Done | *Đã xử lý qua NotebookLM 24/02* |
| 3 | ~~Sheet 2: Tuyên bố đáp ứng~~ | ~~duongdn~~ | ✅ Done | *Đã xử lý qua NotebookLM 24/02* |
| 4 | **Figma (21 pages còn lại)** | Antigravity agent | 🟡 | Đã giao guide + MCP config, chờ xử lý |
| 5 | **Phỏng vấn Diện** | Mr Diện | 🟡 | Server Biên detail, Installer, Native build |
| 6 | **Phỏng vấn Chiến** | Chiến | 🟡 | Social flow, Approve workflow, Merge accounts |
| 7 | **Chat logs Zalo/Slack** | PM thu thập | 🟡 | Context từ ngày-ngày |
| 8 | **Repo list + README** | Anh Ngọc | 🔴 | Danh sách repo, architecture |

---

## 15 Mapping cần confirm (từ PRODUCT_REGISTRY)

| # | Câu hỏi | Hỏi ai | Done? |
|---|---------|--------|-------|
| 1 | ViziStudio = Tool AI = Tool 2d? (3 hay 1 sản phẩm?) | Sếp TA, Anh Ngọc | ⬜ *(đã gửi câu hỏi)* |
| 2 | I3Dpro là gì? Ai làm? | Anh Ngọc | ⬜ |
| 3 | ClassNova = Lớp học thông minh? | Sếp TA | ⬜ *(đã gửi câu hỏi)* |
| 4 | AiTalkStudio — đã có team? | Sếp TA | ⬜ *(đã gửi câu hỏi)* |
| 5 | SynXR vs STEM Room — khác gì? | Sếp TA, Anh Ngọc | ⬜ *(đã gửi câu hỏi)* |
| 6 | Airlib — ai phát triển? | Anh Ngọc | ⬜ |
| 7 | Cam AI — tech? ai làm? | Anh Ngọc | ⬜ |
| 8 | Payment gateway AI Teacher | Anh Ngọc, Chiến | ⬜ |
| 9 | Schoolaris.vn = Web-School? (chính thức) | Sếp TA | ⬜ |
| 10 | Merge tài khoản cũ — từ đâu? | Chiến, Lực | ⬜ |
| 11 | Repo list | Anh Ngọc | ⬜ |
| 12 | Architecture diagram | Anh Ngọc | ⬜ |
| 13 | ~~Anh Hiếu — vai trò?~~ | ~~Sếp TA~~ | ✅ **= Mr Hiếu, CS (Customer Success) triển khai STEM** |
| 14 | Task Apps HS/LMS bị hủy — tại sao? | QC (Khánh Linh?) | ⬜ |
| 15 | B2B pricing model | Sếp TA | ⬜ |
| 16 | STEM Room bugs (search, upload, timer) — fix timeline? | Anh Ngọc, QC | ⬜ *(NEW)* |
| 17 | Tool 2d — ai cài, dùng cho gì? | Hưng, Thịnh | ⬜ *(NEW)* |

---

## Kế hoạch tiếp theo

| STT | Action | Ai | Deadline | Status |
|----|--------|-----|----------|--------|
| 1 | ~~Đọc Sheet 1+2 qua NotebookLM~~ | PM | — | ✅ Done 24/02 |
| 2 | ~~Figma MCP: phân tích page Mạng xã hội~~ | PM | — | ✅ Done 24/02 |
| 3 | Figma: 21 pages còn lại → Antigravity agent | Antigravity | 25/02 | 🟡 Đã giao guide |
| 4 | Gửi 5 câu hỏi cho Sếp TA | PM | 25/02 | 🟡 Đã soạn, chờ gửi |
| 5 | Phỏng vấn Anh Ngọc (Session 1 — 45p) | PM + Anh Ngọc | 25/02 | ⬜ Guide đã cập nhật |
| 6 | Phỏng vấn Diện + Chiến | PM | 26/02 | ⬜ |
| 7 | Setup daily/weekly report cho Sếp TA | PM | 25/02 | ⬜ |

---

## Lịch sử cập nhật

| Ngày | Thay đổi |
|------|---------|
| 2026-02-24 | Tạo ban đầu |
| 2026-02-24 | UPDATE — sau 3 nguồn data: 8/16 sản phẩm có info tốt, tech stack confirmed |
| 2026-02-24 | **UPDATE lớn v2** — 6 nguồn data: +Figma MCP +STEM Room +Tuyên bố. 11/18 SP có info. Tool 2d discovered. Mr Hiếu resolved. STEM Room mapped hoàn chỉnh (hardware+software+bugs). Câu hỏi Sếp TA đã soạn. |
