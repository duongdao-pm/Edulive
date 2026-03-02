# INTERVIEW GUIDE — Thu thập thông tin sản phẩm Edulive
# Bộ câu hỏi phỏng vấn stakeholder theo vai trò.
# PM dùng file này khi nói chuyện với từng người → paste kết quả vào _inbox/raw/

---

## Hướng dẫn sử dụng

```
1. Chọn người cần phỏng vấn (dựa trên bảng bên dưới)
2. Copy câu hỏi tương ứng
3. Phỏng vấn (có thể chat Zalo, gặp trực tiếp, hoặc họp)
4. Paste nguyên văn câu trả lời vào Cowork → tôi sẽ parse + điền vào Product Registry
5. Hoặc paste vào _inbox/raw/ với format: [YYYY-MM-DD]_interview_[tên]_[chủ đề].md
```

---

## Ma trận: Ai biết gì?

| Người | Biết rõ nhất về | Ưu tiên hỏi |
|-------|----------------|-------------|
| **Anh Ngọc** (Tech Lead) | Kiến trúc tổng thể, data flow, tech stack, Kafka, DB schema | 🔴 Hỏi ĐẦU TIÊN |
| **Mr Diện** (Key BE) | Server Biên, Kafka, Native Image, luồng deploy | 🔴 |
| **Chiến** (Key FE) | Social, UI flow, API integration, luồng Approve | 🔴 |
| **Văn** (Mobile) | Apps Giáo viên, Smartroom, offline sync, 3D | 🟡 |
| **Khánh** (Mobile) | Apps Học sinh, Apps Phụ huynh, Firebase | 🟡 |
| **Nghĩa** (Web) | Web-School, LMS, Parent-Pupil portal | 🟡 |
| **Thịnh/Tuyến** (AI) | AI Tool tạo bài giảng, prompt engineering | 🟡 |
| **Đạt/Nam** (AI) | Kho ảnh GV, AI image generation | 🟢 |
| **Sếp Tuấn Anh** (TGĐ) | Vision, roadmap, business model, ưu tiên chiến lược | 🟡 Hỏi sau khi có draft |

---

## SESSION 1: Anh Ngọc (Tech Lead / Architect) — CẬP NHẬT 24/02
### Mục tiêu: Xác nhận mapping + giải quyết gaps còn lại

**Thời lượng đề xuất:** 30-45 phút
**Lưu ý:** Bỏ câu hỏi chung chung — ĐÃ CÓ 80% context. Chỉ hỏi câu chưa biết.

### ĐÃ BIẾT (không cần hỏi lại)
- ✅ AI Teacher = AiTeacher(BE) + Social(FE)
- ✅ Smartroom = mode trong Apps GV/HS (không phải app riêng)
- ✅ STEM Room = Smartroom_react + Smartroom_tablet + LMS đóng gói offline
- ✅ Tech stack: ReactJS/VueJS→ReactJS, Java từ PHP, Kafka, Firebase
- ✅ Server Biên: i5-12400F, Ubuntu, Docker

### Câu hỏi CÒN LẠI (chỉ hỏi cái CHƯA biết)

**Mapping sản phẩm (3 câu quan trọng nhất):**

1. **ViziStudio vs Tool 2d vs Tool AI bài giảng: MẤY sản phẩm?** Em đã thấy 3 tên: ViziStudio (Sếp TA gọi), Tool 2d (trong đóng gói Bắc Ninh, Hưng cài), Tool tạo bài giảng AI (Thịnh/Tuyến làm). Đây là 1, 2, hay 3 product khác nhau?

2. **I3Dpro: Là gì? Ai làm?** Sếp TA nói "nội dung 3D và game". Liên quan 3D trong Apps GV (Văn/Quang đang load 3D từ Server Biên)? Hay product riêng?

3. **SynXR: STEM cụ thể gồm gì?** Khác gì so với STEM Room (đã deploy Bắc Ninh/Vĩnh Phúc)?

**Architecture (2 câu):**

4. **Repo list:** Cho em danh sách TẤT CẢ repo (tên + owner). Mono-repo hay multi-repo?

5. **DB:** Bao nhiêu database? Engine gì? (MySQL/PostgreSQL/MongoDB?) Em biết Kafka sync exercise + pupils — DB nào lưu?

