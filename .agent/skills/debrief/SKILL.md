---
description: "Ket thuc session. Update boards, backlog, ghi INBOX, update STATUS, notify Telegram, merge branch vao main, push. Dung khi user noi 'Debrief', 'Fold', 'checkout'."
globs:
alwaysApply: false
---
# SKILL: DEBRIEF

> Aliases: **Fold**, **Checkout** (backward compatible voi Poker protocol)

## PURPOSE
Ket thuc session lam viec. Update boards, commit, merge vao main, push.
"Work is not done until pushed to main."

## WHEN TO USE
- User noi "Debrief", "Fold", "Checkout"
- Khi hoan thanh task hoac ket thuc session

## LOGIC

### Step 1: Summary
List ra nhung gi da lam trong session nay.
- Task da hoan thanh
- Task con dang do (IN_PROGRESS)
- Blocker (neu co)
- Ghi ro: task nao de lai cho agent tiep theo

### Step 2: Update Board
- Update `projects/[Project]/warroom/PROJECT_BOARD.md` (task status → DONE/IN_PROGRESS)
- Neu la PM: update BACKLOG + sprint detail
- Task dang IN_PROGRESS ma chua xong → giu IN_PROGRESS, ghi note tien do
- Task da xong trong phien → set DONE + ghi Result

### Step 3: Update Sprint Detail (append-only)
- Task xong → danh dau `Done`
- Task moi → them vao bang
- Ghi 1 dong log cuoi file: `- [DATE]: [ROLE] — [tom tat viec da lam]`

### Step 4: Update Backlog
Update `projects/[Project]/warroom/PRODUCT_BACKLOG.md`:
- Sprint status neu thay doi
- Them 1 dong vao LOGS (giu 5 dong gan nhat)

### Step 5: Write INBOX Message
Ghi message vao `comms/INBOX.md` (local):
- `TASK_DONE` (neu hoan thanh task)
- `REVIEW_REQUEST` (neu can review)
- `INFO` (neu chi update tien do)

Format:
```markdown
## [YYYY-MM-DD HH:MM] [TYPE] @[ROLE] → @ROUTER
Project: [project_name]
Task: [task description]
Result: [output path or summary]
Status: PENDING
```
- Router doc file nay → notify Telegram.

### Step 6: Archive Messages (neu INBOX > 20 items)
1. Move messages co Status = DONE tu INBOX → `comms/archive/YYYY-MM.md`
2. Giu INBOX duoi **20 messages**
3. KHONG xoa file — chi archive messages DONE
4. KHONG thay doi noi dung task da DONE — chi move

### Step 7: Update Agent Status (LOCAL only)
Cap nhat block cua minh trong `comms/AGENT_STATUS.md`:
```markdown
## [Icon] @[ROLE]
Model: [model name]
Status: OFFLINE
Branch: session/{role}-{date}-{time}
Task: [tom tat ngan nhung gi da lam]
Since: [YYYY-MM-DD HH:MM]
```
- LOCAL only — KHONG commit file nay.

### Step 8: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
Gui thong bao: DEBRIEF DONE — agent OFFLINE.

### Step 9: Git — Merge to Main
```bash
# 1. Commit changes on session branch
git add [changed files]
git commit -m "[role]([project]): [summary of changes]"

# 2. Push session branch
git push origin session/{role}-{date}-{time}

# 3. Merge to main
git checkout main
git pull origin main
git merge session/{role}-{date}-{time}

# 4. If no conflict → push main
git push origin main

# 5. Cleanup session branch
git branch -d session/{role}-{date}-{time}
git push origin --delete session/{role}-{date}-{time}
```

### Step 10: Confirm
```
Debrief [ROLE] | [Project]
Da lam: [1-3 bullet points]
De lai: [task pending cho agent tiep theo]
Updated: [files]
INBOX: [message type] — ✅ Telegram notified
Archived: [N] messages
Git: merged to main + pushed
Session closed.
```

## RULES
- PHAI commit truoc khi coi task la DONE
- PHAI push to main truoc khi dong session
- INBOX message = notification ngan, tro toi file chi tiet
- AGENT_STATUS.md = LOCAL only, KHONG commit vao git
- Telegram Notify BAT BUOC: xem `.agent/rules/global/telegram-notify.md`
- Khong co thay doi → bao "Khong co gi can commit."
- Git merge conflict → STOP → bao user resolve. KHONG force merge.
- KHONG git push --force
- KHONG xoa file — chi archive messages DONE

## EDGE CASES
- Khong co thay doi → bao "Khong co gi can commit."
- Board/sprint chua doc → yeu cau Brief truoc
- Git push fail → bao loi, commit van giu local. Thu lai hoac bao user.
- Merge conflict → STOP → list conflicted files → bao user/Router resolve
