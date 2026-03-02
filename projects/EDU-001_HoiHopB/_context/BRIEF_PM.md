# BRIEF PM — EDU-001 Triển khai Hội Hợp B

## Project

```yaml
project_id: EDU-001
project_name: Triển khai Hội Hợp B (B2C — Có Cloud)
start_date: 23/02/2026
deadline: CHƯA CHỐT — cần lấy lịch triển khai từ đội Triển khai
status: Đang triển khai — post kick-off
priority: High
```

## Team

| Role | Người | Capacity | Risk |
|------|-------|----------|------|
| Tech Lead | Anh Ngọc | 23 task, 3 quá hạn | Bottleneck quyết định |
| Dev BE (key) | Diện | Overloaded | Bottleneck kỹ thuật — đầu chuỗi dependency |
| Dev BE | Lực | Medium | API đồng bộ Server Biên |
| Dev BE | Dũng | Medium | Data sync Kafka |
| Dev FE (key) | Chiến | Key person | Ghép API + Search + Approve |
| Dev FE | Hưng | Medium | Module 3D/5D + bài tập mới |
| QC | Chưa assign | — | — |
| BA | Chưa assign | — | Sẽ bổ sung nguồn lực |

## Action Items của PM (từ meeting 23/02)

| # | Task | Ưu tiên | Deadline đề xuất | Status |
|---|------|---------|-----------------|--------|
| PM-1 | Map lại Status toàn bộ Product (Version, Backlog, % Finish) | HIGH | Tuần 24-28/02 | Pending |
| PM-2 | Chốt luồng Assignment với Anh Ngọc + Chiến | HIGH | Tuần 24-28/02 — book họp ngay | Pending |
| PM-3 | Thống nhất Quy trình Approval với Anh Ngọc | MEDIUM | Tuần 03-07/03 | Pending |
| PM-4 | Lấy lịch triển khai chi tiết Hội Hợp B | HIGH | Tuần 24-28/02 | Pending |

## Risks & Blockers hiện tại

- HIGH **Diện là bottleneck toàn chuỗi** — Kafka + Offline là điểm bắt đầu, trễ = toàn bộ trễ. Xem xét: Toại nhận bớt?
- HIGH **Chiến bị kéo nhiều hướng** — FE-1 (ghép API) vs FE-2 (Search Filter). Đề xuất: delay FE-2 sau Hội Hợp B
- HIGH **Anh Ngọc bottleneck quyết định** — PM cần 2 meeting (Assignment + Approval) nhưng Ngọc 23 task. Book lịch ngay, chuẩn bị document sẵn để chốt nhanh
- MEDIUM **Hưng có thể nhầm luồng** — PHẢI confirm: Hội Hợp B = luồng CŨ, KHÔNG Native
- MEDIUM **Chưa có timeline triển khai** — Không có mốc = team không có áp lực ngược

## Decisions log

| Ngày | Quyết định | Bởi |
|------|-----------|-----|
| 23/02/2026 | Hội Hợp B = luồng CŨ, KHÔNG Native | Sếp Tuấn Anh |
| 23/02/2026 | Sync: Kafka lên, Sync API xuống, 30p/lần | Anh Ngọc |
| 23/02/2026 | Không sync "Kênh của tôi" | Anh Ngọc |
| 23/02/2026 | Product Team tự quản, Sếp focus Agentic AI | Sếp Tuấn Anh |
| 23/02/2026 | Sẽ bổ sung BA + UI/UX | Sếp Tuấn Anh |

## Notes

- Sếp Tuấn Anh: micromanagement, muốn báo cáo "tầm nhìn hệ thống" + chi tiết micro
- PM cũng tham gia BA và QC cho dự án này
