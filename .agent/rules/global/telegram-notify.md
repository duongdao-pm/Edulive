---
description: BAT BUOC — Moi thay doi STATUS hoac INBOX phai notify Telegram. Ap dung cho TAT CA protocol, TAT CA agent.
globs: **/*
alwaysApply: true
---

# Telegram Notify Rule (BAT BUOC — KHONG DUOC BO QUA)

## Rule
Moi khi agent thay doi `AGENT_STATUS.md` hoac ghi message vao `INBOX.md` -> PHAI notify Telegram.
Ap dung cho TAT CA protocol phases: Brief, Dispatch, Execute, Deploy, Debrief, Alo.
Ap dung cho TAT CA agent: HEAD, PM, Router, BA, QC, Dev BE, Dev FE, AI, Sync.

## Khi nao notify
| Hanh dong | STATUS | Telegram |
|:----------|:-------|:---------|
| Brief xong | ONLINE | ONLINE @ROLE |
| Bat dau task | WORKING | WORKING @ROLE |
| Bi blocked | WAITING | WAITING @ROLE |
| Task xong | DONE | DONE @ROLE |
| Dispatch task | — | TASK_ASSIGNED |
| Deploy xong | DONE | DEPLOY_READY |
| Debrief xong | OFFLINE | OFFLINE @ROLE |
| Escalation | — | ESCALATION |
| ALO tiep nhan | — | ALO_RECEIVED |
| ALO xu ly xong | — | ALO_DONE |
| Subagent hoan thanh | DONE | SUBAGENT_DONE |
| Update boards | — | UPDATE |

## Cach notify

### Buoc 1: Doc credentials
Doc file `.env` o root workspace. Neu khong co → dung gia tri trong **Telegram Config** ben duoi.

### Buoc 2: Chay curl
Agent truc tiep chay curl Telegram sau moi thay doi STATUS/INBOX.

**Linux / macOS / Git Bash:**
```bash
curl -s -X POST "https://api.telegram.org/bot8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"-5216365460","text":"[ICON] [Scope] @ROLE — STATUS\nTask: [task]\n[timestamp]"}'
```

**Windows (cmd — dung escaped quotes):**
```cmd
curl -s -X POST "https://api.telegram.org/bot8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E/sendMessage" -H "Content-Type: application/json" -d "{\"chat_id\":\"-5216365460\",\"text\":\"[ICON] [Scope] @ROLE — STATUS\\nTask: [task]\\n[timestamp]\"}"
```

**Windows (PowerShell):**
```powershell
$body = @{chat_id="-5216365460"; text="[ICON] [Scope] @ROLE — STATUS`nTask: [task]`n[timestamp]"} | ConvertTo-Json -Compress
Invoke-RestMethod -Uri "https://api.telegram.org/bot8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E/sendMessage" -Method Post -ContentType "application/json" -Body $body
```

> **LUU Y WINDOWS**: Tren Windows cmd, dung `\"` (escaped double quotes) thay vi `'` (single quotes).
> Neu curl khong co tren may, dung PowerShell `Invoke-RestMethod`.
> Trong Claude Code tren Windows, uu tien dung cmd format.

### Format message:
```
[ICON] [Project/Workspace] @ROLE — STATUS
Task: [mo ta]
[YYYY-MM-DD HH:MM]
```

### Format ALO
```
📞 ALO_RECEIVED — @PM
From: [Nguoi gui] ([Vai tro])
Flags: [AUTO-FLAGS]
Noi dung: [tom tat 1 dong]
[YYYY-MM-DD HH:MM]
```
```
✅ ALO_DONE — ALO-[STT]
From: [Nguoi gui]
Action: [Tao task / Msg @ROLE / Tra loi]
Tasks: [Task IDs da tao]
Status: DONE | PENDING_ACTION | WAITING_INFO
[YYYY-MM-DD HH:MM]
```

### Format UPDATE
```
📝 UPDATE — @[ROLE]
Changes:
- [task_id]: [thay doi]
Files: [so file da sua]
[YYYY-MM-DD HH:MM]
```

### Format Subagent DONE
Khi 1 agent hoan thanh task duoc dispatch (Router/PM nhan TASK_DONE tu INBOX):
```
🏁 SUBAGENT_DONE — @[ROLE]
Project: [EDU-XXX]
Task: [Task ID] — [mo ta ngan]
Result: [DONE / BLOCKED — ly do]
Output: [duong dan file ket qua]
[YYYY-MM-DD HH:MM]
```

### Telegram Config
- Bot Token: `8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E`
- Chat ID: `-5216365460`
- Group: Edulive Agent

## Quy tac
1. **BAT BUOC**: Moi thay doi STATUS -> notify. Khong co ngoai le.
2. **KHONG BLOCK**: Neu notify that bai (network, bot error) -> log warning, KHONG dung cong viec.
3. **TU DONG**: Agent tu thuc hien, human KHONG can yeu cau.
4. **MOI PROTOCOL**: Brief, Dispatch, Execute, Deploy, Debrief, Alo — tat ca deu notify.
