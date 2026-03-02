---
description: Router dispatch rules — task classification, routing logic, autonomy levels
globs: **/*
---

# DISPATCH RULES — Router Decision Engine
**Chi Router su dung. Agents KHONG tu dispatch.**

## 1. Identify Project
- Parse `[TAG]` trong message: `[EDU-001]`, `[EDU-002]`, `[EDU-003]`
- Parse Telegram topic ID -> map to project
- Keyword mapping:
  - "HoiHopB", "HHB", "deployment" -> EDU-001
  - "Nexta" -> EDU-002
  - "Schedule", "lich" -> EDU-003
- Neu khong ro -> HOI PM/User

## 2. Identify Team
| Keyword trong task | Team |
|:-------------------|:-----|
| code, fix, implement, refactor, debug, backend, API | DEV_BE |
| frontend, UI, component, layout, responsive | DEV_FE |
| research, phan tich, so sanh, SRS, user story, docs | BA |
| test, verify, check, QA, bug report | QC |
| spec, backlog, sprint, priority, plan, feature | PM |
| AI, ML, NLP, model, Gemini, LLM | AI |
| sync, sheet, dong bo, automation, cron | SYNC |
| Unclear | Escalate to HEAD |

## 3. Identify Model (cost optimization)
| Task complexity | Model | Ly do |
|:----------------|:------|:------|
| Doc docs, audit data, search | Haiku / Flash | Read + summarize only |
| Test API, fetch data, verify | Haiku / Flash | Command + parse |
| Write code, fix bugs | Sonnet / Gemini Pro | Logic reasoning |
| Code review, refactor | Sonnet | Quality analysis |
| Multi-file complex code | Cursor | IDE-level context |
| Architecture, planning | Opus | Deep reasoning |
| Strategy, important decisions | Opus hoac direct | High impact |
| Classification/parsing (Alo) | Gemini Flash | Quick NLP |

## 4. Identify Priority
| Signal | Priority |
|:-------|:---------|
| System down, data loss | CRITICAL — immediate |
| PM explicit: "urgent", "gap", deadline < 24h | HIGH — top of queue |
| Normal sprint task | MEDIUM — normal flow |
| Nice-to-have, research, backlog | LOW — when available |
| ESCALATION message | Theo severity trong message |
| Stakeholder pressure (tu Alo) | HIGH — flag [STAKEHOLDER PRESSURE] |

## 5. Dispatch Action
1. Write `TASK_ASSIGNED` -> `projects/[Project]/comms/INBOX.md`
2. Sync task -> `projects/[Project]/warroom/PROJECT_BOARD.md`
3. Update `_hq/MASTER_BOARD.md` status
4. Log -> `_hq/DISPATCH_LOG.md` (**BAT BUOC** — moi dispatch phai log)
5. Notify Telegram (BAT BUOC)

## 6. Autonomy Levels (24/7 service)
| Level | Trigger | Action | Human needed? |
|:------|:--------|:-------|:-------------|
| L0 AUTO | Queries, health check, daily report | Execute + reply | No |
| L1 AUTO+NOTIFY | TASK_DONE, BUG_REPORT, ESCALATION | Process + notify | Notify only |
| L2 QUEUE | Deploy, new feature, unknown intent | Queue + wait | Yes |

## 7. DISPATCH_LOG Format (bat buoc moi dispatch)
```markdown
| Timestamp | From | To | Project | Type | Priority | Model | Status |
|:----------|:-----|:---|:--------|:-----|:---------|:------|:-------|
| 2026-03-02 10:30 | @PM | @DEV_BE | EDU-001 | TASK_ASSIGNED | HIGH | Sonnet | DISPATCHED |
```

## 8. Route Back (TASK_DONE processing)
Khi nhan TASK_DONE:
1. Update MASTER_BOARD (status -> DONE)
2. Notify Telegram
3. If needs QC -> create TASK_ASSIGNED for QC
4. If needs review -> route REVIEW_REQUEST to PM
