# PROJECT BOARD — EDU-002 Nexta
**Status**: DA TRIEN KHAI Thai Nguyen — Follow-up Nexta | **Priority**: HIGH | **Last updated**: 06/03/2026

## Current Priorities

- **HIGH — Thai Nguyen DA TRIEN KHAI**: Sang tuan can lam viec lai voi Nexta ve trang thai server + cac van de con lai
- **Release ban "Secure" dong bang code**: Sep giuc
- **Ban cai ban giao Nexta**: Mr Dien uu tien xu ly
- **Bug thong ke exercise**: HS vao sau assign chua hien + khong co thong ke tren tablet

## Task Board

### BE Team

| Task ID | Mo ta | Nguoi | Tien do | Trang thai | Uu tien | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU002-BE-001 | Dong goi ban cai Nexta (Native Image) | Dien | 100% | Done | Cao | — |
| EDU002-BE-002 | Build bo cai sv253 cho Nexta + phoi hop | Dien/Toai | 0% | Pending | Cao | — |

### QC Team

| Task ID | Mo ta | Nguoi | Tien do | Trang thai | Uu tien | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU002-QC-001 | Test demo Smartroom 70 Tablet | Linh, Dao | 100% | Done | Cao | — |
| EDU002-QC-002 | Test bai giang offline Server Bien | — | 0% | Pending | Trung binh | EDU002-BE-001 |
| EDU002-BUG-001 | Bug batch 27/02: Video/Audio/Assignment/STEM (5 bug) | — | 100% | Done | Cao | — |
| EDU002-BUG-002 | Bug thong ke exercise: HS vao sau assign chua hien + khong co thong ke tren tablet | — | 0% | Dang kiem tra | Cao | — |

### PM / Deployment

| Task ID | Mo ta | Nguoi | Tien do | Trang thai | Uu tien | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU002-PM-003 | Trien khai STEM Thai Nguyen — DA TRIEN KHAI. Sang tuan lam viec lai Nexta ve trang thai | Dien, Hung, Linh, Van, Anh | 80% | Review | High | — |
| EDU002-PM-004 | Dong goi ban cai USB cho Nexta tu deploy + guide Doc huong dan | PM, Dien | 0% | Pending | Cao | EDU002-BE-002 |
| EDU002-PM-005 | Tao Video huong dan trien khai cho Nexta (remote support cac diem) | PM | 0% | Pending | Cao | EDU002-PM-003 |

### AI Team

| Task ID | Mo ta | Nguoi | Tien do | Trang thai | Uu tien | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU002-AI-001 | Tool tao bai giang AI | Thinh, Tuyen, Phong | — | Pending | Cao | EDU002-AI-004 |
| EDU002-AI-002 | Kho anh KNTT + gen AI | Dat, Nam | — | Dang xu ly | Trung binh | — |
| EDU002-AI-003 | Chon model cham ngu phap TA bang LLM — Plan 2 tuan 03-18/03 | Thinh, Tuyen, Nam | 5% | Dang xu ly | Cao | Can GPU 16GB |
| EDU002-AI-004 | Bieu mau danh gia AI bai giang (SGK + PP day hoc + CSVC) | Phong | 0% | New | Cao | — |

## Risk Highlights

- HIGH **Thai Nguyen follow-up**: Da trien khai, can lam viec lai voi Nexta ve trang thai server (ALO-005 server mismatch chua resolve)
- HIGH **Bug thong ke exercise** (EDU002-BUG-002): Chua hien thong ke HS tren web + tablet — dang kiem tra
- HIGH **Bottleneck**: Dien (BE) giu nhieu task (Kafka + build sv253 Nexta)
- HIGH **Release Secure**: Sep giuc dong bang code
- MEDIUM **Versioning**: Nguy co code de Legacy <-> Native

## Tien do tong

| Team | Total | Done | In Progress | Pending | New |
|------|-------|------|-------------|---------|-----|
| PM/Deploy | 3 | 0 | 1 | 2 | 0 |
| BE | 2 | 1 | 0 | 1 | 0 |
| QC | 4 | 2 | 1 | 1 | 0 |
| AI | 4 | 0 | 2 | 1 | 1 |
| **Tong** | **13** | **3** | **4** | **5** | **1** |
