---
description: "Dong bo task tu Google Sheet ve workspace. Cron daily hoac manual trigger. Pull data tu sheet, tao bao cao tong hop, luu vao _hq/sync_reports/. Dung khi user noi 'Sync', 'Dong bo', 'Pull sheet', 'Bao cao ngay'."
globs:
alwaysApply: false
---
# SKILL: SYNC

## PURPOSE
Pull data tu Google Sheet `Edulive_Schedule_v1` → tong hop task hang ngay cua cac thanh vien → luu report vao workspace → PM review.

## WHEN TO USE
- User noi "Sync", "Dong bo", "Pull sheet"
- User noi "Bao cao ngay", "Daily report"
- User noi "Check task team"
- Cron job trigger hang ngay (7:30 AM)
- PM muon biet team dang lam gi

## AI DUOC SU DUNG
- PM, HEAD, SYNC agent

## GOOGLE SHEET CONFIG
```
Sheet ID:   1U0S28FUhiXgGiZDUcDEg08GohpVS1srf-xVkKqWRaJU
Sheet name: Edulive_Schedule_v1
Tabs:       BE Team, FE Team, QC Team, AI Team, BA Team, Daily task
```

## TEAM MEMBERS (mapping tab → nguoi)
| Tab | Thanh vien |
|-----|-----------|
| BE Team | Anh Ngoc, Toai, Mr Dien, Luc, Dung |
| FE Team | Mr Hung, Chien, Khanh, Nghia, Quang, Hung, Van |
| QC Team | Phuong Hoa, Tran Thi Anh Dao, Vu Hong Anh, Nguyen Thi Khanh Linh |
| AI Team | Dat, Thinh, Tuyen, Nam |
| BA Team | (BA agent — workspace) |

---

## LOGIC

### Mode 1: CRON DAILY (tu dong — GAS trigger)

GAS script chay moi ngay luc **7:30 AM**:

```
1. Doc tat ca team tabs (BE, FE, QC, AI, BA)
2. Voi moi tab, lay cac cot:
   - Nhan su, Req ID, Project, Start date, End date
   - Tien do (%), Trang thai, Do uu tien, Mo ta
3. Loc: chi lay task co Trang thai != "Done" va != "Cancel"
4. Tong hop thanh Daily Report (markdown)
5. Luu report:
   - GAS: post len Telegram (PM channel)
   - GAS: ghi vao Sheet tab "Sync_Log" (optional)
   - Workspace: PM pull report khi /brief
6. Auto-flag:
   - 🔴 QUA HAN: End date < hom nay, chua Done
   - ⚠️ SAP DEN HAN: End date trong 2 ngay toi, chua Done
   - 🕳️ THIEU LOG: nhan su khong co task HOAC task 0% qua 3 ngay
   - 🏋️ BOTTLENECK: 1 nguoi > 5 task dang lam
   - ⚡ HIGH PRIORITY keywords: Kafka, Server Bien, offline, Edge
   - 🔥 RISK PERSON: Anh Ngoc / Mr Dien / Chien co nhieu task
```

### Mode 2: MANUAL PULL (PM trigger trong Claude)

PM noi "sync" hoac "dong bo" hoac "bao cao ngay":

#### Step 1: Doc CSV moi nhat
- Doc file `_resources/Edulive_Schedule_v1 - Daily task.csv`
- Hoac: doc truc tiep tu Sheet qua GAS API (neu da deploy)

#### Step 2: Parse data
Voi moi row:
```
{
  nhan_su: "AI - NAM",
  req_id: "",
  project: "Kho anh cho giao vien",
  start_date: "09/02/2026",
  end_date: "11/02/2026",
  tien_do: "50%",
  trang_thai: "Dang thuc hien",
  mo_ta: "Kho anh trong sach giao khoa..."
}
```

#### Step 3: Tao Daily Report
Tao file: `_hq/sync_reports/DAILY_[YYYY-MM-DD].md`

Format:
```markdown
# Daily Report — [YYYY-MM-DD]
> Auto-generated tu Google Sheet Edulive_Schedule_v1
> PM review va xac nhan

## Tong quan
| Team | Tong task | Done | Dang lam | Overdue | Pending |
|------|----------|------|----------|---------|---------|
| BE | X | X | X | X | X |
| FE | X | X | X | X | X |
| QC | X | X | X | X | X |
| AI | X | X | X | X | X |

## 🔴 Overdue (can PM xu ly)
| Nhan su | Req ID | Project | End date | Qua han | Tien do |
|---------|--------|---------|----------|---------|---------|

## ⚠️ Bottleneck (nguoi giu nhieu task)
| Nhan su | So task | Projects |
|---------|---------|----------|

## Chi tiet theo team

### BE Team
| Nhan su | Req ID | Project | Tien do | Trang thai | End date | Mo ta |
|---------|--------|---------|---------|------------|----------|-------|

### FE Team
(tuong tu)

### QC Team
(tuong tu)

### AI Team
(tuong tu)

## Ghi chu PM
(PM ghi o day sau khi review)
```

