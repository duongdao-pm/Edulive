# BRIEF PM — EDU-002 Nexta

## Project

```yaml
project_id: EDU-002
project_name: Nexta / Edulive Ecosystem (B2B & B2C)
status: Dang chay nhieu luong song song (Vua phat trien, vua fix loi migrate)
urgency: Rat cao (Sep giuc dong goi truoc/sau Tet, uu tien ra moc release "Secure")
```

## 1. Muc tieu & Dinh huong (BGD)
- **Sep Tuan Anh (TGD):** Chap nhan dong goi luong chua hoan hao de co release. Yeu cau Nexta B2B chay offline 100% khong can mang. Quan ly vi mo, khoai Agentic AI.
- **Tech Lead (Anh Ngoc):** Phu trach kien truc. Dung Kafka dong bo. Dang pending kho DataWarehouse/DataLake.

## 2. Dac thu Ky thuat & Rules
- **Nut that Versioning (Luu y Tuyet doi):**
  - Du an **Hoi Hop B**: Dung luong code CU. *KHONG BAO GIO code de luong Native moi vao day.*
  - Du an **Nexta**: Dung luong Native Image.
- **Nut that Offline (Kafka Sync):**
  - Co che dong bo: 30 phut/lan.
  - Tu Server Bien day len Cloud: Dung Kafka. Dung lam day Kafka, Mr Dien (BE) lam consume Kafka. Uu tien: Dong bo ket qua bai tap.
  - Tu Cloud keo ve Server Bien: Sync API (chi lay Content/STEM, bo qua Kenh cua toi).

## 3. Team Members & Hot Tasks Hien Tai
- **BE Team:**
  - **Mr Dien (KEY):** Consume Kafka Server Bien, 2 Server Bien Hoi Hop B, chuyen School Java, Image Native.
  - **Luc:** API Social, API dong bo Edge len Cloud.
  - **Toai:** Chuyen PHP->Java, Server Demo, IT cung.
  - **Dung:** Day Kafka tu Bien len Online.
- **FE Team:**
  - **Chien (KEY):** Social, API Dong bo, Keo tha duyet bai giang, Search filter.
  - **Hung:** Cau hinh Approve, UI Tool AI, luong bai tap Hoi Hop B (giu luong cu).
  - **Van:** Apps Giao vien, Thu vien 3D, Sync Offline.
  - **Ngoc Vu/Chien (Ra soat):** Xu ly venh UI do API Java doi format tu snake_case sang camelCase.

## 4. Tien do cap nhat (Update Log)

### 2026-02-25
- **Tablet Nexta:** Da cai dat va chuan bi xong **70 Tablet chinh + 5 Tablet du phong**. DONE
- **Mr Dien (BE Key):**
  - Tam hoan phan **tao bai giang va tiet hoc offline tai Server Bien** — chinh sau.
  - Uu tien hien tai: **Tap trung xu ly ban cai ban giao cho Nexta**.
  - Trang thai: IN PROGRESS (Ban cai Nexta) | PAUSED (Bai giang + Tiet hoc offline Server Bien)

## 5. Hanh dong uu tien cho PM (Bat buoc tuan thu)
- **Keyword "High Priority":** Bat ky noi dung nao nhac den `Kafka`, `Dong bo Offline`, `Native`, `Hoi Hop B` phai gan canh bao Khan va theo doi sat Dien, Chien, Luc, Ngoc.
- **Bao cao kieu "Micromanagement":** Update lien tuc cac sub-task chan luong nhu "Thieu API dong bo", "Loi Kafka", "UI lech JSON". Bao cao Sep can giong dieu sat xao he thong.
- **Conflict Canh Bao:** Flow bai tap (Assignment) dang co hieu nham giua Chien (FE) va Ngoc (Lead). Can chot Document/Flowchart gap.
