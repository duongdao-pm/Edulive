# Edulive AI Agent System — Thiết kế tổng thể
## Multi-Agent trên Google Antigravity + Google Apps Script Web App

---

## 1. Bối cảnh & Vấn đề cần giải quyết

**Edulive** — công ty EdTech, 20-50 người. Team gồm PM, BA, QC, Dev BE, Dev FE, AI Team.

**Vấn đề thực tế của PM:**
- Stakeholder gửi yêu cầu trực tiếp (email, chat, gọi điện, meeting) → không qua hệ thống
- Thông tin dự án nằm rải rác ở nhiều nguồn (Drive, email, Notion, chat...)
- Task đổ vào đầu hàng ngày, dễ sót, khó prioritize
- Thiếu overview tổng thể khi quản lý nhiều dự án song song

**Giải pháp:** Xây dựng hệ thống 3 lớp:
- **Capture** → `_inbox/` (thu thập mọi input rời rạc)
- **Process** → AI Agents (phân loại, phân tích, tổ chức)
- **Execute** → Google Apps Script Web App (nhân viên thao tác thực tế)

---

## 2. Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA SOURCES                              │
│  Email · Chat · Meeting notes · Files · Stakeholder direct   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                   _inbox/raw/                                 │
│           (Landing zone — mọi thứ đổ vào đây)                │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                                                               │
│                    ORCHESTRATOR                                │
│               (Root Agent — Router)                            │
│                                                               │
│   1. Đọc input từ _inbox                                      │
│   2. Phân loại: dự án nào? loại gì? urgent?                  │
│   3. Route đến agent phù hợp                                  │
│   4. Tổng hợp kết quả → trả PM                               │
│                                                               │
└───┬────────┬────────┬────────┬────────┬────────┬─────────────┘
    │        │        │        │        │        │
┌───▼──┐ ┌──▼──┐ ┌───▼──┐ ┌──▼───┐ ┌──▼──┐ ┌──▼───┐
│  PM  │ │ BA  │ │  QC  │ │Dev BE│ │DevFE│ │AI/ML │
│Agent │ │Agent│ │Agent │ │Agent │ │Agent│ │Agent │
└───┬──┘ └──┬──┘ └───┬──┘ └──┬───┘ └──┬──┘ └──┬───┘
    │        │        │        │        │        │
    ▼        ▼        ▼        ▼        ▼        ▼
┌──────────────────────────────────────────────────────────────┐
│                  DATA LAYER                                    │
│          Google Sheets (as database)                           │
│                                                               │
│  Projects Sheet · Tasks Sheet · Resources Sheet               │
│  Sprint Sheet · Bug Sheet · Risk Sheet                        │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│              GOOGLE APPS SCRIPT WEB APP                       │
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Dashboard │ │Task Board│ │Sprint    │ │Reports   │        │
│  │          │ │          │ │Planning  │ │          │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                               │
│  Nhân viên truy cập → xem task → cập nhật status → báo cáo   │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Chi tiết từng Agent

### 3.0 ORCHESTRATOR (Root Agent)

**Vai trò:** Bộ não trung tâm — nhận mọi input, phân loại, điều phối.

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Pro |
| Trigger | Mọi input từ PM hoặc _inbox |
| Tools | File reader, Sheet API, Agent router |

**Logic xử lý chính:**

```
Input đến →
  ├─ Phân loại intent:
  │   ├─ "Yêu cầu mới từ stakeholder"  → BA Agent (phân tích) + PM Agent (tạo task)
  │   ├─ "Hỏi tình hình dự án"         → PM Agent (báo cáo)
  │   ├─ "Bug report"                   → QC Agent (phân tích) + Dev Agent (estimate)
  │   ├─ "Cần review technical"         → Dev BE/FE Agent
  │   └─ "Không rõ"                     → Hỏi lại PM
  │
  ├─ Xác định dự án:
  │   ├─ Match với dự án đang có        → Route đến project folder
  │   └─ Dự án mới                      → Tạo folder + thông báo PM
  │
  └─ Xác định urgency:
      ├─ Urgent + quan trọng            → Thông báo PM ngay
      ├─ Quan trọng + không gấp         → Đưa vào sprint backlog
      └─ Không quan trọng               → Queue bình thường
```

---

### 3.1 PM AGENT — Trợ lý Quản lý Dự án

**Đây là agent cốt lõi**, được thiết kế đặc biệt để giúp PM xử lý luồng công việc hàng ngày.

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Pro |
| Tools | Google Sheets API, Google Calendar API, Drive API |
| Trigger | Scheduled (sáng/chiều/tuần) + On-demand từ PM |

