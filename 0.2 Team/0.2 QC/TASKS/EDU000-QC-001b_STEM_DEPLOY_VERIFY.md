# SUB-TASK QC-001b: STEM Room — Kiem chung trien khai
**Parent**: EDU000-QC-001 | **Priority**: HIGH | **Do kho**: TRUNG BINH
**Moi truong**: STEM Room (EDL750s + EDL760s + Server Bien)

---

## Muc tieu
STEM Room dang trien khai o nhieu noi (Vinh Phuc, Ung Hoa, Thai Nguyen). QC can:
1. Kiem chung checklist trien khai — buoc nao thuong bi loi
2. Liet ke van de gap khi trien khai thuc te
3. Map tinh nang: 60+ features trong spec → cai nao DA CHAY, cai nao CHUA

---

## Tai lieu can doc

| File | Doc de lam gi |
|------|--------------|
| `_resources/common/Stem Room Ver1 - Tablet HS - Spec...xlsx` | 60+ features — verify tung cai |
| `_resources/common/CHECKLIST_TRIEN_KHAI_PHONG_STEM.md` | Checklist trien khai |
| `_resources/common/1.EDL X Nexta. Bien ban Ban giao Nghiem thu.md` | Ban giao — van de gi? |
| `_resources/common/CHECKLIST_TRIEN_KHAI.csv` | Checklist chi tiet |

---

## Cong viec CU THE

### 1. Doc STEM Spec (Excel)
Voi moi tinh nang trong spec:
```
| # | Feature | Mo ta | Trang thai | Ghi chu |
|---|---------|-------|------------|---------|
| 1 | ... | ... | OK / BUG / CHUA TEST / KHONG KIEM TRA DUOC | ... |
```

Phan loai:
- DA CHAY TOT: tinh nang nao khong co van de
- CO VAN DE: tinh nang nao bi loi
- CHUA TEST: tinh nang nao chua kiem tra duoc (khong co moi truong, thoi gian...)

### 2. Doc Checklist trien khai
Voi moi buoc trong checklist:
```
| # | Buoc | Thuong bi loi khong? | Loi thuong gap | Cach fix |
|---|------|---------------------|---------------|----------|
| 1 | Cai dat Ubuntu | ... | ... | ... |
| 2 | Cai Docker | ... | ... | ... |
```

### 3. Ghi lai van de tu cac dot trien khai

#### Vinh Phuc
- Da trien khai: [ngay]
- Van de gap: ?
- Trang thai hien tai: ?

#### Ung Hoa
- Da trien khai, CHUA day du (chua dao tao content)
- Van de: can len lich them 1 buoi tuan 09-13/03

#### Thai Nguyen
- Da trien khai, can lam viec lai voi Nexta ve server
- Van de: server mismatch (ALO-005)

### 4. Bugs da biet tu STEM
Doc trong cac buoc tren, tong hop:
- Search bi loi
- Upload bi loi
- Timer bi loi
- (Bug khac?)

---

## Output
Tao file: `OUTPUT/EDU000-QC-001b_STEM_DEPLOY_VERIFIED.md`
