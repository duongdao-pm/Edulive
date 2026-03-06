# SUB-TASK BA-001a: Nhom 1 — San pham CORE (da co data, can tong hop)
**Parent**: EDU000-BA-001 | **Priority**: HIGH | **Do kho**: TRUNG BINH
**San pham**: SmartRoom, STEM Room, Apps GV (EDL750s), Apps HS (EDL760s)
**Trang thai data**: XANH — 6/6 day du
**Trang thai**: CHUA_BAT_DAU | **Tien do**: 0%

---

## Muc tieu
4 san pham nay DA CO day du tai lieu. BA can **TONG HOP** thanh Feature Map chuan, KHONG can di tim them.

---

## SmartRoom (Phong hoc tuong tac)

### Doc tai lieu:
- `_resources/5. EDL.HDSD. Phan mem Giao vien, Hoc sinh.md` — cach su dung
- `_resources/7. EDL.HDSD. Trien khai hoat dong Lop hoc.md` — quy trinh lop hoc
- `_resources/4. EDL.HDKT. Huong dan chay Test thong luong ky thuat.md` — test ky thuat
- `_resources/Bug SmartRoom - BUG.csv` — bug da biet

### Can liet ke:
1. **Chuc nang GV trong lop**: dieu khien man hinh, chia se bai giang, quan ly HS, chia nhom, giao bai tap
2. **Chuc nang HS trong lop**: nhan bai, ve, tra loi, nop bai
3. **Luong chinh**: GV tao lop → HS tham gia → GV day → GV giao bai → HS nop → GV cham
4. **Ket noi**: WebRTC, Janus, RTMP stream — dung gi cho cai gi?

### Cau hoi can tra loi:
- SmartRoom ONLINE (Cloud) vs OFFLINE (Server Bien) — chuc nang gi khac nhau?
- SmartRoom co lien quan gi toi ClassNova? (cung la "phong hoc"?)

---

## STEM Room (Bo dong goi phan cung + phan mem)

### Doc tai lieu:
- `_resources/common/Stem Room Ver1 - Tablet HS - Spec...xlsx` — 60+ features, model EDL750/760
- `_resources/common/1.EDL X Nexta. Bien ban Ban giao Nghiem thu.md` — ban giao B2B
- `_resources/common/CHECKLIST_TRIEN_KHAI_PHONG_STEM.md` — checklist trien khai

### Can liet ke:
1. **Phan cung**: EDL750s (GV), EDL760s (HS), Server Bien, switch, router, may chieu...
2. **Phan mem**: App GV, App HS, Server Bien services, LMS
3. **Luong trien khai**: Cai dat → Cau hinh → Test → Ban giao → Bao tri
4. **Luong su dung**: GV bat lop → HS ket noi → Day + hoc → Ket thuc

### Cau hoi can tra loi:
- STEM Room vs Smartroom — cung 1 phan mem, chi khac phan cung?
- STEM Room vs SynXR — khac gi? (SynXR cung noi "STEM")
- STEM Room co dung Web-School / LMS khong?

---

## Apps GV (EDL750s) + Apps HS (EDL760s)

### Doc tai lieu:
- `_resources/3. EDL.HDKT. Cai dat PM GV, HS, Tool soan giang.md` — cai dat
- `_resources/5. EDL.HDSD. Phan mem Giao vien, Hoc sinh.md` — su dung
- `_resources/HS - Tablet - Draw.csv` — testcase draw
- `_resources/Teacher 251 - Devide Group.csv` — testcase chia nhom

### Can liet ke:
1. **App GV**: Tao lop, quan ly HS, dieu khien man hinh, chia se bai giang, giao bai
2. **App HS**: Nhan bai, ve, tra loi, nop bai, xem diem
3. **Thu vien cua toi** trên app: upload, download, organize
4. **Offline mode**: Nhung gi chay offline duoc khi khong co Internet?

---

## Output
Tao file: `OUTPUT/EDU000-BA-001a_CORE_FEATURE_MAP.md`

Format:
```
## SmartRoom
### Chuc nang
| # | Ten | Mo ta | Ai dung | Online/Offline |
### Luong chinh
1. [Ten luong]: Buoc 1 → ... → Ket qua
### Cau hoi chua ro
- ...

## STEM Room
(tuong tu)

## Apps GV / Apps HS
(tuong tu)
```
