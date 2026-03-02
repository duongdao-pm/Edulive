# ROUTING AGENT — Message Bus Design Document
**Version**: 1.0 | **Last Updated**: 2026-03-02

> Router la trung tam dieu phoi cua Edulive Workspace.
> Moi giao tiep giua agents PHAI di qua Router.

---

## 1. Core Principle

```
RULE: Agents KHONG giao tiep truc tiep voi nhau.
      Tat ca PHAI di qua Router.

  BA --X--> DEV     (CAM)
  BA --> Router --> DEV  (BAT BUOC)
```

Router la **Message Bus** — nhan, phan loai, dieu phoi, thong bao.

---

## 2. Architecture — 3 Vai tro

### LISTENER (Lang nghe)
- Telegram incoming (webhook)
- File INBOX cac project (`projects/*/comms/INBOX.md`)
- AGENT_STATUS: `_hq/AGENT_STATUS.md` + `projects/*/comms/AGENT_STATUS.md`
- MASTER_BOARD changes (new PENDING tasks)
- Agent outputs (TASK_DONE, REVIEW_REQUEST, ESCALATION)

### DISPATCHER (Dieu phoi)
- Nhan dien task owner (project, team, model)
- Phan task vao dung INBOX
- Sync MASTER_BOARD <-> PROJECT_BOARDs
- Escalate khi can

### NOTIFIER (Thong bao)
- Gui Telegram notification (BAT BUOC moi thay doi)
- Ghi vao INBOX cac project
- Update boards
- Escalation alerts

---

## 3. Dispatch Decision Engine

```
Message/Task arrives at Router:

1. PROJECT? -> Parse project tag / Telegram topic
   [EDU-001] = HoiHopB
   [EDU-002] = Nexta
   [EDU-003] = Schedule
   No tag? -> Ask PM/Head

2. TEAM? ->
   "code/implement/fix/debug" -> DEV (BE or FE?)
   "research/analyze/docs/SRS" -> BA
   "test/verify/check/QA/bug" -> QC
   "spec/feature/plan/sprint" -> PM
   "AI/ML/NLP/model" -> AI
   "sync/sheet/dong bo" -> SYNC
   Unclear? -> Escalate to Head

3. MODEL? ->
   Simple (read, scan, check) -> Haiku / Gemini Flash
   Medium (code, research) -> Gemini Pro / Sonnet
   Complex (multi-file code) -> Cursor
   Very Complex (architect) -> Opus
   Strategy -> Opus hoac direct

4. PRIORITY? -> Deadline / PM-assigned / auto-detect

5. DISPATCH ->
   Ghi TASK_ASSIGNED vao project INBOX
   Sync task vao PROJECT_BOARD
   Gui Telegram notification
   Log vao DISPATCH_LOG
```

---

## 4. Tag System (7 tags)

| Tag | Nghia | Agent lien quan |
|:----|:------|:----------------|
| `[PM]` | Quan ly du an, dieu phoi | PM Agent |
| `[BA]` | Phan tich yeu cau, tai lieu | BA Agent |
| `[QC]` | Test, bug, chat luong | QC Agent |
| `[BE]` | Backend, API, database | Dev BE Agent |
| `[FE]` | Frontend, UI | Dev FE Agent |
| `[AI]` | AI/ML features | AI Agent |
| `[SYNC]` | Dong bo workspace <-> sheet | Sync Agent |

---

## 5. Structured Message Format

```markdown
## [YYYY-MM-DD HH:MM] MESSAGE_TYPE @from -> @to
Project: [project_name]
Task: [task description]
Spec: [path to spec file]
Priority: HIGH | MEDIUM | LOW
Model: [recommended AI model]
Convoy: [sprint/convoy ID]
Telegram: [topic to notify, or NONE]
Status: PENDING | IN_PROGRESS | DONE
Result: [output path or summary]
```

