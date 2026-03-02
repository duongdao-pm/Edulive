---
description: "Gui message qua Router queue. Dung de giao viec hoac hoi nhanh agent khac. Aliases: 'msg', 'Raise', 'gui message', 'hoi DEV'."
globs:
alwaysApply: false
---
# SKILL: MSG

> Aliases: **Raise** (backward compatible voi Poker protocol)

## PURPOSE
Gui message cho 1 agent cu the thong qua Router queue.
Message duoc ghi vao `_hq/incoming/QUEUE.md` — Router se dispatch vao dung project INBOX.

## WHEN TO USE
- User noi "/msg @DEV_BE lay logs ngay 01/03"
- User noi "Raise [BA] Phan tich luong offline GV tao lop"
- User noi "gui message cho BA", "hoi DEV ve bug nay"
- Khi PM/Lead can giao viec nho hoac hoi nhanh

## LOGIC

### Step 1: Parse Message
Tu cau user noi, extract:
1. **@to** — role nhan (DEV_BE, DEV_FE, BA, QC, AI, SYNC, PM...)
2. **message** — noi dung can gui
3. **project** — auto-detect tu context hoac hoi user

Cac pattern hop le:
- `/msg @DEV_BE [noi dung]`
- `Raise [BA] [noi dung]`
- `Raise [TAG] [noi dung]` (legacy format)
- `gui message cho [ROLE] [noi dung]`

### Step 2: Classify Type
- **QUERY** — hoi thong tin, yeu cau data, check status
  - VD: "lay logs", "kiem tra stock", "status task X"
- **TASK_ASSIGNED** — giao viec cu the
  - VD: "fix bug Y", "research API Z", "viet spec cho feature A"

### Step 3: Write to Router Queue
Ghi formatted message vao `_hq/incoming/QUEUE.md`:

```markdown
## [YYYY-MM-DD HH:MM] [TYPE] @[FROM_ROLE] → @[TO_ROLE]
Project: [project_name]
Task: [message content]
Context: [duong dan file lien quan]
Priority: [LOW/MEDIUM/HIGH — default MEDIUM]
Status: PENDING
```

### Step 4: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
- Notify Telegram: MSG queued @FROM → @TO

### Step 5: Report
```
Msg queued: [TYPE] cho @[TO_ROLE] | [Project]
Router se dispatch khi co session.
✅ Telegram notified
```

## TAGS HOP LE

| Tag | Gui den |
|:---|:---|
| `[PM]` | PM Agent |
| `[BA]` | BA Agent |
| `[QC]` | QC Agent |
| `[BE]` | Dev BE Agent |
| `[FE]` | Dev FE Agent |
| `[AI]` | AI Agent |
| `[SYNC]` | Sync Agent |
| `[GENERAL]` | Tat ca |

## RULES
- KHONG ghi truc tiep vao project `comms/INBOX.md`
- Chi ghi vao `_hq/incoming/QUEUE.md` — Router la nguoi duy nhat dispatch
- Luon cho user duyet truoc khi ghi — moi message = 1 task (khong gop nhieu task)
- Context phai tro den file cu the (khong copy noi dung)
- PM co the Msg cho bat ky role nao
- Agent chuyen mon chi Msg cho PM hoac role lien quan (VD: BA → PM, BE → FE)
- Neu khong ro project → HOI USER
- Neu khong ro role → HOI USER

## EDGE CASES
- User chi noi "gui message" khong co @to → hoi: "Gui cho ai?"
- User gui cho chinh minh → bao: "Khong can gui cho chinh minh. Tu xu ly luon."
- QUEUE.md day → giu 50 entries gan nhat, archive cu vao `_hq/archive/queue/YYYY-MM.md`
