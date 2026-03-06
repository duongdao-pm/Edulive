# BRIEF QC — EDU-002 Nexta

## Project

```yaml
project_id: EDU-002
project_name: Nexta (B2B — 100% Offline)
qc_lead: Chua assign chinh thuc
qc_members:
  - Nguyen Thi Khanh Linh: Smartroom React, PHNN, School Server
  - Tran Thi Anh Dao: Smartroom Tablet, content 3D, Draw
```

## Test scope

- Modules can test:
  - Phong hoc thong minh (Smartroom): Whiteboard, STEM Library Local, AI Tools
  - Offline 100%: Tao lop, giao bai, day hoc — KHONG co internet
  - Native Image build: Dong goi, cai dat tren Tablet
  - Sync khi co mang: Kafka sync 30p/lan len Cloud
  - Server Bien: Tao bai giang, tiet hoc offline (PAUSED — Dien tam hoan)
- Test types: Functional, Offline scenario, Integration (Kafka sync), UAT
- Devices: 70 Tablet chinh + 5 Tablet du phong (Da cai dat xong)
- Environments: Server Bien local, Tablet Nexta

## Luu y dac biet cho QC

```
1. Test OFFLINE 100% la uu tien tuyet doi:
   - Nexta B2B = KHONG CO internet khi van hanh
   - Moi tinh nang PHAI hoat dong offline hoan toan

2. Test tren ban NATIVE (khong phai Legacy):
   - Nexta != Hoi Hop B — dung Native Image build
   - KHONG nham voi luong code cu

3. Demo Phong hoc thong minh:
   - Happy Path: Whiteboard -> STEM Library -> AI Tools
   - Test tren 70 Tablet thuc te

4. Phan tao bai giang + tiet hoc offline tai Server Bien:
   - PAUSED — Mr Dien (BE) tam hoan, uu tien ban cai ban giao
   - Se test sau khi BE hoan thanh
```

## Trang thai

- Test cases da viet: 0
- Bugs open: Chua track
- Coverage: 0%
- Tablet: 70 + 5 du phong (Done — Da cai dat)

## Notes

- Sep TA yeu cau "QC test luon khong cho" -> test song song voi Dev
- Linh & Dao dang test demo Phong hoc thong minh tren 70 Tablet
- JSON format (camelCase vs snake_case) can kiem tra tren ban Native
