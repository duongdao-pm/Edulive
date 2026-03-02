# GIT WORKFLOW — Branch Per Session
**Ap dung cho moi agent, moi role, moi project.**

## Nguyen tac
- **1 session = 1 branch** — khong bao gio commit truc tiep vao main
- **Merge vao main chi khi Debrief** — sau khi update boards + INBOX
- **"Work is not done until pushed to main"**

## Branch Naming
```
session/{role}-{YYYYMMDD}-{HHMM}
```
Vi du: `session/dev-be-20260302-1030`, `session/pm-20260302-0900`

## Luong Git trong Session

### Brief (bat dau):
```bash
git fetch origin
git checkout -b session/{role}-{date}-{time} origin/main
```

### Execute (lam viec):
```bash
# Commit nhieu lan neu can
git add [files]
git commit -m "[role]: [mo ta ngan]"
```

### Debrief (ket thuc):
```bash
# 1. Push session branch
git push origin session/{role}-{date}-{time}

# 2. Merge vao main
git checkout main
git pull origin main
git merge session/{role}-{date}-{time}

# 3. Neu NO conflict -> push
git push origin main

# 4. Cleanup
git branch -d session/{role}-{date}-{time}
git push origin --delete session/{role}-{date}-{time}

# 5. Neu CONFLICT -> STOP
# Bao user/Router resolve. KHONG force merge.
```

## Rules
1. **KHONG commit truc tiep vao main** — luon dung session branch
2. **KHONG git push --force** — bao gio cung
3. **KHONG git reset --hard** — tru khi user yeu cau ro rang
4. **Conflict -> STOP** — list conflicted files, bao user resolve
5. **Board files** (PROJECT_BOARD, BACKLOG) -> chi Router/PM merge
6. **INBOX** -> append-only, conflict cuc hiem
7. **Co-Authored-By** -> moi commit phai co attribution

## File Ownership (giam conflict)
| File | Owner duy nhat |
|:-----|:---------------|
| `_hq/MASTER_BOARD.md` | Router |
| `_hq/DISPATCH_LOG.md` | Router |
| `_hq/AGENT_STATUS.md` | Router |
| `warroom/PROJECT_BOARD.md` | Router (hoac PM) |
| `warroom/PRODUCT_BACKLOG.md` | PM |
| `comms/INBOX.md` | Append-only (ai cung ghi) |
| `comms/AGENT_STATUS.md` | LOCAL only (KHONG commit) |
| `specs/*` | BA + PM |
| `src/*` | DEV (BE/FE/AI) |
| `qa/*` | QC |

## Multi-user / Multi-machine
- GitHub = "source of truth" duy nhat
- Moi may: clone repo 1 lan, pull moi session
- 2-3 nguoi cung lam -> moi nguoi 1 branch -> merge tuong tu
- n8n KHONG can git (chi doc/ghi Google Sheet)
- GAS KHONG can git (deploy qua browser, backup trong src/)
