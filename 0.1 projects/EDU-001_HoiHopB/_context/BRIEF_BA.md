# BRIEF BA — EDU-001 Triển khai Hội Hợp B

## Project

```yaml
project_id: EDU-001
project_name: Triển khai Hội Hợp B (B2C — Có Cloud)
domain: EdTech — hệ sinh thái giáo dục (lớp học, bài giảng, bài tập)
stakeholder: Sếp Tuấn Anh (TGĐ), Đội Triển khai
ba_lead: Chưa assign (PM kiêm nhiệm)
```

## Scope tóm tắt

Triển khai Edulive tại Hội Hợp B — mô hình B2C có Cloud, dùng luồng code CŨ. Cần đảm bảo: Edge Server Sync hoạt động, offline tạo lớp/bài tập, đồng bộ 30p/lần qua Kafka. Hạ tầng: 2 Server Biên + 70 Tablet.

## Đặc thù dự án

- Đối tượng: Giáo viên (tạo lớp, giao bài), Học sinh (làm bài), Admin trường
- Hệ thống liên quan: Cloud Edulive, Server Biên (Edge), Kafka, Sync API
- Constraints: PHẢI dùng luồng cũ (Legacy), KHÔNG Native. Chưa có deadline cứng
- Vấn đề logic đang lệch: Luồng Assignment (Lớp học sau bài giảng) — FE và Tech Lead hiểu khác nhau -> PM đang can thiệp

## Yêu cầu cần làm rõ (BA cần phân tích)

1. **Luồng Assignment**: Chốt flowchart "Lớp học sau bài giảng" — hiện Chiến (FE) và Anh Ngọc (Tech Lead) hiểu lệch. BA cần document rõ ràng
2. **Quy trình Approval**: Duyệt tài liệu/bài giảng theo từng version — chưa thống nhất quy trình
3. **Offline use cases**: User stories cho Giáo viên sử dụng 100% offline (tạo lớp, giao bài, dạy — không cần internet)

## Trạng thái hiện tại

- Requirements đã có: Chưa có tài liệu chính thức (BRD/SRS)
- Đang chờ: PM chốt luồng Assignment và Approval workflow
- Sprint hiện tại: Chưa thiết lập sprint — đang ở giai đoạn post kick-off

## Notes

- PM (Ethan) kiêm BA cho dự án này
- Auto-flag: Assignment, bài giảng, Approve -> `[ALIGNMENT NEEDED]`
