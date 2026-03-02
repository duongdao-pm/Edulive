# Đánh giá Google Sheet: Edulive_Schedule_v1

---

## 1. Tổng quan đã scan

### Tabs phát hiện (13 tabs)

| Tab | Chức năng | Nhận xét |
|-----|-----------|----------|
| **Overview** | Thông tin dự án, danh sách team | ✅ Rõ ràng |
| **Tổng hợp yêu cầu** | Tracking requirements (Req ID, Project, mô tả, priority, phê duyệt, người xử lý) | ✅ Cấu trúc tốt |
| **Daily task** | View task theo ngày, auto-refresh 5 phút | ✅ Ý tưởng hay |
| **QC Team** | Task tracking cho QC | ✅ Hoạt động |
| **FE Team** | Task tracking cho FE | ✅ Hoạt động |
| **BE Team** | Task tracking cho BE | ✅ Nhiều data nhất |
| **AI Team** | Task tracking cho AI | ✅ |
| **BA Team** | Task tracking cho BA | ✅ |
| **Release note** | Ghi chú release | Chưa xem chi tiết |
| **Q&A** | Hỏi đáp | Chưa xem chi tiết |
| **Project list** | Danh sách 25 dự án + dropdown values | ✅ Master data |
| **Báo cáo nhóm** | Dashboard tổng hợp theo nhóm/người | ⚠️ CÓ LỖI FORMULA |
| **Beta** | Thử nghiệm | Chưa xem chi tiết |

### Team hiện tại (~20 người)

| Team | Số người | Thành viên |
|------|---------|------------|
| FE | 7 | Mr Hưng, Chiến, Khánh, Nghĩa, Quang, Hùng, Văn |
| BE | 5 | Anh Ngọc, Toại, Mr Diện, Lực, Dũng |
| QC | 4 | Phương Hoa, Trần Thị Anh Đào, Vũ Hồng Anh, Nguyễn Thị Khánh Linh |
| AI | 4 | Đạt, Thịnh, Tuyến, Nam |

### Dự án đang chạy (25 projects)

AiTeacher, DataWarehouse, Apps Học Sinh, Apps Giáo Viên, Apps Phụ Huynh, Social, Web-School, Web-School (Parent-Pupil), Quản lý dự án, Tool tạo bài giảng AI, Kho ảnh cho giáo viên, Smartroom apps, Data lake, Recommendation system, Generate video, Đồng bộ thư viện, Audit logs, Chuyển School PHP→Java, Bản đồ skill, LMS, Support, BE/FE/QC Checklist, Demo...

---

## 2. Điểm mạnh

**Đã có hệ thống cơ bản hoạt động:**
- Mỗi team có tab riêng → phân tách rõ ràng
- Req ID có hệ thống mã hoá (EDL_RL_XXX, REQ-QC-XXXXX, REQ-FE-XXXXX)
- Có dropdown cho: Project, Tiến độ (0-100%), Trạng thái, Độ ưu tiên, Độ ảnh hưởng
- Daily task auto-refresh mỗi 5 phút → PM nhìn realtime
- Báo cáo nhóm tự động tổng hợp metrics (task đang giữ, hoàn thành, quá hạn)

**Data phong phú:**
- 25 dự án song song → cần cross-project view
- ~20 nhân sự → cần resource tracking

---

## 3. Vấn đề phát hiện

### 🔴 NGHIÊM TRỌNG

**3.1. Tab "Báo cáo nhóm" bị lỗi formula nặng**
- Toàn bộ phần FE Team hiện #VALUE! và #REF!
- Dashboard mất tác dụng → PM không nhìn được tình hình FE
- Nguyên nhân có thể: cột/hàng bị thêm/xoá trong tab FE Team làm lệch reference

**3.2. Nhiều task quá hạn (End date đỏ)**
- Daily task: hầu hết task có End date trước 24/02/2026 → overdue
- BE Team (Anh Ngọc): 23 task đang giữ, chỉ 2 hoàn thành, 3 quá hạn
- Đây có thể là data chưa cập nhật hoặc thực sự overdue

