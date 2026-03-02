# PROJECT BOARD — EDU-002 Nexta
**Status**: Khan cap — Sap release | **Priority**: CRITICAL | **Last updated**: 02/03/2026

## Current Priorities

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

### AI Team

| Task ID | Mo ta | Nguoi | Tien do | Trang thai | Uu tien | Blocked by |
|---------|-------|-------|---------|------------|---------|------------|
| EDU002-AI-001 | Tool tao bai giang AI | Thinh, Tuyen, Phong | — | Pending | Cao | EDU002-AI-004 |
| EDU002-AI-002 | Kho anh KNTT + gen AI | Dat, Nam | — | Dang xu ly | Trung binh | — |
| EDU002-AI-003 | Cham diem bai tap Tieng Anh bang LLM | — | 0% | New | Cao | Can GPU 16GB |
| EDU002-AI-004 | Bieu mau danh gia AI bai giang (SGK + PP day hoc + CSVC) | Phong | 0% | New | Cao | — |

## Risk Highlights

- HIGH **Bug thong ke exercise** (EDU002-BUG-002): Chua hien thong ke HS tren web + tablet — dang kiem tra
- HIGH **Bottleneck**: Dien (BE) giu nhieu task (Kafka + build sv253 Nexta)
- HIGH **Release Secure**: Sep giuc dong bang code
- MEDIUM **Versioning**: Nguy co code de Legacy <-> Native

## Tien do tong

| Team | Total | Done | In Progress | Pending | New |
|------|-------|------|-------------|---------|-----|
| BE | 2 | 1 | 0 | 1 | 0 |
| QC | 4 | 2 | 1 | 1 | 0 |
| AI | 4 | 0 | 1 | 1 | 2 |
| **Tong** | **10** | **3** | **2** | **3** | **2** |