**Gaps cần giải quyết (2 câu):**

6. **STEM Room bugs:** Search thư viện không hoạt động, upload file lỗi, đồng hồ bấm giờ lỗi. Ai đang fix? Timeline?

7. **LMS tools chưa có:** Thiết kế thí nghiệm ảo, bài giảng tương tác, trò chơi — trong Tuyên bố đáp ứng ghi "Chưa có". Plan bao giờ có?

---

## SESSION 2: Mr Diện (Key Backend)
### Mục tiêu: Hiểu Server Biên + Kafka + Deploy pipeline

**Thời lượng đề xuất:** 30-45 phút

1. **Server Biên chạy gì?** OS? Docker? Bare metal? Spec phần cứng?

2. **Native Image build process:** Dùng tool gì? GraalVM? Bao lâu build 1 lần? Size image bao nhiêu?

3. **Kafka trên Server Biên:** Kafka chạy trên Server Biên hay chỉ Cloud? Topic nào? Producer/Consumer flow?

4. **Luồng "tạo tiết offline":** GV tạo tiết trên Server Biên → data lưu ở đâu local → khi có mạng → push lên Cloud thế nào?

5. **PHP → Java migration:** Bao nhiêu endpoint đã chuyển? Bao nhiêu còn? Timeline xong?

6. **Vấn đề camelCase vs snake_case:** Có adapter layer không? Hay FE phải tự map?

7. **Deploy Hội Hợp B:** Quy trình cài Server Biên + 70 Tablet cụ thể thế nào? Bao lâu?

---

## SESSION 3: Chiến (Key Frontend)
### Mục tiêu: Hiểu luồng UI + Social + API integration

**Thời lượng đề xuất:** 30-45 phút

1. **Social platform:** Là gì chính xác? Ai dùng? GV chia sẻ bài giảng? Hay có community feature?

2. **"Kéo thả bài giảng":** Kéo từ đâu thả vào đâu? Workflow cụ thể?

3. **Approve luồng:** Quy trình duyệt bài giảng: ai tạo → ai review → ai approve → publish ở đâu?

4. **Search filter:** Đang search cái gì? Bài giảng? Content? Trên platform nào?

5. **API đồng bộ (FE side):** FE gọi API nào để sync data từ Server Biên? Có UI cho user thấy sync status không?

6. **Luồng Assignment (vấn đề lệch logic):** Theo hiểu biết của bạn, "Lớp học sau bài giảng" hoạt động thế nào? (Câu này rất quan trọng — cần so sánh với câu trả lời của Anh Ngọc)

7. **Frontend tech stack tổng thể:** React? Next.js? Vue? Có design system chung không? Component library?

---

## SESSION 4: Văn (Mobile - Apps GV + Smartroom)
### Mục tiêu: Hiểu Apps GV + Smartroom + Offline

**Thời lượng đề xuất:** 20-30 phút

1. **Apps Giáo viên:** Tech stack? (React Native? Flutter?) Platform (Android only? iOS?)?

2. **Chuyển VueJS → ReactJS:** Đang ở bao nhiêu %? Timeline xong? Có breaking changes?

3. **Smartroom React vs Smartroom Tablet:** Khác nhau chỗ nào? Ai dùng cái nào? Chạy trên device gì?

4. **3D content:** Render ở đâu (client? server?)? Dùng engine gì? (Three.js? Unity? Custom?)

5. **Offline flow (Apps GV):** Khi không có mạng, GV dùng app thế nào? Data local lưu ở đâu? (SQLite? RealmDB?)

6. **Sync từ App ↔ Server Biên:** Cơ chế nào? REST polling? WebSocket? Background sync?

---

## SESSION 5: Khánh (Mobile - Apps HS + PH)
### Mục tiêu: Hiểu Apps Học sinh + Phụ huynh

**Thời lượng đề xuất:** 20-30 phút

1. **Apps Học sinh:** Tech stack? Platform? Có mấy bản build (Legacy vs Native)?

2. **Dynamic layout:** Là gì? Layout thay đổi theo gì? (lớp? môn? bài tập?)

3. **Firebase:** Dùng cho push notification? Analytics? Realtime DB? Auth?

