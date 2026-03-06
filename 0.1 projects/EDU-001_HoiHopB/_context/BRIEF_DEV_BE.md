# BRIEF DEV BE — EDU-001 Triển khai Hội Hợp B

## Project

```yaml
project_id: EDU-001
project_name: Triển khai Hội Hợp B (B2C — Có Cloud)
tech_lead: Anh Ngọc
```

## QUY TẮC BẮT BUỘC

```
PHẢI: Dùng luồng code CŨ (Legacy)
KHÔNG ĐƯỢC: Code đè luồng mới (Native) vào bản Hội Hợp B
KHÔNG ĐƯỢC: Build Native Image cho đợt này
```

## Tech stack

```yaml
language: Java (đang chuyển từ PHP), PHP (legacy)
framework: Spring (Java mới), PHP cũ
database: MySQL / PostgreSQL
cloud: Edulive Cloud
message_queue: Kafka (cho Edge Server sync)
```

## Kiến trúc Edge Server Sync

```
Server Bien -> Cloud:
  - Kafka (uu tien ket qua bai tap)
  - Tan suat: 30 phut/lan qua App Giao vien

Cloud -> Server Bien:
  - Sync API binh thuong (KHONG qua Kafka)
  - Chi sync: Noi dung + STEM (1 chieu)
  - KHONG sync: "Kenh cua toi"
```

## Action Items (từ meeting 23/02)

| # | Task | Người | Ưu tiên | Phụ thuộc | Status |
|---|------|-------|---------|-----------|--------|
| BE-1 | Xử lý đồng bộ kết quả bài tập qua Kafka | **Diện** | HIGH | — (đầu chuỗi) | Pending |
| BE-2 | Tạo tiết + tổ chức bài tập 100% Offline trên Server Biên | **Diện** | HIGH | Sau BE-1 | Pending |
| BE-3 | API đồng bộ Server Biên (Lực lên API list) | **Lực** | MEDIUM | BE-1 hoàn thành | Pending |

## Yêu cầu cốt lõi cần fix

Hiện trạng: **PHẢI có internet mới tạo được lớp** -> SAI so với yêu cầu.
Yêu cầu: Giáo viên tạo lớp, tạo câu hỏi/bài tập, giảng dạy **HOÀN TOÀN OFFLINE** dựa trên học liệu đã tải về.

## Technical debt

- PHP -> Java: API đã chuyển nhưng JSON format lệch (Java: camelCase, PHP: snake_case) -> FE đang rà soát
- Build Native Image đang lỗi (liên quan Nexta, KHÔNG phải EDU-001)

## Notes

- Diện là bottleneck: nếu trễ -> toàn bộ chain trễ (Lực chờ, Chiến chờ)
- Toại có thể hỗ trợ Diện nếu PM quyết định phân lại task
- Dũng phụ trách đẩy data từ Server Biên lên Kafka -> sync DB online
