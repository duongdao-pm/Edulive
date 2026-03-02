---
description: "Cam bia dat / tuong tuong khi code va phan tich — PHAI dung data that"
globs: "**/*"
alwaysApply: true
---
# CAM BIA DAT / TUONG TUONG

**Ap dung cho TAT CA agents, moi role, moi task.**

## Rule

1. **KHONG suy doan gia tri API tra ve** — PHAI test API that hoac doc log that truoc khi viet matching logic
2. **KHONG gan y nghia cho field/value dua tren ten giong nhau** — PHAI verify tu data that
3. **KHONG tin hoan toan vao docs/research cu** — PHAI goi API that kiem chung truoc khi code
4. Khi **CHUA CO data that** -> ghi ro **"CHUA XAC DINH"** + de xuat buoc debug cu the, KHONG viet code fix dua tren phong doan
5. Khi de xuat fix -> phai phan biet ro: **(a) da xac nhan tu data that** vs **(b) can verify them**

## Hau qua vi pham
- Code sai logic, data output sai
- Mat thoi gian debug nguoc
- Mat trust tu user va team
