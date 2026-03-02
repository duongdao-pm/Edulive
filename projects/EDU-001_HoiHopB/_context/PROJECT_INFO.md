# [EDU-001] Triển khai Hội Hợp B

## Thông tin chung

| Mục | Chi tiết |
|-----|----------|
| Mã dự án | EDU-001 |
| Tên dự án | Triển khai Hội Hợp B (B2C — Có Cloud) |
| Stakeholder | Sếp Tuấn Anh (TGĐ), Đội Triển khai |
| PM | Ethan (Dương Đào) |
| Ngày bắt đầu | 23/02/2026 (Kick-off) |
| Deadline | Chưa chốt — PM cần lấy lịch triển khai |
| Trạng thái | Đang triển khai |
| Priority | HIGH |

## Mô tả

Triển khai hệ sinh thái Edulive tại Hội Hợp B theo mô hình B2C có Cloud. Sử dụng **luồng code CŨ (Legacy)** kết hợp luồng tạo bài tập mới — KHÔNG dùng Native Image. Hạ tầng: 2 Server Biên + 70 Tablet + 5 dự phòng. Cần hoàn thiện Edge Server Sync (Kafka) và vận hành Offline trước khi cài đặt.

## QUY TẮC BẮT BUỘC

```
PHẢI: Dùng luồng code CŨ (Legacy) — bản hiện tại
KHÔNG ĐƯỢC: Code đè luồng mới (Native) vào bản này
KHÔNG ĐƯỢC: Build Native Image cho đợt triển khai này
```

## Team phân công

| Vai trò | Thành viên | Agent hỗ trợ |
|---------|-----------|--------------|
| PM | Ethan | PM Agent |
| Tech Lead | Anh Ngọc | — |
| Dev BE | Diện (key), Lực, Dũng | Dev BE Agent |
| Dev FE | Chiến (key), Hưng | Dev FE Agent |
| QC | Chưa assign | QC Agent |
| BA | Chưa assign (sẽ bổ sung) | BA Agent |

## Milestones

| # | Milestone | Deadline | Status |
|---|-----------|----------|--------|
| 1 | Kick-off | 23/02/2026 | Done |
| 2 | Kafka sync kết quả bài tập (Diện) | Chờ ETA | Pending |
| 3 | Offline tạo tiết/bài tập trên Server Biên (Diện) | Chờ ETA | Pending |
| 4 | API đồng bộ Server Biên hoàn thành (Lực + Chiến) | Chờ ETA | Pending |
| 5 | Luồng tạo bài tập mới trên luồng cũ (Hưng) | Chờ ETA | Pending |
| 6 | Cài 2 Server Biên + 70 Tablet | Chưa có lịch | Pending |
| 7 | Go-live Hội Hợp B | Chưa chốt | Pending |

## Decision Log

| Ngày | Quyết định | Người quyết định | Ghi chú |
|------|-----------|------------------|---------|
| 23/02/2026 | Hội Hợp B dùng luồng CŨ, KHÔNG Native | Sếp Tuấn Anh + Team | Chốt tại kick-off |
| 23/02/2026 | Sync: Kafka (lên), Sync API (xuống), 30p/lần | Anh Ngọc | Không sync "Kênh của tôi" |
| 23/02/2026 | Product Team tự quản, Sếp focus Agentic AI | Sếp Tuấn Anh | PM chủ động hơn |

## Dependency Chain

```
Diện: Kafka sync (BE-1)      Lực: API list (BE-3)
   │                             │
   ▼                             ▼
Diện: Offline tiết/bài (BE-2)  Chiến: Ghép API sync (FE-1)
   │                             │
   └──────────┬──────────────────┘
              ▼
      Server Biên vận hành Offline
              │
              ▼
      Cài đặt 2 Server Biên + 70 Tablet
              │
              ▼
      Go-live Hội Hợp B
```

## Nguồn gốc

- Meeting minutes: `_inbox/raw/2026-02-23_meeting_kickoff_hoihopb_nexta.md`
- Phân tích: `_inbox/processing/2026-02-23_meeting_kickoff_ANALYSIS.md`
