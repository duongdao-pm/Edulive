# CHECKLIST TRIEN KHAI PHONG HOC STEM — Edulive x Nexta
**Version**: 1.0 | **Nguon**: Bien ban hop 15/01/2026 + kinh nghiem trien khai
**Ap dung**: Moi diem trien khai phong hoc mau Edulive cho doi tac Nexta

> In checklist nay mang theo moi lan di trien khai. Tick tung muc.

---

## A. TRUOC KHI DI (T-3 ngay ~ T-1 ngay)

### A1. Phoi hop voi Nexta / Truong
- [ ] Xac nhan dia diem, ten truong, dia chi cu the
- [ ] Xac nhan ngay gio trien khai voi dau moi Nexta
- [ ] Xac nhan can bo ky thuat phia Nexta co mat tai diem
- [ ] Lay so dien thoai lien he: dau moi Nexta + can bo truong + bao ve
- [ ] Xac nhan so luong phong can cai (1 phong hay nhieu phong)

### A2. Ha tang phia Nexta phai chuan bi TRUOC
- [ ] **Server bien (Local Server)** — Nexta da chuan bi:
  - [ ] CPU: Intel Core i5-12400 tro len (6 nhan / 12 luong)
  - [ ] Mainboard: B760M hoac tuong duong (mATX, DDR4)
  - [ ] RAM: **32GB DDR4** (2x16GB, bus 3200MHz) — *Thuong thieu, can kiem*
  - [ ] SSD: 512GB NVMe PCIe 4.0
  - [ ] Nguon: 650W tro len
  - [ ] **OS: Ubuntu 22.04** da cai san — *Thuong chua cai, can kiem*
  - [ ] **Quyen Admin / phuong an Remote** da co
- [ ] **May tinh Giao vien** — Nexta / Truong chuan bi:
  - [ ] Laptop/PC voi CPU i5 Gen 10+, RAM 8GB+, SSD 256GB+
  - [ ] Man hinh Full HD, co cong HDMI/VGA
  - [ ] Windows 10/11, Webcam, Mic, Wi-Fi, Bluetooth
  - [ ] *Luu y: GV thuong dung may ca nhan — can khao sat truoc*
- [ ] **May tinh Hoc sinh** (so luong theo hop dong):
  - [ ] So luong may du theo phong (VD: 10 may/phong)
  - [ ] Cau hinh toi thieu: i3-12100, 8GB RAM, 128GB SSD, man hinh FHD
  - [ ] Windows 10/11 da cai san
- [ ] **Thiet bi mang**:
  - [ ] Router chinh (Ruijie Reyee RG-EG105G-V3 hoac tuong duong)
  - [ ] 2x Switch 24 cong Gigabit
  - [ ] Day mang LAN CAT6a du (600-800m cho 40 may)
  - [ ] Da di day am tuong / mang cap xong
- [ ] **Thiet bi hien thi**:
  - [ ] Bang tuong tac thong minh (Smart Board) HOAC Tivi / May chieu
  - [ ] Cap ket noi HDMI/VGA tu may GV ra man hinh lon
- [ ] **Ha tang mang & dien**:
  - [ ] LAN: Switch 1Gbps + day CAT5e/CAT6+
  - [ ] Internet WAN: Cap quang >= 100Mbps
  - [ ] Wifi: Access Point chuyen dung (neu dung Laptop/Tablet)
  - [ ] Dien: On ap hoac UPS cho Server

### A3. Phia Edulive chuan bi
- [ ] **Bo cai phan mem** (USB hoac remote):
  - [ ] Bo cai Server bien (sv253) — da test PASS
  - [ ] Bo cai STEM Room: EDL750s (GV) + EDL760s (HS)
  - [ ] File license tuong ung (so luong GV + HS theo hop dong)
  - [ ] Kiem tra version bo cai — KHONG mang ban chua test
- [ ] **Router Edulive** (neu can cai truoc):
  - [ ] Router da cai cau hinh boi Toai
  - [ ] Da test ket noi VPN/SSH
  - [ ] Gui router truoc T-1 ngay (chuyen phat nhanh hoac mang truc tiep)
- [ ] **Tai lieu mang theo**:
  - [ ] Bien ban ban giao nghiem thu (ban in)
  - [ ] Danh sach license (so luong GV/HS)
  - [ ] HDSD cho GV (ban in hoac PDF tren USB)
  - [ ] So dien thoai hotline ho tro
- [ ] **Cong cu ky thuat**:
  - [ ] Laptop ky thuat vien (co SSH client, PuTTY, WinSCP)
  - [ ] USB boot Ubuntu 22.04 (phong truong hop Server chua cai OS)
  - [ ] Day mang du phong (2-3 soi, 3m + 5m)
  - [ ] USB chua bo cai + license
  - [ ] O cam dien du phong + day noi dai