**Tác vụ hàng ngày (Scheduled):**

```
🌅 BUỔI SÁNG (8:00)
  ├─ Scan _inbox/raw/ → có gì mới không?
  ├─ Check tasks overdue hoặc sắp deadline
  ├─ Tổng hợp "Briefing sáng" cho PM:
  │   • N task mới từ hôm qua
  │   • N task overdue cần xử lý
  │   • N task đến deadline trong 2 ngày
  │   • Đề xuất priority top 5 cho hôm nay
  └─ Push thông báo qua web app / email

🌆 CUỐI NGÀY (17:00)
  ├─ Tổng hợp progress trong ngày
  ├─ Những gì chưa xong → carry over
  └─ Nhắc PM nếu có gì cần escalate

📊 CUỐI TUẦN (Thứ 6)
  ├─ Sprint progress report
  ├─ Resource utilization
  ├─ Risk summary
  └─ Đề xuất agenda cho Sprint Review
```

**Tác vụ on-demand:**

```
PM: "Stakeholder A vừa gửi yêu cầu X"
  → Capture → Tạo task → Phân loại priority
  → Đề xuất: assign cho ai? sprint nào? effort estimate?

PM: "Tình hình sprint hiện tại?"
  → Pull data từ Sheets → Tổng hợp:
    • Tổng task: N done / N total (X%)
    • Blockers: [danh sách]
    • Velocity so với sprint trước

PM: "Cần delegate task X cho team"
  → Check resource availability
  → Đề xuất người phù hợp (dựa trên skill + workload)
  → Tạo task assignment trong Sheets

PM: "Chuẩn bị meeting với stakeholder"
  → Tổng hợp project status
  → Tạo draft agenda + talking points
  → List các quyết định cần stakeholder approve
```

**Output format chuẩn:**

```json
{
  "type": "daily_briefing | task_created | sprint_report | alert",
  "priority": "high | medium | low",
  "summary": "Tóm tắt ngắn",
  "details": { ... },
  "actions_needed": [
    { "action": "Approve task assignment", "deadline": "2026-02-25" }
  ],
  "requires_human_approval": true
}
```

---

### 3.2 BA AGENT — Phân tích Yêu cầu

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Pro |
| Tools | Google Docs API, Drive API |
| Trigger | Khi có yêu cầu mới từ stakeholder cần phân tích |

**Tác vụ:**
- Đọc raw input (email, ghi chú, file) → extract requirements
- Draft BRD từ thông tin rời rạc
- Convert requirements → User Stories với acceptance criteria
- Phát hiện gaps/conflicts trong requirements → tạo danh sách câu hỏi clarification
- So sánh requirement mới vs scope hiện tại → flag scope creep

**Output mẫu:**

```
📋 PHÂN TÍCH YÊU CẦU MỚI
├─ Nguồn: Email từ [Stakeholder A], 24/02/2026
├─ Tóm tắt: Cần thêm tính năng export báo cáo PDF
├─ User Stories:
│   • US-101: Là giáo viên, tôi muốn export báo cáo lớp học sang PDF
│   • US-102: Là admin, tôi muốn export báo cáo tổng hợp theo tháng
├─ Impact: Ảnh hưởng module Report (BE + FE)
├─ Estimate sơ bộ: 3-5 ngày dev
├─ Câu hỏi cần clarify:
│   • Template PDF cố định hay tuỳ chỉnh?
│   • Có cần watermark không?
└─ Đề xuất: Đưa vào Sprint 6 backlog
```

---

### 3.3 QC AGENT — Kiểm thử & Chất lượng

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Flash |
| Tools | Google Sheets API, Jira API |
| Trigger | Khi có requirement mới hoặc bug report |

**Tác vụ:**
- Generate test cases từ User Stories / SRS
- Phân tích bug report → đề xuất severity + priority
- Tổng hợp test coverage theo sprint
- Đề xuất regression test suite khi có code changes
- Weekly quality report (bug trend, escaped defects)

---

### 3.4 DEV BE AGENT

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Pro |
| Tools | GitHub API, Google Docs API |
| Trigger | Khi cần technical analysis hoặc estimation |

**Tác vụ:**
- Phân tích requirement → đề xuất technical approach
- Estimate effort cho backend tasks
- Review API design
- Phát hiện technical debt và đề xuất improvement
- Tạo draft technical design document

---

### 3.5 DEV FE AGENT

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Flash |
| Tools | GitHub API, Figma API |
| Trigger | Khi cần FE analysis hoặc estimation |

