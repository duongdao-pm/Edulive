# TASK: EDU000-QC-001 — Kiem chung & Bo sung Feature Map tu goc QC
**Priority**: CRITICAL — CHIEN LUOC | **Deadline**: Lien tuc (bat dau ngay)
**Assigned**: QC Team | **Reviewer**: PM / Head

---

## 0. SUB-TASKS (lam theo thu tu nay)

| # | Sub-task | File | Priority | Do kho | Trang thai | Mo ta |
|---|---------|------|----------|--------|------------|-------|
| a | **SmartRoom** | `QC-001a_SMARTROOM_VERIFY.md` | HIGH | TB | ⬜ CHUA | Bug CSV + testcase → tong hop verified list |
| b | **STEM Room** | `QC-001b_STEM_DEPLOY_VERIFY.md` | HIGH | TB | ⬜ CHUA | 60+ features spec + checklist trien khai |
| c | **Social/MXH** | `QC-001c_SOCIAL_MXH_VERIFY.md` | MEDIUM | TB | ⬜ CHUA | Bug MXH + testcase → coverage map |
| d | **Tool + Server** | `QC-001d_TOOL_SERVER_VERIFY.md` | MEDIUM | TB | ⬜ CHUA | ViziStudio + Server Bien services |
| e | **Unknown** | `QC-001e_UNKNOWN_PRODUCTS.md` | LOW | CAO | ⬜ CHUA | 8 SP chua test → access check |

> **Thu tu de xuat**: a → b → c → d → e
> Lam a+b truoc (nhieu data nhat, dang trien khai), roi c+d, cuoi cung e

---

## 1. Muc tieu

Ho tro BA xay dung Feature Map bang cach:
- **Kiem chung** tinh nang tu goc nguoi dung that (test that, dung that)
- **Bo sung** nhung tinh nang/bug/han che ma tai lieu KHONG noi den
- **Map test coverage**: tinh nang nao DA TEST, tinh nang nao CHUA TEST

Ket qua can dat:
- **Verified Feature List**: Danh sach tinh nang DA KIEM CHUNG tren thuc te
- **Test Coverage Map**: Tinh nang nao co testcase, tinh nang nao chua
- **Known Issues**: Cac van de da biet tu trai nghiem test

---

## 2. Pham vi

### Moi truong can cover

| Moi truong | Thiet bi | Mo ta |
|------------|---------|-------|
| SmartRoom Web | PC/Laptop | Phong hoc tren trinh duyet |
| Tablet GV | EDL750s | App giao vien |
| Tablet HS | EDL760s | App hoc sinh |
| Server Bien | Ubuntu Server | Local server tai truong |
| Tool Soan giang | Desktop (Windows) | ViziStudio |
| Social / MXH | Web | Mang xa hoi giao duc |

### San pham uu tien
1. **SmartRoom** — da test nhieu nhat, co nhieu data
2. **STEM Room** — dang trien khai, can biet tinh trang
3. **Social / MXH** — co bug log san
4. **Tool Soan giang** — co huong dan su dung

---

## 3. Cong viec cu the

### Buoc 1: Review tai lieu test hien co
Doc cac file trong `_resources/`:
- `Bug SmartRoom - BUG.csv` — danh sach bug SmartRoom
- `Bug MXH - MXH 2.csv` — danh sach bug Mang xa hoi
- `Testcase Social - CDND-Validation.csv` — testcase Social
- `Teacher 251 - Devide Group.csv` — testcase chia nhom
- `HS - Tablet - Draw.csv` — testcase Draw
- `Tuyen bo dap ung - Ra soat phan mem.csv` — ra soat tong the

Ghi lai: san pham nao DA CO testcase, san pham nao CHUA

### Buoc 2: Lap Verified Feature List
Voi moi san pham, liet ke tinh nang DA KIEM CHUNG:

```
## [TEN SAN PHAM] — [MOI TRUONG]

### Tinh nang da kiem chung
| # | Tinh nang | Trang thai | Ghi chu |
|---|-----------|------------|---------|
| 1 | [Ten] | OK / BUG / CHUA TEST | [Mo ta ngan] |
```

### Buoc 3: Lap Test Coverage Map
Tong hop:

```
| San pham | Tong tinh nang | Da test | Chua test | Co bug | Bug da fix |
|----------|---------------|---------|-----------|--------|------------|
```

### Buoc 4: Known Issues & Recommendations
- Liet ke van de da gap khi test
- Tinh nang nao can test lai sau chuyen server dev → product
- Khu vuc nao can test them ma chua co testcase

---

## 4. Nguon thong tin

| Nguon | Duong dan / Cach lay |
|-------|---------------------|
| Bug SmartRoom | `_resources/Bug SmartRoom - BUG.csv` |
| Bug MXH | `_resources/Bug MXH - MXH 2.csv` |
| Testcase Social | `_resources/Testcase Social - CDND-Validation.csv` |
| Testcase Chia nhom | `_resources/Teacher 251 - Devide Group.csv` |
| Testcase Draw | `_resources/HS - Tablet - Draw.csv` |
| Ra soat PM | `_resources/Tuyen bo dap ung - Ra soat phan mem.csv` |
| STEM Spec | `_resources/common/Stem Room Ver1...xlsx` |
| Huong dan su dung | `_resources/` — file so 4, 5, 6, 7 (HDSD) |

> **LUU Y**: Neu gap tinh nang khong co trong tai lieu → ghi lai, PM se xac nhan.

---

## 5. Output mong doi

Tao file trong folder `OUTPUT/`:

| File | Noi dung |
|------|---------|
| `EDU000-QC-001_VERIFIED_FEATURES.md` | Danh sach tinh nang da kiem chung |
| `EDU000-QC-001_TEST_COVERAGE.md` | Ban do test coverage theo san pham |
| `EDU000-QC-001_KNOWN_ISSUES.md` | Van de da biet + recommendations |

---

## 6. Phoi hop voi BA

- QC va BA **CUNG LAM SONG SONG** — BA tap trung tai lieu + luong, QC tap trung thuc te + test
- Khi BA ra Feature Map → QC kiem chung lai
- Khi QC phat hien tinh nang moi → bao BA bo sung
- **KHONG can doi BA xong moi bat dau** — lam doc lap, merge sau

---

## 7. Output se duoc su dung nhu the nao

```
QC OUTPUT (Verified Features, Coverage Map, Known Issues)
   ↓
PM doc va tong hop → xay dung:
   • Product Roadmap (lo trinh phat trien)
   • Product Backlogs (danh sach viec can lam)
   • HLD tong the (ban mo ta kien truc he thong)
```

> **QUAN TRONG**: Output cua ban LA NGUON DU LIEU THUC TE de PM ra quyet dinh.
> BA collect tu tai lieu (ly thuyet), QC collect tu thuc te (da test, da dung).
> Khi BA noi "co tinh nang X" ma QC noi "tinh nang X khong hoat dong" → PM biet can fix.
> Thong tin cua QC giup PM phan biet: CAI GI THAT SU CHAY vs CAI GI CHI TREN GIAY.

---

## 8. Luu y quan trong

- **Chi ghi nhung gi DA BIET CHAC** — khong suy doan
- Neu tinh nang chua test duoc (khong co moi truong, khong co tai khoan) → ghi "CAN MOI TRUONG" + yeu cau cu the
- Uu tien SmartRoom va STEM truoc (dang trien khai)
- Co the lam tung san pham, khong can 1 luc xong het