### Message Types
| Type | From -> To | Telegram? |
|:-----|:----------|:----------|
| `TASK_ASSIGNED` | Router -> Agent | Yes |
| `TASK_DONE` | Agent -> Router | Yes |
| `REVIEW_REQUEST` | Agent -> Router -> PM | Yes |
| `DEPLOY_READY` | Agent -> Router -> PM | Yes |
| `DEPLOYED` | PM -> Router | Yes |
| `BUG_REPORT` | QC -> Router -> PM | Yes |
| `ESCALATION` | Any -> Router -> Head | Yes |
| `INFO` | Any -> Router | NONE |
| `QUERY` | Telegram -> Router -> Agent | Yes |
| `ALO` | Stakeholder -> PM (via user) | NONE |

---

## 6. Autonomy Levels (Router 24/7 Service)

| Level | Trigger | Action | Human needed? |
|:------|:--------|:-------|:-------------|
| **L0 AUTO** | Status queries, health check | Query + reply TG | No |
| **L0 AUTO** | Daily report (cron) | Generate + send TG | No |
| **L1 AUTO+NOTIFY** | TASK_DONE in INBOX | Sync board + notify | Notify only |
| **L1 AUTO+NOTIFY** | BUG_REPORT in INBOX | Assign QC + notify PM | Notify only |
| **L1 AUTO+NOTIFY** | ESCALATION in INBOX | Route by severity | Notify only |
| **L2 QUEUE** | "deploy/release" | Queue + notify human | Yes |
| **L2 QUEUE** | "feature/them/tao moi" | Queue + notify human | Yes |
| **L2 QUEUE** | Unknown intent | Queue + ask human | Yes |

---

## 7. Communication Rules

1. **KHONG giao tiep truc tiep giua agents** — tat ca qua Router
2. **Moi output PHAI ghi vao INBOX** cua project minh
3. **Telegram messages PHAI di qua Router** — gateway duy nhat
4. **MASTER_BOARD chi Router duoc sua**
5. **PHAI log moi action vao DISPATCH_LOG**

---

## 8. Escalation Routing

| Severity | Route | Auto-escalate |
|:---------|:------|:-------------|
| LOW | Log only | -> MEDIUM after 24h |
| MEDIUM | Router + PM + TG | -> HIGH after 48h |
| HIGH | Head + TG @user | -> CRITICAL after 72h |
| CRITICAL | Human direct + TG DM | — |

---

## 9. Board Sync Model

```
_hq/MASTER_BOARD.md (Router owns)
    |
    | Router filters by project
    |
    +---> projects/EDU-001_HoiHopB/warroom/PROJECT_BOARD.md
    +---> projects/EDU-002_Nexta/warroom/PROJECT_BOARD.md
    +---> projects/EDU-003_Schedule/warroom/PROJECT_BOARD.md

Conflict-free: Moi file chi 1 owner.
  MASTER_BOARD -> Router sua
  PROJECT_BOARD -> Local agents sua
  INBOX -> append-only (ca 2 ben ghi)
```

---

## 10. Status Scanning

Router scan 2 noi:
1. **Workspace level**: `_hq/AGENT_STATUS.md` — tong hop tat ca agents
2. **Project level**: `projects/*/comms/AGENT_STATUS.md` — per-project agents

Moi khi phat hien thay doi -> notify Telegram.

---

## 11. Implementation Phases

| Phase | Platform | Description |
|:------|:---------|:------------|
| 1 (NOW) | Claude Code session | Manual: user mo session Router -> Brief/Dispatch |
| 2 (NEXT) | Docker n8n + scripts | 24/7 on intermediate device |
| 3 (SCALE) | n8n worker mode | Production: multi-channel, analytics |

---

## 12. Files Owned by Router

| File | Access | Description |
|:-----|:-------|:------------|
| `_hq/MASTER_BOARD.md` | Read/Write | Task board tong |
| `_hq/DISPATCH_LOG.md` | Write | Dispatch history |
| `_hq/AGENT_STATUS.md` | Read/Write | Agent health tong hop |
| `_hq/ESCALATION_LOG.md` | Read/Write | Escalation tracking |
| `_hq/incoming/QUEUE.md` | Write (24/7 service) | Queued items |
| `projects/*/comms/INBOX.md` | Read + Write (TASK_ASSIGNED) | Project communication |
| `projects/*/comms/AGENT_STATUS.md` | Read | Project agent status |
| `projects/*/warroom/PROJECT_BOARD.md` | Write (sync from MASTER) | Project task board |
