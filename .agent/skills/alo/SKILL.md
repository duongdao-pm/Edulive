---
description: "Parse tin nhan stakeholder hoac thong tin nhan duoc, cross-check context, de xuat action. PM/BA/QC deu dung duoc. Dung khi user noi 'Alo [nguoi] bao [noi dung]'."
globs:
alwaysApply: false
---
# SKILL: ALO (= Tin nhan / Thong tin nhan duoc)

## PURPOSE
Ghi nhan va xu ly thong tin nhan duoc tu nguoi thuc te (stakeholder, dev, GV, doi tac...).

**3 role duoc dung**: PM, BA, QC — moi role co flow khac nhau.

## WHEN TO USE
- User noi "Alo [nguoi] bao/noi/nhan [noi dung]"
- User noi "/alo [nguoi] bao [noi dung]"
- Nhan tin nhan mieng/chat tu nguoi lien quan can ghi lai

## AI PHAN BIET ROLE NHU THE NAO
- Neu dang o session PM (hoac HEAD) → **PM flow** (day du: parse + phan tich + de xuat action)
- Neu dang o session BA → **BA flow** (nhe: ghi nhan + flag cho PM)
- Neu dang o session QC → **QC flow** (nhe: ghi nhan + flag cho PM)
- Role khac → tu choi: "Alo chi danh cho PM, BA, QC."

---

## PM FLOW (DAY DU — nhu truoc)

### Step 1: Parse
```
Alo <nguoi_gui> bao|noi|nhan <noi_dung>
```

Extract:
1. **Nguoi gui** — ten, vai tro (cross-check `product/COMPANY_CONTEXT.md`)
2. **Noi dung** — nguyen van tin nhan
3. **Du an lien quan** — detect tu keywords

### Step 1.5: Telegram Notify — ALO_RECEIVED (BAT BUOC)
Ngay sau khi parse xong, TRUOC khi phan tich → notify Telegram:
```
📞 ALO_RECEIVED — @PM
From: [Nguoi gui] ([Vai tro])
Flags: [AUTO-FLAGS neu co]
Noi dung: [tom tat 1 dong]
[YYYY-MM-DD HH:MM]
```

### Step 2: Cross-check COMPANY_CONTEXT.md
- Doc `product/COMPANY_CONTEXT.md`
- Map nguoi gui → vai tro, quyen han
- Map keywords → du an, product, team

### Step 3: Auto-flag Keywords

| Keyword | Flag |
|:---|:---|
| Kafka, dong bo, offline, Server Bien | `[HIGH PRIORITY]` |
| Native, Legacy, HHB, dong goi, merge | `[VERSION RISK]` |
| Assignment, Approve, camelCase | `[ALIGNMENT NEEDED]` |
| Sep, TGD, deadline, release | `[STAKEHOLDER PRESSURE]` |
| STEM Room, EDL750s, Tool 2d | `[STEM DEPLOYMENT]` |

### Step 4: Phan tich
1. **Loai yeu cau**: Info request / Task moi / Blocker / Escalation / Feature request
2. **Muc do**: Routine / Can action / Urgent
3. **Du an**: EDU-XXX nao?

### Step 5: De xuat Action → CHO USER DUYET
PM Agent de xuat:
- Tra loi stakeholder (draft response)
- Raise task cho team (→ trigger `/msg`)
- Luu vao backlog
- Can them thong tin → hoi user

**LUON CHO USER DUYET truoc khi thuc hien.**

### Step 6: Execute (sau khi user duyet)
- Neu can Msg → trigger `/msg @[ROLE] [task]`
- Neu can luu → ghi vao `_hq/incoming/QUEUE.md`
- Neu can tra loi → draft cho user gui

### Step 7: Telegram Notify — ALO_DONE (BAT BUOC)
Notify khi da xu ly xong (sau user duyet):
```
✅ ALO_DONE — ALO-[STT]
From: [Nguoi gui]
Action: [Tao task / Msg @ROLE / Tra loi]
Tasks: [Task IDs da tao]
Status: DONE | PENDING_ACTION | WAITING_INFO
[YYYY-MM-DD HH:MM]
```

### Step 8: Ghi ALO LOG (BAT BUOC)
Ghi vao `_hq/ALO_LOG.md` — format PM:
```markdown
### [YYYY-MM-DD HH:MM] ALO-[STT]
- **Nguoi gui**: [Ten] ([Vai tro])
- **Noi dung goc**: [Nguyen van tin nhan]
- **Flags**: [AUTO-FLAG keywords]
- **Phan tich**: [PM tom tat: loai yeu cau, muc do, du an]
- **Action**: [Da lam gi — VD: Tao task, Msg @BE, Tra loi]
- **Task IDs**: [Task da tao tu ALO nay]
- **Trang thai**: DONE | PENDING_ACTION | WAITING_INFO | REJECTED
```

