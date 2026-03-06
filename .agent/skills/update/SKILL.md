---
description: "Cap nhat trang thai task, tien do, thong tin du an. PM/HEAD: dong bo TAT CA files (PROJECT_BOARD, MASTER_BOARD, INBOX, ALO_LOG). BA/QC: cap nhat task files rieng + notify PM. Dung khi user noi 'Update', 'Cap nhat', 'Sua status'."
globs:
alwaysApply: false
---
# SKILL: UPDATE

## PURPOSE
Cap nhat trang thai, tien do, thong tin task/du an. Tu dong dong bo files lien quan.

**3 role duoc dung**: PM/HEAD, BA, QC — moi role co flow khac nhau.

## WHEN TO USE
- User noi "Update", "Cap nhat", "Sua status"
- User bao tien do: "BA-001a xong", "QC-001b 50%"
- User them task moi: "Them task QC test sv252"
- User doi priority: "BE-004 len CRITICAL"
- User danh dau DONE/BLOCKED
- Batch update nhieu thay doi 1 luc

## AI PHAN BIET ROLE NHU THE NAO
- Neu dang o session PM (hoac HEAD/Router) → **PM flow** (day du: dong bo tat ca boards)
- Neu dang o session BA → **BA flow** (nhe: chi sua task files rieng + notify)
- Neu dang o session QC → **QC flow** (nhe: chi sua task files rieng + notify)
- Role khac (Dev, AI) → dung /update nhung CHI bao PM, KHONG tu sua board

---

## PM / HEAD FLOW (DAY DU)

### Step 1: Parse Input
Tu cau user noi, extract danh sach thay doi:

| Loai thay doi | Vi du |
|:---|:---|
| Status | "BE-001 chuyen DONE", "QC-004 dang lam" |
| Tien do | "BE-001 len 70%" |
| Priority | "BE-004 len CRITICAL" |
| Blocked | "FE-001 bi block boi BE-003" |
| Them task | "Them task QC test sv252, priority HIGH, cho QC" |
| Xoa task | "Xoa task EDU001-QC-003" |
| Sua thong tin | "BE-001 doi nguoi lam tu Dien sang Luc" |
| ALO | "Alo sep bao..." → redirect sang /alo |

Neu input khong ro → HOI USER xac nhan truoc khi sua.

### Step 2: Xac dinh Scope — Files can sua

Moi thay doi se anh huong den NHIEU files. Agent PHAI sua DONG THOI tat ca:

```
1 thay doi task = cap nhat TAT CA files sau:
┌──────────────────────────────────────────────────────┐
│ 0.1 projects/[EDU-XXX]/warroom/PROJECT_BOARD.md      │ ← Task board du an
│ _hq/MASTER_BOARD.md                                  │ ← Bang tong cross-project
│ 0.1 projects/[EDU-XXX]/comms/INBOX.md (neu can)      │ ← Thong bao cho agent
│ _hq/ALO_LOG.md (neu tu ALO)                          │ ← Log stakeholder
│ 0.1 projects/[EDU-XXX]/warroom/PRODUCT_BACKLOG.md    │
│   (neu thay doi anh huong sprint/backlog)            │ ← Backlog
└──────────────────────────────────────────────────────┘
```

### Step 3: Doc files hien tai
Doc tat ca files lien quan TRUOC khi sua:
1. Doc `0.1 projects/[Project]/warroom/PROJECT_BOARD.md`
2. Doc `_hq/MASTER_BOARD.md`
3. Doc `0.1 projects/[Project]/comms/INBOX.md` (neu can ghi message)
4. Doc `_hq/ALO_LOG.md` (neu update lien quan ALO)

### Step 4: Thuc hien Update

#### 4a: Cap nhat PROJECT_BOARD
- Sua dung field: Trang thai, Tien do, Uu tien, Nguoi, Blocked by
- Them task moi vao dung section (BE/FE/QC/BA/AI)
- Cap nhat bang "Tien do tong" (Total/Done/In Progress/Pending/New)
- Cap nhat "Risk Highlights" neu thay doi anh huong risk
- Cap nhat `Last updated` timestamp

#### 4b: Cap nhat MASTER_BOARD
- Sync dung row trong Active Tasks
- Them task moi neu co
- Chuyen task DONE tu Active → Completed (ghi ngay hoan thanh)
- Dam bao MASTER_BOARD khop voi PROJECT_BOARD

#### 4c: Ghi INBOX (neu can thong bao agent khac)
VD: Task DONE → can thong bao QC test, hoac PM review
```markdown
## [YYYY-MM-DD HH:MM] INFO @HEAD → @ROUTER
Project: [project_name]
Task: [task_id] — [mo ta thay doi]
Status: PENDING
```

