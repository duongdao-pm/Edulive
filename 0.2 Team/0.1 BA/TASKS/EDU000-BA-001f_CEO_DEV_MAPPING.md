# SUB-TASK BA-001f: Mapping ten CEO vs ten Dev
**Parent**: EDU000-BA-001 | **Priority**: CRITICAL | **Do kho**: CAO
**Muc tieu**: Lam ro: moi ten thuong mai tuong ung voi san pham ky thuat nao
**Trang thai**: CHUA_BAT_DAU | **Tien do**: 0%

---

## Van de
CEO (Sep TA) goi 1 ten, team Dev goi ten khac. Hien tai CHUA AI lam mapping day du.

Neu BA KHONG lam ro viec nay → PM se khong biet:
- CEO noi "ViziStudio" thi dev team nao lam?
- CEO noi "I3Dpro" thi code o repo nao?
- CEO muon "ClassNova" thi noi voi dev nhu the nao?

---

## Bang mapping hien tai (CHUA CHAC CHAN)

| # | Ten CEO | Ten Dev (du doan) | Do chac chan | Can verify |
|---|---------|-------------------|-------------|-----------|
| 1 | AI Teacher | Social (FE) + AiTeacher (BE) | 90% | Confirm luong BE/FE |
| 2 | ViziStudio | Tool soan giang / Tool 2d (?) | 50% | **3 ten — 1 hay 2 app?** |
| 3 | I3Dpro | ? | 10% | Hoan toan chua biet |
| 4 | Schoolaris.vn | Web-School + LMS | 70% | Schoolaris la domain hay san pham? |
| 5 | ClassNova | ? (Smartroom dong goi?) | 20% | Hoan toan chua biet |
| 6 | AiTalkStudio | ? | 0% | ZERO info |
| 7 | SynXR | ? | 0% | ZERO info |
| 8 | Airlib | ? (dong bo thu vien?) | 30% | Can confirm |
| 9 | Cam AI | ? | 0% | ZERO info |

---

## Cong viec cu the

### Buoc 1: Doc PRODUCT_REGISTRY
File `product/PRODUCT_REGISTRY.md` — doc ky PHAN A (CEO view) va PHAN B (Dev view)
Ghi lai: cau nao CEO noi co the map voi cau nao Dev noi

### Buoc 2: Doc COMPANY_CONTEXT
File `product/COMPANY_CONTEXT.md` — tim team assignment
Ghi lai: ai lam san pham nao → suy ra mapping

### Buoc 3: Doc mo ta chung + Schedule data
- `_resources/mo ta chung.md`
- Tim ten san pham khac xuat hien o dau

### Buoc 4: Lap bang mapping CU THE
```
## MAPPING KET QUA

### DA CONFIRM (chac chan)
| Ten CEO | Ten Dev | Nguon xac nhan |
|---------|---------|---------------|

### DU DOAN (co co so)
| Ten CEO | Ten Dev (du doan) | Co so | Can verify voi ai |
|---------|-------------------|-------|-------------------|

### CHUA BIET (khong co du lieu)
| Ten CEO | Ghi chu | Can hoi ai |
|---------|---------|-----------|
```

---

## LUU Y
- Chi ghi mapping khi CO CO SO (tu tai lieu, khong phai suy doan)
- Neu 2 ten khac nhau ma mo ta GIONG NHAU → ghi "CO THE GIONG" + ly do
- Neu 2 ten giong nhau ma mo ta KHAC NHAU → ghi "CO THE KHAC" + ly do
- Day la sub-task **QUAN TRONG NHAT** cho PM — PM can mapping nay de noi chuyen voi CEO

---

## Output
Tao file: `OUTPUT/EDU000-BA-001f_CEO_DEV_MAPPING.md`
