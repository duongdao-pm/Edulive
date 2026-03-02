# PROMPT THỬ NGHIỆM QC AGENT — Viết Testcase bổ sung

> Copy prompt dưới đây, paste cho QC agent (Antigravity / Cowork / Cursor)

---

```
Deal

Bạn là QC Agent. Đọc ONBOARDING.md → làm theo từng bước.

Sau khi onboard xong, đây là nhiệm vụ thực chiến:

---

## NHIỆM VỤ: Viết testcase bổ sung cho SmartRoom

### Bối cảnh:
- File _resources/Testcase Social - CĐND-Validation.csv có 29 testcases mẫu cho module Social (Cộng đồng nội dung)
- File _resources/Bug SmartRoom - BUG.csv có ~200 bug reports cho SmartRoom
- KNOWLEDGE_BASE.md §3 mô tả chi tiết 20 module SmartRoom
- KNOWLEDGE_BASE.md §10 chỉ ra: Draw, Divide Groups, Reconnect là module nhiều lỗi nhất
- KNOWLEDGE_BASE.md §11 liệt kê các rủi ro kỹ thuật

### Yêu cầu:

**Bước 1 — Phân tích GAP:**
1. Đọc file Bug SmartRoom CSV → liệt kê các module ĐÃ CÓ bug report
2. Đọc KNOWLEDGE_BASE.md §3 → liệt kê TẤT CẢ 20 module được spec
3. So sánh → module nào CHƯA có testcase / bug coverage?
4. Báo cáo gap analysis ngắn gọn

**Bước 2 — Viết testcase:**
Chọn 3 module thiếu coverage nhất. Viết MỖI module 5-10 test cases.

⚠️ BẮT BUỘC THEO ĐÚNG FORMAT file mẫu _resources/Testcase Social - CĐND-Validation.csv:

**Header columns:**
Testcase ID | Module / Feature | Test case title | Priority | Tiền điều kiện (Pre-condition) | Description steps | Data | Expected result

**Quy tắc format:**
- Testcase ID: [TênModule]_[số]. VD: Draw_1, ShareScreen_1, TransferFile_1
- Module / Feature: Ghi rõ sub-feature nếu có. VD: "Draw > Phân quyền", "Question > Essay > AI Grammar"
- Priority: H (High), M (Medium), L (Low)
- Description steps: Đánh số bước. Mỗi bước 1 hành động cụ thể
- Expected result: Gạch đầu dòng (-). Mô tả chi tiết kết quả mong đợi, bao gồm cả UI state

**Quy tắc nhóm testcase:**
- Mỗi module bắt đầu bằng 1 dòng header riêng (giống file mẫu: "1. Primary tabs", "2. Filter"...)
- Nhóm theo sub-feature

**Bước 3 — Giải thích:**
Với mỗi testcase, ghi vào cột Notes:
- Dựa trên thông tin nào trong KNOWLEDGE_BASE (cite §mục cụ thể)
- Cover risk nào từ §11
- Liên quan bug nào đã có (nếu có, cite Bug ID từ CSV)

### OUTPUT:
Tạo file Excel (.xlsx) tại: projects/EDU-001_HoiHopB_Deployment/QC_Team/TESTCASE_SMARTROOM_SUPPLEMENT_v1.xlsx

File gồm 2 sheet:
- Sheet 1 "Gap Analysis": Bảng phân tích module nào thiếu coverage
- Sheet 2 "Testcases": Testcase bổ sung theo đúng format mẫu

### TIÊU CHÍ ĐÁNH GIÁ:
PM sẽ review dựa trên:
1. Testcase có ĐÚNG behavior được mô tả trong Knowledge Base không? (VD: "GV thao tác ghi đè HS" cho Video — đúng theo §3.8)
2. Có cover edge case không? (reconnect, mất mạng, phân quyền bị thu hồi, race condition)
3. Có reference đúng Socket event / API không? (VD: grantDrawPermission, objectLog, TOGGLE_STREAM_AUDIO)
4. Có phát hiện GAP giữa spec và bug thực tế không?
5. Format có khớp với file mẫu không?
```
