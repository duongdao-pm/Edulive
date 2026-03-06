---
description: "Dong bo task tu Google Sheet ve workspace (CHI DOC — khong ghi vao Sheet). Cron daily hoac manual trigger. Pull data tu sheet, tao bao cao tong hop, luu vao _hq/sync_reports/. Dung khi user noi 'Sync', 'Dong bo', 'Pull sheet', 'Bao cao ngay'."
globs:
alwaysApply: false
---
# SKILL: SYNC

## PURPOSE
Pull data tu Google Sheet `Edulive_Schedule_v1` → tong hop task hang ngay cua cac thanh vien → luu report vao workspace → PM review.

**CHI DOC du lieu tu Sheet. KHONG ghi/push bat ky du lieu nao vao Sheet.**
Sheet la so huu cua team — workspace chi lay ve de PM su dung.

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
Tabs doc:   BE Team, FE Team, QC Team, AI Team, BA Team
Tab ref:    Daily task (auto-generated, read-only)
```

## COLUMN MAPPING (12 cot)
| Index | Ten cot | Ma | Mo ta |
|-------|---------|-----|-------|
| 0 | Nhan su | NHAN_SU | Ten nhan su |
| 1 | Req ID | REQ_ID | Ma yeu cau (EDL_RL_XXX, REQ-BE-XXXXX) |
| 2 | Project | PROJECT | Ten du an |
| 3 | Start date | START_DATE | Ngay bat dau (dd/mm/yyyy) |
| 4 | End date | END_DATE | Ngay ket thuc (dd/mm/yyyy) |
| 5 | Estimate | ESTIMATE | Uoc luong (gio) |
| 6 | Tien do | TIEN_DO | Format: "50% - Dang thuc hien" |
| 7 | Trang thai xu ly | TRANG_THAI | Dang thuc hien / Yeu cau tam dung / Da tiep nhan |
| 8 | Mo ta yeu cau | MO_TA | Mo ta ngan gon |
| 9 | Noi dung | NOI_DUNG | Chi tiet cong viec |
| 10 | Ket qua mong muon | KET_QUA | Expected outcomes |
| 11 | REF | REF | Reference links (Figma, etc.) |

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
2. Voi moi tab, lay 12 cot:
   - Nhan su, Req ID, Project, Start date, End date, Estimate
   - Tien do (%), Trang thai, Mo ta yeu cau, Noi dung, Ket qua, REF
3. Loc:
   - Bo task co Trang thai = "Hoan thanh" / "Huy bo"
   - Bo task co Tien do = 100%
   - Bo dong separator (📅) va dong ghi chu
4. Tong hop thanh Daily Report
5. Gui report qua Telegram cho PM
6. Auto-flag:
   - 🔴 QUA HAN: End date < hom nay, chua Done
   - ⚠️ SAP DEN HAN: End date trong 2 ngay toi, chua Done
   - 🕳️ THIEU LOG: nhan su khong co task HOAC task 0% qua 3 ngay
   - 🏋️ BOTTLENECK: 1 nguoi > 5 task dang lam
   - 🔥 RISK PERSON: Anh Ngoc / Mr Dien / Chien co nhieu task
```

### Mode 2: MANUAL PULL (PM trigger trong Claude)

PM noi "sync" hoac "dong bo" hoac "bao cao ngay":

#### Step 1: Doc CSV moi nhat
- Doc file `_resources/Edulive_Schedule_v1 - Daily task.csv`

#### Step 2: Parse data
Voi moi row (12 cot):
```
{
  nhan_su: "AI - NAM",
  req_id: "",
  project: "Kho anh cho giao vien",
  start_date: "09/02/2026",
  end_date: "11/02/2026",
  tien_do: "50%",
  trang_thai: "Dang thuc hien",
  mo_ta: "Kho anh trong sach giao khoa...",
  noi_dung: "Tao kho du lieu anh toan lop 4 tap 1"
}
```

#### Step 3: Tao Daily Report
Tao file: `_hq/sync_reports/DAILY_[YYYY-MM-DD].md`

Format: xem `_hq/sync_reports/TEMPLATE_DAILY_REPORT.md`

#### Step 4: Trinh bay cho PM
```
Sync Report [DATE]:
- Tong: [X] tasks active ([Y] teams)
- Overdue: [N] tasks 🔴
- Bottleneck: [nguoi] ([so task])

PM xac nhan? (xem report / bo qua)
```

#### Step 5: PM quyet dinh
- **Xem chi tiet**: mo file DAILY_[DATE].md
- **Bo qua**: luu report nhung khong hanh dong
- **Xu ly**: PM ra lenh cu the (VD: "nhac BE team fix bug sv254")

---

## GAS SCRIPT DEPLOYMENT

Script: `src/sync/gas_daily_sync.js`

### Setup:
1. Mo Google Apps Script: https://script.google.com
2. Tao project moi
3. Copy code tu `src/sync/gas_daily_sync.js`
4. Dien credentials vao CONFIG:
   - `TELEGRAM_BOT_TOKEN` = tu .env
   - `TELEGRAM_CHAT_ID` = tu .env
5. Chay `setupTrigger()` 1 lan → tao cron 7:30 AM
6. Chay `testSync()` de test (khong gui Telegram)
7. Chay `dailySync()` de test that (gui Telegram)

### Functions:
| Function | Mo ta | Trigger |
|----------|-------|---------|
| `dailySync()` | Pull all tabs → tong hop → Telegram | Time trigger 7:30 AM |
| `pullTeamData(tabName)` | Doc data 1 team tab | Called by dailySync |
| `generateReport(data)` | Tao telegram report | Called by dailySync |
| `sendTelegram(message)` | Gui bao cao qua Telegram | Called by dailySync |
| `getOverdueTasks()` | Loc task qua han | Called by dailySync |
| `getBottlenecks()` | Loc nguoi overloaded | Called by dailySync |
| `setupTrigger()` | Tao cron 7:30 AM | Chay 1 lan |
| `testSync()` | Test khong gui Telegram | Manual |

---

## REPORT LIEN KET

Daily Report se duoc PM su dung de:
1. **Bao cao anh Ngoc / CEO** — tuan nay team lam gi
2. **Cross-check voi MASTER_BOARD** — workspace co khop sheet khong
3. **Phat hien van de** — overdue, bottleneck, task khong duoc cap nhat
4. **Giao viec moi** — biet ai ranh, ai qua tai

---

## RULES
- **CHI DOC du lieu tu Sheet** — KHONG ghi/push bat ky du lieu nao
- **Sheet la so huu cua team** — workspace chi lay ve de PM dung
- **KHONG can thiep vao Sheet** — khong sua, khong them, khong xoa
- **Report luu local** — `_hq/sync_reports/DAILY_[DATE].md`
- **Telegram BAT BUOC** — moi report gui qua Telegram cho PM
- **Sheet la source of truth** cho tien do team (ho cap nhat realtime)
- **Workspace la source of truth** cho priority va assignment (PM quyet dinh)

## EDGE CASES
- **Sheet khong truy cap duoc**: bao PM, dung CSV backup trong `_resources/`
- **Tab moi**: bao PM, khong tu them tab
- **Data bi lech**: so sanh Sheet vs workspace, list khac biet cho PM
- **GAS chua deploy**: PM chay manual trong Claude, doc CSV file
