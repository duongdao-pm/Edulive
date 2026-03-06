# ALO LOG — Lich su tin nhan Stakeholder
**Owner**: PM (ghi) + Router (doc de dispatch) + Head (review)

> Moi tin nhan stakeholder duoc PM parse qua `/alo` deu PHAI ghi vao day.
> Day la nguon su that duy nhat (single source of truth) cho yeu cau tu ben ngoai.

---

## Format

```markdown
### [YYYY-MM-DD HH:MM] ALO-[STT]
- **Nguoi gui**: [Ten] ([Vai tro] — VD: TGD, Tech Lead, Khach hang)
- **Noi dung goc**: [Nguyen van tin nhan]
- **Flags**: [AUTO-FLAG keywords — VD: STAKEHOLDER PRESSURE, HIGH PRIORITY]
- **Phan tich**: [PM Agent tom tat: loai yeu cau, muc do, du an lien quan]
- **Action**: [Da lam gi — VD: Tao task EDU001-PM-001, Msg @BE, Tra loi stakeholder]
- **Task IDs**: [Liet ke task da tao tu ALO nay — VD: EDU001-PM-001, EDU001-QC-004]
- **Trang thai**: DONE | PENDING_ACTION | WAITING_INFO | REJECTED
```

---

## Log

<!-- PM ghi theo thoi gian, moi nhat o tren -->

### [2026-03-06 15:00] ALO-006
- **Nguoi gui**: Anh Ngoc Vu (Architect / Tech Lead)
- **Noi dung goc**: Cuoi gio chieu nay gui anh danh sach cong viec tuan sau luon nhe, de report sep. Bam sat team fix cac loi cua sv 254 de thu 2 lap dat not tren Vinh Phuc. Cap nhat list issue de team fix.
- **Flags**: [STAKEHOLDER PRESSURE] [HIGH PRIORITY] [VERSION RISK] [STEM DEPLOYMENT]
- **Phan tich**: 3 yeu cau: (1) Gui work list tuan 09-13/03 de report CEO — deadline chieu nay, (2) Bam sat team fix bug sv 254 truoc thu 2 09/03 VP, (3) Cap nhat issue list. sv 254 = server product dang chuyen tu dev sang. Lien quan EDU000-DEV-001 + EDU001-PM-001.
- **Action**: Assign QC team check sv 254 — tao task EDU001-QC-006. PM tong hop work list tuan sau.
- **Task IDs**: EDU001-QC-006
- **Trang thai**: PENDING_ACTION

### [2026-03-05 14:00] ALO-005
- **Nguoi gui**: Dien BE (tai hien truong Thai Nguyen)
- **Noi dung goc**: Phia Nexta thi anh thay ben minh da request sv rieng, nhung ho bao minh cai chung. Bay h phia nha truong noi do la may GV. Em lien he lai ben kia de co huong xu ly.
- **Flags**: [DEPLOYMENT ISSUE] [HARDWARE MISMATCH] [CRITICAL BLOCKER]
- **Phan tich**: Van de ha tang tai Thai Nguyen: Edulive da yeu cau Nexta chuan bi Server bien RIENG nhung Nexta lai chi dinh cai chung vao may. Nha truong xac nhan may do la MAY GIAO VIEN — khong phai server rieng. Day la vi pham yeu cau bien ban hop 15/01/2026 (muc 2.1: Server bien phai la may rieng, cau hinh dam bao). Risk: may GV khong du cau hinh (RAM, CPU, OS Ubuntu) de lam Local Server. Can Nexta giai quyet: (1) cung cap server rieng, hoac (2) thong nhat phuong an cai chung voi risk chap nhan.
- **Action**: Dien dang lien he lai Nexta de xu ly. Head theo doi.
- **Task IDs**: EDU002-PM-003
- **Trang thai**: ESCALATION
- **Update 06/03**: Thai Nguyen da trien khai. Van de server chua resolve — sang tuan lam viec lai voi Nexta ve trang thai.

### [2026-03-03 10:00] ALO-004
- **Nguoi gui**: Sep TA (TGD — Tong Giam doc)
- **Noi dung goc**: Minh se trien khai diem cung Nexta 1 diem o khu vuc mien Bac. Xong chi ho tro ho tu xa cac diem con lai. Nen h phai dong goi lai duoc ban cai USB va guide cho ho bang Doc va Video.
- **Flags**: [STRATEGIC DIRECTION] [STAKEHOLDER PRESSURE] [HIGH PRIORITY]
- **Phan tich**: Chi dao chien luoc tu TGD bo sung cho ALO-003 (Thai Nguyen). Mo hinh: Edulive trien khai truc tiep 1 diem (Thai Nguyen) → remote support cac diem con lai cua Nexta. Yeu cau moi: (1) Dong goi ban cai USB de Nexta tu deploy, (2) Tai lieu huong dan dang Doc, (3) Video huong dan. Impact: EDU002-BE-002 can output them dang USB deployable. Can tao them task lam tai lieu + video guide.
- **Action**: Cap nhat EDU002-BE-002 them yeu cau USB packaging. Tao task moi cho Doc guide + Video guide. Lien ket voi ALO-003.
- **Task IDs**: EDU002-PM-004, EDU002-PM-005
- **Trang thai**: PENDING_ACTION

