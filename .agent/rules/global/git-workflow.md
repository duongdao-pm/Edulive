# GIT WORKFLOW — Multi-User Workspace
**Ap dung cho moi agent, moi role, moi project.**
**Cap nhat**: 2026-03-06 — ho tro nhieu nguoi cung lam viec

---

## Nguyen tac co ban
- **GitHub = source of truth duy nhat**
- **1 session = 1 branch** — khong commit truc tiep vao master
- **Pull TRUOC khi lam** — luon lay code moi nhat
- **Push SAU khi xong** — merge vao master + notify
- **Conflict → STOP** — bao user, KHONG force

---

## Branch Naming
```
session/{role}-{YYYYMMDD}-{HHMM}
```
Vi du:
- `session/qc-20260306-1400`
- `session/ba-20260306-0900`
- `session/pm-20260306-1000`

---

## LUONG GIT THEO PHASE

### 1. BRIEF (bat dau session)

```bash
# Buoc 1: Lay code moi nhat
git fetch origin
git pull origin master          # ← BAT BUOC: lay thay doi cua nguoi khac

# Buoc 2: Tao branch rieng
git checkout -b session/{role}-{date}-{time} origin/master
```

**Telegram notify:**
```
🟢 ONLINE — @[ROLE]
Branch: session/{role}-{date}-{time}
San sang lam viec
[YYYY-MM-DD HH:MM]
```

### 2. EXECUTE (lam viec)

```bash
# Commit thuong xuyen tren branch cua minh
git add [files cu the — KHONG dung git add .]
git commit -m "[ROLE]: [mo ta ngan]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Quy tac file:**
- BA chi sua: `0.2 Team/0.1 BA/` (TASKS/, OUTPUT/)
- QC chi sua: `0.2 Team/0.2 QC/` (TASKS/, OUTPUT/)
- PM sua: `_hq/`, `0.1 projects/*/warroom/`, `0.2 Team/`
- HEAD sua: `.agent/`, `_context/`, bat ky

### 3. DEBRIEF (ket thuc session — QUAN TRONG NHAT)

```bash
# Buoc 1: Commit tat ca thay doi tren branch
git add [files]
git commit -m "[ROLE]: [debrief — mo ta]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

# Buoc 2: Push branch len remote (backup)
git push origin session/{role}-{date}-{time}

# Buoc 3: Chuyen sang master va PULL moi nhat
git checkout master
git pull origin master          # ← LAY THAY DOI CUA NGUOI KHAC TRUOC

# Buoc 4: Merge branch vao master
git merge session/{role}-{date}-{time}

# Buoc 5: Kiem tra conflict
#   NEU KHONG CO CONFLICT → push
git push origin master

#   NEU CO CONFLICT → STOP (xem muc "Xu ly Conflict" ben duoi)

# Buoc 6: Cleanup branch
git branch -d session/{role}-{date}-{time}
git push origin --delete session/{role}-{date}-{time}
```

**Telegram notify SAU KHI push thanh cong:**
```
🔴 OFFLINE — @[ROLE]
Branch: session/{role}-{date}-{time} → merged to master ✅
Changes:
- [file 1]: [thay doi]
- [file 2]: [thay doi]
[so file] files, [so dong] lines changed
→ Cac agent khac: git pull truoc khi lam viec
[YYYY-MM-DD HH:MM]
```

> **BAT BUOC**: Sau khi push master → Telegram notify de nguoi khac biet CAN PULL.

---

## XU LY CONFLICT

### Khi nao xay ra conflict?
- 2 nguoi sua CUNG 1 FILE cung luc (hiem khi xay ra neu theo role-boundaries)
- VD: PM sua MASTER_BOARD trong khi QC cung sua (KHONG NEN xay ra — QC khong sua MASTER_BOARD)

### Neu gap conflict:
```bash
# 1. DUNG LAI — khong fix tu y
git merge --abort

# 2. Bao user + bao PM qua Telegram
```

**Telegram notify:**
```
⚠️ GIT CONFLICT — @[ROLE]
Branch: session/{role}-{date}-{time}
Conflicted files:
- [file 1]
- [file 2]
→ Can PM/HEAD resolve
[YYYY-MM-DD HH:MM]
```

### PM/HEAD resolve:
```bash
# Xem conflict
git merge session/{role}-{date}-{time}
# Sua tung file conflict
# git add → git commit → git push
```

---

## QUY TAC TRANH CONFLICT (FILE OWNERSHIP)

| File / Folder | Owner | Ai KHONG duoc sua |
|:--------------|:------|:-----------------|
| `_hq/MASTER_BOARD.md` | PM / Router | BA, QC, Dev |
| `_hq/ALO_LOG.md` | PM | BA, QC (chi append qua /alo) |
| `_hq/sync_reports/` | Sync / PM | BA, QC, Dev |
| `0.1 projects/*/warroom/` | PM | BA, QC, Dev |
| `0.2 Team/0.1 BA/` | BA | QC (va nguoc lai) |
| `0.2 Team/0.2 QC/` | QC | BA (va nguoc lai) |
| `0.2 Team/TRANG_THAI_DU_LIEU.md` | PM / HEAD | BA, QC (read-only) |
| `.agent/rules/` | HEAD | Tat ca |
| `.agent/skills/` | HEAD | Tat ca |
| `_resources/` | READ-ONLY | Khong ai sua (PM them file moi) |
| `product/` | READ-ONLY | Khong ai sua (PM them file moi) |

> **KEY**: BA va QC lam viec tren FOLDER KHAC NHAU → gan nhu KHONG BAO GIO conflict.

---

## LUONG NOTI DAY DU — AI BAO AI

### Khi 1 agent PUSH len master:

```
Agent push → Telegram notify:
  "🔴 OFFLINE @[ROLE] — merged to master ✅ — git pull truoc khi lam"
     ↓