### 🟡 CẦN CẢI THIỆN

**3.3. Không có liên kết giữa Requirements → Tasks**
- Tab "Tổng hợp yêu cầu" có Req ID
- Các tab team cũng có Req ID
- Nhưng không rõ 1 Req → tạo bao nhiêu tasks? Ở team nào?
- Thiếu traceability: requirement → task → bug → release

**3.4. Thiếu Sprint/Iteration management**
- Không có khái niệm Sprint
- Task chỉ có Start date + End date → khó group theo sprint
- Không có velocity tracking

**3.5. Mỗi team tab có cấu trúc hơi khác nhau**
- QC: Nhân sự, Req ID, Project, Start date, End date, Estimate (% ở cột cuối)
- BE: Nhân sự, Req ID, Project, Start date, End date, Estimate, Tiến độ, Trạng thái, Mô tả
- FE: Tương tự BE nhưng Estimate format khác
- → Khó tổng hợp cross-team, Báo cáo nhóm phải viết formula riêng mỗi tab

**3.6. Thiếu view tổng thể theo Project**
- Có "Project list" nhưng chỉ là danh sách tĩnh
- Muốn biết "Project Social đang thế nào?" → phải mở từng tab team filter thủ công
- Không có project-level dashboard

**3.7. Thiếu quản lý rủi ro**
- Không có tab/cột nào cho Risk
- Không có escalation path

**3.8. Dependency giữa tasks không được track**
- FE chờ API từ BE → không thấy ở đâu
- QC chờ build từ Dev → không có blocker tracking

---

## 4. So sánh với workspace đã thiết kế

| Khía cạnh | Sheet hiện tại | Workspace mới |
|-----------|---------------|---------------|
| Task tracking | ✅ Có, theo team | ✅ Có, theo team + project |
| Requirements | ✅ Tổng hợp yêu cầu | ✅ BA_Team/requirements + traceability |
| Daily view | ✅ Auto-refresh | ✅ PM Agent briefing sáng |
| Sprint | ❌ Không có | ✅ Sprint planning |
| Project view | ❌ Chỉ list tĩnh | ✅ Portfolio dashboard |
| Risk | ❌ Không có | ✅ Risk log |
| Cross-team | ⚠️ Formula lỗi | ✅ Orchestrator tổng hợp |
| Requirement → Task | ⚠️ Có ID nhưng không link | ✅ Traceability chain |
| AI hỗ trợ | ❌ Hoàn toàn thủ công | ✅ Multi-agent system |
| Onboarding | ❌ Không có | ✅ ONBOARDING.md |

---

## 5. Đề xuất hành động

### Ngắn hạn (làm ngay)

1. **Fix formula lỗi** ở tab Báo cáo nhóm (phần FE Team #VALUE! #REF!)
2. **Chuẩn hoá cấu trúc** các tab team cho giống nhau (cùng columns, cùng thứ tự)
3. **Thêm cột Sprint** vào các tab team → bắt đầu group task theo sprint

### Trung hạn (tuần tới)

4. **Tạo Project Dashboard tab** — pivot từ data các team, nhìn theo project thay vì theo team
5. **Thêm dependency tracking** — cột "Blocked by" hoặc "Depends on"
6. **Map dữ liệu sheet này** vào workspace Edulive trên máy → mỗi project trong sheet = 1 folder trong projects/

### Dài hạn (theo roadmap)

7. **Xây Google Apps Script Web App** thay thế sheet → UX tốt hơn, validation tốt hơn
8. **Triển khai AI agents** đọc data từ sheet → phân tích, báo cáo, cảnh báo
9. **PM Agent** tự động đọc sheet mỗi sáng → tổng hợp briefing

---

## 6. Kết luận

Sheet hiện tại là nền tảng tốt — đã có data thực, team đang dùng, có hệ thống mã hoá. Vấn đề chính là: thiếu cross-project view, formula dashboard bị lỗi, và mọi thứ vẫn thủ công. Workspace + AI agents sẽ giải quyết đúng những gap này, và quan trọng là có thể **kế thừa data từ sheet** thay vì bắt đầu lại từ đầu.
