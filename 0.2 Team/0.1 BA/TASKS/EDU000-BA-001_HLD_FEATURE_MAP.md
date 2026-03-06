# TASK: EDU000-BA-001 — Thu gom & Xay dung HLD + Feature Map tong the
**Priority**: CRITICAL — CHIEN LUOC | **Deadline**: Lien tuc (bat dau ngay)
**Assigned**: BA Team | **Reviewer**: PM / Head

---

## 0. SUB-TASKS (lam theo thu tu nay)

| # | Sub-task | File | Priority | Do kho | Trang thai | Mo ta |
|---|---------|------|----------|--------|------------|-------|
| a | **Nhom CORE** | `BA-001a_NHOM1_CORE.md` | HIGH | TB | ⬜ CHUA | SmartRoom, STEM, Apps — DA CO data, can tong hop |
| b | **Social + Web** | `BA-001b_SOCIAL_WEBSCHOOL.md` | HIGH | TB | ⬜ CHUA | AI Teacher, LMS — gan du, can bo sung |
| c | **ViziStudio** | `BA-001c_VIZISTUDIO_TOOL2D.md` | **CRITICAL** | CAO | ⬜ CHUA | 3 ten 1 app? MU MOI NHAT |
| d | **Apps PH + DW** | `BA-001d_APPS_PH_DW.md` | MEDIUM | TB | ⬜ CHUA | Co BRD/FRD, can doc |
| e | **ZERO products** | `BA-001e_ZERO_PRODUCTS.md` | MEDIUM | RAT CAO | ⬜ CHUA | 6 SP chua co gi — tim manh ghep |
| f | **CEO-Dev Map** | `BA-001f_CEO_DEV_MAPPING.md` | **CRITICAL** | CAO | ⬜ CHUA | Mapping ten thuong mai ↔ ky thuat |

> **Thu tu de xuat**: a → b → c → f → d → e
> Lam a+b truoc (co data san), roi c+f (kho nhat nhung quan trong nhat), cuoi cung d+e

---

## 1. Muc tieu

Hien tai Edulive **KHONG CO** ban mo ta tong the (HLD — High Level Design) nao cho toan bo he sinh thai san pham. Tat ca thong tin dang roi rac, manh ghep, chua ai tong hop.

**BA team la nguoi phai lam viec nay.**

Ket qua can dat:
- **Feature Map**: Ban do tat ca tinh nang cua tung san pham
- **Luong chinh (User Flows)**: Cac luong nghiep vu end-to-end
- **HLD**: Ban mo ta kien truc tong the (text, khong can code)
- **Gap Analysis**: Cho nao chua ro, cho nao bi lech giua CEO va Dev

---

## 2. Pham vi san pham can cover

### Nhom 1 — UU TIEN CAO (dang trien khai)
| San pham | Ten ky thuat | Mo ta ngan |
|----------|-------------|------------|
| SmartRoom | Smartroom | Phong hoc tuong tac truc tuyen |
| STEM Room | STEM Room | EDL750 (GV) + EDL760 (HS) + STEM LMS |
| Tool Soan giang | ViziStudio | Desktop app GV thiet ke bai giang |
| Mang xa hoi | Social / MXH | Thu vien chia se hoc lieu |

### Nhom 2 — CAN DIEU TRA THEM
| San pham | Ten ky thuat | Van de |
|----------|-------------|--------|
| ClassNova | ? | = Phong hoc thong minh dong goi? Hay la ten khac cua SmartRoom? |
| AiTalkStudio | ? | Phong hoc ngoai ngu offline — MOI, chua co thong tin |
| SynXR | ? | STEM — lien quan gi den STEM Room? |
| Airlib | ? | Dong bo thu vien Online/Offline |
| I3Dpro | ? | 3D + game — lien quan SmartRoom? |
| Schoolaris.vn | Web-School | Portal truong hoc — LMS + Smartroom + Apps |

---

## 3. Cong viec cu the

