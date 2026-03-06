# TRANG THAI DU LIEU SAN PHAM — Tham khao cho BA + QC
**Cap nhat**: 2026-03-06 | **Nguon**: PM/Head tong hop

> File nay giup BA va QC biet: thong tin nao DA CO, thong tin nao CON THIEU,
> cau hoi nao CAN TRA LOI. De biet can tap trung collect o dau.

---

## 1. Tien do thu thap theo san pham

### DO = Chua co gi | VANG = Co mot phan | XANH = Du dung

| # | San pham | Mo ta | Tech | Platform | Dev | Features | Offline? | Tong |
|---|----------|-------|------|----------|-----|----------|----------|------|
| 1 | AI Teacher / Social | XANH | VANG | XANH | XANH | XANH | VANG | 5/6 |
| 2 | Apps GV / Smartroom (EDL750s) | XANH | XANH | XANH | XANH | XANH | XANH | 6/6 DAY DU |
| 3 | Apps HS / Smartroom (EDL760s) | XANH | XANH | XANH | XANH | XANH | XANH | 6/6 DAY DU |
| 4 | Apps Phu huynh | XANH | DO | XANH | XANH | VANG | DO | 3/6 |
| 5 | Web-School / Stem LMS | XANH | XANH | XANH | XANH | XANH | VANG | 5.5/6 |
| 6 | DataWarehouse | XANH | DO | XANH | XANH | XANH | — | 4/5 |
| 7 | AI Tool / Kho anh GV | XANH | VANG | VANG | XANH | XANH | DO | 4/6 |
| 8 | Infrastructure / Server Bien | XANH | XANH | XANH | XANH | XANH | XANH | 6/6 DAY DU |
| 9 | ViziStudio / Tool 2d (?) | VANG | VANG | VANG | VANG | VANG | VANG | 3/6 |
| 10 | I3Dpro | DO | DO | DO | DO | DO | DO | 0/6 ZERO |
| 11 | Schoolaris.vn | XANH | — | XANH | XANH | XANH | — | 4/4 |
| 12 | ClassNova | VANG | DO | DO | DO | VANG | DO | 1/6 |
| 13 | AiTalkStudio | VANG | DO | DO | DO | DO | VANG | 1/6 |
| 14 | SynXR | DO | DO | DO | DO | DO | DO | 0/6 ZERO |
| 15 | Airlib | VANG | DO | DO | DO | DO | VANG | 1/6 |
| 16 | Cam AI | DO | DO | DO | DO | DO | DO | 0/6 ZERO |
| 17 | Tool 2d | VANG | VANG | VANG | VANG | VANG | VANG | 3/6 |
| 18 | STEM Room (bo dong goi) | XANH | XANH | XANH | XANH | XANH | XANH | 6/6 DAY DU |

### Nhan xet:
- **DA DAY DU (6/6)**: Apps GV, Apps HS, Server Bien, STEM Room → chi can QC verify
- **GAN DAY DU (5-5.5/6)**: AI Teacher/Social, Web-School → can bo sung 1-2 muc
- **CO 1 PHAN (3-4/6)**: Apps PH, AI Tool, ViziStudio, Tool 2d → can collect them nhieu
- **GAP ZERO (0/6)**: I3Dpro, SynXR, Cam AI → can tim hieu tu dau
- **RAT IT (1/6)**: ClassNova, AiTalkStudio, Airlib → chi co ten, chua co noi dung

---

## 2. Tai lieu DA CO (co the doc ngay)

### Tai lieu ky thuat (HDKT) — o `_resources/`
| # | File | Noi dung chinh |
|---|------|---------------|
| 1 | 1. EDL.HDKT. Cai dat Ubuntu Server 22.md | Cai dat OS cho Server Bien |
| 2 | 2. EDL.HDKT. Cai dat cac Service cua Edulive.md | Docker, Janus, Wowza, SeaweedFS, PostgreSQL... |
| 3 | 3. EDL.HDKT. Cai dat PM GV, HS, Tool soan giang.md | Cai dat phan mem GV/HS/ViziStudio |
| 4 | 4. EDL.HDKT. Huong dan chay Test thong luong ky thuat.md | Test ket noi, dong bo, WebRTC |

### Tai lieu su dung (HDSD) — o `_resources/`
| # | File | Noi dung chinh |
|---|------|---------------|
| 5 | 5. EDL.HDSD. Phan mem Giao vien, Hoc sinh.md | Cach su dung app GV/HS |
| 6 | 6. EDL.HDSD. Tool Soan giang, Import Thu vien Local.md | Cach dung ViziStudio |
| 7 | 7. EDL.HDSD. Trien khai hoat dong Lop hoc.md | Quy trinh to chuc lop hoc |

### Tai lieu BRD/FRD (yeu cau + thiet ke) — o `_resources/`
| # | File | San pham |
|---|------|---------|
| 1 | Thach dau - BRD.docx | App hoc sinh - Thach dau (gamification) |
| 2 | Thach dau - FRD.docx | App hoc sinh - chi tiet chuc nang |
| 3 | Thach dau - TDS.docx | App hoc sinh - thiet ke ky thuat |
| 4 | Thach dau - App hoc sinh - Flow.pdf | Luong su dung |
| 5 | Tai lieu BRD - App phu huynh.docx | App phu huynh |
| 6 | Tai lieu FRD - App phu huynh.docx | App phu huynh chi tiet |
| 7 | Tai lieu mo ta - App hoc sinh - Thach dau.docx | Mo ta tong quan |

