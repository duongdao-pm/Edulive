---
description: "Kiem tra suc khoe he thong va compliance. Scan git log, INBOX integrity, AGENT_STATUS, stale tasks. CHI Router. Dung khi user noi 'Health check', 'Status'."
globs:
alwaysApply: false
---
# SKILL: HEALTH CHECK

## PURPOSE
Kiem tra trang thai he thong: agent health, stale tasks, unresolved escalations, **compliance violations**.
**CHI ROUTER** chay skill nay. Agent khac → tu choi.

## WHEN TO USE
- User noi "Health check", "Status", "System status"
- Router periodic check (moi Dispatch session)

## LOGIC

### Step 1: Read Dashboard
Doc `_hq/HEALTH_DASHBOARD.md`

### Step 2: Check Agent Status
Scan `_hq/AGENT_STATUS.md` + `projects/*/comms/AGENT_STATUS.md`:
- Agent nao ONLINE? OFFLINE? WORKING?
- Agent WORKING > 4h khong update → flag STALE

### Step 3: Check Stale Tasks
Scan `_hq/MASTER_BOARD.md`:
- Tasks IN_PROGRESS > 48h → flag
- Tasks ASSIGNED > 24h (chua bat dau) → flag

### Step 4: Check Escalations
Doc `_hq/ESCALATION_LOG.md`:
- Unresolved escalations → list
- Auto-escalate if past threshold:
  - LOW > 24h → bump to MEDIUM
  - MEDIUM > 48h → bump to HIGH
  - HIGH > 72h → bump to CRITICAL

### Step 5: Check INBOX
Scan `projects/*/comms/INBOX.md`:
- PENDING messages > 24h → flag
- INBOX > 20 messages → flag (can archive)

### Step 6: Compliance Audit

#### 6a: Git Log — Role Boundaries
Scan recent git log (last 20 commits):
- PM commit co chua code trong `src/`? → VIOLATION
- BA commit co chua code trong `src/`? → VIOLATION
- QC commit co chua code trong `src/`? → VIOLATION
- DEV commit co chua files trong `specs/` (sua spec)? → VIOLATION
- Router commit co chua source code? → VIOLATION

#### 6b: INBOX Integrity
Scan `projects/*/comms/INBOX.md`:
- Message nao KHONG do Router ghi (check @from)? → FLAG
- Message format sai (thieu fields bat buoc)? → FLAG

#### 6c: Dispatch Log Completeness
Check `_hq/DISPATCH_LOG.md`:
- Co dispatch nao khong duoc log? (so sanh INBOX assignments vs log entries) → FLAG

### Step 7: Update Dashboard
Ghi ket qua vao `_hq/HEALTH_DASHBOARD.md`

### Step 8: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
- Notify: HEALTH CHECK — [OK / WARNING / CRITICAL]

### Step 9: Report
```
Health Check | [timestamp]
- Agents: [online count] / [total count]
- Active tasks: [count]
- Stale tasks: [count] (list if any)
- Open escalations: [count] (list if any)
- Pending INBOX: [count]
- Compliance: [PASS / X violations]
  - Role boundary: [details if violation]
  - INBOX integrity: [details if violation]
  - Dispatch log: [details if gap]
- Overall: OK | WARNING | CRITICAL
✅ Telegram notified
```

## EDGE CASES
- Khong co git log → skip compliance audit
- DISPATCH_LOG trong → "No dispatches logged yet"
- Tat ca OK → "System healthy. No issues found."
- Nhieu violations → list tat ca, sap xep theo severity (CRITICAL → LOW)
