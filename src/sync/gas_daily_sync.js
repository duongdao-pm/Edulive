/**
 * =====================================================
 * EDULIVE — DAILY SYNC (Google Apps Script)
 * =====================================================
 *
 * Muc dich: Pull data tu Google Sheet Edulive_Schedule_v1
 *           → Tong hop task hang ngay cac team
 *           → Gui bao cao qua Telegram cho PM
 *
 * Setup:
 * 1. Mo https://script.google.com → tao project moi
 * 2. Copy toan bo code nay vao
 * 3. Thay CONFIG ben duoi bang gia tri that
 * 4. Chay setupTrigger() 1 lan
 * 5. Chay dailySync() de test
 *
 * Tabs doc: BE Team, FE Team, QC Team, AI Team, BA Team
 * Cron: 7:30 AM hang ngay (trigger time-based)
 * =====================================================
 */

// ====== CONFIG ======
const CONFIG = {
  SHEET_ID: '1U0S28FUhiXgGiZDUcDEg08GohpVS1srf-xVkKqWRaJU',

  // Telegram
  TELEGRAM_BOT_TOKEN: '', // Lay tu .env: 8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E
  TELEGRAM_CHAT_ID: '',   // Lay tu .env: -5216365460

  // Team tabs tren Sheet
  TEAM_TABS: [
    { tab: 'BE Team', code: 'BE', members: ['Anh Ngọc', 'Toại', 'Mr Diện', 'Lực', 'Dũng'] },
    { tab: 'FE Team', code: 'FE', members: ['Mr Hưng', 'Chiến', 'Khánh', 'Nghĩa', 'Quang', 'Hùng', 'Văn'] },
    { tab: 'QC Team', code: 'QC', members: ['Phương Hoa', 'Trần Thị Anh Đào', 'Vũ Hồng Anh', 'Nguyễn Thị Khánh Linh'] },
    { tab: 'AI Team', code: 'AI', members: ['Đạt', 'Thịnh', 'Tuyến', 'Nam'] },
    { tab: 'BA Team', code: 'BA', members: [] } // BA members can be added later
  ],

  // Column mapping (0-indexed) — dieu chinh neu cot thay doi
  COLS: {
    NHAN_SU: 0,
    REQ_ID: 1,
    PROJECT: 2,
    START_DATE: 3,
    END_DATE: 4,
    ESTIMATE: 5,
    TIEN_DO: 6,
    TRANG_THAI: 7,
    UU_TIEN: 8,
    MO_TA: 9
  },

  // Nguong canh bao
  OVERDUE_DAYS: 0,          // Qua han = End date < hom nay
  UPCOMING_DAYS: 2,         // Sap den han = End date trong 2 ngay toi
  BOTTLENECK_THRESHOLD: 5,  // > 5 tasks = bottleneck
  STALE_DAYS: 3,            // 0% sau 3 ngay = khong cap nhat

  // Bottleneck persons (luon flag)
  BOTTLENECK_PERSONS: ['Anh Ngọc', 'Mr Diện', 'Chiến']
};

// ====== MAIN FUNCTION ======

/**
 * Ham chinh — chay moi ngay hoac manual
 */
