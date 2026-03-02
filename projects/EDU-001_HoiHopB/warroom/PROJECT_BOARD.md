# PROJECT BOARD — EDU-001 Triển khai Hội Hợp B
**Status**: Đang triển khai | **Priority**: HIGH | **Last updated**: 02/03/2026

## Current Priorities

- **Cài VP chiều T3 04/03**: Sếp TA chỉ đạo. sv252 bug 3D đã fix, QC retest
- **Kafka sync (BE-1)**: Diện đang xử lý — đầu chuỗi dependency
- **Hạ tầng test đồng bộ Server Biên**: Lực cần sv17 + backup

## Task Board

### BE Team

| Task ID | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU001-BE-001 | Kafka sync kết quả bài tập | Diện | 40% | Đang xử lý | Cao | — |
| EDU001-BE-002 | Tạo tiết/bài tập Offline Server Biên | Diện | 0% | Pending | Cao | EDU001-BE-001 |
| EDU001-BE-003 | API đồng bộ Server Biên lên Cloud | Lực | 0% | Pending | Trung bình | EDU001-BE-001 |
| EDU001-BE-004 | Hạ tầng test đồng bộ Server Biên — dùng sv17 + backup | Lực | 0% | Pending | Cao | — |

### FE Team

| Task ID | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU001-FE-001 | Ghép API đồng bộ Server Biên | Chiến | 0% | Pending | Cao | EDU001-BE-003 |
| EDU001-FE-002 | Search Filter nhóm tra cứu (bug fix) | Chiến, Lực | 100% | Done | Trung bình | — |
| EDU001-FE-003 | Module 3D/5D + bài tập mới (luồng CŨ) | Hưng | 10% | Đang xử lý | Cao | — |

### QC Team

| Task ID | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU001-QC-001 | Test Smartroom bổ sung | — | 100% | PM Confirmed | Cao | — |
| EDU001-QC-002 | Test Offline tạo lớp/giao bài | — | 0% | Pending | Cao | EDU001-BE-001 |
| EDU001-QC-003 | Test JSON format lệch UI | — | 0% | New | Trung bình | — |
| EDU001-QC-004 | Check license thiết bị + bộ cài trước triển khai VP | — | 0% | Pending | Cao | — |

### BA Team

| Task ID | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên |
|---------|-------|-------|---------|------------|---------|
| EDU001-BA-001 | Flowchart luồng Assignment | PM kiêm | 0% | New | Cao |
| EDU001-BA-002 | Quy trình Approval bài giảng | PM kiêm | 0% | New | Cao |
| EDU001-BA-003 | User Stories Offline | PM kiêm | 0% | New | Cao |

## Risk Highlights

- HIGH **Cài VP chiều T3 04/03** (EDU001-PM-001): Sếp TA chỉ đạo
- HIGH **Lực chưa có hạ tầng test** (EDU001-BE-004): Đồng bộ Server Biên cần sv17 + backup
- HIGH **Bottleneck**: Diện (BE) giữ nhiều task (Kafka + Offline)
- HIGH **Bottleneck**: Chiến (FE) key person — Social + Sync + Search + Approve
- MEDIUM **License thiết bị** (EDU001-QC-004): QC cần check trước triển khai VP
- MEDIUM **Alignment**: Luồng Assignment (EDU001-BA-001) — FE và Lead hiểu lệch
- MEDIUM **Versioning**: Nguy cơ code đè Legacy <-> Native

## Tiến độ tổng

| Team | Total | Done | In Progress | Pending | New |
|------|-------|------|-------------|---------|-----|
| BE | 4 | 0 | 1 | 3 | 0 |
| FE | 3 | 1 | 1 | 1 | 0 |
| QC | 4 | 1 | 0 | 2 | 1 |
| BA | 3 | 0 | 0 | 0 | 3 |
| **Tổng** | **14** | **2** | **2** | **6** | **4** |
