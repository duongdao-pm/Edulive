# SUB-TASK QC-001a: SmartRoom — Kiem chung tinh nang
**Parent**: EDU000-QC-001 | **Priority**: HIGH | **Do kho**: TRUNG BINH
**Moi truong**: SmartRoom Web (PC/Laptop) + Tablet GV (EDL750s) + Tablet HS (EDL760s)

---

## Muc tieu
SmartRoom la san pham DA TEST NHIEU NHAT. QC can:
1. Tong hop tat ca bug da biet
2. Liet ke tinh nang da verify
3. Phan loai: bug nao da fix, bug nao con ton

---

## Tai lieu can doc

| File | Doc de lam gi |
|------|--------------|
| `_resources/Bug SmartRoom - BUG.csv` | Danh sach bug — trang thai fix? |
| `_resources/Teacher 251 - Devide Group.csv` | Testcase chia nhom — pass/fail? |
| `_resources/HS - Tablet - Draw.csv` | Testcase ve — pass/fail? |
| `_resources/Tuyen bo dap ung - Ra soat phan mem.csv` | Ma tran tinh nang — cai nao dap ung? |
| `_resources/4. EDL.HDKT. Huong dan chay Test thong luong ky thuat.md` | Luong test ky thuat |

---

## Cong viec CU THE

### 1. Doc Bug SmartRoom CSV
Voi moi bug, ghi lai:
```
| # | Bug ID | Mo ta | Muc do | Trang thai | Ghi chu |
|---|--------|-------|--------|------------|---------|
| 1 | ... | ... | Critical/Major/Minor | Fixed/Open/Reopen | ... |
```

Tong hop:
- Tong so bug: ?
- Da fix: ?
- Con open: ?
- Critical con open: ?

### 2. Doc Testcase CSV
Voi moi testcase, ghi lai:
```
| # | Test ID | Tinh nang | Ket qua | Ghi chu |
|---|---------|-----------|---------|---------|
| 1 | ... | Chia nhom | Pass/Fail | ... |
```

### 3. Lap Verified Feature List
```
## SmartRoom — Tinh nang da kiem chung

### GV (Tablet EDL750s)
| # | Tinh nang | Trang thai | Bug lien quan | Ghi chu |
|---|-----------|------------|---------------|---------|
| 1 | Tao lop | OK / BUG / CHUA TEST | BUG-xxx | ... |
| 2 | Chia nhom | ... | ... | ... |
| 3 | Dieu khien man hinh HS | ... | ... | ... |

### HS (Tablet EDL760s)
| # | Tinh nang | Trang thai | Bug lien quan | Ghi chu |
(tuong tu)

### Web (PC/Laptop)
| # | Tinh nang | Trang thai | Bug lien quan | Ghi chu |
(tuong tu)
```

### 4. Ghi chu sau chuyen server dev → product
Nhung tinh nang nao CAN TEST LAI sau khi chuyen server:
- API nao thay doi?
- Ket noi WebRTC co anh huong?
- Data co mat khong?

---

## Output
Tao file: `OUTPUT/EDU000-QC-001a_SMARTROOM_VERIFIED.md`
