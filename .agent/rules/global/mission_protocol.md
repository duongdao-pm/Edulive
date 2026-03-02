# MISSION PROTOCOL — Session Lifecycle
**Ap dung cho moi AI agent, moi role, moi project.**

> Trigger: User goi ten phase. Agent tu dong thuc hien cac buoc.
> Replacing Poker Protocol: Deal=Brief, Call=Dispatch, All-in=Deploy, Fold=Debrief

## 6 Phases (5 core + 1 PM-only)

| Phase | Mo ta |
|:------|:------|
| **Brief** | Git sync + doc brief, board, backlog, inbox. Xac nhan san sang. |
| **Dispatch** | Xu ly PENDING tasks/messages. Router dispatch hoac agent tu xu ly. |
| **Execute** | Lam viec theo spec. Spec-First bat buoc. |
| **Deploy** | Ship code len production. Pre-check -> deploy -> verify. |
| **Debrief** | Update boards, ghi INBOX, merge branch -> main, push. |
| **Alo** | Parse stakeholder messages. CHI PM Agent. |

## Luong 1 session:
```
Brief -> (biet task) -> Execute -> Debrief
          |
   Dispatch (neu can route)
   Deploy (neu can ship)
   Alo (PM nhan tin stakeholder)
```

## Brief (bat dau session)
```
1. git fetch && git checkout -b session/{role}-{date} origin/main
2. Doc brief: _context/BRIEF_[ROLE].md
3. Doc company context: product/COMPANY_CONTEXT.md
4. Doc project board: projects/[PROJECT]/warroom/PROJECT_BOARD.md
5. Doc backlog: projects/[PROJECT]/warroom/PRODUCT_BACKLOG.md
6. Doc INBOX: projects/[PROJECT]/comms/INBOX.md
7. Update AGENT_STATUS.md: Status = ONLINE
8. Notify Telegram: ONLINE
9. Confirm voi user
```

## Dispatch (xu ly pending)
```
1. Doc INBOX.md — loc tag cua minh
2. Neu co PENDING messages -> xu ly
3. Dispatch [TAG] = chi tag do. Khong tag + nhieu task = HOI user
4. Log action vao DISPATCH_LOG (neu la Router)
5. Notify Telegram: TASK_ASSIGNED
```

## Execute (lam viec)
```
1. Doc SPEC truoc khi code (Spec-First BAT BUOC)
2. Khong co SPEC -> STOP -> escalate qua Router -> PM
3. Update AGENT_STATUS.md: Status = WORKING
4. Notify Telegram: WORKING
5. Commit tren session branch
```

## Deploy (ship production)
```
1. Pre-check: tests pass, spec completed
2. Deploy to target platform
3. Verify operation
4. Log result
5. Notify Telegram: DEPLOY_READY / DEPLOYED
```

## Debrief (dong session)
```
1. Update PROJECT_BOARD (task status)
2. Update PRODUCT_BACKLOG
3. Write INBOX message (TASK_DONE / REVIEW_REQUEST / INFO)
4. Update AGENT_STATUS.md: Status = OFFLINE
5. Notify Telegram: OFFLINE
6. Git: commit -> push branch -> merge to main -> push -> cleanup branch
```

## Alo (PM-only — stakeholder message)
```
1. Parse: "Alo [nguoi gui] bao [noi dung]"
2. Cross-check product/COMPANY_CONTEXT.md — auto-flag keywords
3. Xac dinh: yeu cau thong tin / task moi / escalation?
4. Thuoc du an nao? Team nao? Uu tien gi?
5. De xuat response cho user
6. Cho user duyet truoc khi ghi INBOX
```

## Rules:
1. **Brief TRUOC khi Execute** — khong lam viec khi chua doc board
2. **Spec-First** — khong code khi chua co SPEC approved
3. **Debrief TRUOC khi dong session** — "Work is not done until pushed to main"
4. **Branch per session** — moi session 1 branch, merge vao main khi Debrief
5. **Telegram Notify BAT BUOC** — MOI thay doi status hoac INBOX -> notify Telegram. Ap dung TAT CA phases. Xem `.agent/rules/global/telegram-notify.md`

## Backward Compatibility (Poker -> Mission)
| Poker | Mission | Notes |
|:------|:--------|:------|
| Deal / checkin | Brief | Same flow |
| Call / checkinbox | Dispatch | Same flow |
| Raise [TAG] | Msg @ROLE | Gui message qua Router queue |
| Alo | Alo | Unchanged — PM-only |
| All-in / deploy | Deploy | Same flow |
| Fold / checkout | Debrief | Same flow |
