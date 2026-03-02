---
description: "Thuc thi task theo Spec-First Protocol. Doc SPEC truoc khi code. Khong co spec = khong code. Dung khi agent bat dau lam task."
globs:
alwaysApply: false
---
# SKILL: EXECUTE

## PURPOSE
Thuc thi task theo Spec-First Protocol. Dam bao moi task deu co spec truoc khi code.
Tracking working status trong suot qua trinh lam viec.

## WHEN TO USE
- Agent bat dau lam task tu Dispatch (TASK_ASSIGNED)
- Sau khi Brief + Dispatch xong, chuyen sang lam viec
- User noi "Execute", "Lam task", "Start working"

## LOGIC

### Step 0: Pre-check
1. Da Brief chua? → Neu chua → yeu cau Brief truoc
2. Task da duoc Dispatch (IN_PROGRESS)? → Neu chua → yeu cau Dispatch truoc
3. Doc task details tu INBOX message

### Step 1: Read SPEC (BAT BUOC — Spec-First Protocol)
1. Tim SPEC file duoc reference trong task:
   - `projects/[Project]/specs/[SPEC_FILE].md`
   - Hoac doc `Context:` field trong INBOX message
2. Doc SPEC day du — hieu yeu cau, acceptance criteria, constraints
3. **KHONG co SPEC = KHONG code** → Raise/Msg cho BA hoac PM yeu cau spec

### Step 2: Plan
1. List ra cac buoc can thuc hien
2. Xac dinh files se tao/sua
3. Xac dinh dependencies (API, data, cross-team)
4. Neu co blocker → Msg ngay, KHONG doi

### Step 3: Update Status — WORKING
Cap nhat `comms/AGENT_STATUS.md`:
```markdown
## [Icon] @[ROLE]
Model: [model name]
Status: WORKING
Branch: session/{role}-{date}-{time}
Task: [task description ngan]
Since: [YYYY-MM-DD HH:MM]
```

### Step 4: Execute
Thuc thi theo role:

**Dev BE / Dev FE:**
- Code theo SPEC
- Luu output vao `src/be/` hoac `src/fe/`
- Comment ro rang, follow coding conventions
- Test locally neu co the

**BA:**
- Research, phan tich, viet documentation
- Luu output vao `specs/`
- Cross-reference COMPANY_CONTEXT va product knowledge

**QC:**
- Viet test plan hoac chay test
- Luu ket qua vao `qa/`
- Ghi bug report neu co

**AI:**
- Research, prototype, integrate AI features
- Luu output vao `src/ai/` hoac `specs/`

### Step 5: Verify Output
1. Output dung voi SPEC requirements?
2. Acceptance criteria met?
3. Files luu dung subfolder?
4. Code co loi syntax/logic khong?

### Step 6: Commit Progress
```bash
git add [changed files]
git commit -m "[role]([project]): [summary of changes]"
```
- Commit thuong xuyen — khong doi het session moi commit
- Message format: `[role]([project]): [mo ta ngan]`

### Step 7: Update INBOX
Cap nhat message goc trong INBOX:
```markdown
Status: DONE
Result: [mo ta ket qua + duong dan file output]
```

### Step 8: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
- Notify khi DONE hoac BLOCKED

## RULES
- **Spec-First**: KHONG code khi chua co SPEC approved
- **No Fabrication**: KHONG suy doan API/data → test hoac hoi (xem `.agent/rules/global/no-fabrication.md`)
- **Role Boundaries**: Chi lam viec trong scope cua role minh (xem `.agent/rules/global/role-boundaries.md`)
- **Commit early, commit often**: Khong doi Debrief moi commit
- Reply = sua Status + Result tren **message goc** (KHONG tao message moi)

## EDGE CASES
- SPEC chua co → Msg cho BA/PM yeu cau → STOP, KHONG tu viet spec
- SPEC mo ho → Msg hoi clarification → giu IN_PROGRESS
- Task blocked boi team khac → Msg thong bao → giu IN_PROGRESS, ghi BLOCKED reason
- Task lon → chia nho, commit tung phan
- Loi unexpected → ghi log, Msg cho PM/Lead, KHONG tu fix ngoai scope
