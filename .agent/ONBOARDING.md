# AGENT ONBOARDING GUIDE — Edulive Workspace
**Version**: 1.0 | **Last Updated**: 2026-03-02

## 1. Identity
You are joining **Edulive** — an EdTech company (~25 engineers, 18 products).
Multi-project, multi-agent workspace with 3 active projects:
- **EDU-001** HoiHopB (Deployment)
- **EDU-002** Nexta
- **EDU-003** Schedule

## 2. Determine Your Tier
Before reading ANY file, identify where you fit:

| Tier | Role | Brief File |
|:-----|:-----|:-----------|
| 0 | Head | `_context/BRIEF_HEAD.md` |
| 0.5 | Router | `_context/BRIEF_ROUTER.md` |
| 1 | PM | `_context/BRIEF_PM.md` |
| 2 | Product Team — BA | `_context/BRIEF_BA.md` |
| 2 | Product Team — QC | `_context/BRIEF_QC.md` |
| 2 | Product Team — Dev BE | `_context/BRIEF_DEV_BE.md` |
| 2 | Product Team — Dev FE | `_context/BRIEF_DEV_FE.md` |
| 2 | Product Team — AI | `_context/BRIEF_AI.md` |
| 3 | Sync | Task-specific, khong co brief co dinh |

Full role definitions: `.agent/AGENTS.md`

## 3. Mission Protocol (Session Lifecycle)

> **Replacing Poker Protocol**: Deal=Brief, Call=Dispatch, All-in=Deploy, Fold=Debrief

### BRIEF (Start of session)
```
git fetch && git checkout -b session/{role}-{date} origin/main
-> Read workspace brief: _context/BRIEF_[ROLE].md
-> Read company context: product/COMPANY_CONTEXT.md
-> Read project brief: projects/[PROJECT]/_context/BRIEF_[ROLE].md (neu co)
-> Read PROJECT_BOARD: projects/[PROJECT]/warroom/PROJECT_BOARD.md
-> Read PRODUCT_BACKLOG: projects/[PROJECT]/warroom/PRODUCT_BACKLOG.md
-> Read INBOX: projects/[PROJECT]/comms/INBOX.md
-> Update AGENT_STATUS.md (local only): Status = ONLINE
-> Confirm with user
```

### DISPATCH (Process inbox)
```
-> Read INBOX.md
-> Process PENDING messages matching your role/task
-> Dispatch [TAG] = only that tag. No tag + multiple = ASK user
```

### EXECUTE (Do work)
- **Spec-First**: Read spec in `specs/` BEFORE coding
- No spec = no code. Spec unclear = STOP + escalate
- Update AGENT_STATUS.md: Status = WORKING

### DEPLOY (Ship to production)
```
-> Pre-check: tests pass, spec completed
-> Deploy to target platform (GAS/Extension/webhook)
-> Verify operation
-> Log result
```

### DEBRIEF (End of session)
```
-> Update PROJECT_BOARD (task status)
-> Update PRODUCT_BACKLOG
-> Write INBOX message (TASK_DONE / REVIEW_REQUEST / INFO)
-> Update AGENT_STATUS.md: Status = OFFLINE (local only)
-> Git: commit -> push branch -> merge to main -> push -> cleanup branch
```

### ALO (PM-only — stakeholder message parsing)
```
-> Parse: "Alo [nguoi gui] bao [noi dung]"
-> Cross-check product/COMPANY_CONTEXT.md — auto-flag keywords
-> De xuat action: tra loi / tao task / escalate
-> Cho user duyet truoc khi ghi
```

> **Backward compatibility**: checkin=Brief, Deal=Brief, Call=Dispatch,
> checkinbox=Dispatch, All-in=Deploy, Fold=Debrief, checkout=Debrief

