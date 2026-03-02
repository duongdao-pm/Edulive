---
description: Role boundaries — moi agent CHI lam dung phan cua minh
globs: **/*
alwaysApply: true
---

# Role Boundaries — Edulive Workspace

## Tier 0 — Head
- Xay dung he thong, kien truc tong the, rules, protocols
- Build bo khung workspace + project structure
- Lam viec cung user (Human), ra quyet dinh chien luoc

## Tier 0.5 — Router
- Dieu phoi cac agent — dispatch tasks, scan STATUS/INBOX, notify Telegram
- Sync MASTER_BOARD <-> PROJECT_BOARDs
- Telegram gateway duy nhat
- KHONG lam task cua Product Team

## Tier 1 — PM
- Quan tri du an — specs, backlog, sprint planning
- Xu ly stakeholder messages (Alo skill — CHI PM co)
- Review output cua Product Team
- KHONG code, KHONG research sau (giao cho Product Team)

## Tier 2 — Product Team
- BA: Research, phan tich yeu cau, viet SRS, user stories, gap analysis
- QC: Test, verify, report bugs, viet test plan
- Dev BE: Code backend, API, database theo SPEC
- Dev FE: Code frontend, UI theo SPEC + wireframes
- AI: AI/ML features, NLP, model integration
- Lam viec theo SPEC, deliver code/design/docs/test
- Co the la human, AI agent, hoac ca hai phoi hop

## Tier 3 — Sync
- Tu dong dong bo workspace <-> Google Sheets
- Chay theo lich hoac event trigger
- KHONG can human giam sat khi da setup

---

## Communication Rule
- Moi tier lam viec theo yeu cau — code, API, docs, bat ky gi can
- LUON update trang thai vao `comms/AGENT_STATUS.md` (local, KHONG commit)
- Ghi ket qua vao `comms/INBOX.md` khi xong task
- Router doc AGENT_STATUS + INBOX -> notify Telegram

## File Access Matrix

| Role | DUOC edit | KHONG DUOC edit |
|:-----|:----------|:----------------|
| HEAD | rules/, CLAUDE.md, AGENTS.md, _context/ | — |
| Router | _hq/*, comms/ | src/, specs/ |
| PM | specs/, warroom/, comms/ | src/, rules/ |
| BA | specs/, comms/ | src/, rules/, _hq/ |
| QC | qa/, comms/ | src/, rules/, _hq/ |
| Dev BE | src/, comms/ | rules/, _hq/, specs/ (read-only) |
| Dev FE | src/, comms/ | rules/, _hq/, specs/ (read-only) |
| AI | src/, comms/ | rules/, _hq/, specs/ (read-only) |
| Sync | src/, comms/ | rules/, _hq/, specs/ |

## Cross-project vs In-project
- Agent o `projects/EDU-XXX/` = **Member** — nhan task + thuc hien + reply DONE
- Agent o `_context/` hoac root = **Lead** — overview + giao viec + review ket qua
