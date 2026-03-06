# BA TEAM — Huong dan Clone & Setup

## Clone chi folder BA (sparse checkout)

```bash
# 1. Clone repo (khong lay het files)
git clone --filter=blob:none --sparse https://github.com/duongdao-pm/Edulive.git
cd Edulive

# 2. Chi lay folders BA can
git sparse-checkout set \
  "CLAUDE.md" \
  ".env.example" \
  ".agent/rules/global/" \
  ".agent/skills/brief/" \
  ".agent/skills/update/" \
  ".agent/skills/alo/" \
  ".agent/skills/debrief/" \
  ".agent/ONBOARDING.md" \
  "0.2 Team/0.1 BA/" \
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
# Agent se doc BRIEF_BA.md → TASKS/ → bao cao san sang
```

## Cap nhat code moi
```bash
git pull origin master
```

## Files BA duoc doc/sua

| Folder | Quyen | Muc dich |
|--------|-------|---------|
| `0.2 Team/0.1 BA/BRIEF_BA.md` | Doc | Nhiem vu chien luoc |
| `0.2 Team/0.1 BA/TASKS/*.md` | Doc + Sua (status) | Sub-tasks |
| `0.2 Team/0.1 BA/OUTPUT/` | Tao file moi | Ket qua |
| `0.2 Team/TRANG_THAI_DU_LIEU.md` | Doc | Biet data nao co/thieu |
| `_resources/` | Doc | HDKT, HDSD, BRD, FRD |
| `product/` | Doc | Product registry, knowledge base |
| `.agent/rules/` | Doc | Rules phai theo |
| `.agent/skills/` | Doc | Cach dung /brief /update /alo |

## Skills BA duoc dung

| Skill | Lenh | Khi nao |
|-------|------|---------|
| `/brief` | Bat dau session | Check-in, doc tasks |
| `/update` | Cap nhat tien do | "update BA-001a 50%" |
| `/alo` | Ghi nhan thong tin | Nhan info moi |
| `/debrief` | Ket thuc session | Commit, push, notify |
