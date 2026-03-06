---
description: "Parse tin nhan stakeholder, cross-check context, de xuat action. CHI PM Agent. Dung khi user noi 'Alo [nguoi] bao [noi dung]'."
globs:
alwaysApply: false
---
# SKILL: ALO (= Tin nhắn stakeholder — CHỈ PM)

## PURPOSE
Parse tin nhắn vụn vặt từ stakeholder, đề xuất action.
**CHỈ PM Agent xử lý.** Nếu bạn không phải PM → trả lời: "Alo chỉ dành cho PM Agent."

## WHEN TO USE
- User nói "Alo [người] bảo/nói/nhắn [nội dung]"
- User nói "/alo [người] bảo [nội dung]"
- PM nhận tin nhắn miệng/chat từ stakeholder cần phân tích

## LOGIC

### Step 1: Parse
```
Alo <người_gửi> bảo|nói|nhắn <nội_dung>
```

Extract:
1. **Người gửi** — tên, vai trò (cross-check `product/COMPANY_CONTEXT.md`)
2. **Nội dung** — nguyên văn tin nhắn
3. **Dự án liên quan** — detect từ keywords

### Step 1.5: Telegram Notify — ALO_RECEIVED (BAT BUOC)
Ngay sau khi parse xong, TRUOC khi phan tich → notify Telegram:
```
📞 ALO_RECEIVED — @PM
From: [Nguoi gui] ([Vai tro])
Flags: [AUTO-FLAGS neu co]
Noi dung: [tom tat 1 dong]
[YYYY-MM-DD HH:MM]
```
Muc dich: team biet ngay co yeu cau moi tu stakeholder, KHONG doi den khi xu ly xong.

### Step 2: Cross-check COMPANY_CONTEXT.md
- Đọc `product/COMPANY_CONTEXT.md`
- Map người gửi → vai trò, quyền hạn
- Map keywords → dự án, product, team

### Step 3: Auto-flag Keywords

| Keyword | Flag |
|:---|:---|
| Kafka, đồng bộ, offline, Server Biên | `[HIGH PRIORITY]` |
| Native, Legacy, HHB, đóng gói, merge | `[VERSION RISK]` |
| Assignment, Approve, camelCase | `[ALIGNMENT NEEDED]` |
| Sếp, TGĐ, deadline, release | `[STAKEHOLDER PRESSURE]` |
| STEM Room, EDL750s, Tool 2d | `[STEM DEPLOYMENT]` |

### Step 4: Phân tích
1. **Loại yêu cầu**: Info request / Task mới / Blocker / Escalation / Feature request
2. **Mức độ**: Routine / Cần action / Urgent
3. **Dự án**: EDU-XXX nào?

### Step 5: Đề xuất Action → CHỜ USER DUYỆT
PM Agent đề xuất:
- Trả lời stakeholder (draft response)
- Raise task cho team (→ trigger `/msg`)
- Lưu vào backlog
- Cần thêm thông tin → hỏi user

**LUÔN CHỜ USER DUYỆT trước khi thực hiện.**

### Step 6: Execute (sau khi user duyệt)
- Nếu cần Msg → trigger `/msg @[ROLE] [task]`
- Nếu cần lưu → ghi vào `_hq/incoming/QUEUE.md`
- Nếu cần trả lời → draft cho user gửi

### Step 7: Telegram Notify — ALO_DONE (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
Notify khi da xu ly xong (sau user duyet):
```
✅ ALO_DONE — ALO-[STT]
From: [Nguoi gui]
Action: [Tao task / Msg @ROLE / Tra loi]
Tasks: [Task IDs da tao]
Status: DONE | PENDING_ACTION | WAITING_INFO
[YYYY-MM-DD HH:MM]
```

### Step 8: Ghi ALO LOG (BAT BUOC)
Ghi vao `_hq/ALO_LOG.md` — **BAT BUOC moi ALO deu phai log**:
```markdown
### [YYYY-MM-DD HH:MM] ALO-[STT]
- **Nguoi gui**: [Ten] ([Vai tro])
- **Noi dung goc**: [Nguyen van tin nhan]
- **Flags**: [AUTO-FLAG keywords]
- **Phan tich**: [PM tom tat: loai yeu cau, muc do, du an]
- **Action**: [Da lam gi — VD: Tao task, Msg @BE, Tra loi]
- **Task IDs**: [Task da tao tu ALO nay]
- **Trang thai**: DONE | PENDING_ACTION | WAITING_INFO | REJECTED
```
- Moi nhat ghi o tren (reverse chronological)
- STT tang dan: ALO-001, ALO-002...
- Day la single source of truth cho yeu cau stakeholder

## VÍ DỤ

### Ví dụ 1 — Sếp hỏi tiến độ
```
User: Alo sếp TA bảo Báo cho anh phần đóng gói VP tình trạng thế nào

Agent PM:
  → Người gửi: Sếp Tuấn Anh (TGĐ) — auto-flag [STAKEHOLDER PRESSURE]
  → Keyword: "đóng gói" → [VERSION RISK], "VP" → EDU-001 HHB
  → Loại: Yêu cầu thông tin
  → Action: Check workspace → draft báo cáo tiến độ
  → CHỜ USER DUYỆT
```

### Ví dụ 2 — Dev báo blocker
```
User: Alo Diện nói API sync chưa xong, chặn FE 2 ngày

Agent PM:
  → Người gửi: Diện (Dev BE — key person)
  → Keyword: "sync" → [HIGH PRIORITY], "chặn" → blocker
  → Loại: Blocker → cần Msg [FE] + update risk log
  → Action: Đề xuất /msg @DEV_FE thông báo delay
  → CHỜ USER DUYỆT
```

### Ví dụ 3 — Khách hàng yêu cầu mới
```
User: Alo cô Hương bảo muốn thêm tính năng xuất PDF cho báo cáo

Agent PM:
  → Người gửi: Cô Hương (stakeholder)
  → Loại: Feature request mới → cần BA phân tích
  → Action: Đề xuất lưu backlog + /msg @BA research
  → CHỜ USER DUYỆT
```

## RULES
- **CHỈ PM** — agent khác gọi Alo → từ chối
- **LUÔN CHỜ USER DUYỆT** trước khi thực hiện bất kỳ action nào
- Mỗi message = 1 phân tích (không gộp nhiều tin nhắn)
- Cross-check COMPANY_CONTEXT.md trước khi đề xuất
- Tự detect Project từ keywords, hoặc hỏi user nếu không rõ

## EDGE CASES
- **Không rõ người gửi**: `"Alo ai đó nói deadline dời sang T3"` → PM hỏi user: "Ai nhắn?"
- **Không rõ dự án**: Nội dung không match keyword → PM hỏi user xác nhận
- **Nhiều flags**: List tất cả flags, ưu tiên HIGH PRIORITY trước
