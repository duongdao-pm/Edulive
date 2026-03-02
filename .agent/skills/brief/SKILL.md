---
description: "Check-in vao project. Git sync, doc context, board, backlog, inbox. Bao cao tinh hinh. Dung khi user noi 'Brief', 'Deal', 'checkin'."
globs:
alwaysApply: false
---
# SKILL: BRIEF

> Aliases: **Deal**, **Checkin** (backward compatible voi Poker protocol)

## PURPOSE
Check-in vao project. Dong bo git, doc brief theo role, boards, backlog, inbox. Xac nhan san sang lam viec.

## WHEN TO USE
- User noi "Brief", "Brief DEV", "Brief BA"
- User noi "Deal", "Checkin" (legacy triggers)
- Khi bat dau session moi hoac doi role

## LOGIC

### Step 0: Git Sync
```bash
git fetch origin
git checkout -b session/{role}-{date}-{time} origin/main
```
- Luon lam viec tren branch rieng, based on latest main
- Neu da co branch session → `git pull` de cap nhat

### Step 1: Identify Role
Xac nhan role: HEAD / ROUTER / PM / BA / QC / DEV_BE / DEV_FE / AI / SYNC
Neu user noi "Brief DEV" → role = DEV_BE. Neu chua ro → hoi user.

### Step 2: Read Rules
Doc `.agent/rules/global/` → biet minh KHONG duoc lam gi (role-boundaries, no-fabrication, git-workflow, telegram-notify...)

### Step 3: Read Brief
Doc `_context/BRIEF_[ROLE].md` (workspace level)
Neu co project brief → doc them `projects/[Project]/_context/BRIEF_[ROLE].md`

### Step 4: Read Board (phan nhanh theo vi tri)

**PM (tat ca projects):**
1. Doc `product/COMPANY_CONTEXT.md`
2. Scan **TAT CA** `projects/*/warroom/PROJECT_BOARD.md`
3. Doc `_hq/MASTER_BOARD.md` — tat ca tags
4. Bao cao cross-project: moi du an co gi, task pending, uu tien

**HEAD / ROUTER:**
- Doc `_hq/MASTER_BOARD.md` + `_hq/HEALTH_DASHBOARD.md`
- ROUTER: scan `projects/*/comms/INBOX.md`

**Lead (cross-project by role — BA, QC, Dev BE, Dev FE, AI):**
1. Doc `product/COMPANY_CONTEXT.md`
2. Scan **TAT CA** `projects/*/warroom/PROJECT_BOARD.md`
3. Doc `_hq/MASTER_BOARD.md` — loc tag minh **tu moi du an**
4. Bao cao: moi du an role minh dang lam gi, task pending

**Member (1 du an):**
1. Doc `product/COMPANY_CONTEXT.md`
2. Doc `projects/[Project]/warroom/PROJECT_BOARD.md`
3. Doc INBOX — loc tag minh + `Project: [Project]`
4. Bao cao: du an nay dang o dau, task pending

### Step 5: Read Backlog
Doc `projects/[Project]/warroom/PRODUCT_BACKLOG.md`

### Step 6: Read Sprint Detail
Neu co sprint active → doc file sprint detail duoc link trong backlog.

### Step 7: Read INBOX (awareness only)
Doc `projects/[Project]/comms/INBOX.md` → dem PENDING messages.
Chi doc va bao cao — KHONG xu ly. Xu ly la viec cua Dispatch.

### Step 8: Update Agent Status
Ghi/cap nhat block cua minh trong `projects/[Project]/comms/AGENT_STATUS.md`:
```markdown
## [Icon] @[ROLE]
Model: [model name]
Status: ONLINE
Branch: session/{role}-{date}-{time}
Task: none
Since: [YYYY-MM-DD HH:MM]
```
Icon theo model: ⚡ = Haiku/Flash, 🎵 = Sonnet/Pro, 🐙 = Opus
- Neu da co block cua role → ghi de. Neu chua co → them moi.
- Chi ghi LOCAL — KHONG commit, KHONG push.
- HEAD/ROUTER ghi vao `_hq/AGENT_STATUS.md` thay vi project.

### Step 9: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
Gui thong bao: BRIEF DONE — agent ONLINE.

### Step 10: Confirm
```
Brief [ROLE] | [Project hoac Cross-project]
Branch: session/{role}-{date}
Sprint: [active sprint] — [goal]
Pending tasks: [count]
INBOX: [pending messages count]
Status: ONLINE ✅ Telegram notified
San sang.
```

## OUTPUT FORMAT
```
Brief [ROLE] | [PROJECT hoac Cross-project]
Sprint/Phase: [neu co]
Task pending: [N] | Blocked: [N]
Tiep theo: [task uu tien cao nhat]
Status: ONLINE ✅ Telegram notified
San sang.
```

## EDGE CASES
- Chua co sprint active → "Khong co sprint active. Cho PM khoi dong."
- Role chua ro → hoi user truoc khi doc file
- HEAD/ROUTER khong co project cu the → doc _hq/ level
- Git conflict khi checkout → bao user, khong tu resolve
- Board/sprint chua doc → khong duoc Execute. Phai Brief truoc.
