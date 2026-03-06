---
description: "Cap nhat trang thai task, tien do, thong tin du an. Dong bo TAT CA files lien quan: PROJECT_BOARD, MASTER_BOARD, INBOX, ALO_LOG. Dung khi user noi 'Update', 'Cap nhat', 'Sua status'."
globs:
alwaysApply: false
---
# SKILL: UPDATE

## PURPOSE
Cap nhat trang thai, tien do, thong tin task/du an. Tu dong dong bo TAT CA files lien quan trong 1 lan — khong can sua tung file.

## WHEN TO USE
- User noi "Update", "Cap nhat", "Sua status"
- User bao tien do: "BE-001 len 70%", "FE-002 xong roi"
- User them task moi: "Them task QC test sv252"
- User doi priority: "BE-004 len CRITICAL"
- User danh dau DONE/BLOCKED
- Batch update nhieu thay doi 1 luc

## AI DUOC SU DUNG
- HEAD, PM, Router

## LOGIC

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
│ projects/[EDU-XXX]/warroom/PROJECT_BOARD.md          │ ← Task board du an
│ _hq/MASTER_BOARD.md                                  │ ← Bang tong cross-project
│ projects/[EDU-XXX]/comms/INBOX.md (neu can)          │ ← Thong bao cho agent
│ _hq/ALO_LOG.md (neu tu ALO)                          │ ← Log stakeholder
│ projects/[EDU-XXX]/warroom/PRODUCT_BACKLOG.md (neu   │
│   thay doi anh huong sprint/backlog)                 │ ← Backlog
└──────────────────────────────────────────────────────┘
```

### Step 3: Doc files hien tai
Doc tat ca files lien quan TRUOC khi sua:
1. Doc `projects/[Project]/warroom/PROJECT_BOARD.md`
2. Doc `_hq/MASTER_BOARD.md`
3. Doc `projects/[Project]/comms/INBOX.md` (neu can ghi message)
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

## VI DU

### Vi du 1 — Cap nhat tien do
```
User: BE-001 len 70%, Dien bao sap xong

Agent:
  → Parse: EDU001-BE-001, tien do 40% → 70%
  → Sua PROJECT_BOARD EDU-001: BE-001 tien do = 70%
  → Sua MASTER_BOARD: EDU001-BE-001 status = IN_PROGRESS
  → Notify Telegram
```

### Vi du 2 — Danh dau DONE
```
User: FE-002 xong roi, Chien va Luc da fix

Agent:
  → Parse: EDU001-FE-002, status → DONE
  → Sua PROJECT_BOARD EDU-001: FE-002 = Done, 100%
  → Sua MASTER_BOARD: chuyen FE-002 tu Active → Completed
  → Cap nhat bang "Tien do tong" trong PROJECT_BOARD
  → Ghi INBOX: TASK_DONE cho Router biet
  → Notify Telegram
```

### Vi du 3 — Them task moi
```
User: Them task QC test lai sv252 sau fix bug 3D, priority HIGH, project EDU-001

Agent:
  → Parse: task moi, QC, EDU-001, HIGH
  → Tao Task ID: EDU001-QC-005
  → Them vao PROJECT_BOARD EDU-001 section QC
  → Them vao MASTER_BOARD Active Tasks
  → Cap nhat bang "Tien do tong"
  → Notify Telegram
```

### Vi du 4 — Batch update
```
User: Update:
  - BE-001: 70%
  - FE-002: DONE
  - Them task QC test sv252, HIGH
  - BE-004: chuyen CRITICAL

Agent:
  → Parse 4 thay doi
  → Sua PROJECT_BOARD EDU-001 (4 changes)
  → Sua MASTER_BOARD (4 changes)
  → Ghi INBOX (FE-002 DONE)
  → Notify Telegram (1 message gom tat ca)
```

## RULES
- **DONG BO TAT CA FILES** — KHONG duoc chi sua 1 file ma bo file khac
- **Doc truoc, sua sau** — luon doc file hien tai truoc khi edit
- **Verify sau khi sua** — PROJECT_BOARD phai khop MASTER_BOARD
- **Khong ro → HOI** — neu input mo ho, hoi user xac nhan
- **Task ID tu dong** — khi them task moi, tu tao ID theo format: EDU[XXX]-[TEAM]-[STT]
- **Timestamp** — luon cap nhat "Last updated" khi sua board
- HEAD/PM co the update bat ky project nao
- Agent chi update project minh duoc assign

## EDGE CASES
- **Task khong ton tai**: Hoi user — co phai task moi khong?
- **Conflict**: 2 nguon thong tin khac nhau → hoi user chon
- **Cross-project**: Neu update anh huong nhieu project → sua tat ca PROJECT_BOARDs lien quan
- **Input la ALO**: Redirect sang /alo truoc, sau do /update tu dong chay theo