#### 4d: Cap nhat ALO_LOG (neu thay doi tu ALO)
- Update trang thai ALO entry: DONE / PENDING_ACTION
- Them Task IDs moi tao

#### 4e: Cap nhat BACKLOG (neu can)
- Sprint progress thay doi
- Task moi them vao backlog

### Step 5: Verify
Sau khi sua, kiem tra:
- [ ] PROJECT_BOARD khop voi MASTER_BOARD (task ID, status, priority)
- [ ] Khong co task DONE trong Active Tasks cua MASTER_BOARD
- [ ] Bang "Tien do tong" dung so lieu
- [ ] Timestamps da cap nhat

### Step 6: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
```
📝 UPDATE — @[ROLE]
Changes:
- [task_id]: [thay doi — VD: 40% → 70%, PENDING → DONE]
- [task_id]: [thay doi]
Files: [so file da sua]
[YYYY-MM-DD HH:MM]
```

### Step 7: Report
```
Update Complete:
- [X] tasks updated
- [X] tasks added / removed
Files synced:
  ✅ PROJECT_BOARD (EDU-XXX)
  ✅ MASTER_BOARD
  ✅ INBOX (neu co)
  ✅ ALO_LOG (neu co)
  ✅ BACKLOG (neu co)
✅ Telegram notified
```

---

## BA / QC FLOW (NHE — cap nhat task files rieng)

> BA va QC KHONG sua MASTER_BOARD, PROJECT_BOARD, INBOX.
> Chi cap nhat task files cua minh → Telegram notify PM → PM se dong bo boards.

### Step 1: Parse Input
Tu cau user noi, extract:
- **Task ID**: BA-001a, QC-001b, etc.
- **Thay doi**: trang thai (DANG_LAM / XONG / BLOCKED), tien do (%), ghi chu

| Loai thay doi | Vi du |
|:---|:---|
| Bat dau lam | "Bat dau BA-001a", "Dang lam QC-001b" |
| Tien do | "BA-001a 50%", "QC-001c gan xong" |
| Hoan thanh | "BA-001a xong", "QC-001b done" |
| Blocked | "QC-001d chua co moi truong test" |
| Ghi chu | "BA-001c: ViziStudio va Tool 2d la 2 app khac nhau" |

### Step 2: Cap nhat Sub-task File
Doc file sub-task → them/sua header `**Trang thai**`:

```markdown
# SUB-TASK [ID]: [Ten]
**Parent**: [parent] | **Priority**: [priority] | **Do kho**: [do kho]
**Trang thai**: DANG_LAM | **Tien do**: 50% | **Cap nhat**: [YYYY-MM-DD HH:MM]
```

Cac trang thai hop le:
- `CHUA_BAT_DAU` — chua lam gi
- `DANG_LAM` — dang thuc hien
- `XONG` — da hoan thanh, output da tao
- `BLOCKED` — bi chan (ghi ly do)
- `REVIEW` — da nop output, cho PM review

### Step 3: Cap nhat Parent Task Sub-task Table
Doc file parent task → cap nhat cot `Trang thai` trong bang sub-task:

```markdown
| # | Sub-task | File | Priority | Do kho | Trang thai | Mo ta |
|---|---------|------|----------|--------|------------|-------|
| a | **Nhom CORE** | `BA-001a...` | HIGH | TB | ✅ XONG | ... |
| b | **Social** | `BA-001b...` | HIGH | TB | 🔄 DANG_LAM 50% | ... |
| c | **ViziStudio** | `BA-001c...` | CRITICAL | CAO | ⬜ CHUA | ... |
```

Icon quy uoc:
- ⬜ CHUA_BAT_DAU
- 🔄 DANG_LAM [%]
- ✅ XONG
- 🚫 BLOCKED [ly do]
- 👀 REVIEW

### Step 4: Telegram Notify (BAT BUOC)
```
📝 UPDATE — @[BA|QC]
Sub-task: [task_id] → [trang thai moi]
Tien do: [%]
Ghi chu: [neu co]
→ PM xem xet
[YYYY-MM-DD HH:MM]
```

### Step 5: DUNG O DAY
- BA/QC KHONG sua MASTER_BOARD
- BA/QC KHONG sua PROJECT_BOARD
- BA/QC KHONG sua INBOX
- PM se doc va dong bo khi /brief hoac check Telegram

### Step 6: Report
```
Update Complete (@[BA|QC]):
- Sub-task [ID]: [trang thai cu] → [trang thai moi]
- Tien do: [%]
Files updated:
  ✅ 0.2 Team/[role]/TASKS/[sub-task file]
  ✅ 0.2 Team/[role]/TASKS/[parent task file]
✅ Telegram notified → PM se dong bo
```