---

## BA / QC FLOW (NHE — ghi nhan + flag cho PM)

> BA va QC KHONG phan tich sau, KHONG tao task, KHONG de xuat action.
> Chi GHI NHAN thong tin → PM doc va quyet dinh.

### Step 1: Parse
Giong PM — extract nguoi gui, noi dung, du an.

### Step 2: Ghi ALO LOG (BAT BUOC)
Ghi vao `_hq/ALO_LOG.md` — format BA/QC:
```markdown
### [YYYY-MM-DD HH:MM] ALO-[STT] 🔵 @[BA|QC]
- **Nguoi gui**: [Ten] ([Vai tro / Quan he])
- **Ghi nhan boi**: @[BA|QC] — [ten nguoi ghi]
- **Noi dung goc**: [Nguyen van tin nhan / thong tin nhan duoc]
- **Lien quan**: [San pham / Du an / Task nao — neu biet]
- **Loai**: INFO | BUG_REPORT | FEATURE_FINDING | CLARIFICATION | REQUEST
- **Trang thai**: CHO_PM_XU_LY
```

### Step 3: Telegram Notify (BAT BUOC)
```
🔵 ALO-[STT] — @[BA|QC] ghi nhan
From: [Nguoi gui]
Loai: [INFO / BUG_REPORT / ...]
Noi dung: [tom tat 1 dong]
→ CHO PM xu ly
[YYYY-MM-DD HH:MM]
```

### Step 4: DUNG O DAY
- BA/QC KHONG phan tich them
- BA/QC KHONG tao task
- BA/QC KHONG thay doi board
- PM se doc ALO LOG va xu ly

---

## VI DU BA/QC

### Vi du 4 — QC nhan bug tu dev
```
User (QC session): Alo Chien bao loi search tren Social bi loi trang khi go tieng Viet co dau

Agent QC:
  → Nguoi gui: Chien (FE)
  → Loai: BUG_REPORT
  → Lien quan: Social / AI Teacher
  → Ghi vao ALO LOG: ALO-xxx 🔵 @QC
  → Notify Telegram
  → DUNG. Cho PM xu ly.
```

### Vi du 5 — BA phat hien thong tin moi
```
User (BA session): Alo doc tai lieu thay ViziStudio va Tool 2d la 2 app khac nhau, ViziStudio la desktop, Tool 2d la web

Agent BA:
  → Nguoi gui: Tai lieu noi bo
  → Loai: CLARIFICATION
  → Lien quan: ViziStudio, Tool 2d — tra loi cau hoi BA-001c #1
  → Ghi vao ALO LOG: ALO-xxx 🔵 @BA
  → Notify Telegram
  → DUNG. PM se cap nhat PRODUCT_REGISTRY.
```

### Vi du 6 — QC bao ket qua test
```
User (QC session): Alo test sv 254 xong, co 8 bug, 3 critical

Agent QC:
  → Nguoi gui: QC team (ket qua test)
  → Loai: BUG_REPORT
  → Lien quan: EDU001-QC-006 (check sv 254)
  → Ghi vao ALO LOG: ALO-xxx 🔵 @QC
  → Notify Telegram
  → DUNG. PM se assign dev fix.
```

---

## RULES
- **PM**: Full flow — parse, phan tich, de xuat action, cho duyet, execute
- **BA/QC**: Light flow — parse, ghi log, notify, DUNG
- **LUON CHO USER DUYET** truoc khi thuc hien bat ky action nao (PM)
- **BA/QC KHONG tao task** — chi ghi nhan, PM quyet dinh
- Moi message = 1 phan tich (khong gop nhieu tin nhan)
- Cross-check COMPANY_CONTEXT.md (PM only)
- Tu detect Project tu keywords, hoac hoi user neu khong ro
- STT tang dan chung cho ca PM/BA/QC: ALO-001, ALO-002... (1 log duy nhat)
- BA/QC entries danh dau bang 🔵 va @[ROLE] de PM nhan biet nhanh

## EDGE CASES
- **Khong ro nguoi gui**: hoi user: "Ai nhan?"
- **Khong ro du an**: Noi dung khong match keyword → hoi user xac nhan
- **Nhieu flags**: List tat ca flags, uu tien HIGH PRIORITY truoc
- **BA/QC muon de xuat action**: Ghi de xuat vao noi dung, nhung KHONG tu thuc hien. PM doc va quyet dinh.
