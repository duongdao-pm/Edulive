# BRIEF DEV FE — EDU-001 Triển khai Hội Hợp B

## Project

```yaml
project_id: EDU-001
project_name: Triển khai Hội Hợp B (B2C — Có Cloud)
fe_lead: Chiến
```

## QUY TẮC BẮT BUỘC

```
PHẢI: Dùng luồng code CŨ (Legacy)
KHÔNG ĐƯỢC: Dùng bản Native cho Hội Hợp B
KHÔNG ĐƯỢC: Merge code luồng mới vào luồng cũ
```

## Tech stack

```yaml
framework: Luồng cũ (Legacy) — KHÔNG phải Native build
note: Hưng làm bài tập mới TRÊN NỀN luồng cũ
```

## Action Items (từ meeting 23/02)

| # | Task | Người | Ưu tiên | Phụ thuộc | Status |
|---|------|-------|---------|-----------|--------|
| FE-1 | Ghép API đồng bộ Server Biên (từ API list của Lực) | **Chiến** | HIGH | BE-3 (Lực xong API list) | Pending |
| FE-2 | Hoàn thiện Search Filter nhóm tra cứu nội dung | **Chiến** | MEDIUM | — | Done |
| FE-3 | Module 3D/5D + luồng tạo bài tập mới (luồng CŨ) | **Hưng** | HIGH | — | In Progress |

## Known Issues

- **JSON format lệch**: Java API trả camelCase, PHP cũ dùng snake_case -> Chiến đang rà soát UI vênh
- **Luồng Assignment bị lệch**: Chiến (FE) và Anh Ngọc (Tech Lead) hiểu khác nhau -> PM đang can thiệp, chờ chốt bằng document/flowchart

## Đề xuất từ PM

- FE-2 (Search Filter) có thể delay sau Hội Hợp B để Chiến focus FE-1 (ghép API sync) — chờ PM quyết
- Hưng cần được confirm rõ ràng: "Hội Hợp B = luồng CŨ, KHÔNG Native" trước khi code

## Notes

- Chiến là key person risk (HIGH): Social + API Sync + Search + Approve
- Hưng cũng đang xử lý module 3D/5D song song
