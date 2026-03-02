# AGENT ROLES — Edulive Workspace
**Version**: 1.0 | **Last Updated**: 2026-03-02

---

## Company Context
- **Edulive** = EdTech company, ~25 engineers, 18 products
- 3 active projects: EDU-001 HoiHopB, EDU-002 Nexta, EDU-003 Schedule
- Multi-agent workspace: AI agents + human engineers phoi hop

---

## 4-Tier Architecture

| Tier | Role | Mo ta | Platform |
|:-----|:-----|:------|:---------|
| **0** | Head | Xay dung he thong, kien truc, rules, protocols | Claude Code (Opus + Human) |
| **0.5** | Router | Dieu phoi, dispatch, notify — luon dung model re nhat | Claude Code (Haiku/Flash) |
| **1** | PM | Quan ly du an, stakeholder handling, sprint planning | Claude Code (Sonnet) |
| **2** | Product Team | BA, QC, Dev BE, Dev FE, AI — xay dung san pham | Antigravity / Cursor |
| **3** | Sync | Tu dong dong bo workspace <-> Google Sheet | GAS / n8n / scheduled |

> **Model chon theo task**: Simple -> Flash/Haiku. Medium -> Gemini Pro/Sonnet. Complex -> Cursor/Opus.

---

## Tier 0 — HEAD

- **AI**: Claude Opus + Human
- **Platform**: Claude Code
- **Brief**: `_context/BRIEF_HEAD.md`
- **Responsibility**:
  - Xay dung bo khung workspace: vision, architecture, folder structure
  - Thiet lap rules, protocols, communication flow
  - Dieu phoi cross-project: priority, resource allocation
  - Resolve escalation HIGH/CRITICAL
- **Quyen**: Tao/dong project, sua AGENTS.md, CLAUDE.md, rules/

### Head vs PM
| | Head | PM |
|:--|:-----|:---|
| **Scope** | Toan workspace + AI infra | 1 du an cu the |
| **Focus** | HOW he thong van hanh | WHAT can build + WHO lam |
| **Output** | Rules, architecture, protocols | SPECs, backlog, sprint |

---

## Tier 0.5 — Router

- **AI**: Haiku hoac Gemini Flash (luon model re nhat)
- **Platform**: Claude Code -> n8n Docker (Phase 2)
- **Brief**: `_context/BRIEF_ROUTER.md`
- **Responsibility**:
  - Dispatch tasks: scan INBOX/QUEUE -> route to dung agent
  - Scan AGENT_STATUS.md (local) -> notify Telegram
  - Sync MASTER_BOARD <-> PROJECT_BOARDs
  - Telegram gateway duy nhat
  - Log moi action vao DISPATCH_LOG
- **Files owned**: `_hq/*`

---

## Tier 1 — PM (Project Manager)

- **AI**: Claude Sonnet
- **Platform**: Claude Code
- **Brief**: `_context/BRIEF_PM.md`
- **Responsibility**:
  - Define features, priority, roadmap
  - Viet SPEC, sprint planning, backlog management
  - Review output cua Product Team
  - Xu ly stakeholder messages (Alo skill — CHI PM co)
  - KHONG code, KHONG research sau (giao cho Product Team)

### Alo Skill (PM-only)
PM nhan tin nhan tu stakeholder (sep, khach hang, team lead) va parse nhanh:
1. Parse: ai gui + noi dung gi
2. Cross-check: doi chieu `product/COMPANY_CONTEXT.md` — auto-flag keywords
3. De xuat action: tra loi / tao task / escalate
4. Cho user duyet truoc khi ghi INBOX

---

## Tier 2 — Product Team

- **AI**: Gemini Pro, Cursor, Sonnet... (tuy task)
- **Platform**: Antigravity / Cursor
- **Briefs**: `_context/BRIEF_BA.md`, `_context/BRIEF_QC.md`, `_context/BRIEF_DEV_BE.md`, `_context/BRIEF_DEV_FE.md`, `_context/BRIEF_AI.md`

