# PROJECT BOARD — EDU-001 Triển khai Hội Hợp B
**Status**: Đang triển khai | **Priority**: CRITICAL | **Last updated**: 06/03/2026

## Current Priorities

- **CRITICAL — Triển khai nốt 1 phòng Vĩnh Phúc thứ 2 (09/03)**: Cần chuẩn bị checklist triển khai
- **CRITICAL — Chuyển server dev → product**: Dev team cần chuyển đổi, QC cần test lại toàn bộ trước T2
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
| EDU001-QC-004 | Check license thiết bị + bộ cài trước triển khai VP | Đào | 100% | Done | Cao | — |
| EDU001-QC-005 | Test lại toàn bộ sau chuyển server dev → product | QC team | 0% | Pending | Critical | EDU000-DEV-001 |

### PM / Deployment

| Task ID | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU001-PM-001 | Triển khai nốt 1 phòng Vĩnh Phúc thứ 2 (09/03) | PM | 0% | Chuẩn bị | Critical | EDU000-DEV-001 |
| EDU000-DEV-001 | Chuyển đổi server từ sv dev sang product — cần test lại | Dev team | 0% | Đang xử lý | Critical | — |

### BA Team

| Task ID | Mô tả | Người | Tiến độ | Trạng thái | Ưu tiên |
|---------|-------|-------|---------|------------|---------|
| EDU001-BA-001 | Flowchart luồng Assignment | PM kiêm | 0% | New | Cao |
| EDU001-BA-002 | Quy trình Approval bài giảng | PM kiêm | 0% | New | Cao |
| EDU001-BA-003 | User Stories Offline | PM kiêm | 0% | New | Cao |

## Risk Highlights

- CRITICAL **Triển khai VP thứ 2 (09/03)** (EDU001-PM-001): Cần hoàn thành chuyển server + test trước T2
- CRITICAL **Chuyển server dev → product** (EDU000-DEV-001): Toàn bộ product cần re-test sau migration
- HIGH **Lực chưa có hạ tầng test** (EDU001-BE-004): Đồng bộ Server Biên cần sv17 + backup
- HIGH **Bottleneck**: Diện (BE) giữ nhiều task (Kafka + Offline)
- HIGH **Bottleneck**: Chiến (FE) key person — Social + Sync + Search + Approve
- ~~DONE **License thiết bị** (EDU001-QC-004): Đào đã test xong~~
- MEDIUM **Alignment**: Luồng Assignment (EDU001-BA-001) — FE và Lead hiểu lệch
- MEDIUM **Versioning**: Nguy cơ code đè Legacy <-> Native

## Tiến độ tổng

| Team | Total | Done | In Progress | Pending | New |
|------|-------|------|-------------|---------|-----|
| BE | 4 | 0 | 1 | 3 | 0 |
| FE | 3 | 1 | 1 | 1 | 0 |
| QC | 5 | 2 | 0 | 2 | 1 |
| PM/Deploy | 2 | 0 | 1 | 1 | 0 |
| BA | 3 | 0 | 0 | 0 | 3 |
| **Tổng** | **17** | **3** | **3** | **7** | **4** |