---

## VI DU PM

### Vi du 1 — Cap nhat tien do
```
User (PM): BE-001 len 70%, Dien bao sap xong

Agent:
  → Parse: EDU001-BE-001, tien do 40% → 70%
  → Sua PROJECT_BOARD EDU-001: BE-001 tien do = 70%
  → Sua MASTER_BOARD: EDU001-BE-001 status = IN_PROGRESS
  → Notify Telegram
```

### Vi du 2 — Danh dau DONE
```
User (PM): FE-002 xong roi, Chien va Luc da fix

Agent:
  → Parse: EDU001-FE-002, status → DONE
  → Sua PROJECT_BOARD EDU-001: FE-002 = Done, 100%
  → Sua MASTER_BOARD: chuyen FE-002 tu Active → Completed
  → Cap nhat bang "Tien do tong" trong PROJECT_BOARD
  → Ghi INBOX: TASK_DONE cho Router biet
  → Notify Telegram
```

### Vi du 3 — Batch update
```
User (PM): Update:
  - BE-001: 70%
  - FE-002: DONE
  - Them task QC test sv252, HIGH

Agent:
  → Parse 3 thay doi
  → Sua PROJECT_BOARD + MASTER_BOARD (3 changes)
  → Notify Telegram (1 message gom tat ca)
```

## VI DU BA / QC

### Vi du 4 — BA bat dau task
```
User (BA): Bat dau lam BA-001a

Agent BA:
  → Parse: BA-001a, trang thai → DANG_LAM
  → Sua BA-001a file header: Trang thai = DANG_LAM, Tien do = 0%
  → Sua parent BA-001 bang: a = 🔄 DANG_LAM
  → Notify Telegram: "📝 @BA: BA-001a DANG_LAM"
  → DUNG.
```

### Vi du 5 — QC hoan thanh sub-task
```
User (QC): QC-001a xong, da tao output

Agent QC:
  → Parse: QC-001a, trang thai → XONG
  → Sua QC-001a file header: Trang thai = XONG, Tien do = 100%
  → Sua parent QC-001 bang: a = ✅ XONG
  → Notify Telegram: "📝 @QC: QC-001a XONG — output ready"
  → DUNG. PM se review output.
```

### Vi du 6 — BA update tien do
```
User (BA): BA-001c dang 40%, ViziStudio phuc tap lam

Agent BA:
  → Parse: BA-001c, tien do = 40%, ghi chu
  → Sua BA-001c file header: Tien do = 40%
  → Sua parent BA-001 bang: c = 🔄 DANG_LAM 40%
  → Notify Telegram: "📝 @BA: BA-001c 40% — ViziStudio phuc tap"
  → DUNG.
```

### Vi du 7 — QC bi blocked
```
User (QC): QC-001e khong lam duoc, khong co moi truong test

Agent QC:
  → Parse: QC-001e, trang thai → BLOCKED
  → Sua QC-001e file header: Trang thai = BLOCKED, ly do = Khong co moi truong
  → Sua parent QC-001 bang: e = 🚫 BLOCKED
  → Notify Telegram: "📝 @QC: QC-001e BLOCKED — khong co moi truong"
  → DUNG. PM se xu ly.
```

---

## RULES
- **PM/HEAD**: Full flow — dong bo tat ca boards, INBOX, ALO_LOG
- **BA/QC**: Light flow — chi sua task files rieng, notify PM
- **Doc truoc, sua sau** — luon doc file hien tai truoc khi edit
- **PM: Verify** — PROJECT_BOARD phai khop MASTER_BOARD
- **BA/QC: KHONG sua boards** — chi sua files trong `0.2 Team/[role]/TASKS/`
- **Khong ro → HOI** — neu input mo ho, hoi user xac nhan
- **Task ID tu dong** — PM: EDU[XXX]-[TEAM]-[STT]. BA/QC: dung sub-task ID co san
- **Timestamp** — luon cap nhat "Last updated" / "Cap nhat" khi sua
- **Telegram BAT BUOC** — moi update deu notify

## EDGE CASES
- **Task khong ton tai**: Hoi user — co phai task moi khong?
- **Conflict**: 2 nguon thong tin khac nhau → hoi user chon
- **Cross-project**: Neu update anh huong nhieu project → PM sua tat ca PROJECT_BOARDs
- **Input la ALO**: Redirect sang /alo truoc, sau do /update tu dong chay theo
- **BA/QC muon them task moi**: KHONG duoc. Ghi vao /alo, PM se tao task.
- **BA/QC update task khong phai cua minh**: TU CHOI. Chi update task trong folder TASKS/ cua role minh.