Cac agent KHAC thay Telegram:
  → Neu DANG lam viec: chay "git pull origin master" tren branch cua minh
  → Neu CHUA bat dau: se pull khi /brief
```

### Khi PM cap nhat boards:
```
PM push MASTER_BOARD → Telegram notify:
  "📝 UPDATE @PM — [thay doi gi]"
     ↓
BA/QC: doc khi /brief — khong can hanh dong ngay
```

### Khi BA/QC cap nhat task status:
```
BA push → Telegram notify:
  "📝 UPDATE @BA — BA-001a: 50% DANG_LAM"
     ↓
PM: nhan Telegram → /brief → review → xac nhan hoac bo qua
QC: khong can lam gi (khong lien quan)
```

### Khi QC cap nhat:
```
QC push → Telegram notify:
  "📝 UPDATE @QC — QC-001a: XONG — output ready"
     ↓
PM: nhan Telegram → /brief → review
BA: doc QC output de cross-check (optional)
```

### Ma tran noti:

| Nguoi push | PM nhan | BA nhan | QC nhan | HEAD nhan |
|:-----------|:--------|:--------|:--------|:----------|
| PM | — | ✅ (neu lien quan) | ✅ (neu lien quan) | ✅ |
| BA | ✅ (review) | — | ℹ️ (FYI) | ✅ |
| QC | ✅ (review) | ℹ️ (FYI) | — | ✅ |
| HEAD | ✅ | ✅ | ✅ | — |

> Telegram group chung → TAT CA thay TAT CA noti.
> Moi agent chi HANH DONG khi noti LIEN QUAN toi minh.

---

## LUONG HANG NGAY (VI DU)

```
07:30  GAS cron chay /sync → Telegram: "📊 DAILY SYNC"
08:00  PM /brief → pull master → doc reports → plan ngay
08:30  PM push tasks moi → Telegram: "📝 UPDATE @PM"
09:00  QC /brief → pull master → thay tasks moi → bat dau lam
09:05  QC → Telegram: "🟢 ONLINE @QC"
09:30  BA /brief → pull master → bat dau collect
09:35  BA → Telegram: "🟢 ONLINE @BA"
...
12:00  QC /update QC-001a 50% → commit → push
12:01  QC → Telegram: "📝 UPDATE @QC — QC-001a 50%"
...
15:00  BA /update BA-001a xong → commit output → push
15:01  BA → Telegram: "📝 UPDATE @BA — BA-001a XONG"
...
17:00  QC /debrief → merge to master → push
17:01  QC → Telegram: "🔴 OFFLINE @QC — merged ✅ — git pull"
17:05  BA /debrief → pull master (lay QC changes) → merge → push
17:06  BA → Telegram: "🔴 OFFLINE @BA — merged ✅"
17:30  PM /brief → pull master → thay BA/QC updates → review
```

---

## RULES (TOM TAT)

1. **PULL truoc moi session** — `git pull origin master`
2. **BRANCH rieng** — `session/{role}-{date}-{time}`
3. **CHI sua files cua minh** — theo File Ownership table
4. **Commit cu the** — `git add [file]`, KHONG `git add .`
5. **KHONG git push --force** — bao gio cung
6. **KHONG git reset --hard** — tru khi user yeu cau
7. **Conflict → STOP → bao user** — KHONG tu resolve
8. **Telegram AFTER push** — moi lan push master → notify
9. **Co-Authored-By** — moi commit phai co attribution
10. **Debrief = Merge** — chi merge vao master khi debrief

## SPARSE CHECKOUT (BA/QC)
BA va QC co the dung sparse checkout de chi lay files can:
- BA: xem `0.2 Team/0.1 BA/SETUP_BA.md`
- QC: xem `0.2 Team/0.2 QC/SETUP_QC.md`

Sparse checkout KHONG anh huong git push — van push duoc binh thuong.
