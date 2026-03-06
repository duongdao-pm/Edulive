# BRIEF PM — EDU-003 Schedule

## Project

```yaml
project_id: EDU-003
project_name: Edulive Schedule / Ecosystem Tracking
status: Khoi tao / Thu thap yeu cau
priority: Medium
```

Du an nay dong vai tro la "Master Schedule" de theo doi tinh trang phat trien va loi (Bug tracking) cua toan bo cac san pham trong he sinh thai Edulive.

## 1. Ban do San pham (Product Map)

- **AiTeacher:** Cai thien logic quan ly file/folder, dong bo trang thai phe duyet bai giang.
- **Apps Giao vien:** Dang chuyen doi Smartroom VueJS -> ReactJS. Co ban build Native chong clone.
- **Apps Hoc sinh:** Tap trung Draw Tool, Game, tuong tac 3D. Chuan bi demo Vinh Phuc.
- **Apps Phu huynh:** Giao dien moi (Figma), ban Tin tuc (News). Can day Store.
- **Social (MXH):** Master search, AI Gen Slide, phan quyen phe duyet bai giang.
- **DataWarehouse:** He thong bao cao hanh vi, ti le su dung hoc lieu so (Hien nhieu task dang TAM DUNG).
- **Web-School / LMS:** Quan ly lop hoc thong minh chi tiet lich su, dong bo storage.
- **Infrastructure:** Chuyen doi PHP sang Java (Quarkus), Kafka Sync giua Server Bien va Cloud.

## 2. Dac thu Ky thuat
- **Dong bo:** Su dung Kafka de consume du lieu tu EDGE Server (Bien) len Cloud va nguoc lai.
- **Ha tang:**
    - Server 202 (Native)
    - Server LAN 252
    - EDGE Server (Offline)
- **Moi truong:** DEV, Beta, va Production (Store).

## 3. Cac diem can luu y (Blockers)
- **Data Lake & Recommendation:** Hien trang 0% (Chua trien khai thuc te).
- **Versioning:** Can kiem soat chat che viec dong bo giua moi truong Online va Offline de tranh lech data.
- **Thiet bi:** Quan ly License info va loi dang nhap nhieu thiet bi tren 1 account.

## 4. Hanh dong uu tien
- Ra soat cac task "FAILED" hoac "CHUA THUC HIEN" tu log QC.
- Chuan bi tai lieu scope cho khach hang Credit va Hoi Hop B.
