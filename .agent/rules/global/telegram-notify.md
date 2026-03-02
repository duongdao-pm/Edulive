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

## Cach notify

Agent truc tiep chay curl Telegram sau moi thay doi STATUS/INBOX:
```bash
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"${CHAT_ID}","text":"[ICON] [Scope] @ROLE — STATUS\nTask: [task]\n[timestamp]"}'
```

Format message:
```
[ICON] [Project/Workspace] @ROLE — STATUS
Task: [mo ta]
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
