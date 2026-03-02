---
description: "Deploy code/output len production. Pre-check, deploy, verify, log. Dung khi user noi 'Deploy', 'All-in', 'finalize'."
globs:
alwaysApply: false
---
# SKILL: DEPLOY

> Aliases: **All-in**, **Finalize** (backward compatible voi Poker protocol)

## PURPOSE
Deploy code/output len production environment. Pre-check → deploy → verify → log.

## WHEN TO USE
- User noi "Deploy", "All-in", "Finalize"
- Task marked DEPLOY_READY in INBOX
- Code da review xong va san sang production

## LOGIC

### Step 1: Pre-deploy Check
```
[ ] Output da duoc review?
[ ] Tat ca task lien quan da DONE tren BOARD.md?
[ ] Code da commit + push?
[ ] SPEC approved?
[ ] Tests passed? (neu co)
[ ] Khong con blocker?
[ ] Dependencies cross-team da resolve?
[ ] File output nam dung subfolder?
```
Doc `.env` de lay credentials can thiet.
Doc deploy log truoc do (neu co): `src/DEPLOY_LOG.md`

### Step 2: Identify Target
Xac nhan deploy gi:
- GAS Script Project?
- Chrome Extension?
- Webhook setup?
- Web app (Node/React...)?
- Documentation/spec delivery?

Source folder:
- `src/be/` — Backend
- `src/fe/` — Frontend
- `src/ai/` — AI components

### Step 3: Read Source Code
Doc tat ca files trong source folder can deploy.

### Step 4: Deploy (by platform)

#### Google Apps Script (GAS)
1. Mo browser → `https://script.google.com`
2. Navigate to project (dung GAS Script Project ID tu .env)
3. Tao files .gs/.html hoac update existing
4. Paste code tu source folder
5. Save + Deploy Web App (new version)
6. Copy deploy URL

#### Webhook
1. Chay `setWebhook()` function trong GAS
2. Hoac goi API truc tiep
3. Verify connectivity

#### Web App / Service
1. Build (npm build, etc.)
2. Deploy to hosting
3. Verify endpoint

### Step 5: Post-deploy
1. Chay setup/init functions neu can:
   - `setupDatabase()` — tao Sheets structure
   - `setWebhook()` — register webhook
   - `createTriggers()` — setup cron triggers
2. Verify deployment hoat dong:
   - Test endpoint (curl/fetch)
   - Gui test message (Telegram)
   - Check logs
3. Ghi DEPLOY_LOG vao `src/DEPLOY_LOG.md`:
   ```
   ## [YYYY-MM-DD HH:MM] Deploy [target]
   Version: [version]
   URL: [deploy URL]
   Changes: [tom tat]
   Status: SUCCESS / FAILED
   ```
4. Write DEPLOYED message to `comms/INBOX.md` (hoac `_hq/incoming/QUEUE.md` neu qua Router)

### Step 6: Telegram Notify (BAT BUOC)
→ **Telegram Notify BAT BUOC** (xem `.agent/rules/global/telegram-notify.md`)
- Notify Telegram: DEPLOY_READY / DEPLOYED
- Update AGENT_STATUS.md (DONE khi deploy thanh cong)

### Step 7: Report
```
Deploy — Thanh cong!
Target: [GAS/Extension/Web/...]
Deliverable: [ten output]
Location: [deploy URL hoac duong dan file]
Test: [ket qua test]
Status: Deployed ✅ Telegram notified
User can lam: [authorize permissions neu co]
```

## EDGE CASES
- Source code chua co → yeu cau DEV code truoc
- Browser khong connect → huong dan user connect Chrome extension
- Deploy fail → bao loi, de xuat fix, KHONG commit "success"
- Google hoi quyen (OAuth) → bao user bam Authorize (agent khong bypass duoc)
- Missing credentials → doc `.env` truoc. Neu khong co → bao user them vao .env
- Co blocker → bao user, KHONG tu bo qua
- Verify TRUOC khi bao thanh cong — KHONG rush