### Du lieu test + bug — o `_resources/`
| # | File | Noi dung |
|---|------|---------|
| 1 | Bug SmartRoom - BUG.csv | Danh sach bug SmartRoom |
| 2 | Bug MXH - MXH 2.csv | Danh sach bug Mang xa hoi |
| 3 | Testcase Social - CDND-Validation.csv | Testcase Social |
| 4 | Teacher 251 - Devide Group.csv | Testcase chia nhom |
| 5 | HS - Tablet - Draw.csv | Testcase Draw |
| 6 | Tuyen bo dap ung - Ra soat phan mem.csv | Ma tran tinh nang doi tac |

### Mo ta san pham — o `_resources/`
| # | File | Noi dung |
|---|------|---------|
| 1 | mo ta chung.md | Mo ta tong quan san pham |
| 2 | social.md | Chi tiet tinh nang mang xa hoi |

### STEM — o `_resources/common/`
| # | File | Noi dung |
|---|------|---------|
| 1 | Stem Room Ver1 - Tablet HS - Spec...xlsx | Hardware specs, 60+ features, model EDL750/760 |
| 2 | 1.EDL X Nexta. Bien ban Ban giao Nghiem thu.md | Bien ban ban giao B2B |

---

## 3. Nguon data CHUA CO — can thu thap

| # | Nguon | Can tu ai | Ghi chu |
|---|-------|----------|---------|
| 1 | Phong van Anh Ngoc (Architect) | Anh Ngoc | ViziStudio vs Tool 2d, I3Dpro, SynXR, Cam AI, danh sach repo |
| 2 | Phong van Dien (BE Lead) | Mr Dien | Server Bien detail, Installer, Native build process |
| 3 | Phong van Chien (FE) | Chien | Social flow, Approve workflow, Merge accounts |
| 4 | Figma (21 pages chua phan tich) | Can tool | UI flow cac san pham |
| 5 | Repo list + README | Anh Ngoc | Kien truc code, danh sach repo |

> **GHI CHU**: Neu trong qua trinh lam task, ban can thong tin tu nguoi nao → ghi cau hoi cu the vao OUTPUT, PM se lien he ho giup.

---

## 4. 17 Cau hoi CAN TRA LOI

Khi collect thong tin, neu gap duoc cau tra loi cho bat ky cau nao duoi day → GHI LAI trong output.

| # | Cau hoi | Hoi ai |
|---|---------|--------|
| 1 | ViziStudio = Tool AI = Tool 2d? (3 hay 1 san pham?) | Anh Ngoc |
| 2 | I3Dpro la gi? Ai lam? | Anh Ngoc |
| 3 | ClassNova = Lop hoc thong minh? | Sep TA |
| 4 | AiTalkStudio — da co team? | Sep TA |
| 5 | SynXR vs STEM Room — khac gi? | Anh Ngoc |
| 6 | Airlib — ai phat trien? | Anh Ngoc |
| 7 | Cam AI — tech? ai lam? | Anh Ngoc |
| 8 | Payment gateway AI Teacher | Anh Ngoc, Chien |
| 9 | Schoolaris.vn = Web-School? (chinh thuc) | Sep TA |
| 10 | Merge tai khoan cu — tu dau? | Chien, Luc |
| 11 | Repo list day du | Anh Ngoc |
| 12 | Architecture diagram | Anh Ngoc |
| 13 | ~~Anh Hieu — vai tro?~~ | ~~DA TRA LOI: Mr Hieu = CS, trien khai STEM~~ |
| 14 | Task Apps HS/LMS bi huy — tai sao? | QC (Khanh Linh?) |
| 15 | B2B pricing model | Sep TA |
| 16 | STEM Room bugs (search, upload, timer) — fix timeline? | Anh Ngoc, QC |
| 17 | Tool 2d — ai cai, dung cho gi? | Hung, Thinh |

---

## 5. Hai goc nhin san pham (CEO vs Dev)

> **QUAN TRONG**: Edulive co 2 cach goi ten san pham. BA can mapping cho ro.

```
GOC CEO (Sep TA) — TEN THUONG MAI         GOC DEV (Team) — TEN KY THUAT
──────────────────────────────────          ────────────────────────────────
AI Teacher (mang xa hoi)             ←→    Social (Chien, Luc)
ViziStudio (tool tao noi dung)       ←→    Tool tao bai giang AI (Thinh, Tuyen)
I3Dpro (3D + game)                   ←→    ? Chua map ro
Schoolaris.vn (truong hoc TM)        ←→    Web-School + LMS + Smartroom + Apps
Lop hoc thong minh                   ←→    ? = ClassNova? = Smartroom?
─────── BO DONG GOI ──────
ClassNova                            ←→    ? = Phong hoc thong minh dong goi?
AiTalkStudio                         ←→    ? MOI — phong hoc ngoai ngu offline
SynXR                                ←→    ? MOI — STEM
Airlib                               ←→    ? "Dong bo thu vien Online/Offline"?
```

> MAPPING CHUA CHAC CHAN — Day la 1 trong nhung viec BA can lam ro.
