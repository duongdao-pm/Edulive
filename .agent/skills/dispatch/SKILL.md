---
description: "Xu ly pending tasks va messages. Router dispatch cho dung team. Agent tu xu ly inbox. Dung khi user noi 'Dispatch', 'Call', 'Call [TAG]'."
globs:
alwaysApply: false
---
# SKILL: DISPATCH

> Aliases: **Call**, **Checkinbox** (backward compatible voi Poker protocol)

## PURPOSE
Xu ly pending tasks va messages. Router scan va dispatch cho dung team/project.
Agent cung co the tu xu ly INBOX cua minh.

## WHEN TO USE
- User noi "Dispatch", "Call", "Call [TAG]"
- User noi "Call [PROJECT-ID]" (chi Lead o cross-project)
- Router session can xu ly pending items
- Agent muon xu ly PENDING messages gui cho minh

## LOGIC

### Step 1: Scan Sources
**Neu la ROUTER:**
1. Doc `_hq/MASTER_BOARD.md` → filter PENDING tasks
2. Scan `projects/*/comms/INBOX.md` → filter PENDING messages (TASK_DONE, ESCALATION, etc.)
3. Doc `_hq/incoming/QUEUE.md` → check queued items (tu /msg hoac Alo)

**Neu la PM:**
1. Doc `_hq/MASTER_BOARD.md` — TAT CA tags
2. Scan `projects/*/comms/INBOX.md` — TAT CA messages
3. Doc `_hq/incoming/QUEUE.md`

**Neu la AGENT (self-service):**
1. Doc `projects/[Project]/comms/INBOX.md`
2. Filter: `Status: PENDING` va `@to` match role hien tai

### Step 2: Tag Filter (BAT BUOC)
- Neu user noi `Dispatch [TAG]` / `Call [TAG]` (VD: `Call [BA]`) → chi xu ly PENDING co tag do
- Neu user noi `Call [PROJECT-ID]` (VD: `Call EDU-001`) → chi xu ly task cua du an do
- Neu user noi `Dispatch` / `Call` (khong tag) → scan PENDING:
  - Neu **nhieu hon 1 tag** → **HOI USER** chon tag nao truoc (liet ke tag + tom tat 1 dong)
  - Neu chi 1 tag → xu ly luon

### Step 3: Process Each Item

**Router dispatch:**
1. Identify: project? team? model? priority?
2. Classify using dispatch rules (`.agent/rules/router/dispatch_rules.md`)
3. Write TASK_ASSIGNED to `projects/[Project]/comms/INBOX.md`
4. Sync task to `projects/[Project]/warroom/PROJECT_BOARD.md`
5. Update `_hq/MASTER_BOARD.md` status
6. Log to `_hq/DISPATCH_LOG.md` (BAT BUOC — moi dispatch phai log)

**Agent self-service:**
1. Update `Status: PENDING` → `Status: IN_PROGRESS`
2. Doc `Task/Request` va `Context`
3. Thuc thi task (research, tao file, phan tich...)
4. Dien ket qua vao `Result:`
5. Update `Status: IN_PROGRESS` → `Status: DONE`

### Step 4: Archive (cho messages DONE)
1. Append message DONE vao `comms/archive/YYYY-MM.md`
   - Tao file moi neu chua co (theo thang hien tai)
   - Group messages theo ngay (`## YYYY-MM-DD`)
2. Xoa message DONE khoi INBOX (archive da luu)
3. Giu lai **20 messages gan nhat** trong INBOX

### Step 5: Notify
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
- Update AGENT_STATUS.md (WORKING khi xu ly, DONE khi xong)
- Moi TASK_ASSIGNED, TASK_DONE, ESCALATION → notify Telegram

### Step 6: Route Back (Router only)
For TASK_DONE messages:
1. Update MASTER_BOARD (status → DONE)
2. Update progress tracking
3. Notify Telegram
4. If needs QC → create new TASK_ASSIGNED for QC
5. If needs review → route REVIEW_REQUEST to PM

### Step 7: Report
```
Dispatch Complete:
- [X] tasks dispatched / processed
- [X] messages archived
- [X] TASK_DONE synced
- [X] escalations routed
✅ Telegram notified
```

## STATUS FLOW
```
PENDING ──nhan task──► IN_PROGRESS ──xong──► DONE
                            │
                            ├── blocked → ghi ly do, Msg nguoc lai sender
                            └── can clarify → giu IN_PROGRESS, hoi sender
```

## EDGE CASES
- Inbox trong: "Inbox trong, khong co task nao cho [ROLE]."
- Task bi blocked: Ghi `Result: BLOCKED — [ly do]`, giu status `IN_PROGRESS`
- Nhieu messages: Xu ly lan luot theo thoi gian (cu truoc)
- DISPATCH_LOG day: giu 100 entries gan nhat, archive cu