4. **Canvas vẽ (Hùng):** Feature này ở trong app HS? Dùng library gì? Là feature chính hay phụ?

5. **Apps Phụ huynh:** Có tính năng gì? (xem điểm, thông báo, chat GV, lịch học?)

6. **Apps PH vs Web Parent-Pupil (Nghĩa):** Khác nhau thế nào? Dùng chung data?

---

## SESSION 6: Nghĩa (Web-School / LMS)
### Mục tiêu: Hiểu Web-School + Parent-Pupil portal

**Thời lượng đề xuất:** 20 phút

1. **Web-School/LMS:** Tính năng chính là gì? (quản lý lớp, điểm, lịch, tài nguyên, báo cáo?)

2. **Ai dùng Web-School?** Admin trường? GV? Hay cả hai?

3. **Web Parent-Pupil:** Tính năng khác gì so với Apps PH + HS?

4. **Tech stack FE:** Framework gì? Có SSR không?

5. **Liên quan Server Biên:** Web-School có chạy trên Server Biên không? Hay chỉ Cloud?

---

## SESSION 7: Thịnh / Tuyến + Hưng (AI Tools + Tool 2d) — CẬP NHẬT 24/02
### Mục tiêu: Xác nhận ViziStudio vs Tool 2d vs Tool AI

**Thời lượng đề xuất:** 20-30 phút
**ĐÃ BIẾT:** Thịnh/Tuyến làm logic AI, Đạt/Nam làm kho ảnh KNTT, sách Toán lớp 1-4, API port 8503, mapping JSON fill_in_plan/single_choice/matching. Hưng cài Tool 2d cho Bắc Ninh.

1. **Tool AI bài giảng (Thịnh/Tuyến) vs Tool 2d (Hưng cài) vs ViziStudio (tên CEO): Mấy sản phẩm?** Tool 2d có 28 công cụ tạo nội dung kéo thả. Tool AI gen slide + ảnh. ViziStudio CEO nói "Web + Desktop". Cùng 1 hay khác nhau?

2. **"Quy trình 5 bước" tạo bài giảng AI** (Figma có 1,336 frames): 5 bước cụ thể là gì?

3. **Gen Slide AI (trong Social FE)** vs **Tool riêng:** Cùng 1 engine? Hay 2 entry point khác nhau?

4. **Tech stack AI:** Python? LLM nào? (OpenAI? Claude? Open-source?) API deploy ở đâu?

5. **Output đầu ra:** JSON → render slide ở client? Hay generate file PPTX? Đẩy vào Social hay Smartroom?

6. **Tool 2d: còn cài ở đâu ngoài Bắc Ninh?** Vĩnh Phúc? HHB? Online?

---

## TIPS PHỎNG VẤN

```
✅ NÊN:
- Hỏi "cho tôi xem" thay vì chỉ hỏi miệng (xin screenshot, diagram, code sample)
- Hỏi "workflow thực tế" — không hỏi "workflow lý tưởng"
- Record lại (note hoặc audio) → paste vào Cowork sau
- Hỏi "cái gì CHƯA hoạt động" — biết gap quan trọng hơn biết feature

❌ KHÔNG NÊN:
- Hỏi quá nhiều 1 lần (max 7-10 câu/session)
- Hỏi trùng câu đã hỏi người khác (trừ khi cố ý cross-check)
- Hỏi chi tiết code (hỏi flow + architecture, không hỏi implementation)
```

---

## Sau khi phỏng vấn

```
1. Paste kết quả vào Cowork chat: "Alo [tên] nói [nội dung]"
   → Tôi sẽ parse + điền vào Product Registry + flag câu hỏi mới

2. Hoặc upload file vào _inbox/raw/:
   [YYYY-MM-DD]_interview_[tên]_[chủ đề].md

3. Sau mỗi 2-3 sessions → review Product Registry cùng nhau → xác nhận gaps
```

---

## Lịch sử cập nhật

| Ngày | Thay đổi |
|------|---------|
| 2026-02-24 | Tạo bản đầu tiên — 7 sessions cho 9 người |
| 2026-02-24 | **CẬP NHẬT** — Session 1 (Anh Ngọc): Bỏ câu đã biết, thêm 7 câu targeted. Session 7 (AI): thêm context Tool 2d + Quy trình 5 bước |
