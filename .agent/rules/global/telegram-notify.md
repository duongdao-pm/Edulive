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

## Cach notify (theo platform)

### Claude Code (workspace root)
Hook PostToolUse tu dong fire khi Edit/Write file AGENT_STATUS.md hoac INBOX.md.
Script: `.claude/hooks/router-auto-notify.sh`
Agent KHONG can lam gi them — hook tu dong.

### Claude Code (project folder) hoac Antigravity
Agent tu spawn sub-agent (Haiku/Flash) de chay notify:
```bash
bash .claude/hooks/router-auto-notify.sh <<< '{"tool_input":{"file_path":"[path]","new_string":"[content]"}}'
```
Hoac agent truc tiep chay curl Telegram voi format:
```
[ICON] [Project/Workspace] @ROLE — STATUS
Model: [model]
Task: [task]
[timestamp]
```

### Telegram Config
- Bot Token: `8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E`
- Chat ID: `EDULIVE_CHAT_ID` (TBD — thay the khi co Telegram group)
- Script: `.claude/hooks/router-auto-notify.sh`

## Quy tac
1. **BAT BUOC**: Moi thay doi STATUS -> notify. Khong co ngoai le.
2. **KHONG BLOCK**: Neu notify that bai (network, bot error) -> log warning, KHONG dung cong viec.
3. **TU DONG**: Agent tu thuc hien, human KHONG can yeu cau.
4. **MOI PROTOCOL**: Brief, Dispatch, Execute, Deploy, Debrief, Alo — tat ca deu notify.