**Tác vụ:**
- Phân tích UI requirement → estimate FE effort
- Review component structure
- Kiểm tra responsive / accessibility
- So sánh implementation vs design mockup

---

### 3.6 AI/ML AGENT

| Mục | Chi tiết |
|-----|----------|
| Model | Gemini 2.0 Pro |
| Tools | Python runtime, data tools |
| Trigger | Khi có task liên quan AI/ML features |

**Tác vụ:**
- Đánh giá feasibility cho AI features mới
- Phân tích data quality
- So sánh model approaches
- Estimate effort cho ML tasks

---

## 4. Data Layer — Google Sheets as Database

Web App sử dụng Google Sheets làm database backend. Cấu trúc:

```
📊 [Edulive_PM_Database] (Google Spreadsheet)
│
├── Sheet: Projects
│   Columns: project_id | name | status | pm | start_date | end_date | priority
│
├── Sheet: Tasks
│   Columns: task_id | project_id | title | description | assignee | status |
│            priority | sprint | estimate | actual | created_date | due_date |
│            created_by | source
│
├── Sheet: Sprints
│   Columns: sprint_id | project_id | name | start_date | end_date |
│            goal | status | velocity
│
├── Sheet: Resources
│   Columns: member_id | name | role | team | capacity | current_load
│
├── Sheet: Risks
│   Columns: risk_id | project_id | description | probability | impact |
│            mitigation | owner | status
│
├── Sheet: Bugs
│   Columns: bug_id | project_id | title | severity | priority | status |
│            reporter | assignee | found_in | fixed_in
│
└── Sheet: Activity_Log
    Columns: log_id | timestamp | actor | action | target | details
```

---

## 5. Luồng hoạt động mẫu

### Scenario: Stakeholder gửi yêu cầu mới qua email

```
1. PM paste email vào _inbox/raw/
   hoặc forward đến inbox address

2. Orchestrator detect file mới trong _inbox:
   → Đọc nội dung
   → Phân loại: "Yêu cầu tính năng mới cho EDU-003"
   → Move file sang _inbox/processing/

3. Orchestrator route song song:
   → BA Agent: Phân tích requirement, draft user stories
   → PM Agent: Tạo task trong Sheets, estimate timeline

4. BA Agent trả về:
   • 3 User Stories với acceptance criteria
   • 2 câu hỏi cần clarify

5. PM Agent trả về:
   • Task đã tạo trong Sheets
   • Đề xuất: assign cho [Dev A], sprint 7, estimate 5 story points

6. Orchestrator tổng hợp → gửi PM:
   "📬 Yêu cầu mới từ [Stakeholder]:
    - Đã tạo 3 user stories (xem chi tiết)
    - Đề xuất assign cho Dev A, Sprint 7
    - Cần clarify 2 điểm: [...]
    ⏳ Chờ bạn confirm."

7. PM review + approve
   → File chuyển sang _inbox/archived/
   → Data cập nhật vào project folder EDU-003
   → Task hiển thị trên web app cho team
```

---

## 6. Triển khai trên Antigravity

### Cấu trúc project

```
edulive-pm-agents/
├── agent.yaml                 # Root config
├── sub_agents/
│   ├── pm_agent.yaml          # PM Agent config
│   ├── ba_agent.yaml
│   ├── qc_agent.yaml
│   ├── dev_be_agent.yaml
│   ├── dev_fe_agent.yaml
│   └── ai_agent.yaml
├── tools/
│   ├── sheets_tool.py         # Read/write Google Sheets
│   ├── drive_tool.py          # Read/write Drive files
│   ├── calendar_tool.py       # Calendar integration
│   ├── github_tool.py         # GitHub integration
│   └── notification_tool.py   # Push notifications
├── prompts/
│   ├── orchestrator.txt
│   ├── pm_agent.txt
│   └── ...
└── scheduled/
    ├── daily_morning.yaml     # 8:00 briefing
    ├── daily_evening.yaml     # 17:00 summary
    └── weekly_friday.yaml     # Sprint report
```

### Roadmap triển khai

| Phase | Nội dung | Tuần |
|-------|----------|------|
| 1 | Orchestrator + PM Agent (daily briefing, task capture) | 1-2 |
| 2 | BA Agent (requirement analysis) | 3-4 |
| 3 | QC + Dev Agents | 5-6 |
| 4 | Scheduled tasks + Auto-triggers | 7-8 |
| 5 | Integration testing + Tuning | 9-10 |

---

## 7. Cơ chế Folder-as-Context