### [2026-03-03 09:30] ALO-003
- **Nguoi gui**: Doi tac Nexta (Cong ty CP Cong nghe Giao duc Nexta)
- **Noi dung goc**: Thu 5 co lich trien khai bo phan mem + trang thiet bi cho Nexta o Thai Nguyen. De xuat trien khai ngay mai (04/03). Yeu cau: thu 4 cai xong router gui sang + cap VPN/SSH de cai thiet bi tu xa. San pham: Phong hoc STEM (EDL750 GV 21 license + EDL760 HS 210 license = 231 license). Tai lieu: Bien ban ban giao nghiem thu + Spec Tablet HS tai `_resources/common/`.
- **Flags**: [STEM DEPLOYMENT] [STAKEHOLDER PRESSURE] [HIGH PRIORITY]
- **Phan tich**: Trien khai STEM cho khach hang cua Nexta tai Thai Nguyen. Deadline rat gap — de xuat ngay mai. Nexta = doi tac, Edulive cung cap giai phap. Dependencies: (1) Toai cai router — deadline thu 4, (2) Cap VPN/SSH, (3) Bo cai sv253 dang cho test (EDU002-BE-002 PENDING). RISK: Bo cai chua test xong co the block toan bo trien khai.
- **Action**: Tao task CRITICAL trien khai Thai Nguyen. Lien ket voi EDU002-BE-002. Toai cai router. Cap VPN/SSH.
- **Task IDs**: EDU002-PM-003
- **Trang thai**: REVIEW
- **Update 05/03**: Doan trien khai dang tai hien truong: Dien BE, Hung FE, Linh QC, Van FE, Anh GV. Dang cai dat, kich hoat license, test content day len.
- **Update 06/03**: DA TRIEN KHAI. Sang tuan can lam viec lai voi Nexta ve trang thai server + cac van de con lai.

### [2026-03-03 09:00] ALO-002
- **Nguoi gui**: Team AI — Thinh, Tuyen, Nam (AI Team)
- **Noi dung goc**: Gui plan chon model cham ngu phap Tieng Anh bang LLM. 2 tuan (03/03-18/03), 3 nguoi, 5 models, 120 cau eval. Deliverables: PROJECT_SPEC.md, eval_dataset.jsonl, MODEL_CONFIG.md, EVAL_REPORT.md.
- **Flags**: [HIGH PRIORITY]
- **Phan tich**: Plan chi tiet cho EDU002-AI-003. Du timeline, phan cong, metrics. Bat dau ngay 03/03. Can GPU 16GB (da co tren board). Constraints: model ≤12GB VRAM, concurrency 4, ctx 2k-4k.
- **Action**: Update EDU002-AI-003 → IN_PROGRESS. Luu plan tai `_resources/common/PLAN servicing stack.md`.
- **Task IDs**: EDU002-AI-003
- **Trang thai**: DONE

### [2026-03-03 08:30] ALO-001
- **Nguoi gui**: Anh Ngoc Vu (Architect / Tech Lead)
- **Noi dung goc**: Thu 6 (07/03) co lich trien khai cho Ung Hoa. Lien he anh Cuong — SĐT 091 1392888. Cuong ngoi phong canh sep tang 2 (phong P&L/P&C — Hung noi "phong TA"). Go cua khong thay thi call.
- **Flags**: [STEM DEPLOYMENT] [STAKEHOLDER PRESSURE]
- **Phan tich**: Lich trien khai moi — Ung Hoa, deadline thu 6 (07/03). Chua ro trien khai san pham gi (HHB? Nexta? STEM?). Can lien he anh Cuong de lay thong tin chi tiet. Hung (Lead FE) duoc tag truc tiep.
- **Action**: Tao task trien khai Ung Hoa tren MASTER_BOARD. Cho lien he anh Cuong bo sung thong tin.
- **Task IDs**: EDU000-PM-005
- **Trang thai**: REVIEW
- **Update 05/03**: Dang di trien khai. Doan: Toai + Hung + Quang + co Thao (content demo). Du phong 1 bo demo sv17. Khong con WAITING_INFO — da co du thong tin va bat dau trien khai.
- **Update 06/03**: DA TRIEN KHAI. Ket qua: chua dao tao phan tao content cho GV. Can len lich them 1 buoi tuan sau (tuan 09-13/03) de huong dan lai.
