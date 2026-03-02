# WORKSPACE: Edulive
**Owner**: Edulive (EdTech) | **Version**: 1.0 | **Last Updated**: 2026-03-02

## Quick Start
1. Identify role: **PM / BA / QC / Dev BE / Dev FE / AI / Sync** (hoac HEAD / Router)
2. Git sync: `git fetch && git checkout -b session/{role}-{date} origin/main`
3. Read workspace brief: `_context/BRIEF_[ROLE].md`
4. Read project brief: `projects/[PROJECT]/_context/BRIEF_[ROLE].md`
5. Read dynamic state: `projects/[PROJECT]/warroom/PROJECT_BOARD.md`
6. Confirm with user before starting

## Workspace Structure
```
_hq/                  <- Router HQ (MASTER_BOARD, DISPATCH_LOG, HEALTH, ESCALATION)
  incoming/QUEUE.md   <- Messages queued for Router dispatch
_context/             <- Workspace-level briefs (BRIEF_PM, BRIEF_BA, BRIEF_QC, etc.)
_templates/           <- Project templates (dung khi tao project moi)
product/              <- Product knowledge (PRODUCT_REGISTRY, KNOWLEDGE_BASE, COMPANY_CONTEXT)
_resources/           <- Shared resources (guides, CSVs, ai_outputs)
.agent/
  AGENTS.md           <- Role definitions & hierarchy
  ROUTER.md           <- Routing Agent design document
  ONBOARDING.md       <- Onboarding guide for new agents
  rules/global/       <- Global behavior rules (both platforms)
  rules/router/       <- Router-specific rules (dispatch_rules.md)
  skills/             <- Skills: brief, dispatch, execute, deploy, debrief, msg, alo, health-check
projects/
  EDU-001_HoiHopB/    <- Trien khai Hoi Hop B (B2C, Legacy code)
    _context/         <- Project briefs
    .agent/rules/     <- Project-specific rules (if any)
    warroom/          <- PROJECT_BOARD, PRODUCT_BACKLOG, Sprint Detail
    specs/            <- BA: requirements, api_research
    src/              <- DEV: be/, fe/
    comms/            <- INBOX.md (Router <-> Agents communication)
    qa/               <- QC: test_results, bug_reports
    _data/            <- Project data
  EDU-002_Nexta/      <- Nexta (B2B, 100% offline, Native Image)
  EDU-003_Schedule/   <- Schedule (planning)
```

## Role Hierarchy
| Role | Mo ta | Platform |
|:-----|:------|:---------|
| Head | Xay dung he thong, kien truc, rules | Claude Code (Opus) |
| Router | Dieu phoi messages va notify | Claude Code (Haiku) / n8n |
| PM | Quan tri du an, xu ly stakeholder, bao cao | Claude Code / Antigravity |
| BA | Phan tich yeu cau, documentation, validation | Antigravity |
| QC | Test planning, bug analysis, quality reports | Antigravity |
| Dev BE | Architecture, APIs, Kafka, Edge services | Antigravity / Cursor |
| Dev FE | UI/UX, responsive, API integration | Antigravity / Cursor |
| AI | AI/ML, content generation, LLM integration | Antigravity / Cursor |
| Sync | Bi-directional sync workspace <-> Google Sheet | GAS / n8n |

## Mission Protocol
Session lifecycle follows 5 phases. See `.agent/rules/global/mission_protocol.md`.

### Brief (start of session)
Git sync -> read brief -> read board -> read backlog -> read INBOX -> confirm.
```
Skill: /brief
```

### Dispatch (receive/process tasks)
Scan INBOX + QUEUE -> tag filter -> process or route -> archive DONE -> notify.
```
Skill: /dispatch
```

### Execute (do the work)
Read SPEC before coding. No spec = no code.

### Deploy (ship to production)
Pre-check -> deploy -> verify -> log.
```
Skill: /deploy
```

### Debrief (end of session)
Update boards -> write INBOX -> merge branch to main -> push.
```
Skill: /debrief
```

### Msg (ad-hoc message)
Send message to Router queue for dispatch to target agent.
```
Skill: /msg @[ROLE] [message]
```

### Alo (CHI PM — parse tin stakeholder)
Parse tin nhan tu stakeholder, cross-check COMPANY_CONTEXT, auto-flag keywords.
```
Skill: /alo [nguoi] bao [noi dung]
```

## Git Workflow — Branch Per Session
See `.agent/rules/global/git-workflow.md`.
- **Brief**: `git fetch && git checkout -b session/{role}-{date} origin/main`
- **Execute**: commit on session branch
- **Debrief**: merge branch -> main -> push -> cleanup branch
- **Conflict**: STOP -> bao user resolve. KHONG force merge.

## Communication Architecture
- All agent communication goes through **Router** (`.agent/ROUTER.md`)
- Agents write to `_hq/incoming/QUEUE.md` -> Router dispatches to project INBOX
- Router owns `_hq/` files (MASTER_BOARD, DISPATCH_LOG, etc.)
- Telegram gateway: Router sends/receives via bot
- Structured message format: see ROUTER.md Section 5

## Rules
- `.agent/rules/global/role-boundaries.md`: Role isolation + file access rules
- `.agent/rules/global/no-fabrication.md`: KHONG suy doan API — test that
- `.agent/rules/global/mission_protocol.md`: 5-phase session lifecycle
- `.agent/rules/global/git-workflow.md`: Branch per session, merge rules
- `.agent/rules/global/telegram-notify.md`: Mandatory Telegram notify all phases
- `.agent/rules/router/dispatch_rules.md`: Router dispatch decision engine

## Escalation
```
DEV spec unclear     -> STOP -> QUEUE: ESCALATION -> Router -> PM
DEV complex bug      -> STOP -> QUEUE: ESCALATION -> Router -> Head
BA unclear request   -> QUEUE: ESCALATION -> Router -> PM
PM needs strategy    -> QUEUE: ESCALATION -> Router -> Head
Cross-project        -> Router -> Head
System down          -> Router -> CRITICAL -> Human direct
```

## Secrets & Environment Variables
- File `.env` at project root **ALWAYS contains** all needed credentials
- Agent **MUST read `.env` first** before needing any credential
- `.env.example` = template (committed), `.env` = real values (NOT committed)

## Du an hien tai
- **EDU-001**: Trien khai Hoi Hop B (B2C, Legacy code) — dang trien khai
- **EDU-002**: Nexta (B2B, 100% offline, Native Image) — khan cap
- **EDU-003**: Schedule — planning
