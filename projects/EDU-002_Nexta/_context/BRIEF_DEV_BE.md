# BRIEF DEV BE — EDU-002 Nexta

## Project

```yaml
project_id: EDU-002
project_name: Nexta / Edulive Ecosystem
tech_lead: Anh Ngoc
```

## Tech stack

```yaml
language: Java (dang migrate tu PHP), PHP (legacy Hoi Hop B)
framework: Spring (Java moi), Laravel (PHP cu)
database: PostgreSQL / MySQL
messaging: Apache Kafka (dong bo Server Bien)
deployment: Native Image (Nexta B2B), Cloud (Hoi Hop B)
```

## Architecture notes

- **Hoi Hop B (B2C):** Luong code CU (PHP). 2 Server Bien. KHONG code de luong Native.
- **Nexta (B2B):** Native Image, 100% offline. Kafka sync 30p/lan len Cloud.
- Luong dong bo: Server Bien -> Kafka -> Database Online. Cloud -> Sync API -> Server Bien (chi Content/STEM, bo Kenh cua toi).

## Team & Tasks

| Thanh vien | Tasks chinh | Trang thai (25/02/2026) |
|---|---|---|
| **Mr Dien (KEY)** | Consume Kafka Server Bien, 2 Server Bien HHB, chuyen School Java, dong goi Native | Tap trung ban cai ban giao Nexta. Tam hoan: tao bai giang + tiet hoc offline Server Bien |
| **Luc** | API Social, API dong bo Edge len Cloud | Dang phat trien |
| **Toai** | Support Dien (PHP->Java), Server Demo, IT cung | Dang ho tro |
| **Dung** | Day data Server Bien len Kafka -> DB Online | Dang phat trien |

## Trang thai

- **Hoan thanh:** Cai dat 70 Tablet chinh + 5 Tablet du phong (Done)
- **Dang lam:** Ban cai ban giao Nexta (Mr Dien uu tien)
- **Tam hoan:** Tao bai giang + tiet hoc offline tai Server Bien (chinh sau khi xong ban cai)
- **Technical debt:** JSON format lech PHP->Java (camelCase vs snake_case)

## Notes

- Uu tien khan cap: Release ban "Secure" dong bang code
- CANH BAO: Khong mix code Hoi Hop B (cu) voi Nexta (Native)
- Kafka sync can test ky truoc khi ban giao