#### Step 4: Trinh bay cho PM
```
Sync Report [DATE]:
- Tong: [X] tasks active ([Y] teams)
- Overdue: [N] tasks 🔴
- Bottleneck: [nguoi] ([so task])
- New: [N] tasks moi

PM xac nhan? (xem report / bo qua)
```

#### Step 5: PM quyet dinh
- **Xem chi tiet**: mo file DAILY_[DATE].md
- **Bo qua**: luu report nhung khong hanh dong
- **Xu ly**: PM ra lenh cu the (VD: "nhac BE team fix bug sv254")

---

## PUSH FLOW (Workspace → Sheet)

Khi PM muon day task tu workspace len Sheet:

#### Step 1: PM cung cap thong tin task
```
/sync push [nhan_su] [project] [mo_ta]
VD: /sync push "Luc" "Smartroom apps" "Fix bug WebRTC sv254"
```

#### Step 2: Validate
- Nhan su co trong team list?
- Project co trong dropdown 25 projects?
- Co du: Start date, End date, Priority?

#### Step 3: Ghi vao Sheet (qua GAS API)
- Append row vao dung team tab
- Tao Req ID theo format: REQ-[TEAM]-[XXXXX]

#### Step 4: Confirm
```
Pushed to Sheet:
- Tab: BE Team
- Nhan su: Luc
- Project: Smartroom apps
- Req ID: REQ-BE-00123
- Mo ta: Fix bug WebRTC sv254
✅ Telegram notified
```

---

## GAS SCRIPT DEPLOYMENT

Script template: `src/sync/gas_daily_sync.js`

### Setup:
1. Mo Google Apps Script: https://script.google.com
2. Tao project moi (hoac dung project ID tu .env)
3. Copy code tu `src/sync/gas_daily_sync.js`
4. Cau hinh:
   - `SHEET_ID` = `1U0S28FUhiXgGiZDUcDEg08GohpVS1srf-xVkKqWRaJU`
   - `TELEGRAM_BOT_TOKEN` = tu .env
   - `TELEGRAM_CHAT_ID` = tu .env
5. Tao Time Trigger: 7:00-8:00 AM hang ngay
6. Test: chay `dailySync()` thu cong

### Functions:
| Function | Mo ta | Trigger |
|----------|-------|---------|
| `dailySync()` | Pull all tabs → tong hop → Telegram | Time trigger 7:30 AM |
| `pullTeamData(tabName)` | Doc data 1 team tab | Called by dailySync |
| `generateReport(data)` | Tao markdown report | Called by dailySync |
| `sendTelegram(message)` | Gui bao cao qua Telegram | Called by dailySync |
| `pushTask(tab, rowData)` | Day 1 task len sheet | Manual trigger tu PM |
| `getOverdueTasks()` | Loc task qua han | Called by dailySync |
| `getBottlenecks()` | Loc nguoi overloaded | Called by dailySync |

---

## REPORT LIEN KET

Daily Report se duoc PM su dung de:
1. **Bao cao anh Ngoc / CEO** — tuan nay team lam gi
2. **Cross-check voi MASTER_BOARD** — workspace co khop sheet khong
3. **Phat hien van de** — overdue, bottleneck, task khong duoc cap nhat
4. **Giao viec moi** — biet ai ranh, ai qua tai

---

## RULES
- **Chi PULL data** — KHONG tu dong thay doi tren Sheet
- **PUSH chi khi PM approve** — khong tu y day task
- **KHONG xoa row tren Sheet** — chi append hoac update status
- **Report luu local** — `_hq/sync_reports/DAILY_[DATE].md`
- **Telegram BAT BUOC** — moi report gui qua Telegram cho PM
- **Sheet la source of truth** cho tien do team (ho cap nhat realtime)
- **Workspace la source of truth** cho priority va assignment (PM quyet dinh)
- **Conflict** → flag cho PM, KHONG tu giai quyet

## EDGE CASES
- **Sheet khong truy cap duoc**: bao PM, dung CSV backup trong `_resources/`
- **Tab moi**: bao PM, khong tu them tab
- **Data bi lech**: so sanh Sheet vs workspace, list khac biet cho PM
- **GAS chua deploy**: PM chay manual trong Claude, doc CSV file