function dailySync() {
  const today = new Date();
  const dateStr = Utilities.formatDate(today, 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd');

  Logger.log('=== DAILY SYNC START: ' + dateStr + ' ===');

  // 1. Pull data tu tat ca team tabs
  const allTasks = [];
  const teamSummary = {};

  CONFIG.TEAM_TABS.forEach(team => {
    const tasks = pullTeamData(team.tab, team.code);
    allTasks.push(...tasks);
    teamSummary[team.code] = summarizeTeam(tasks, team);
  });

  // 2. Phan tich
  const overdue = getOverdueTasks(allTasks, today);
  const upcoming = getUpcomingTasks(allTasks, today);
  const bottlenecks = getBottlenecks(allTasks);
  const missingLog = getMissingLogPersons(allTasks, today);
  const noTasks = getNoTaskPersons(allTasks);

  // 3. Tao report
  const report = generateReport(dateStr, teamSummary, overdue, upcoming, bottlenecks, missingLog, noTasks, allTasks);

  // 4. Gui Telegram
  sendTelegram(report.telegram);

  // 5. Log
  Logger.log('Tasks: ' + allTasks.length);
  Logger.log('Overdue: ' + overdue.length);
  Logger.log('Upcoming: ' + upcoming.length);
  Logger.log('Bottlenecks: ' + bottlenecks.length);
  Logger.log('=== DAILY SYNC DONE ===');

  return report;
}

// ====== PULL DATA ======

/**
 * Doc data tu 1 team tab
 * @param {string} tabName - Ten tab (VD: "BE Team")
 * @param {string} teamCode - Ma team (VD: "BE")
 * @returns {Array} Danh sach tasks
 */
function pullTeamData(tabName, teamCode) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      Logger.log('Tab not found: ' + tabName);
      return [];
    }

    const data = sheet.getDataRange().getValues();
    const tasks = [];
    let currentPerson = '';

    // Skip header rows (thuong 1-2 dong dau)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Detect person name (cot dau tien co gia tri)
      if (row[CONFIG.COLS.NHAN_SU] && String(row[CONFIG.COLS.NHAN_SU]).trim() !== '') {
        currentPerson = String(row[CONFIG.COLS.NHAN_SU]).trim();
      }

      // Skip empty rows or rows without project
      const project = String(row[CONFIG.COLS.PROJECT] || '').trim();
      if (!project || project === '') continue;

      // Parse trang thai
      const trangThai = String(row[CONFIG.COLS.TRANG_THAI] || '').trim();

      // Skip Done va Cancel
      if (trangThai === 'Done' || trangThai === 'Hoàn thành' ||
          trangThai === 'Cancel' || trangThai === 'Hủy bỏ') continue;

      // Parse tien do
      let tienDo = String(row[CONFIG.COLS.TIEN_DO] || '0').trim();
      tienDo = parseInt(tienDo.replace(/[^0-9]/g, '')) || 0;

      // Parse dates
      const startDate = parseDate(row[CONFIG.COLS.START_DATE]);
      const endDate = parseDate(row[CONFIG.COLS.END_DATE]);

      tasks.push({
        nhanSu: currentPerson,
        team: teamCode,
        reqId: String(row[CONFIG.COLS.REQ_ID] || '').trim(),
        project: project,
        startDate: startDate,
        endDate: endDate,
        tienDo: tienDo,
        trangThai: trangThai,
        uuTien: String(row[CONFIG.COLS.UU_TIEN] || '').trim(),
        moTa: String(row[CONFIG.COLS.MO_TA] || '').trim().substring(0, 80) // Gioi han 80 ky tu
      });
    }

    Logger.log(tabName + ': ' + tasks.length + ' active tasks');
    return tasks;

  } catch (e) {
    Logger.log('Error reading ' + tabName + ': ' + e.message);
    return [];
  }
}

// ====== ANALYSIS ======

/**
 * Loc tasks qua han
 */
function getOverdueTasks(tasks, today) {
  return tasks.filter(t => {
    if (!t.endDate) return false;
    return t.endDate < today && t.tienDo < 100;
  }).sort((a, b) => {
    // Sort by overdue days desc
    return (a.endDate || today) - (b.endDate || today);
  });
}

/**
 * Loc tasks sap den han (trong 2 ngay toi)
 */
function getUpcomingTasks(tasks, today) {
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + CONFIG.UPCOMING_DAYS);

  return tasks.filter(t => {
    if (!t.endDate) return false;
    return t.endDate >= today && t.endDate <= futureDate && t.tienDo < 100;
  });
}

/**
 * Loc nguoi giu nhieu task (bottleneck)
 */
