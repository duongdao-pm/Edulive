# BRIEF — BA Team
**Cap nhat**: 2026-03-06 | **Nguon**: PM/Head cung cap

---

## 0. NHIEM VU CHIEN LUOC HIEN TAI

> **QUAN TRONG NHAT**: Thu gom thong tin san pham toan bo he sinh thai Edulive.
> PM can BA collect du lieu de xay dung: **Product Roadmap + Backlogs + HLD tong the**.
> Hien tai KHONG CO ban mo ta tong the nao — tat ca dang roi rac.
>
> **Task**: `TASKS/EDU000-BA-001_HLD_FEATURE_MAP.md` — Doc ngay khi bat dau.
>
> Output can nop: Feature Map, User Flows, HLD (text), Gap Analysis.
>
> **Tham khao**: Doc file `../TRANG_THAI_DU_LIEU.md` de biet thong tin nao DA CO, thong tin nao CON THIEU, cau hoi nao CAN TRA LOI.
>
> **Ghi nhan thong tin**: BA DUOC dung `/alo` de log thong tin nhan duoc.
> Khi doc tai lieu hoac noi chuyen voi ai ma PHAT HIEN thong tin moi → dung `/alo` ghi lai.
> PM se doc va xu ly. BA KHONG tu tao task — chi ghi nhan.

---

## 1. Cong ty

**Edulive** — EdTech, ~25 nhan su ky thuat. San pham: **Nexta** (he sinh thai giao duc).

**2 mo hinh deploy — PHAI PHAN BIET:**
- **Hoi Hop B (Vinh Phuc)**: B2C, code Legacy, CO internet. KHONG code de luong moi.
- **Nexta (B2B)**: 100% offline, Native Image, sync Kafka 30p/lan khi co mang.

---

## 2. Product Tree

```
CLOUD + WEB + APPS
├── AI Teacher / Social         — AI 81% design, sharing 5 cap
├── ViziStudio / Tool AI        — Tool bai giang
├── Schoolaris.vn               = Web-School + LMS + Smartroom + Apps
└── ClassNova                   = Lop hoc thong minh

BO DONG GOI (Server Bien — Offline)
├── STEM Room                   = EDL750s (GV) + EDL760s (HS) + Stem LMS
├── ClassNova, AiTalkStudio, SynXR, Airlib, ViziStudio, Tool 2d, I3DPRO

TRIEN KHAI: Bac Ninh | Vinh Phuc | Thai Nguyen | Ung Hoa
```

---

## 3. Du an va team

| Du an | Mo ta | Loai |
|-------|-------|------|
| EDU-001 | Trien khai Hoi Hop B (Vinh Phuc) | B2C, Legacy code |
| EDU-002 | Nexta — Phong hoc thong minh STEM | B2B, 100% offline |
| EDU-003 | Schedule — Planning | Dang len ke hoach |

### Team

| Team | Thanh vien | Phu trach |
|------|-----------|-----------|
| BE | Dien, Luc, Toai | Kafka, Edge, Server Bien, dong goi |
| FE | Hung (Lead), Chien, Van, Quang | UI, API integration, Smartroom |
| AI | Thinh, Tuyen, Nam, Phong | Tool bai giang, LLM, kho anh |
| QC | Khanh Linh, Phuong Hoa, Anh Dao, Hong Anh | Test planning, bug report |
| Architect | Anh Ngoc | Kien truc tong the |
| CS | Mr Hieu | Trien khai STEM tai truong |
| Content | Co Thao | Noi dung bai giang, demo |
| Trien khai | Dac | Cai Edulive Control len tablet |

---

## 4. Vai tro BA trong Edulive

- Phan tich yeu cau nghiep vu (requirements)
- Viet User Stories, Flowcharts, Wireframes
- Document quy trinh (Approval, Assignment, Offline use cases)
- Validation: dam bao spec khop voi yeu cau stakeholder
- **Platform lam viec**: Antigravity

---

## 5. Cach nhan va nop task

### Nhan task
- PM/Head se tao file task trong folder `TASKS/`
- Moi file = 1 task, co day du: mo ta, yeu cau, deadline, tai lieu lien quan
- Doc TASKS/ moi khi bat dau lam viec

### Nop output
- Tao file ket qua trong folder `OUTPUT/`
- Dat ten: `[TASK_ID]_output.md` (VD: `EDU001-BA-001_output.md`)
- PM/Head se review va phan hoi

### Quy tac
- CHI lam task trong folder TASKS/ cua minh
- KHONG truy cap vao _hq/, _context/, product/ truc tiep
- Can thong tin them → ghi vao file output, PM se bo sung
- KHONG tu suy doan API hay ky thuat — hoi PM/Dev

---

## 6. Lien he

- Hoi ve task: PM
- Hoi ve ky thuat: Anh Ngoc (Architect)
- Hoi ve san pham: Hung (Lead FE)
