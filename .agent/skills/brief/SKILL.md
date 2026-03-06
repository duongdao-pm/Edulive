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
git checkout -b session/{role}-{date}-{time} origin/master
```
- Luon lam viec tren branch rieng, based on latest master
- Neu da co branch session → `git pull` de cap nhat

### Step 1: Identify Role
Xac nhan role: HEAD / ROUTER / PM / BA / QC / DEV_BE / DEV_FE / AI / SYNC
Neu user noi "Brief DEV" → role = DEV_BE. Neu chua ro → hoi user.

### Step 2: Read Rules
Doc `.agent/rules/global/` → biet minh KHONG duoc lam gi (role-boundaries, no-fabrication, git-workflow, telegram-notify...)

### Step 3: Read Brief
**Theo role:**
- PM/HEAD/ROUTER/DEV/AI: doc `_context/BRIEF_[ROLE].md` (workspace level)
  + Neu co project brief → doc them `0.1 0.1 projects/[Project]/_context/BRIEF_[ROLE].md`
- **BA**: doc `0.2 Team/0.1 BA/BRIEF_BA.md`
  + Doc tasks: `0.2 Team/0.1 BA/TASKS/` (cac file .md)
  + Doc shared data: `0.2 Team/TRANG_THAI_DU_LIEU.md`
- **QC**: doc `0.2 Team/0.2 QC/BRIEF_QC.md`
  + Doc tasks: `0.2 Team/0.2 QC/TASKS/` (cac file .md)
  + Doc shared data: `0.2 Team/TRANG_THAI_DU_LIEU.md`

### Step 4: Read Board (phan nhanh theo vi tri)

**PM (tat ca projects):**
1. Doc `product/COMPANY_CONTEXT.md`
2. Scan **TAT CA** `0.1 projects/*/warroom/PROJECT_BOARD.md`
3. Doc `_hq/MASTER_BOARD.md` — tat ca tags
4. Bao cao cross-project: moi du an co gi, task pending, uu tien

**HEAD / ROUTER:**
- Doc `_hq/MASTER_BOARD.md` + `_hq/HEALTH_DASHBOARD.md`
- ROUTER: scan `0.1 projects/*/comms/INBOX.md`

**BA (cross-project — collect product info):**
1. Doc `0.2 Team/0.1 BA/BRIEF_BA.md` + tat ca files trong `TASKS/`
2. Doc `0.2 Team/TRANG_THAI_DU_LIEU.md` — biet data nao co/thieu
3. Scan `product/` — PRODUCT_REGISTRY, KNOWLEDGE_BASE
4. Scan `_resources/` — HDKT, HDSD, BRD/FRD
5. Bao cao: progress collect, gap nao con thieu

**QC (cross-project — verify features):**
1. Doc `0.2 Team/0.2 QC/BRIEF_QC.md` + tat ca files trong `TASKS/`
2. Doc `0.2 Team/TRANG_THAI_DU_LIEU.md` — biet data nao co/thieu
3. Scan `0.1 projects/*/qa/` — test results, bug reports
4. Bao cao: progress verify, test nao da lam, con thieu

**Lead (cross-project by role — Dev BE, Dev FE, AI):**
1. Doc `product/COMPANY_CONTEXT.md`
2. Scan **TAT CA** `0.1 projects/*/warroom/PROJECT_BOARD.md`
3. Doc `_hq/MASTER_BOARD.md` — loc tag minh **tu moi du an**
4. Bao cao: moi du an role minh dang lam gi, task pending

**Member (1 du an):**
1. Doc `product/COMPANY_CONTEXT.md`
2. Doc `0.1 0.1 projects/[Project]/warroom/PROJECT_BOARD.md`
3. Doc INBOX — loc tag minh + `Project: [Project]`
4. Bao cao: du an nay dang o dau, task pending

### Step 5: Read Backlog
Doc `0.1 projects/[Project]/warroom/PRODUCT_BACKLOG.md`

### Step 6: Read Sprint Detail
Neu co sprint active → doc file sprint detail duoc link trong backlog.

### Step 7: Read INBOX (awareness only)
Doc `0.1 projects/[Project]/comms/INBOX.md` → dem PENDING messages.
Chi doc va bao cao — KHONG xu ly. Xu ly la viec cua Dispatch.

### Step 8: Update Agent Status
Ghi/cap nhat block cua minh trong `0.1 projects/[Project]/comms/AGENT_STATUS.md`:
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