## 4. Workspace Structure
```
_hq/                  <- Router HQ (MASTER_BOARD, DISPATCH_LOG, AGENT_STATUS, etc.)
  incoming/QUEUE.md   <- Messages queued for Router dispatch
_context/             <- Workspace briefs (per role)
_templates/           <- Project templates
_resources/           <- Tai lieu chung
product/              <- COMPANY_CONTEXT, KNOWLEDGE_BASE, product specs
.agent/
  AGENTS.md           <- Role definitions (4-tier)
  ROUTER.md           <- Message bus design
  ONBOARDING.md       <- This file
  rules/global/       <- Shared rules (both platforms)
  rules/router/       <- Router-specific rules
  skills/             <- Antigravity skills (YAML frontmatter)
projects/
  EDU-001_HoiHopB/    <- HoiHopB Deployment
  EDU-002_Nexta/      <- Nexta
  EDU-003_Schedule/   <- Schedule
    _context/         <- Project briefs
    warroom/          <- PROJECT_BOARD, PRODUCT_BACKLOG
    specs/            <- SPEC files, requirements
    src/              <- Source code
    comms/            <- INBOX.md, AGENT_STATUS.md
    qa/               <- Test results
```

## 5. Company Context & Knowledge Base
- **COMPANY_CONTEXT.md**: `product/COMPANY_CONTEXT.md` — tong quan cong ty, team, product tree
- **KNOWLEDGE_BASE.md**: `product/KNOWLEDGE_BASE.md` — kien thuc san pham (11 phan)

### Reading Routing — doc them theo role:
| Role | COMPANY_CONTEXT sections | KNOWLEDGE_BASE sections |
|:-----|:-------------------------|:------------------------|
| PM | TAT CA | TAT CA 11 phan |
| BA | ss2 (nhan su) | ss1, ss3, ss4, ss5, ss6, ss9, ss11 |
| Dev BE | ss2, ss3, ss7 | ss2, ss3, ss8, ss11 |
| Dev FE | ss2, ss3, ss7 | ss2, ss3, ss8, ss9, ss11 |
| QC | ss2, ss4 | ss3, ss9, ss10, ss11 |
| AI | ss2, ss7 | ss2, ss3.11, ss4, ss5 |

## 6. Communication
- Agent lam viec -> ghi ket qua vao `comms/INBOX.md`
- Agent LUON update `comms/AGENT_STATUS.md` (LOCAL only, KHONG commit)
- Router doc AGENT_STATUS + INBOX -> notify Telegram
- Telegram chi qua Router — Router la gateway duy nhat

### AGENT_STATUS.md Format (LOCAL only)
```markdown
# AGENT_STATUS — [Project Name]
| Role | Status | Current Task | Last Updated |
|:-----|:-------|:-------------|:-------------|
| PM | ONLINE | Sprint planning | 2026-03-02 10:00 |
| BA | WORKING | SRS update | 2026-03-02 10:30 |
```

Statuses: `ONLINE`, `WORKING`, `WAITING`, `DONE`, `OFFLINE`

## 7. Platform Notes
| Platform | Roles | How |
|:---------|:------|:----|
| Claude Code | HEAD, PM, Router | Terminal session, tuan tu |
| Antigravity | Product Team (BA, QC, Dev BE, Dev FE, AI) | Agent Manager, song song |
| Cursor | DEV (multi-file context) | IDE |
| GAS / n8n | Sync (Tier 3) | Tu dong / scheduled |

Both platforms read the same Markdown files. Rules in `.agent/rules/` apply to both.

## 8. Critical Rules
- **Spec-First**: NEVER code without approved specification
- **No Fabrication**: NEVER guess API values — test or read logs
- **No Secrets**: Read `.env` BEFORE asking user for credentials
- **Branch Per Session**: moi session = 1 branch, merge vao main khi Debrief
- **AGENT_STATUS.md = LOCAL only**: KHONG commit file nay vao git
- **Escalate**: Spec unclear -> STOP -> write ESCALATION to INBOX -> Router handles
- **Telegram Notify BAT BUOC**: Moi thay doi status -> notify Telegram

## 9. Quick Start Checklist
```
[ ] Biet minh la role gi?                    -> Doc AGENTS.md
[ ] Da doc brief cua role?                   -> _context/BRIEF_[ROLE].md
[ ] Da doc COMPANY_CONTEXT?                  -> product/COMPANY_CONTEXT.md
[ ] Da doc KNOWLEDGE_BASE (theo routing)?    -> product/KNOWLEDGE_BASE.md
[ ] Da check INBOX?                          -> projects/[PROJECT]/comms/INBOX.md
[ ] Hieu yeu cau duoc giao?                  -> Bat dau lam viec
```
