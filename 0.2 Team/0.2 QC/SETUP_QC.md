# QC TEAM — Huong dan Clone & Setup

## Clone chi folder QC (sparse checkout)

```bash
# 1. Clone repo (khong lay het files)
git clone --filter=blob:none --sparse https://github.com/duongdao-pm/Edulive.git
cd Edulive

# 2. Chi lay folders QC can
git sparse-checkout set \
  "CLAUDE.md" \
  ".env.example" \
  ".agent/rules/global/" \
  ".agent/skills/brief/" \
  ".agent/skills/update/" \
  ".agent/skills/alo/" \
  ".agent/skills/debrief/" \
  ".agent/ONBOARDING.md" \
  "0.2 Team/0.2 QC/" \
  "0.2 Team/TRANG_THAI_DU_LIEU.md" \
  "_resources/" \
  "product/"

# 3. Tao .env tu template
cp .env.example .env
# Sua .env dien credentials (hoi PM lay)
```

## Sau khi clone — bat dau lam viec

```bash
# Chay /brief de check-in
# Agent se doc BRIEF_QC.md → TASKS/ → bao cao san sang
```

## Cap nhat code moi
```bash
git pull origin master
```

## Sau khi lam xong task — debrief
```bash
# Chay /debrief
# Agent se commit output → push → notify PM
```

## Files QC duoc doc/sua

| Folder | Quyen | Muc dich |
|--------|-------|---------|
| `0.2 Team/0.2 QC/BRIEF_QC.md` | Doc | Nhiem vu chien luoc |
| `0.2 Team/0.2 QC/TASKS/*.md` | Doc + Sua (status) | Sub-tasks |
| `0.2 Team/0.2 QC/OUTPUT/` | Tao file moi | Ket qua |
| `0.2 Team/TRANG_THAI_DU_LIEU.md` | Doc | Biet data nao co/thieu |
| `_resources/*.csv` | Doc | Bug logs, testcases |
| `_resources/common/` | Doc | Specs, checklists |
| `product/` | Doc | Product registry |
| `.agent/rules/` | Doc | Rules phai theo |
| `.agent/skills/` | Doc | Cach dung /brief /update /alo |

## Skills QC duoc dung

| Skill | Lenh | Khi nao |
|-------|------|---------|
| `/brief` | Bat dau session | Check-in, doc tasks |
| `/update` | Cap nhat tien do | "update QC-001a 50%" |
| `/alo` | Ghi nhan thong tin | Nhan info tu dev/team |
| `/debrief` | Ket thuc session | Commit, push, notify |