### Ý tưởng core — Tách SKILLS (chung) và CONTEXT (riêng dự án)

Agent không đọc 1 file duy nhất nữa. Thay vào đó:

```
SKILLS.md (chung, ở agents/)          CONTEXT.md (riêng, ở project/)
    │                                      │
    │  Định nghĩa:                         │  Định nghĩa:
    │  • Role & identity                   │  • Project ID, tên, scope
    │  • Skills (kỹ năng)                  │  • Team members
    │  • Rules (PHẢI/KHÔNG ĐƯỢC)           │  • Tech stack cụ thể
    │  • Workflow (step by step)           │  • Trạng thái hiện tại
    │  • Output templates                  │  • Đặc thù dự án
    │                                      │  • Notes & decisions
    │  → KHÔNG THAY ĐỔI theo dự án        │  → THAY ĐỔI theo dự án
    │  → Viết 1 lần, dùng mãi             │  → Nhẹ, chỉ vài dòng
    └──────────────┬───────────────────────┘
                   │
                   ▼
          Agent = SKILLS + CONTEXT
          (Base class + Instance)
```

### File layout

```
agents/                               # SKILLS chung (viết 1 lần)
├── orchestrator/SKILLS.md
├── pm_agent/SKILLS.md
├── ba_agent/SKILLS.md
├── qc_agent/SKILLS.md
├── dev_be_agent/SKILLS.md
├── dev_fe_agent/SKILLS.md
└── ai_agent/SKILLS.md

projects/EDU-001_Learning_Platform/    # CONTEXT riêng (mỗi dự án khác)
├── PM/CONTEXT.md
├── BA_Team/CONTEXT.md
├── QC_Team/CONTEXT.md
├── Dev_BE_Team/CONTEXT.md
├── Dev_FE_Team/CONTEXT.md
└── AI_Team/CONTEXT.md
```

### Trên Antigravity — cách implement

```python
# Orchestrator spawn agent = SKILLS (chung) + CONTEXT (riêng dự án)

def route_to_agent(request, project_id, team):
    # Map team folder → agent role
    team_to_role = {
        "PM": "pm_agent",
        "BA_Team": "ba_agent",
        "QC_Team": "qc_agent",
        "Dev_BE_Team": "dev_be_agent",
        "Dev_FE_Team": "dev_fe_agent",
        "AI_Team": "ai_agent"
    }
    role = team_to_role[team]

    # Đọc SKILLS chung (viết 1 lần, dùng cho mọi dự án)
    skills = read_file(f"agents/{role}/SKILLS.md")

    # Đọc CONTEXT riêng dự án (nhẹ, chỉ thông tin cụ thể)
    context = read_file(f"projects/{project_id}/{team}/CONTEXT.md")

    # Đọc files hiện có trong team folder
    existing_files = list_files(f"projects/{project_id}/{team}/")

    # Spawn agent = skills + context
    agent = create_agent(
        system_prompt = skills + "\n---\n" + context,
        tools = [sheets_tool, drive_tool, docs_tool],
        context = {
            "project": project_id,
            "team": team,
            "existing_files": existing_files,
            "request": request
        }
    )
    return agent.run()
```

### Lợi ích so với cách cũ (1 file AGENT_CONTEXT.md)

| | Cũ (all-in-one) | Mới (tách SKILLS + CONTEXT) |
|---|---|---|
| Token cost | ❌ Mỗi dự án load lại full skills | ✅ Skills cache 1 lần, context nhẹ |
| Maintenance | ❌ Sửa skill → sửa N files | ✅ Sửa 1 file SKILLS.md = apply tất cả |
| Consistency | ❌ Dễ lệch giữa các dự án | ✅ Skills luôn nhất quán |
| Flexibility | ✅ Custom hoàn toàn | ✅ Custom qua CONTEXT.md, override nếu cần |
| Onboarding | ❌ File dài, khó đọc | ✅ CONTEXT.md ngắn, dễ điền |

---

## 8. Nguyên tắc thiết kế

1. **Human-in-the-loop**: Agent đề xuất, PM quyết định. Không tự ý hành động.
2. **Folder-as-context**: Agent identity = folder nó ở + AGENT_CONTEXT.md.
3. **Start simple**: Bắt đầu với PM Agent + Orchestrator, mở rộng dần.
4. **Data-driven**: Mọi thứ được track trong Sheets → agent đọc data thực.
5. **Inbox pattern**: Mọi input đều đi qua _inbox → được phân loại → vào đúng chỗ.
6. **Audit trail**: Activity_Log ghi lại mọi action của agent và người dùng.
