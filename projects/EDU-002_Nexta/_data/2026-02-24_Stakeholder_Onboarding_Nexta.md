# NHẬN YÊU CẦU & BỐI CẢNH DỰ ÁN (ONBOARDING NEXTA/EDULIVE)
**Ngày nhận:** 24/02/2026

## 1. Tổng quan Dự án (Projects Overview)
- **Hội Hợp B (B2C - Có Cloud):** Luồng code cũ. Yêu cầu: 2 Server Biên, 70 Tablet chính, 5 Tablet dự phòng.
- **Nexta (B2B - Offline 100%):** Bản build Native Image. Yêu cầu hoạt động hoàn toàn không cần internet.
- **Các Line Sản Phẩm Khác:** Apps Học sinh/Giáo viên/Phụ huynh, Smartroom, Social (Web-School LMS), DataWarehouse, Data Lake Dashboard, Recommendation System, AI Tools (Tool tạo bài giảng, Kho ảnh).

## 2. Nhân sự & Vai trò
- **BGD & Tech Lead:**
  - Anh Tuấn Anh (TGĐ): Thích Agentic AI. Quản lý vi mô (Micromanagement), ép tiến độ, cần release bản "Secure" nhanh chóng dù chưa hoàn hảo. Muốn Nexta B2B offline 100%.
  - Anh Ngọc (Tech Lead): Thiết kế kiến trúc, quyết định dùng Kafka đồng bộ, phụ trách DataWarehouse/DataLake (đang tồn/pending), duyệt quy trình nội dung.
- **Đội BE:**
  - Mr Diện (Key): Consume Kafka Server Biên, 2 Server Biên Hội Hợp B, chuyển School sang Java, đóng gói Native. (Ưu tiên khẩn cấp)
  - Lực: API Social, API đồng bộ Edge Server lên Cloud.
  - Toại: Support Mr Diện (PHP->Java), server demo, IT cứng.
  - Dũng: Đẩy data Server Biên lên Kafka -> Database Online.
- **Đội FE:**
  - Chiến (Key): Social, API Đồng bộ, duyệt/kéo thả bộ bài giảng, Search filter.
  - Hưng (Mr Hưng): Cấu hình Approve bài giảng, server demo, UI Tool AI, luồng tạo bài tập mới cho Hội Hợp B (trên code cũ).
  - Nghĩa: Web-School (LMS), web Phụ huynh/Học sinh.
  - Khánh: Apps Phụ huynh/Học sinh.
  - Văn: Apps Giáo viên, thư viện 3D, Sync offline.
  - Quang: Apps Giáo viên, phòng học 3D, Classes AI, Ranking.
  - Hùng: Apps Học sinh (Draw/Canvas).
- **Đội AI:**
  - Thịnh & Tuyến: Logic Tool tạo bài giảng AI, prompt ảnh.
  - Đạt & Nam: Kho ảnh giáo viên (KNTT), xoá watermark, gen AI.
- **Đội QC:**
  - Nguyễn Thị Khánh Linh: Smartroom React, PHNN, School Server.
  - Phương Hoa: Social.
  - Trần Thị Anh Đào: Smartroom Tablet, content 3D, Draw.
  - Vũ Hồng Anh: Apps Học sinh, Social.

## 3. Các nút thắt (Bottlenecks) & Rủi ro
- **Nút thắt 1: Versioning Hell:** Luồng code Hội Hợp B (cũ) vs Nexta (Native). Đang bị lẫn lộn, lỗi migrate (API Social). Lệnh từ sếp: đóng băng code, release ngay 1 bản "Secure".
- **Nút thắt 2: Luồng Đồng bộ Server Biên:** Lỗi thiết kế hiện tại (bắt có mạng mới tạo lớp được) trái với kỳ vọng sếp (100% offline). Dev đổi sang Kafka (đồng bộ 30p/lần lên Cloud, từ Cloud kéo về bằng Sync API).
- **Nút thắt 3: Giao tiếp UI/API:** Lớp học sau bài giảng (Chiến FE + Anh Ngọc Lead hiểu sai luồng). Chuyển PHP -> Java dẫn đến lệch format JSON (camelCase vs snake_case), vếch UI.

## 4. Hành động PM (Rules cho PM Agent)
- **Tag ưu tiên cao (High Priority):** Bất kỳ tin nhắn/task nào chứa "Kafka", "Đồng bộ Offline", "Native" hoặc "Hội Hợp B" đều gán nhãn ưu tiên & map đúng người (Diện, Chiến, Lực, Ngọc).
- **Style báo cáo:** "Micromanage" nhưng "Tầm nhìn hệ thống" để gửi Sếp Tuấn Anh. Cập nhật task liên tục.
- **Phát hiện Blockers:** Báo cáo ngay lập tức nếu có: "Chưa có API đồng bộ", "Kafka lỗi", "UI vênh API Java".
