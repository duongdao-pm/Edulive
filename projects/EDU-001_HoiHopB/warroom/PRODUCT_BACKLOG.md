# PRODUCT BACKLOG — EDU-001 Triển khai Hội Hợp B

## Tổng quan

| Dự án | Trạng thái | Priority | Deadline | Tiến độ |
|-------|-----------|----------|----------|---------|
| EDU-001 Hội Hợp B | Đang triển khai | HIGH | Chưa chốt | 15% |

## Master Task Registry

| Task ID | Team | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên | Blocked by | Nguồn |
|---------|------|-------|-------|---------|------------|---------|------------|-------|
| EDU001-BE-001 | BE | Kafka sync kết quả bài tập | Diện | 40% | Đang xử lý | Cao | — | Onboarding |
| EDU001-BE-002 | BE | Tạo tiết/bài tập Offline Server Biên | Diện | 0% | Pending | Cao | EDU001-BE-001 | Onboarding |
| EDU001-BE-003 | BE | API đồng bộ Server Biên lên Cloud | Lực | 0% | Pending | Trung bình | EDU001-BE-001 | Onboarding |
| EDU001-BE-004 | BE | Hạ tầng test đồng bộ Server Biên — dùng sv17 + backup | Lực | 0% | Pending | Cao | — | BOARD 02/03 |
| EDU001-FE-001 | FE | Ghép API đồng bộ Server Biên | Chiến | 0% | Pending | Cao | EDU001-BE-003 | Onboarding |
| EDU001-FE-002 | FE | Search Filter nhóm tra cứu (bug fix) | Chiến, Lực | 100% | Done | Trung bình | — | Alo Ngọc 27/02 |
| EDU001-FE-003 | FE | Module 3D/5D + bài tập mới (luồng CŨ) | Hưng | 10% | Đang xử lý | Cao | — | Onboarding |
| EDU001-QC-001 | QC | Test Smartroom bổ sung | — | 100% | PM Confirmed | Cao | — | Onboarding |
| EDU001-QC-002 | QC | Test Offline tạo lớp/giao bài | — | 0% | Pending | Cao | EDU001-BE-001 | Onboarding |
| EDU001-QC-003 | QC | Test JSON format lệch UI | — | 0% | New | Trung bình | — | Onboarding |
| EDU001-QC-004 | QC | Check license thiết bị + bộ cài trước triển khai VP | — | 0% | Pending | Cao | — | BOARD 02/03 |
| EDU001-BA-001 | BA | Flowchart luồng Assignment | PM kiêm | 0% | New | Cao | — | BOARD |
| EDU001-BA-002 | BA | Quy trình Approval bài giảng | PM kiêm | 0% | New | Cao | — | BOARD |
| EDU001-BA-003 | BA | User Stories Offline | PM kiêm | 0% | New | Cao | — | BOARD |

## Dependency Chain

```
EDU001-BE-001 (Kafka sync - Diện)
  -> EDU001-BE-002 (Offline tiết/bài - Diện)
  -> EDU001-BE-003 (API đồng bộ - Lực)
     -> EDU001-FE-001 (Ghép API sync - Chiến)
        -> EDU001-QC-002 (Test Offline)
           -> Go-live Hội Hợp B
```