### Buoc 1: Doc va hieu tai lieu hien co
- Doc file `BRIEF_BA.md` trong folder nay
- Doc cac tai lieu duoc cung cap tai `_resources/`:
  - 7 file huong dan (HDKT + HDSD) — cai dat, cau hinh, su dung
  - File "mo ta chung.md"
  - File "social.md"
  - File "Tuyen bo dap ung - Ra soat phan mem.csv"
  - File STEM Room spec (Excel)
- Ghi lai: moi san pham co NHUNG GI, thieu NHUNG GI

### Buoc 2: Lap Feature Map
Voi moi san pham, liet ke:

```
## [TEN SAN PHAM]

### Chuc nang chinh
1. [Ten chuc nang] — Mo ta ngan — Ai dung (GV/HS/Admin/PH)
2. ...

### Luong chinh (User Flows)
1. [Ten luong] — Buoc 1 → Buoc 2 → ... → Ket qua
2. ...

### Cau hoi chua ro
- [Dieu gi chua hieu?]
- [Can hoi ai?]
```

### Buoc 3: Xay dung HLD (text)
Mo ta tong the:
- He sinh thai gom nhung san pham nao?
- Chung lien ket voi nhau nhu the nao?
- Dau la Cloud, dau la Offline?
- Server Bien hoat dong nhu the nao?
- Du lieu dong bo ra sao (Kafka, sync)?

### Buoc 4: Gap Analysis
- So sanh ten CEO goi vs ten Dev goi
- Dau la san pham THAT SU dang chay, dau chi la ten thuong mai?
- Dau la chuc nang DA CO, dau la CHUA LAM?

---

## 4. Nguon thong tin

| Nguon | Duong dan / Cach lay |
|-------|---------------------|
| Tai lieu ky thuat | `_resources/` — 7 file HDKT + HDSD |
| Mo ta chung | `_resources/mo ta chung.md` |
| Social feature | `_resources/social.md` |
| STEM Spec | `_resources/common/Stem Room Ver1...xlsx` |
| Ra soat PM | `_resources/Tuyen bo dap ung - Ra soat phan mem.csv` |
| Bug logs | `_resources/Bug SmartRoom - BUG.csv`, `Bug MXH - MXH 2.csv` |

> **LUU Y**: Neu can thong tin khong co trong tai lieu → ghi cau hoi vao OUTPUT, PM se lien he nguoi lien quan de tra loi.

---

## 5. Output mong doi

Tao file trong folder `OUTPUT/`:

| File | Noi dung |
|------|---------|
| `EDU000-BA-001_FEATURE_MAP.md` | Ban do tinh nang theo tung san pham |
| `EDU000-BA-001_USER_FLOWS.md` | Cac luong nghiep vu chinh (end-to-end) |
| `EDU000-BA-001_HLD.md` | Mo ta kien truc tong the |
| `EDU000-BA-001_GAP_ANALYSIS.md` | Phan tich lech + cau hoi can clarify |

---

## 6. Output se duoc su dung nhu the nao

```
BA OUTPUT (Feature Map, Flows, HLD, Gap)
   ↓
PM doc va tong hop → xay dung:
   • Product Roadmap (lo trinh phat trien)
   • Product Backlogs (danh sach viec can lam)
   • HLD tong the (ban mo ta kien truc he thong)
```

> **QUAN TRONG**: Output cua ban LA NGUON DU LIEU CHINH de PM ra quyet dinh.
> Cang chi tiet, cang chinh xac → PM cang lam tot.
> Thong tin sai hoac thieu → PM se ra quyet dinh sai.

---

## 7. Luu y quan trong

- **KHONG suy doan** — neu khong biet thi ghi "CAN CLARIFY" va ghi cau hoi cu the
- **Uu tien Nhom 1** truoc — SmartRoom, STEM Room, ViziStudio, Social
- Co the lam tung phan, khong can 1 luc xong het
- Moi lan xong 1 phan → commit vao OUTPUT/
- PM se review va phan hoi lien tuc
