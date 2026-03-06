# COMPANY CONTEXT — Edulive / Nexta (SLIM)
# MỌI agent đọc file này. ~80 dòng. Chi tiết ở COMPANY_CONTEXT_EXTENDED.md
# Cập nhật: 2026-02-24

---

## 1. Công ty

**Edulive** — EdTech, ~25 nhân sự kỹ thuật. Sản phẩm: **Nexta** (hệ sinh thái giáo dục).

**2 mô hình deploy — PHẢI PHÂN BIỆT:**
- **Hội Hợp B (Vĩnh Phúc)**: B2C, code Legacy, CÓ internet. KHÔNG code đè luồng mới.
- **Nexta (B2B)**: 100% offline, Native Image, sync Kafka 30p/lần khi có mạng.

---

## 2. Product Tree (gọn)

```
CLOUD + WEB + APPS
├── AI Teacher / Social         (Chiến, Lực) — AI 81% design, sharing 5 cấp
├── ViziStudio / Tool AI        (Thịnh, Tuyến, Hưng) — ❓ có thể = Tool 2d
├── I3Dpro                      ❓ ZERO info
├── Schoolaris.vn               = Web-School + LMS + Smartroom + Apps
└── ClassNova                   ❓ = Lớp học thông minh?

BỘ ĐÓNG GÓI (Server Biên — Offline)
├── STEM Room                   = EDL750s (GV) + EDL760s (HS) + Stem LMS ← CONFIRMED
├── ClassNova, AiTalkStudio, SynXR, Airlib, ViziStudio, Tool 2d, I3DPRO

TRIỂN KHAI: Bắc Ninh (STEM, Mr Hiếu CS) | Vĩnh Phúc (HHB, Legacy) | Thái Nguyên (Nexta) | Ứng Hòa
```

> Chi tiết 18 sản phẩm: `product/PRODUCT_REGISTRY.md`
> PM daily ref: `product/WHAT_WE_KNOW_NOW.md`

---

## 3. Team (tóm tắt)

| Team | Key person | Risk |
|------|-----------|------|
| **BE** (5) | Mr Diện (Kafka, Edge), Anh Ngọc (Architect), Toại (cài máy chủ) | 🔴 Cả 2 overloaded |
| **FE** (7) | Hưng (Lead FE, lâu năm, institutional knowledge), Chiến (Social, Sync), Văn (FE), Quang (FE) | 🔴 Chiến = key person |
| **AI** (4) | Thịnh, Tuyến (Tool bài giảng) | 🟢 |
| **QC** (4) | Khánh Linh, Phương Hoa, Anh Đào, Hồng Anh | 🟢 |
| **CS** | Mr Hiếu (triển khai STEM, Bắc Ninh + Vĩnh Phúc) | — |
| **Triển khai** | Đắc (cài Edulive Control lên tablet — MDM quản lý HS/PH) | — |
| **Content** | Cô Thảo (GV content, tham gia demo triển khai) | — |

> Chi tiết từng người + task: `COMPANY_CONTEXT_EXTENDED.md` §2

---

## 4. Nút thắt (tóm tắt)

1. **Versioning Hell** — Legacy (HHB) vs Native (Nexta), KHÔNG được code đè
2. **Edge Sync** — Sếp muốn offline 100%, dev đang làm sai (cần mạng tạo lớp)
3. **Logic lệch** — FE vs Tech Lead hiểu sai Assignment flow; PHP→Java camelCase
4. **STEM Bugs** — Search/Upload/Timer broken, 5+ LMS tools thiếu → chặn deploy

> Chi tiết từng nút thắt: `COMPANY_CONTEXT_EXTENDED.md` §3-§4

---

## 5. Auto-flag keywords (MỌI agent áp dụng)

| Keyword | Flag | Map đến |
|---------|------|---------|
| Kafka, đồng bộ, offline, Server Biên | `[HIGH PRIORITY]` | Diện, Dũng, Lực |
| Native, Legacy, HHB, đóng gói, merge | `[VERSION RISK]` | Diện, Hưng, Toại |
| Assignment, Approve, camelCase | `[ALIGNMENT NEEDED]` | Chiến, Anh Ngọc |
| Sếp, TGĐ, deadline, release | `[STAKEHOLDER PRESSURE]` | PM |
| STEM Room, EDL750s, Tool 2d, Bắc Ninh | `[STEM DEPLOYMENT]` | Mr Hiếu, Hưng, Văn |
| ViziStudio, I3Dpro, SynXR | `[PRODUCT MAPPING]` | Cần confirm |

---

## 6. Routing — ai đọc gì thêm

| Role | Đọc thêm (ngoài file này) |
|------|--------------------------|
| **PM** | `COMPANY_CONTEXT_EXTENDED.md` TẤT CẢ + `KNOWLEDGE_BASE.md` TẤT CẢ + `product/*` |
| **BA** | `COMPANY_CONTEXT_EXTENDED.md` §2 + `KNOWLEDGE_BASE.md` §1,§3-§6,§9,§11 |
| **Dev BE** | `COMPANY_CONTEXT_EXTENDED.md` §2,§3,§7 + `KNOWLEDGE_BASE.md` §2,§3,§8,§11 |
| **Dev FE** | `COMPANY_CONTEXT_EXTENDED.md` §2,§3,§7 + `KNOWLEDGE_BASE.md` §2,§3,§8,§9,§11 |
| **QC** | `COMPANY_CONTEXT_EXTENDED.md` §2,§4 + `KNOWLEDGE_BASE.md` §3,§9,§10,§11 |
| **AI** | `COMPANY_CONTEXT_EXTENDED.md` §2,§7 + `KNOWLEDGE_BASE.md` §2,§3.11,§4,§5 |

---

## Lịch sử

| Ngày | Thay đổi |
|------|---------|
| 2026-02-24 | Tạo ban đầu |
| 2026-02-24 | Tách SLIM (80 dòng) + DETAIL (200 dòng) để tối ưu token. Thêm STEM Room, Tool 2d, Figma insights, Mr Hiếu=CS |
| 2026-02-26 | Phân rõ: Toại = cài máy chủ (server), Đắc = cài Edulive Control lên tablet (MDM) |
