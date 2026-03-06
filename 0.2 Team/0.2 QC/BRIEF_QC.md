# BRIEF — QC Team
**Cap nhat**: 2026-03-06 | **Nguon**: PM/Head cung cap

---

## 0. NHIEM VU CHIEN LUOC HIEN TAI

> **QUAN TRONG NHAT**: Kiem chung tinh nang that te cua toan bo san pham Edulive.
> PM can QC collect du lieu thuc te (da test gi, tinh nang nao hoat dong, bug nao con) de xay dung: **Product Roadmap + Backlogs + HLD tong the**.
> Hien tai KHONG CO ban tong hop nao — moi thu dang roi rac.
>
> **Task**: `TASKS/EDU000-QC-001_FEATURE_VERIFY_MAP.md` — Doc ngay khi bat dau.
>
> Output can nop: Verified Feature List, Test Coverage Map, Known Issues.
>
> **Phoi hop**: Lam song song voi BA team. BA collect tu tai lieu, QC collect tu thuc te test.
>
> **Tham khao**: Doc file `../TRANG_THAI_DU_LIEU.md` de biet thong tin nao DA CO, thong tin nao CON THIEU, san pham nao can kiem chung.
>
> **Ghi nhan thong tin**: QC DUOC dung `/alo` de log thong tin nhan duoc.
> Khi test, noi chuyen voi dev, hoac phat hien bug/tinh nang moi → dung `/alo` ghi lai.
> PM se doc va xu ly. QC KHONG tu tao task — chi ghi nhan.
>
> **Cap nhat tien do**: QC DUOC dung `/update` de cap nhat trang thai sub-task.
> VD: `/update QC-001a dang lam 50%` hoac `/update QC-001b xong`.
> Agent se tu cap nhat file task + bao PM qua Telegram. QC KHONG sua MASTER_BOARD hay PROJECT_BOARD.

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

## 3. Du an hien tai

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

## 4. Vai tro QC trong Edulive

- Test planning: len test plan, test cases tu spec
- Test execution: chay test tren cac moi truong (Web, Tablet, Server Bien)
- Bug reporting: ghi nhan loi, chup man hinh, mo ta buoc tai hien
- Regression test: test lai sau khi Dev fix bug
- **Platform lam viec**: Antigravity

### Moi truong test

| Moi truong | Mo ta | Luu y |
|------------|-------|-------|
| Web (Cloud) | Schoolaris.vn, LMS, Smartroom | Can internet |
| Tablet HS | EDL760s — app hoc sinh | Offline hoac Online |
| Tablet/PC GV | EDL750s — app giao vien | Offline hoac Online |
| Server Bien | Local Server tai truong | Ubuntu 22.04, offline |

### QC Team

| Ten | Ghi chu |
|-----|---------|
| Khanh Linh | QC |
| Phuong Hoa | QC |
| Anh Dao | QC |
| Hong Anh | QC |

---

## 5. Cach nhan va nop task

### Nhan task
- PM/Head se tao file task trong folder `TASKS/`
- Moi file = 1 task, co day du: mo ta, test scope, moi truong, deadline
- Doc TASKS/ moi khi bat dau lam viec

### Nop output
- Tao file ket qua trong folder `OUTPUT/`
- Dat ten: `[TASK_ID]_output.md` (VD: `EDU002-QC-002_output.md`)
- Format output: test result (PASS/FAIL), bug list, screenshots
- PM/Head se review va phan hoi

### Quy tac
- CHI lam task trong folder TASKS/ cua minh
- KHONG truy cap vao _hq/, _context/, product/ truc tiep
- Bug phat hien → ghi vao OUTPUT, PM se cap nhat Bug Tracker
- KHONG tu fix bug — chi report

---

## 6. Lien he

- Hoi ve task: PM
- Hoi ve ky thuat: Anh Ngoc (Architect) hoac Dev phu trach
- Hoi ve moi truong test: Toai (Server), Dac (Tablet MDM)