- [ ] **Nhan su di trien khai**:
  - [ ] Ky thuat vien chinh (cai server + phan mem)
  - [ ] Nguoi dao tao (HDSD cho GV) — co the cung 1 nguoi
  - [ ] Xac nhan lich trinh: Ngay 1 = Cai + Test, Ngay 2 = Dao tao

---

## B. NGAY TRIEN KHAI — NGAY 1: CAI DAT & TEST

### B1. Kiem tra ha tang tai cho
- [ ] Server bien: bat len, kiem tra cau hinh thuc te (RAM, SSD, OS)
- [ ] Neu OS chua phai Ubuntu 22.04 → cai tu USB boot
- [ ] Neu RAM < 32GB → bao Nexta bo sung (co the van cai voi 16GB)
- [ ] Mang LAN: ping thu giua cac may, kiem tra toc do
- [ ] Internet: test speed, dam bao >= 100Mbps
- [ ] Thiet bi hien thi: ket noi thu tu may GV ra Smart Board / Tivi

### B2. Cai dat phan mem
- [ ] Cai Router Edulive (neu chua cai truoc tu xa)
- [ ] Cai bo cai Server bien (sv253) len Local Server
- [ ] Cau hinh mang noi bo: DHCP, DNS, routing
- [ ] Cai STEM Room len may GV (EDL750s)
- [ ] Cai STEM Room len cac may HS (EDL760s)
- [ ] Nhap license cho tung may (GV + HS)
- [ ] Kiem tra ket noi: may HS → Server bien → may GV

### B3. Test chuc nang
- [ ] GV tao lop hoc thu
- [ ] GV giao bai giang / bai tap
- [ ] HS nhan bai, lam bai, nop bai
- [ ] Kiem tra thong ke: GV thay ket qua HS
- [ ] Test OFFLINE: tat internet, chay lai cac buoc tren
- [ ] Test dong bo: bat lai internet, kiem tra sync len Cloud
- [ ] Test Audio/Video trong bai giang
- [ ] Test STEM tuong tac (neu co module STEM)

### B4. Ghi nhan van de
- [ ] Log cac loi gap phai (neu co) — chup man hinh
- [ ] Ghi nhan cau hinh thuc te khac voi yeu cau (de bao cao)
- [ ] Danh dau cac muc CHUA DAT trong checklist

---

## C. NGAY TRIEN KHAI — NGAY 2: DAO TAO & BAN GIAO

### C1. Dao tao Giao vien
- [ ] Huong dan dang nhap, tao lop
- [ ] Huong dan tao bai giang, giao bai tap
- [ ] Huong dan xem thong ke ket qua HS
- [ ] Huong dan xu ly loi co ban (khoi dong lai, ket noi lai)
- [ ] Tra loi cau hoi cua GV

### C2. Ban giao
- [ ] Ky bien ban ban giao nghiem thu (2 ben)
- [ ] Ghi ro: so luong may, so license, version phan mem
- [ ] Ban giao tai lieu HDSD cho truong
- [ ] Cung cap so hotline ho tro:
  - Cap 1: Nexta (dau moi tiep nhan tu truong)
  - Cap 2: Edulive (chi nhan tu Nexta, chi loi phan mem)
- [ ] Chup anh phong hoc da hoan thanh (luu ho so)

---

## D. SAU TRIEN KHAI (T+1 ~ T+7 ngay)

- [ ] Lien he truong/Nexta hoi tinh hinh su dung sau 1-2 ngay
- [ ] Xu ly cac loi phat sinh (neu co) qua remote
- [ ] Cap nhat trang thai task tren PROJECT_BOARD → DONE
- [ ] Bao cao ket qua trien khai cho PM / Head
- [ ] Luu checklist da tick vao ho so du an

---

## GHI CHU RIENG CHO THAI NGUYEN (06/03/2026)

- Diem: Thai Nguyen (khach hang cua Nexta)
- License: 21 GV (EDL750) + 210 HS (EDL760) = 231 license
- Router: Toai cai truoc, gui sang truoc thu 4 (05/03)
- VPN/SSH: can cap truoc de cai tu xa neu can
- Bo cai sv253: **PHAI test xong truoc khi di** (EDU002-BE-002)
- Chien luoc (Sep TA): Trien khai truc tiep 1 diem → remote cac diem con lai
- Can chuan bi them: Bo cai USB + Doc guide + Video guide (EDU002-PM-004, PM-005)

---

*Tao boi HEAD | Nguon: Bien ban hop Edulive x Nexta 15/01/2026*
*Reference: `_resources/common/EDL-Nexta. Bien ban hop 15_01_2026.pdf`*