function getBottlenecks(tasks) {
  const personTasks = {};

  tasks.forEach(t => {
    if (!t.nhanSu) return;
    if (!personTasks[t.nhanSu]) {
      personTasks[t.nhanSu] = { count: 0, projects: new Set(), team: t.team };
    }
    personTasks[t.nhanSu].count++;
    personTasks[t.nhanSu].projects.add(t.project);
  });

  return Object.entries(personTasks)
    .filter(([name, data]) => {
      return data.count >= CONFIG.BOTTLENECK_THRESHOLD ||
             CONFIG.BOTTLENECK_PERSONS.some(p => name.includes(p));
    })
    .map(([name, data]) => ({
      nhanSu: name,
      team: data.team,
      count: data.count,
      projects: Array.from(data.projects).join(', ')
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Loc nguoi co task nhung khong cap nhat (0% sau N ngay)
 */
function getMissingLogPersons(tasks, today) {
  return tasks.filter(t => {
    if (!t.startDate || t.tienDo > 0) return false;
    const daysSinceStart = Math.floor((today - t.startDate) / (1000 * 60 * 60 * 24));
    return daysSinceStart >= CONFIG.STALE_DAYS;
  });
}

/**
 * Loc nhan su khong co task nao
 */
function getNoTaskPersons(tasks) {
  const activePersons = new Set(tasks.map(t => t.nhanSu));
  const noTask = [];

  CONFIG.TEAM_TABS.forEach(team => {
    team.members.forEach(member => {
      // Check if member name appears in any task
      const hasTask = tasks.some(t => t.nhanSu && t.nhanSu.includes(member));
      if (!hasTask) {
        noTask.push({ nhanSu: member, team: team.code });
      }
    });
  });

  return noTask;
}

/**
 * Tong hop metrics 1 team
 */
function summarizeTeam(tasks, team) {
  const today = new Date();
  return {
    total: tasks.length,
    done: tasks.filter(t => t.tienDo >= 100).length,
    inProgress: tasks.filter(t => t.tienDo > 0 && t.tienDo < 100).length,
    overdue: tasks.filter(t => t.endDate && t.endDate < today && t.tienDo < 100).length,
    pending: tasks.filter(t => t.tienDo === 0).length,
    members: team.members.length
  };
}

// ====== REPORT GENERATION ======

/**
 * Tao report cho Telegram + file
 */
function generateReport(dateStr, teamSummary, overdue, upcoming, bottlenecks, missingLog, noTasks, allTasks) {
  // === TELEGRAM (ngan gon) ===
  let tg = '📊 DAILY SYNC — ' + dateStr + '\n\n';

  // Tong quan
  let totalTasks = 0, totalOverdue = 0;
  tg += '📋 TONG QUAN:\n';
  Object.entries(teamSummary).forEach(([code, s]) => {
    tg += code + ': ' + s.total + ' tasks (' + s.inProgress + ' dang lam';
    if (s.overdue > 0) tg += ', ' + s.overdue + ' 🔴';
    tg += ')\n';
    totalTasks += s.total;
    totalOverdue += s.overdue;
  });
  tg += 'TONG: ' + totalTasks + ' tasks\n';

  // Overdue
  if (overdue.length > 0) {
    tg += '\n🔴 QUA HAN (' + overdue.length + '):\n';
    overdue.slice(0, 10).forEach(t => {
      const days = Math.floor((new Date() - t.endDate) / (1000 * 60 * 60 * 24));
      tg += '• ' + t.nhanSu + ' [' + t.team + '] — ' + t.project;
      tg += ' (qua ' + days + ' ngay, ' + t.tienDo + '%)\n';
    });
    if (overdue.length > 10) tg += '... va ' + (overdue.length - 10) + ' task khac\n';
  }

  // Sap den han
  if (upcoming.length > 0) {
    tg += '\n⚠️ SAP DEN HAN (' + upcoming.length + '):\n';
    upcoming.slice(0, 5).forEach(t => {
      const days = Math.floor((t.endDate - new Date()) / (1000 * 60 * 60 * 24));
      tg += '• ' + t.nhanSu + ' [' + t.team + '] — ' + t.project;
      tg += ' (con ' + days + ' ngay, ' + t.tienDo + '%)\n';
    });
  }

  // Thieu log
  if (missingLog.length > 0 || noTasks.length > 0) {
    tg += '\n🕳️ THIEU LOG:\n';
    if (noTasks.length > 0) {
      tg += 'Khong co task: ';
      tg += noTasks.map(t => t.nhanSu + ' [' + t.team + ']').join(', ') + '\n';
    }
    if (missingLog.length > 0) {
      tg += 'Chua cap nhat (0% > ' + CONFIG.STALE_DAYS + ' ngay):\n';
      missingLog.slice(0, 5).forEach(t => {
        tg += '• ' + t.nhanSu + ' — ' + t.project + '\n';
      });
    }
  }

  // Bottleneck
  if (bottlenecks.length > 0) {
    tg += '\n🏋️ BOTTLENECK:\n';
    bottlenecks.forEach(b => {
      tg += '• ' + b.nhanSu + ' [' + b.team + ']: ' + b.count + ' tasks\n';
    });
  }

  tg += '\n→ PM review va xu ly.';

  return {
    telegram: tg,
    date: dateStr,
    stats: {
      total: totalTasks,
      overdue: overdue.length,
      upcoming: upcoming.length,
      bottlenecks: bottlenecks.length,
      missingLog: missingLog.length,
      noTasks: noTasks.length
    }
  };
}

// ====== TELEGRAM ======

/**
 * Gui message qua Telegram Bot
 */
function sendTelegram(message) {
  if (!CONFIG.TELEGRAM_BOT_TOKEN || !CONFIG.TELEGRAM_CHAT_ID) {
    Logger.log('Telegram not configured. Message:\n' + message);
    return;
  }

  const url = 'https://api.telegram.org/bot' + CONFIG.TELEGRAM_BOT_TOKEN + '/sendMessage';

  // Split message neu qua dai (Telegram limit 4096 chars)
  const chunks = splitMessage(message, 4000);

  chunks.forEach((chunk, i) => {
    try {
      const response = UrlFetchApp.fetch(url, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          chat_id: CONFIG.TELEGRAM_CHAT_ID,
          text: chunk,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });
      Logger.log('Telegram sent (part ' + (i + 1) + '/' + chunks.length + ')');
    } catch (e) {
      Logger.log('Telegram error: ' + e.message);
    }
  });
}

// ====== PUSH (Workspace → Sheet) ======

/**
 * Day 1 task len Sheet
 * @param {string} tabName - Tab dich (VD: "BE Team")
 * @param {Object} taskData - { nhanSu, reqId, project, startDate, endDate, moTa, uuTien }
 */
function pushTask(tabName, taskData) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      Logger.log('Tab not found: ' + tabName);
      return false;
    }

    const row = [
      taskData.nhanSu || '',
      taskData.reqId || '',
      taskData.project || '',
      taskData.startDate || '',
      taskData.endDate || '',
      taskData.estimate || '',
      '0%',                    // Tien do bat dau = 0
      'New',                   // Trang thai = New
      taskData.uuTien || 'Trung binh',
      taskData.moTa || ''
    ];

    sheet.appendRow(row);
    Logger.log('Pushed to ' + tabName + ': ' + taskData.reqId);
    return true;

  } catch (e) {
    Logger.log('Push error: ' + e.message);
    return false;
  }
}

