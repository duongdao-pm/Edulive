# SUB-TASK QC-001d: Tool Soan giang + Server Bien — Kiem chung
**Parent**: EDU000-QC-001 | **Priority**: MEDIUM | **Do kho**: TRUNG BINH
**Moi truong**: ViziStudio (Windows Desktop) + Server Bien (Ubuntu Server)

---

## Tool Soan giang (ViziStudio)

### Tai lieu can doc:
- `_resources/6. EDL.HDSD. Tool Soan giang, Import Thu vien Local.md` — huong dan su dung
- `_resources/3. EDL.HDKT. Cai dat PM GV, HS, Tool soan giang.md` — cai dat

### Can lam:
1. Doc HDSD → liet ke TAT CA tinh nang duoc nhac
2. Voi moi tinh nang: da test chua? Co bug gi khong?
```
| # | Tinh nang | Mo ta | Da test | Trang thai | Bug |
|---|-----------|-------|---------|------------|-----|
| 1 | Tao bai giang | ... | Co/Chua | OK/BUG | ... |
| 2 | Import thu vien | ... | ... | ... | ... |
| 3 | Export bai giang | ... | ... | ... | ... |
```

3. Cau hoi cho BA (de phoi hop):
   - ViziStudio = Tool 2d khong? (QC thay gi khi test?)
   - ViziStudio co tinh nang AI khong? (Gen Slide AI?)

---

## Server Bien (Ubuntu Server)

### Tai lieu can doc:
- `_resources/1. EDL.HDKT. Cai dat Ubuntu Server 22.md` — cai dat OS
- `_resources/2. EDL.HDKT. Cai dat cac Service cua Edulive.md` — services
- `_resources/4. EDL.HDKT. Huong dan chay Test thong luong ky thuat.md` — test luong

### Can lam:
1. Liet ke TAT CA services tren Server Bien:
```
| # | Service | Muc dich | Port | Da test | Trang thai |
|---|---------|---------|------|---------|------------|
| 1 | Docker | Container runtime | - | ... | ... |
| 2 | Janus Gateway | WebRTC signal | 8088 | ... | ... |
| 3 | Wowza | RTMP streaming | 1935 | ... | ... |
| 4 | SeaweedFS | File storage | 8333 | ... | ... |
| 5 | PostgreSQL | Database | 5432 | ... | ... |
| 6 | Kafka | Message queue | 9092 | ... | ... |
| 7 | ... | ... | ... | ... | ... |
```

2. Ghi lai van de thuong gap khi cai dat/van hanh:
   - Service nao hay loi?
   - Config nao hay sai?
   - Disk/RAM/CPU co du khong?

3. Test luong ky thuat:
   - WebRTC ket noi: OK?
   - Dong bo data Cloud ↔ Server Bien: OK?
   - Upload/Download file: OK?
   - Streaming video: OK?

---

## LUU Y
- Neu CHUA TEST duoc (khong co moi truong) → ghi "CAN MOI TRUONG"
- Neu DA TEST nhung khong co ket qua ghi lai → ghi tu kinh nghiem test truoc
- Phan Server Bien rat quan trong cho viec chuyen server dev → product

---

## Output
Tao file: `OUTPUT/EDU000-QC-001d_TOOL_SERVER_VERIFIED.md`