Doi ngu xay dung san pham. Co the la human, AI agent, hoac phoi hop.
Noi dung cong viec do **task quy dinh**, khong cung nhac.

### Cac vai trong Product Team:
| Vai | Tag | Lam gi |
|:----|:----|:-------|
| BA | [BA] | Research, test API, viet SPEC, gap analysis, user stories |
| QC | [QC] | Test, verify, report bugs, test plan |
| Dev BE | [BE] | Implement backend, API, database theo SPEC |
| Dev FE | [FE] | Implement frontend, UI theo SPEC + wireframes |
| AI | [AI] | AI/ML features, NLP, model integration |

> Khong bat buoc phai co du cac vai. Task nao can vai nao thi dung vai do.

### Rules chung:
- **Spec-First**: KHONG code khi chua co SPEC approved
- Spec khong ro -> STOP -> escalate qua Router -> PM
- LUON update AGENT_STATUS.md (local only) + ghi INBOX khi xong

---

## Tier 3 — Sync (Automation Bot)

- **AI**: Gemini Flash / Haiku (lightweight, scheduled)
- **Platform**: GAS triggers, n8n workflows, cron jobs
- **Tag**: [SYNC]
- **Responsibility**:
  - Dong bo workspace <-> Google Sheets
  - Tu dong bao cao, sync data giua cac he thong
  - Chay theo lich hoac event trigger
  - KHONG can human giam sat khi da setup

> Tier 3 agents la **nguoi dung cuoi** cua product. Product Team (Tier 2) build -> Sync (Tier 3) su dung.

---

## Platform Mapping

| Platform | Roles | How |
|:---------|:------|:----|
| **Claude Code** | HEAD, PM, Router | Terminal session, tuan tu |
| **Antigravity** | Product Team (BA, QC, Dev BE, Dev FE, AI) | Agent Manager, song song |
| **Cursor** | DEV (khi can multi-file context) | IDE |
| **GAS / n8n** | Sync (Tier 3) | Tu dong / scheduled |

### Dual-Platform Design
- **`.agent/rules/`** = shared behavior rules (ca 2 platforms doc)
- **`CLAUDE.md`** = Claude Code entry point
- **`.agent/skills/`** = Antigravity-only (YAML frontmatter + semantic trigger)
- **Briefs, boards, INBOX, source code** = platform-agnostic Markdown

---

## Communication Rules

1. **Agent ghi file** -> Router doc -> Router notify Telegram
2. **AGENT_STATUS.md** = local only, KHONG commit. Router scan local.
3. **INBOX.md** = ket qua task, append-only
4. **Telegram chi qua Router** — Router la gateway duy nhat
5. **MASTER_BOARD chi Router sua** — PM tao tasks, Router dispatch

---

## File Access Rules

| Role | DUOC edit | KHONG DUOC edit |
|:-----|:----------|:----------------|
| HEAD | rules/, CLAUDE.md, AGENTS.md | — |
| Router | _hq/*, comms/ | src/, specs/ |
| PM | specs/, warroom/, comms/ | src/, rules/ |
| BA | specs/, comms/ | src/, rules/, _hq/ |
| QC | qa/, comms/ | src/, rules/, _hq/ |
| Dev BE | src/, comms/ | rules/, _hq/, specs/ (read-only) |
| Dev FE | src/, comms/ | rules/, _hq/, specs/ (read-only) |
| AI | src/, comms/ | rules/, _hq/, specs/ (read-only) |
| Sync | src/, comms/ | rules/, _hq/, specs/ |

---

## Escalation

```
Product Team spec khong ro  -> STOP -> INBOX: ESCALATION -> Router -> PM
Product Team bug phuc tap   -> STOP -> INBOX: ESCALATION -> Router -> Head
PM can strategy             -> INBOX: ESCALATION -> Router -> Head
Cross-project conflict      -> Router -> Head
System down                 -> Router -> CRITICAL -> Human direct
```