// ====== TRIGGER SETUP ======

/**
 * Chay 1 lan de setup cron trigger 7:30 AM hang ngay
 */
function setupTrigger() {
  // Xoa trigger cu (neu co)
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'dailySync') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Tao trigger moi: 7:00-8:00 AM hang ngay
  ScriptApp.newTrigger('dailySync')
    .timeBased()
    .atHour(7)
    .nearMinute(30)
    .everyDays(1)
    .inTimezone('Asia/Ho_Chi_Minh')
    .create();

  Logger.log('Trigger created: dailySync at 7:30 AM daily');
}

/**
 * Xoa tat ca triggers
 */
function removeTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  Logger.log('All triggers removed');
}

// ====== UTILITIES ======

/**
 * Parse date tu nhieu format
 */
function parseDate(value) {
  if (!value) return null;

  // Neu da la Date object
  if (value instanceof Date) return value;

  const str = String(value).trim();
  if (str === '') return null;

  // Try dd/mm/yyyy
  const parts = str.split('/');
  if (parts.length === 3) {
    const d = parseInt(parts[0]);
    const m = parseInt(parts[1]) - 1;
    const y = parseInt(parts[2]);
    if (y > 2000 && m >= 0 && m < 12 && d > 0 && d <= 31) {
      return new Date(y, m, d);
    }
  }

  // Try native parse
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Split message thanh chunks (Telegram limit)
 */
function splitMessage(message, maxLength) {
  if (message.length <= maxLength) return [message];

  const chunks = [];
  let current = '';

  message.split('\n').forEach(line => {
    if ((current + '\n' + line).length > maxLength) {
      chunks.push(current);
      current = line;
    } else {
      current += (current ? '\n' : '') + line;
    }
  });

  if (current) chunks.push(current);
  return chunks;
}

// ====== TEST ======

/**
 * Test chay thu — khong gui Telegram
 */
function testSync() {
  const report = dailySync();
  Logger.log('\n=== TELEGRAM MESSAGE ===\n' + report.telegram);
  Logger.log('\n=== STATS ===\n' + JSON.stringify(report.stats, null, 2));
}
