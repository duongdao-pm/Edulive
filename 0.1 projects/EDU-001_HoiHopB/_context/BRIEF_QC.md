# BRIEF QC — EDU-001 Triển khai Hội Hợp B

## Project

```yaml
project_id: EDU-001
project_name: Triển khai Hội Hợp B (B2C — Có Cloud)
qc_lead: Chưa assign (PM hỗ trợ QC)
```

## Test scope

- Modules cần test:
  - Edge Server Sync (Kafka upstream, Sync API downstream)
  - Offline: tạo lớp, giao bài tập, dạy học — 100% không internet
  - Luồng tạo bài tập mới (trên nền luồng cũ)
  - Search Filter nhóm tra cứu nội dung
  - Đồng bộ 30p/lần qua App Giáo viên
- Test types: Functional, Integration (API sync), Offline scenario, Regression
- Devices: Tablet (70 chiếc triển khai), Server Biên
- Environments: Chưa setup — cần Server Biên test

## Lưu ý đặc biệt cho QC

```
1. Test OFFLINE là ưu tiên cao nhất:
   - Tắt wifi/internet -> tạo lớp -> giao bài -> dạy -> PHẢI hoạt động
   - Bật lại wifi -> kiểm tra sync lên Cloud qua Kafka

2. Test luồng CŨ — KHÔNG test trên bản Native:
   - Hội Hợp B = Legacy code, không phải Native build

3. JSON format lệch:
   - Java API dùng camelCase, PHP cũ dùng snake_case
   - Cần test kỹ UI có hiển thị đúng data không
```

## Trạng thái

- Test cases đã viết: 0 (chưa bắt đầu)
- Bugs open: Chưa track
- Coverage: 0%

## Notes

- Chờ Dev hoàn thành Kafka sync (BE-1) mới test được đồng bộ
- PM (Ethan) hỗ trợ QC cho dự án này
- QC Team có 4 người nhưng chưa assign cụ thể cho EDU-001
