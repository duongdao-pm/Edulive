## **1\. GIỚI THIỆU CHUNG**

### **1.1 Tên sản phẩm**

**SmartRoom – Phòng học thông minh**

### **1.2 Mô tả ngắn gọn**

**SmartRoom** là một nền tảng phòng học trực tuyến và tương tác thời gian thực, hỗ trợ giáo viên và học sinh trong quá trình giảng dạy và học tập từ xa hoặc tại chỗ. Ứng dụng cho phép triển khai các lớp học một cách linh hoạt, có thể sử dụng trong môi trường nhà trường chính quy, trung tâm đào tạo, hoặc các lớp học thêm cá nhân.

SmartRoom giải quyết bài toán tổ chức lớp học hiện đại thông qua việc tích hợp nhiều tính năng hỗ trợ giảng dạy: chia sẻ tài liệu, thuyết trình, tương tác đa chiều, kiểm tra đánh giá, chia nhóm, trò chuyện riêng và giám sát học tập hiệu quả.

### **1.3 Mục tiêu của sản phẩm** 

Ứng dụng được xây dựng với mục tiêu:

* Nâng cao chất lượng giảng dạy và học tập thông qua môi trường số hiện đại.  
* Tối ưu hóa trải nghiệm của giáo viên trong việc tổ chức và quản lý lớp học.  
* Gia tăng mức độ tương tác và khả năng tiếp thu kiến thức của học sinh.  
* Hỗ trợ linh hoạt cho cả hình thức học trực tiếp, học trực tuyến và hybrid.

### **1.4 Nền tảng được hỗ trợ**

SmartRoom hỗ trợ đa nền tảng để đảm bảo mọi đối tượng người dùng đều có thể tiếp cận dễ dàng:

* **Web** (Trình duyệt máy tính & thiết bị di động)  
* **Desktop App** (Windows, macOS)  
* **Mobile App** (iOS, Android)

## **2\. TÍNH NĂNG CHÍNH**

| STT  | Tính năng | Mô tả ngắn |
| :---- | :---- | :---- |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## **3\. CHỨC NĂNG CHI TIẾT CHUNG**

### **3.1. Đăng nhập (Sign in)**

**3.1.1. Vị trí:**  
 Hiển thị tại trang đăng nhập – xuất hiện khi người dùng chưa đăng nhập hoặc đã đăng xuất khỏi hệ thống.

**3.1.2. Mục đích:**  
 Cho phép người dùng đăng nhập vào hệ thống bằng email và mật khẩu hợp lệ.

**3.1.3. Thành phần giao diện:**

* **Email**: Trường nhập văn bản (placeholder: *Type your email here*)  
* **Password**: Trường nhập mật khẩu (placeholder: *Type your password here*)  
* **Remember me**: Checkbox tùy chọn – cho phép ghi nhớ phiên đăng nhập  
* **Login**: Nút bấm thực hiện đăng nhập

**3.1.4. Hành vi hệ thống:**

* Nhập email hợp lệ và mật khẩu đúng → đăng nhập thành công, chuyển đến màn hình chính  
* Nếu tích “Remember me” → phiên được ghi nhớ (token lưu vào localStorage)  
* Nếu không tích → phiên không ghi nhớ (token lưu vào sessionStorage)  
* Nếu email để trống → hiển thị thông báo lỗi: *Vui lòng nhập email*  
* Nếu email sai định dạng (thiếu @, sai domain, có khoảng trắng...) → hiển thị lỗi: *Email không hợp lệ*  
* Nếu mật khẩu để trống → hiển thị lỗi: *Vui lòng nhập mật khẩu*  
* Nếu thông tin đúng định dạng nhưng không khớp → hiển thị lỗi: *Tài khoản hoặc mật khẩu không đúng*  
* Nhấn Enter tại trường Email → chuyển focus sang trường Password  
* Nhấn Enter tại trường Password → submit form đăng nhập  
* Trường Password không hiển thị ký tự rõ (ẩn bằng ký tự ●)  
* Không hiển thị token hoặc thông tin nhạy cảm trong URL hoặc alert/log

**3.1.5. Trạng thái giao diện:**

* **Ban đầu**: Form hiển thị đầy đủ các trường, chưa có dữ liệu  
* **Loading**: Nút "Login" chuyển sang trạng thái tải (xoay tròn hoặc disabled)  
* **Thành công**: Chuyển màn hình chính, token được lưu đúng nơi  
* **Thất bại**: Hiển thị lỗi tương ứng, giữ nguyên dữ liệu đã nhập

**3.1.6. API sử dụng:**

* **Endpoint**: POST /login  
* **Input**: { email: string, password: string }  
* **Response**:  
  * 200 OK → Trả về token và user info  
  * 401 / 403 → Lỗi xác thực

### **3.2. GIAO DIỆN SAU KHI ĐĂNG NHẬP (DASHBOARD)**

**3.2.1. Mục đích:**  
 Hiển thị giao diện chính tương ứng với vai trò người dùng sau khi đăng nhập thành công.

**3.2.2. Phân quyền và hành vi hệ thống:**

#### **3.2.2.1 Giáo viên**

* Sau khi đăng nhập thành công:  
  * Chuyển đến giao diện chính với các thành phần:  
    * **Sidebar:**  
      * Button Create room: Mở modal tạo lớp học  
      * Dashboard: Trang tổng quan  
      * Classes: Danh sách lớp học  
      * Class map config: Cấu hình sơ đồ lớp  
    * **Global header:**  
      * Góc trái: Text "Welcome back\!"  
        Góc phải: Thông tin tài khoản (khi click mở dropdown gồm: Sign out, Vietnamese, Tiếng Việt)

#### **3.2.2.2 Học sinh**

* Sau khi đăng nhập thành công:  
  * Chuyển đến giao diện chính với các thành phần:  
    * **Sidebar:**  
      * Button Join room: Mở modal nhập mã lớp để tham gia lớp học  
      * Dashboard: Trang tổng quan  
      * Classes: Danh sách lớp học đã tham gia  
    * **Global header:**  
      * Góc trái: Text "Welcome back\!"  
      * Góc phải: Thông tin tài khoản (dropdown tương tự giáo viên)

**3.2.3. Hành vi hệ thống:**

* Phân quyền được xác định dựa trên thông tin trả về từ API đăng nhập.  
* Các nút điều hướng và thành phần giao diện được hiển thị ẩn/hiện tương ứng với quyền của người dùng.  
* Khi click vào từng mục trên sidebar, chuyển đến đúng module tương ứng.

### **3.3 TẠO LỚP (GIÁO VIÊN)**

**3.3.1. Mục đích:**  
 Cho phép giáo viên khởi tạo một lớp học mới (room) để tổ chức buổi học trực tuyến.

**3.3.2. Điều kiện thực hiện:**

* Người dùng đã đăng nhập với vai trò **giáo viên**.  
* Đang ở giao diện chính sau đăng nhập.

**3.3.3. Hành vi hệ thống:**

* Khi giáo viên click vào nút Create room trên sidebar:  
  * Hiển thị modal "Create room" gồm các thành phần:  
    * **Room name \***: Trường nhập tên lớp học (bắt buộc).  
    * **Duration \***: Trường nhập thời lượng lớp học, đơn vị tính là phút (ví dụ mặc định là 60). Giá trị hợp lệ nằm trong khoảng **từ 10 đến 240**.  
    * **Is recording**: Checkbox cho phép bật ghi âm buổi học (tuỳ chọn).  
    * Nút Cancel: Đóng modal mà không thực hiện hành động.  
    * Nút Confirm: Gửi yêu cầu tạo lớp học.  
* Khi click Confirm:  
  * Hệ thống kiểm tra tính hợp lệ của các trường nhập:  
    * Nếu thiếu Room name hoặc Duration → hiển thị cảnh báo và không cho gửi yêu cầu.  
    * Nếu hợp lệ → Gọi API tạo lớp học với các thông tin đã nhập.  
  * Nếu API trả về thành công:  
    * Đóng modal.  
    * Cập nhật danh sách lớp học.  
    * Có thể hiển thị thông báo "Tạo lớp thành công".  
  * Nếu tạo thất bại:  
    * Hiển thị thông báo lỗi.

**3.3.4. Trường hợp ngoại lệ:**

* Mất kết nối mạng khi click Confirm → Hiển thị lỗi "Không thể kết nối. Vui lòng kiểm tra lại mạng."  
* Nhập Duration không phải số dương hợp lệ → Cảnh báo định dạng sai.

**3.3.5. Phân biệt theo phiên bản hệ thống:**

* **Smartroom thường:** Giáo viên tạo lớp học thủ công qua modal như trên.  
* **Smartroom School:** Lớp học được tạo trước từ hệ thống quản trị, giáo viên không thao tác tạo mà chỉ vào lớp đã được cấp sẵn; học sinh cũng được tự động thêm vào lớp.

### **3.4 Join lớp học – Học sinh**

**3.4.1. Mục đích:**  
 Cho phép học sinh tham gia vào một lớp học đã được giáo viên tạo trước đó bằng cách nhập mã lớp (room code).

**3.4.2. Điều kiện thực hiện:**

* Người dùng đã đăng nhập và có phân quyền là *học sinh*.  
* Biết trước mã lớp hợp lệ được cung cấp bởi giáo viên.

**3.4.3. Luồng thực hiện:**

* Trên giao diện chính, học sinh nhấn nút Join room (nằm ở sidebar) → mở modal tham gia lớp.  
* **Modal Join room** bao gồm:  
* **Tiêu đề modal:** Enter code to join room  
* **Input:** Enter code here (placeholder để nhập mã lớp)  
* **Nút hành động:**  
  * Cancel: đóng modal  
  * Join room: gửi yêu cầu tham gia lớp

**3.4.4. Hành vi hệ thống:**

* Khi học sinh nhấn Join room, hệ thống thực hiện:  
  * Validate đầu vào không được để trống. Nếu trống → hiển thị thông báo lỗi phù hợp.  
  * Gửi yêu cầu tham gia lớp với thông tin roomCode và userId qua API.  
  * Nếu tham gia thành công → gọi lại API lấy danh sách lớp học mới nhất và đóng modal.  
  * Nếu thất bại (sai mã phòng, phòng không tồn tại, phòng đã kết thúc…) → hiển thị thông báo lỗi.

**3.4.5. Ghi chú:**

* Mỗi học sinh có thể tham gia nhiều lớp khác nhau nếu có mã lớp tương ứng.  
* Sau khi tham gia thành công, học sinh sẽ thấy lớp học hiển thị trong tab Classes.

### **3.5 Danh sách lớp học – Tab Classes**

**3.5.1. Điều kiện thực hiện:**

* Người dùng đã đăng nhập thành công vào hệ thống.  
* Từ sidebar, người dùng chọn mục **Classes**.

**3.5.2. Mục đích:**

* Cho phép người dùng theo dõi và truy cập vào các lớp học đã tạo (đối với giáo viên) hoặc đã tham gia (đối với học sinh).  
* Danh sách được phân loại theo trạng thái lớp học: **Incoming** (chưa kết thúc) và **Ended** (đã kết thúc).

**3.5.3. Hành vi hệ thống:**

**3.5.3.1. Giao diện chung:**

* Giao diện gồm 2 tab con:  
  * **Incoming**: hiện các lớp học chưa kết thúc.  
  * **Ended**: hiện các lớp học đã kết thúc.  
* Danh sách hiển thị theo dạng thẻ (card), mỗi lớp là một phần tử riêng biệt.

**3.5.3.2. Thông tin hiển thị theo vai trò:**

**a. Đối với giáo viên:**

**Thẻ lớp học trong tab *Incoming*:**

* **Tên lớp học** (VD: *Môn tiếng Anh*) (hiển thị nổi bật, là thành phần có thể click để vào lớp)  
* Ngay sau tên lớp học (cùng dòng): Hiển thị icon "Lịch sử" (🕘) ở góc phải dòng tên lớp.  
* **Mã Room**: chuỗi số (VD: 81297552017\) đi kèm icon copy để sao chép.  
* **Thời lượng lớp học**: hiển thị bằng phút (VD: 60').  
* **Thời gian bắt đầu lớp học**: định dạng HH:mm dd/MM/yyyy (VD: 14:35 17/07/2025).

**Thẻ lớp học trong tab *Ended*:**

* **Tên lớp học** (VD: *Môn tiếng Anh*) (hiển thị nổi bật, là thành phần có thể click để vào lớp)  
* Ngay sau tên lớp học (cùng dòng):  
  * Hiển thị icon "Audio Record" nếu lúc tạo lớp, giáo viên đã bật tùy chọn *Is recording*.  
  * Hiển thị icon "Lịch sử" (🕘) ở góc phải dòng tên lớp.  
* **Mã Room**: chuỗi số (VD: 81297552017\) đi kèm icon copy để sao chép.  
* **Thời lượng lớp học**: hiển thị bằng phút (VD: 60').  
* **Thời gian bắt đầu lớp học**: định dạng HH:mm dd/MM/yyyy (VD: 14:35 17/07/2025).

📌 **Tên lớp học có thể click được**. Khi click vào tên lớp, hệ thống sẽ đưa giáo viên vào giao diện phòng học tương ứng (nếu lớp đang diễn ra).

**b. Đối với học sinh:**

Mỗi lớp học hiển thị các thông tin sau:

* **Tên lớp học** (VD: *Môn tiếng Anh*).  
* **Thời lượng lớp học**.  
* **Thời gian bắt đầu lớp học**.

📌 **Không hiển thị mã room**.  
📌**Tên lớp học có thể click được**. Khi click vào, học sinh sẽ được chuyển vào giao diện phòng học (nếu lớp đang diễn ra và đúng thời gian).

**3.5.3.3. Hành vi khi click vào lớp học:**

* Hệ thống kiểm tra:  
  * Nếu thời gian hiện tại nằm **trong khoảng diễn ra lớp học**:  
    * Cho phép vào giao diện phòng học (SmartRoom).  
  * Nếu **chưa đến giờ học** hoặc **lớp đã kết thúc**, có thể:  
    * Hiển thị thông báo: “Lớp học chưa bắt đầu” hoặc “Lớp học đã kết thúc” (tùy yêu cầu).  
    * Hoặc không phản hồi gì nếu chưa có xử lý.

### **3.6 Class Map (Chỉ hiển thị với giáo viên)**

**3.6.1. Mục đích:**  
 Cung cấp cho giáo viên sơ đồ trực quan về vị trí và danh tính của học sinh trong lớp, giúp dễ dàng theo dõi và tương tác trong suốt quá trình dạy học.

**3.6.2. Điều kiện thực hiện:**

* Thiết bị cần **được cài đặt ứng dụng** và **có file cấu hình hợp lệ** trước khi sử dụng.  
* Cấu hình này là **file JSON** chứa thông tin định danh và phân loại thiết bị, với cấu trúc:  
  {  
    "room\_id": "abc123",  
    "device\_id": "device001",  
    "name": "Máy giáo viên"  
  }

**Chi tiết:**

* room\_id: ID định danh của lớp học. Tất cả các thiết bị trong cùng một lớp phải dùng chung room\_id.s  
* device\_id: Mỗi thiết bị phải có một device\_id duy nhất trong lớp.  
* name: Tên gọi của thiết bị (có thể là “Máy giáo viên”, “Máy số 1”, v.v.).

⚠️ Class Map chỉ hiển thị nếu thiết bị giáo viên có file cấu hình hợp lệ, đặc biệt là có room\_id trùng với các thiết bị học sinh.

**3.6.3. Luồng hoạt động:**

1. Khi thiết bị **giáo viên được khởi động**, hệ thống sẽ sử dụng room\_id để **quét và nhận diện tất cả thiết bị học sinh** có cùng room\_id trong mạng.  
2. Từ danh sách thiết bị tìm thấy, kết hợp với dữ liệu trong LAYOUT\_PARTICIPANTS (chứa vị trí x, y của từng thiết bị), hệ thống sẽ xây dựng sơ đồ bố trí.  
3. Nếu học sinh **chưa đăng nhập**, ô vị trí trên sơ đồ vẫn được hiển thị (theo device\_id), nhưng **trống tên người dùng**.  
4. Khi học sinh **đăng nhập bằng tài khoản Edulive** trên máy đã được nhận diện, hệ thống sẽ: Hiển thị **tên tài khoản** tại đúng vị trí máy đó.  
5. Nếu học sinh **đăng xuất hoặc tắt máy**, ô sơ đồ tương ứng sẽ: **Ẩn tên học sinh**.

**3.6.4. Hiển thị sơ đồ trong giao diện giáo viên:**

* Mỗi thiết bị là một ô (thẻ) trong sơ đồ Class Map, hiển thị các thông tin:

  * Tên thiết bị (nếu chưa có học sinh đăng nhập).  
  * Tên học sinh (nếu đã đăng nhập).

* Tọa độ hiển thị (x, y) của mỗi thiết bị được tính từ mép trên và trái của vùng hiển thị sơ đồ, lưu trong LAYOUT\_PARTICIPANTS.

**3.6.5. Cập nhật và thao tác thủ công:**

* Dữ liệu sơ đồ được cập nhật tức thời khi:  
  * Có học sinh mới đăng nhập hoặc đăng xuất.  
  * Có thay đổi trong dữ liệu PARTICIPANTS hoặc LAYOUT\_PARTICIPANTS.  
* Giáo viên có thể:  
  * **Kéo – thả** để thay đổi vị trí thiết bị trên sơ đồ.  
  * Sau thao tác, tọa độ mới được lưu lại để dùng cho các lần hiển thị sau

## **4\. Vào Room học (LiveRoom) \- Giáo viên**

### 4.1 Whiteboard (Bảng trắng)

4.1.1. Vị trí giao diện

* Nằm tại trung tâm khung trình chiếu chính trong lớp học (center stage).  
* Khi không có nội dung nào được trình chiếu (video, PDF, slide…), bảng trắng sẽ là màn hình mặc định hiển thị.  
* Trên thanh công cụ, giáo viên có thể bật/tắt bảng trắng bằng nút \[Whiteboard \].

4.1.2. Hành vi mặc định khi vào lớp

* Khi giáo viên hoặc học sinh vào lớp, hệ thống kiểm tra trạng thái nội dung đang hiển thị:  
  * Nếu không có nội dung media nào đang được chia sẻ (slide, video, PDF…), thì bảng trắng sẽ được bật mặc định.  
  * Nếu giáo viên đang bật một nội dung khác → học sinh vào sau sẽ thấy đúng nội dung đó thay vì bảng trắng.  
* Khi reconnect:  
  * Nếu trạng thái hiện tại lớp đang dùng bảng trắng → sẽ hiển thị lại bảng trắng.  
  * Nếu đang trình chiếu nội dung khác → không hiển thị bảng trắng.

4.1.3. Quyền thao tác

* Giáo viên:  
  * Luôn có quyền bật/tắt bảng trắng và thao tác vẽ trên đó.  
* Học sinh:  
  * Mặc định chỉ có quyền xem bảng trắng.  
  * Có thể được giáo viên cấp quyền vẽ, sau đó sẽ xuất hiện bộ công cụ vẽ tương ứng.

4.1.4. Các thao tác chính

* Bật/Tắt bảng trắng:  
  * Giáo viên click nút \[Bảng trắng\] → thực hiện `emit('TOGGLE_WHITEBOARD')`.  
  * Khi bật bảng trắng, hệ thống sẽ hiển thị canvas trắng trên khu vực chính.  
* Vẽ:  
  * Hệ thống cung cấp các công cụ: bút, màu, xóa, hoàn tác, vẽ hình khối…  
* Xoá toàn bộ:  
  * Giáo viên có thể chọn xoá toàn bộ nội dung bảng trắng.  
* Undo/Redo:  
  * Hỗ trợ thao tác hoàn tác/khôi phục nét vẽ.

4.1.5. Đồng bộ dữ liệu giữa các thành viên

* Khi giáo viên bật bảng trắng:  
  * Học sinh sẽ thấy ngay nội dung bảng trắng (bao gồm các nét vẽ trước đó).  
* Nếu một thành viên vào sau hoặc reconnect:  
  * Sẽ nhận toàn bộ trạng thái bảng trắng hiện tại từ hệ thống (nét vẽ, vị trí, quyền thao tác).

4.1.6. Cơ chế kỹ thuật

* Dữ liệu vẽ được lưu trên client theo từng stroke (đường vẽ).  
* Các nét vẽ được gửi qua socket tới server và broadcast lại cho các client khác theo thời gian thực.  
* Khi học sinh mất mạng và reconnect, hệ thống gửi lại toàn bộ dữ liệu bảng trắng từ giáo viên để đồng bộ.

### **4.2. Board**

* **Vị trí hiển thị:**  
  * Button `Board` nằm ở góc dưới cùng bên trái của giao diện phòng học (trên thanh công cụ `Footer`), bên cạnh nút chuyển trang `Prev / Pages / Next`.  
* **Hành vi hiển thị và chức năng:**  
  * Khi truy cập vào phòng học, hệ thống sẽ mặc định hiển thị White board.  
  * Người dùng click vào nút `Board` sẽ xổ ra thanh bên trái chứa danh sách các `Thumbnails` tương ứng với các trang bảng hiện có.  
  * Mỗi bảng là một trang white board riêng biệt (tối đa 10 trang).  
  * Trên mỗi thumbnail sẽ hiển thị preview các nét vẽ, hình khối đã vẽ trên trang tương ứng.  
  * Giáo viên có thể chuyển trang bằng cách:  
    * Click trực tiếp vào thumbnail để chuyển tới trang tương ứng.  
    * Sử dụng nút `Next`, `Prev` ở dưới footer để di chuyển tới bảng tiếp theo hoặc trước đó.  
  * Mỗi trang bảng (trong 10 bảng) đều có thể chứa nội dung vẽ riêng biệt (text, hình, nét vẽ...).  
  * Dữ liệu vẽ sẽ được lưu theo từng trang bảng.

### **4.3. Content**

* Nằm trong thanh công cụ dưới cùng, biểu tượng 📂 "Content".  
* Khi nhấn vào sẽ mở ra menu dạng popup chứa các lựa chọn:  
  * **Whiteboard**  
  * **Library**  
  * **Upload**  
  * **Share screen**  
  * **Questions**  
  * **History**

#### 4.3.1. Whiteboard

Vị trí giao diện

* Nằm trong menu popup khi click vào biểu tượng **Content** trên thanh công cụ dưới cùng.  
* Icon: 🖥️ “Whiteboard”.

Chức năng

* Mở bảng trắng mặc định trong lớp học.  
* Cho phép giáo viên và học sinh thao tác vẽ (nếu được cấp quyền).  
* Có thể chuyển trang qua lại giữa các trang bảng trắng bằng cụm điều hướng:  
   **Board | Prev | 1/10 Pages | Next**.

Luồng xử lý

* Khi vào lớp học lần đầu:  
  * Mặc định mở trang đầu tiên của Whiteboard.  
* Khi giáo viên đang mở một nội dung khác như **PDF, Slide, Questions**, nếu **click lại vào Whiteboard**:  
  * Hệ thống **tắt nội dung đang mở**.  
  * **Hiển thị lại bảng trắng**, đúng trang trước đó mà giáo viên đã dùng.  
  * Nếu chưa từng mở Whiteboard trước đó trong phiên dạy, mặc định mở trang 1/10.

Tương tác

* Các thao tác vẽ trên Whiteboard được đồng bộ theo thời gian thực đến học sinh.

* Có thể sử dụng công cụ vẽ như bút, tẩy, màu, hoàn tác/khôi phục… (cấu hình trong mục **Tools**).  
* Khi chuyển trang bảng, mỗi trang giữ nguyên nét vẽ riêng biệt (canvas riêng).  
* Giáo viên có thể dọn sạch bảng bằng nút “Clear”.

Phân quyền

* Giáo viên có toàn quyền thao tác vẽ, chuyển trang, xóa nội dung trên bảng.  
* Học sinh có thể được cấp quyền vẽ từ giáo viên (nếu cần).  
* Trong trạng thái mặc định, học sinh chỉ xem bảng trắng.

Yêu cầu kỹ thuật

* Hành động click “Whiteboard” cần:  
  * Ghi lại vào objectlog (hành vi chuyển nội dung).  
  * Đồng bộ với tất cả học sinh: nội dung hiện tại là bảng trắng.  
  * Nếu đang vẽ dở thì không mất dữ liệu, giữ nguyên nét vẽ trên mỗi trang.

#### 4.3.2. Library

Giáo viên có thể mở tài nguyên từ thư viện lên Whiteboard để trình chiếu và tương tác với học sinh. Tài nguyên có thể là các loại sau: Exercise, Slide, PDF, Video, Audio, Image. Tùy theo loại tài nguyên, hệ thống sẽ có xử lý khác nhau như sau:

Luồng chung khi mở tài nguyên từ Library

1. **Truy vấn thư viện:** Gửi `GET_FILES` để lấy danh sách tài nguyên trong thư viện theo thư mục đã chọn.  
2. **Giáo viên chọn tài nguyên:** Khi giáo viên chọn 1 file trong danh sách, hệ thống sẽ thực hiện mở loại file tương ứng (chi tiết theo từng loại bên dưới).  
3. **Hiển thị trên Whiteboard:** Tài nguyên được mở sẽ hiển thị lên màn hình Whiteboard cho cả giáo viên và học sinh (trừ khi có thao tác riêng).  
4. **Hành vi tương tác:** Mỗi loại tài nguyên có hành vi hiển thị và tương tác riêng.

##### 4.3.2.1 Video

**Mô tả**:  
 Tài nguyên dạng Video được giáo viên mở từ thư viện. Khi được chọn, video sẽ được hiển thị trên Whiteboard dưới dạng một canvas riêng và được phát trực tiếp cho toàn bộ lớp học (giáo viên và học sinh).

**Luồng hoạt động**:

* Giáo viên chọn video từ thư viện → hệ thống tải metadata (id, name, url, version...) → hiển thị video trong lớp học tại khu vực Whiteboard.  
* Video mặc định được phát từ đầu và có thanh điều khiển để tương tác: phát/tạm dừng (play/pause), tua (seek), điều chỉnh âm lượng.

**Hành vi hiển thị & tương tác**:

* **Giáo viên** có thể:  
  * Điều khiển phát/tạm dừng, tua, điều chỉnh âm lượng.  
  * **Di chuyển khung video** đến vị trí bất kỳ trên Whiteboard. Vị trí mới sẽ được đồng bộ ngay lập tức đến tất cả học sinh.

* **Học sinh** có thể:  
  * **Tự điều khiển phát/tạm dừng, tua, chỉnh âm lượng** trên thiết bị của mình.  
  * Tuy nhiên, **mọi thao tác điều khiển từ phía giáo viên sẽ luôn ghi đè và đồng bộ lại trạng thái video của học sinh**, bao gồm thời điểm đang phát, trạng thái play/pause, vị trí hiển thị.  
  * Nếu học sinh đang thao tác mà giáo viên thực hiện thao tác điều khiển mới, trạng thái học sinh sẽ được cập nhật lại theo giáo viên ngay lập tức.

**Trường hợp mất kết nối**:

* Khi học sinh reconnect vào lớp, hệ thống sẽ tự động đồng bộ trạng thái hiện tại của video (vị trí hiển thị, thời điểm phát, trạng thái) theo giáo viên để đảm bảo đồng bộ lớp học.

**Lưu ý kỹ thuật**:

* Video là một object trong Whiteboard, được ghi nhận và cập nhật thông qua `objectLog`.

* Trạng thái video (vị trí, thời gian đang phát, trạng thái điều khiển) được truyền qua socket để đồng bộ thời gian thực giữa giáo viên và học sinh.

##### 4.3.2.2. Audio

**Mô tả**:  
 Tài nguyên dạng Audio được giáo viên mở từ thư viện. Khi được mở, file âm thanh sẽ được phát trực tiếp trên Whiteboard dưới dạng một khung điều khiển đơn giản, hiển thị cho toàn bộ lớp học (giáo viên và học sinh).

**Luồng hoạt động**:

* Giáo viên chọn audio từ thư viện → hệ thống tải metadata (id, name, url, version...) → hiển thị khung điều khiển audio trên Whiteboard.  
* Audio mặc định sẽ được phát từ đầu, có các điều khiển cơ bản: phát/tạm dừng (play/pause), tua (seek), chỉnh âm lượng, và **chọn tốc độ phát (0.5x, 1x, 1.25x, 1.5x...)**.

**Hành vi hiển thị & tương tác**:

* **Giáo viên** có thể:  
  * Điều khiển phát/tạm dừng, tua, chỉnh âm lượng, thay đổi tốc độ phát.  
* **Học sinh** có thể:  
  * Tự điều khiển phát/tạm dừng, tua, chỉnh âm lượng và thay đổi tốc độ phát.  
  * Tuy nhiên, **mọi thao tác điều khiển từ phía giáo viên sẽ luôn ghi đè và đồng bộ trạng thái âm thanh của học sinh**, bao gồm thời điểm phát, trạng thái play/pause, tốc độ phát, vị trí hiển thị.  
  * Nếu học sinh đang thao tác mà giáo viên vừa có thao tác điều khiển, hệ thống sẽ cập nhật lại toàn bộ trạng thái theo giáo viên ngay lập tức.

**Trường hợp mất kết nối**:

* Khi học sinh reconnect, hệ thống sẽ đồng bộ trạng thái âm thanh hiện tại: thời điểm phát, trạng thái, tốc độ phát và vị trí hiển thị theo giáo viên.

**Lưu ý kỹ thuật**:

* Audio là một object trên Whiteboard, có ghi nhận và cập nhật qua `objectLog`.  
* Trạng thái được đồng bộ qua socket theo thời gian thực: vị trí hiển thị, thời gian phát, trạng thái, tốc độ phát.  
* Tốc độ phát hỗ trợ các giá trị phổ biến: 0.5x, 1x, 1.25x, 1.5x (giáo viên và học sinh đều có quyền chọn).

##### 4.3.2.3. Image

**Mô tả**:  
 Tài nguyên dạng Image (hình ảnh) được giáo viên mở từ thư viện và hiển thị trên Whiteboard để phục vụ bài giảng. Mỗi thời điểm chỉ có thể hiển thị **một ảnh duy nhất** trên bảng. Nếu giáo viên mở ảnh mới, ảnh trước đó sẽ **tự động bị ẩn đi**.

**Hành vi hiển thị & tương tác**:

* **Ảnh luôn nằm trên cùng (top layer)** của bảng trắng, **đè lên** tất cả các đối tượng khác (bao gồm các nét vẽ, hình khối vẽ).  
* **Không thể vẽ lên ảnh**. Tất cả công cụ vẽ chỉ áp dụng cho các vùng ngoài ảnh.  
* **Giáo viên** có thể:  
  * Di chuyển ảnh đến vị trí mong muốn.  
  * Phóng to hoặc thu nhỏ ảnh.  
  * Ẩn ảnh bằng cách mở ảnh khác hoặc đóng tài nguyên.  
* **Học sinh** có thể:  
  * Phóng to / thu nhỏ ảnh tại thiết bị của mình.  
  * Di chuyển vị trí ảnh trong khung nhìn.  
  * Tuy nhiên, **mọi thao tác của giáo viên sẽ ghi đè và đồng bộ** lại trạng thái ảnh (kích thước, vị trí) đến học sinh ngay khi thay đổi được thực hiện.

**Luồng hoạt động**:

* Giáo viên chọn ảnh từ thư viện → ảnh hiển thị trên bảng trắng.  
* Học sinh nhìn thấy ảnh tại vị trí và kích thước do giáo viên thiết lập.  
* Khi giáo viên thao tác (di chuyển, thu phóng) → mọi học sinh đều nhận được cập nhật đồng bộ tức thời.  
* Nếu học sinh thao tác ảnh thủ công → hiệu lực hiển thị chỉ mang tính tạm thời cục bộ, và sẽ bị ghi đè nếu giáo viên thao tác sau đó.

**Trường hợp mất kết nối**:

* Khi học sinh reconnect, hệ thống sẽ khôi phục ảnh gần nhất đang hiển thị kèm theo trạng thái đồng bộ từ giáo viên (vị trí, kích thước).

##### 4.3.2.4. PDF

**Mô tả**:      
 Tài nguyên dạng PDF được mở từ thư viện thông qua thao tác của giáo viên. Khi được mở thành công, file PDF sẽ được hiển thị lên khu vực Whiteboard của cả giáo viên và học sinh.

**Luồng hoạt động**:

* Khi giáo viên chọn một tài liệu PDF từ thư viện, hệ thống sử dụng thông tin file (id, name, url, content version,...) để tải file PDF.  
* File PDF được đọc nội dung, chuyển đổi và chia nhỏ thành các phần dữ liệu (mỗi phần tối đa 5MB), sau đó lưu dưới dạng JSON.  
* Các phần JSON này được ghép lại để hiển thị đầy đủ file PDF trên Whiteboard.

**Hành vi hiển thị & tương tác**:

* Học sinh sẽ thấy cùng một trang PDF với giáo viên.  
* Giáo viên có thể chuyển trang bằng cách nhấn các nút **Next** / **Previous** (→ chuyển tới trang kế tiếp hoặc quay lại trang trước).  
* Giáo viên có thể vẽ lên từng trang PDF. Các nét vẽ sẽ được hiển thị đồng bộ cho học sinh.  
* Nếu **giáo viên cấp quyền vẽ**, học sinh cũng có thể vẽ lên PDF. Khi đó, hành vi vẽ của học sinh sẽ được gửi lên server và đồng bộ tới tất cả người dùng khác.

**Lưu ý**:

* Mỗi trang PDF hiển thị là một canvas riêng biệt để phục vụ tính năng vẽ.  
* Khi giáo viên chuyển trang, hệ thống sẽ lưu lại các nét vẽ của trang trước và hiển thị nội dung trang mới kèm theo dữ liệu canvas tương ứng.

##### 4.3.2.5. Exercise

Khi giáo viên mở một bài tập từ thư viện (Library), hệ thống thực hiện tuần tự các thao tác sau:

1. Gửi sự kiện `SEND_OPEN_EXERCISE` kèm theo các thông tin của bài tập được chọn.  
2. Gọi `janus.sendDataPublic` để đồng bộ bài tập tới học sinh trong phòng.  
3. Gọi API `GET_EXERCISE` để lấy dữ liệu bài tập chi tiết (bao gồm file JSON, v.v.).  
4. Mở canvas hiển thị bài tập và thực hiện `handleLoadExercise` để render toàn bộ nội dung.

Luồng hoạt động của giáo viên và học sinh

* **Giáo viên bắt đầu làm bài**: hệ thống sẽ xóa toàn bộ `learner_state` cũ (trạng thái học sinh), và gửi yêu cầu cập nhật trạng thái mới là “đang làm bài”.  
* **Học sinh làm bài**: mỗi khi chỉnh sửa câu trả lời, sự kiện `exerciseQuestionEdited` được kích hoạt. Dữ liệu sẽ được cập nhật ngay trên canvas và đồng bộ lên server.  
* **Học sinh nộp bài (Submit)**: kết quả bài làm sẽ được gửi lên server, giáo viên nhận được dữ liệu tổng hợp.  
* **Giáo viên kết thúc bài tập**: trạng thái `learner_state` được lưu làm lịch sử (dưới dạng JSON) để phục vụ cho các lần mở xem lại hoặc review. Dữ liệu này sẽ được gán vào `Review.dataExercise` khi xem lại, mỗi đáp án học sinh sẽ được ánh xạ theo `questionId`.

Hiển thị và tương tác

1. **Trên Whiteboard**:  
   * Bài tập được hiển thị toàn màn hình.  
   * Giáo viên có thể vẽ lên bài tập.  
   * Học sinh có thể vẽ nếu được cấp quyền.  
   * Khi giáo viên cuộn bài, học sinh cũng sẽ được đồng bộ vị trí cuộn tương ứng.  
2. **Modal "Assign Exercise"**:  
    Khi giáo viên click "Assign exercise", một bảng kết quả (Result) sẽ xuất hiện gồm:  
   * **Cột Name**: danh sách học sinh trong lớp.  
   * **Cột Correct**: số câu đúng học sinh đã làm.  
   * **Cột Ratio**: tỉ lệ phần trăm câu đúng.  
   * **Cột Status**: nếu Ratio \> 50%, hiển thị “Pass”; ngược lại là “Fail”.  
   * **Cột Points**: tổng điểm bài làm.  
   * **Button Close**: đóng bảng kết quả.  
   * **Button Start exercise**: bắt đầu phiên làm bài (sau khi nhấn, nút sẽ chuyển thành "Stop exercise").  
3. **Trong lúc làm bài**:  
   * Giao diện học sinh hiển thị nút **Submit**.  
   * Giao diện giáo viên hiển thị thêm một cột có icon **mắt xem** tại từng hàng học sinh.  
   * Khi click vào mắt xem, hệ thống hiển thị màn hình **preview** quá trình làm bài của học sinh (không can thiệp được).  
4. **Sau khi học sinh Submit**:  
   * Học sinh sẽ không thể chỉnh sửa bài làm nữa.  
   * Giáo viên sẽ thấy ngay điểm số tại bảng Result.  
5. **Khi giáo viên nhấn “Stop exercise”**:  
   * Học sinh không còn nút Submit nếu chưa gửi bài (hoặc thấy trạng thái đã gửi).  
   * Trên bảng Result, icon mắt xem được chuyển thành **icon chia sẻ**:  
     * Khi click vào icon chia sẻ: hiển thị bài tập đã làm của học sinh, đồng thời preview xuất hiện cả ở giao diện học sinh và giáo viên.  
     * Cả hai bên đều có thể vẽ lên màn hình (nếu được cấp quyền).

#### 4.3.3 Upload

**Mục đích:**  
 Cho phép giáo viên tải lên và chia sẻ nhanh các tài nguyên (video, audio, image) từ thiết bị cá nhân để hiển thị trực tiếp cho toàn bộ lớp học mà không cần thông qua thư viện.

**Luồng xử lý:**

1. **Giáo viên nhấn nút Upload**

Khi giáo viên nhấn nút `Upload`, hệ thống sẽ thực hiện: `emit('OPEN_UPLOAD_FILE')` ➜ Mở Modal Upload File.

2. **Giao diện Modal Upload File**  
   * Modal bao gồm các thành phần:  
     * Nút `Upload file`  
     * Nút `Cancel`  
     * Nút `Confirm`  
     * Khu vực kéo & thả file (drag and drop)  
3. **Chọn và tải file lên**  
   * Giáo viên chọn file từ thiết bị cá nhân.  
   * Chỉ chấp nhận các loại file: `.mp4`, `.mp3`, `.jpg`, `.png` (video, audio, image).  
   * Sau khi chọn, hệ thống sẽ:  
     * Đẩy file lên kho lưu trữ.  
     * Đồng thời gửi yêu cầu mở file theo `type` tương ứng (Video, Audio, Image).  
4. **Mở file cho toàn bộ học sinh**  
   * Ngay khi upload thành công, file sẽ được mở và hiển thị trên Whiteboard của cả giáo viên và học sinh theo `source` (URL file) mà giáo viên upload.  
   * Giao diện hiển thị tài nguyên sẽ tương tự như khi mở từ thư viện (Library):  
     * **Video/Audio:**  
       * Giáo viên có thể thao tác: `Play`, `Pause`, `Seek`, `Volume`, `Speed`.  
       * Các thao tác này sẽ được đồng bộ tới học sinh thông qua lệnh điều khiển gửi kèm.  
     * **Image:**  
       * Ảnh hiển thị luôn đè lên và chỉ một ảnh tại một thời điểm.  
       * Không thể vẽ lên ảnh.  
       * Giáo viên có thể phóng to, thu nhỏ, di chuyển ảnh ➜ thao tác sẽ được đồng bộ tới học sinh.  
       * Học sinh cũng có thể tương tác di chuyển ảnh nhưng vẫn bị override khi giáo viên thao tác.

**Lưu ý:**

* Khi giáo viên mở file mới (dù là upload mới hay mở lại), file đang hiển thị trước đó sẽ bị ẩn đi (không cho hiển thị song song nhiều file cùng lúc).  
* Việc đồng bộ điều khiển (Play/Pause, Seek, Move…) giữa giáo viên và học sinh là bắt buộc nhằm đảm bảo trải nghiệm thống nhất trong lớp học.

#### 4.3.4. Share Screen

**Luồng hoạt động**

Giáo viên bắt đầu chia sẻ màn hình

1. Giáo viên nhấn nút **Share Screen** ➝ thực hiện emit sự kiện `SHARE_SCREEN`.  
2. Mở **modal lựa chọn nguồn chia sẻ (source)** – bao gồm 3 loại:  
   * **APPLICATIONS**: các cửa sổ ứng dụng đang mở  
   * **TABS**: các tab trình duyệt  
   * **SCREENS**: toàn bộ các màn hình đang kết nối  
3. Giáo viên chọn 1 source bất kỳ ➝ nhấn nút **Confirm** để xác nhận.  
4. Hệ thống thực hiện emit sự kiện `SEND_SHARE_SCREEN` với thông tin `source` đã chọn.  
5. Gọi hàm `janus.shareScreen(source)` để bắt đầu phát nội dung màn hình giáo viên lên kênh Janus stream.

**Học sinh nhận chia sẻ màn hình**

* Khi chia sẻ được khởi động thành công, tất cả học sinh trong lớp:  
  * Tự động hiển thị **live view** của màn hình đang được chia sẻ ở vị trí trung tâm Whiteboard.  
  * Không thể tương tác hay điều khiển màn hình đang xem.

**Kết thúc chia sẻ**

* Giáo viên có thể kết thúc chia sẻ bất kỳ lúc nào bằng cách:  
  * Nhấn lại nút **Stop Share**, hoặc  
  * Tắt chia sẻ từ giao diện hệ điều hành.  
* Khi dừng chia sẻ:  
  * Gọi `janus.stopShareScreen()`.  
  * Gửi socket `STOP_SHARE_SCREEN` đến học sinh để ẩn phần màn hình đã chia sẻ.

**Luồng socket**

* Khi giáo viên nhấn nút Share ➝ mở modal chọn source.  
  emit(`SHARE_SCREEN`)  
* Học sinh nhận tín hiệu và hiển thị nội dung màn hình được chia sẻ.

  emit(`SEND_SHARE_SCREEN`)

  `{`

    `"source": {`

      `"id": "...",`

      `"name": "...",`

      `"type": "SCREEN" | "APPLICATION" | "TAB"`

    `},`

    `"userId": "..."`

  `}`

  emit(`RECEIVE_SHARE_SCREEN`)

* Gửi đến toàn bộ học sinh để dừng hiển thị nội dung chia sẻ.  
  emit(`STOP_SHARE_SCREEN`)

**Quyền kiểm soát**

* Chỉ giáo viên có quyền chia sẻ màn hình.  
* Trong một thời điểm, chỉ **duy nhất một người chia sẻ** được.

#### 4.3.5. Question

Khi giáo viên chọn chức năng **Question**, hệ thống sẽ hiển thị **Modal "Assign Question"** cho phép tạo và gửi câu hỏi tới toàn bộ học sinh trong lớp học. Modal này bao gồm 5 loại câu hỏi, mặc định là **Single Choice Question**:

Danh sách loại câu hỏi

1. **Single Choice Question**  
   * Gồm:  
     * 1 input `Enter question`  
     * 4 input `Answer`, mỗi dòng đi kèm radio button để chọn đáp án đúng  
     * Button: `Add Answer`, `Cancel`, `Confirm`  
   * Khi click `Add Answer`, thêm một dòng input `Answer` mới (tối đa 10 dòng).  
2. **Multiple Choice Question**  
   * Gồm:  
     * 1 input `Enter question`  
     * 4 input `Answer`, mỗi dòng đi kèm checkbox để chọn đáp án đúng  
     * Button: `Add Answer`, `Cancel`, `Confirm`  
   * Khi click `Add Answer`, thêm dòng mới (tối đa 10 dòng).  
3. **Fill in the Blank**  
   * Gồm:  
     * 1 input `Enter question`  
     * 4 input `Answer` (tùy chọn nhiều cách viết đúng)  
     * Button: `Add Answer`, `Cancel`, `Confirm`  
   * Tối đa 10 dòng input.  
4. **Essay**  
   * Gồm:  
     * 1 input `Enter question`  
     * Button: `Cancel`, `Confirm`  
5. **Speaking**  
   * Gồm:  
     * 1 input `Enter question`  
     * Button: `Cancel`, `Confirm`

Gửi câu hỏi

* Khi giáo viên click **Confirm**, hệ thống sẽ:  
  * `emit('ASSIGN_QUESTION')`  
  * Sau đó `sendDataPublic()` để gửi câu hỏi đến toàn bộ học sinh.

Xử lý theo vai trò

**Với vai trò TEACHER**

* Hệ thống sẽ gọi:  
  * `emit('OPEN_QUESTION_CHECKER')`  
  * Hiển thị **Modal Result** – là bảng tổng hợp kết quả của toàn bộ học sinh.

TH1: Single Choice / Multiple Choice / Fill in the Blank

* Thông tin gồm:  
  * Câu hỏi \+ danh sách đáp án  
  * Đáp án đúng được tô màu **xanh lá cây**  
* Bảng kết quả có các cột:  
  * **Name**: Danh sách học sinh  
  * **Result**:  
    * Với SCQ/MCQ: Hiện các đáp án đã chọn (VD: A C D)  
    * Với Fill in blank: Hiện đáp án học sinh nhập  
    * Nếu đáp án đúng: màu **xanh**, sai: **đỏ**  
  * **Point**: 100 nếu đúng hoàn toàn, 0 nếu sai (cả đúng 1 phần)  
  * **Status**:  
    * `Pointed`: nếu đã có điểm  
    * `Unpointed`: nếu chưa có điểm  
  * **Actions**:  
    * Button: `Give Point` → click vào mở input nhập điểm (0–100, mặc định là điểm tính sẵn)  
    * Button: `Send Point` → gửi điểm tới học sinh  
    * Sau khi gửi, nút `Give Point` xuất hiện lại nhưng **bị disable**

TH2: Essay

* Hiển thị:  
  * Câu hỏi  
  * Bảng kết quả với các cột:  
    * **Name**  
    * **Đáp án học sinh** (hiển thị trực tiếp)  
    * **Sao đánh giá**: mặc định 5 sao  
    * **Point**  
    * **Status**  
    * **Check**:  
      * Nút `Check Grammar` → gửi API kiểm tra ngữ pháp AI  
      * Hiển thị kết quả sửa lỗi bên dưới đáp án học sinh  
    * **Actions**:  
      * Như TH1: `Give Point` → `Send Point`  
* Button toàn bảng: `Send Grammar Check to All`  
   → Gửi kết quả grammar check của AI cho toàn bộ học sinh.  
* *Lưu ý:* Ngay khi học sinh nộp bài Essay, hệ thống **tự động gửi** API kiểm tra ngữ pháp.

TH3: Speaking

* Hiển thị:  
  * Câu hỏi  
  * Bảng kết quả với các cột:  
    * **Name**  
    * **Đáp án học sinh**:  
      * Audio file (play được)  
      * Text transcript (tự động chuyển từ giọng nói sang văn bản)  
    * **Sao đánh giá**: mặc định 5 sao  
    * **Point**  
    * **Status**  
    * **Check**:  
      * Nút `Check Pronunciation` → gửi API kiểm tra phát âm AI  
      * Kết quả hiển thị so sánh AI vs transcript  
    * **Actions**:  
      * Như TH1: `Give Point` → `Send Point`  
* Button toàn bảng: `Send Pronunciation to All` → Gửi toàn bộ kết quả đánh giá phát âm cho học sinh.  
* *Lưu ý:* Ngay khi học sinh nộp bài Speaking, hệ thống **tự động gửi** API kiểm tra phát âm.

**Với vai trò LEARNER**

* Khi nhận câu hỏi từ giáo viên: `emit('RECEIVE_QUESTION')`  
   → Hiển thị Modal nhập đáp án tương ứng loại câu hỏi  
* Sau khi học sinh trả lời:  
  * Bấm `Gửi`, thực hiện:  
    * `emit('SEND_ANSWER', { userId, answer })`  
    * Trạng thái chuyển sang “Đã nộp”  
* Giáo viên sẽ nhận được qua:  
  * `emit('RECEIVE_ANSWER')`  
  * Hệ thống cập nhật danh sách nộp theo thời gian thực

### **4.4. Tool**

* Nằm trong thanh công cụ dưới cùng, biểu tượng "Tool".  
* Khi nhấn vào sẽ mở ra menu dạng popup chứa các lựa chọn:  
  * **Draw**  
  * **Transfer file**  
  * **Watch**

##### **4.4.1 Draw (Vẽ)**

**Vị trí giao diện**

* Nút **Draw (Vẽ)** hiển thị trong **nhóm Tool** trên **thanh công cụ chính**, cùng hàng với các nút như **Mic**, **Camera**,…  
* Khi người dùng (giáo viên hoặc học sinh được cấp quyền) click vào nút **Draw**, một **bảng công cụ vẽ** sẽ hiển thị trên màn hình.

**Bảng công cụ vẽ bao gồm các thành phần sau:**

* Công cụ bút vẽ: nét mảnh, nét đậm  
* Màu vẽ (color picker)  
* Kích thước nét vẽ  
* Vẽ hình khối: hình chữ nhật, hình tròn, mũi tên...  
* Text (viết chữ)  
* Công cụ **Undo**, **Redo**  
* Công cụ **Xóa nét**, **Xóa toàn bộ**

Lưu ý: Các công cụ này giống nhau cho cả giáo viên và học sinh (nếu được cấp quyền)

**Phân quyền vẽ**

* Mặc định:  
  * **Chỉ giáo viên** có quyền vẽ khi vào lớp.  
  * **Học sinh không có quyền vẽ**.  
* Giáo viên có thể bật/tắt quyền vẽ cho từng học sinh hoặc cho tất cả học sinh thông qua tab **Participants \> List**, thao tác cấp quyền sẽ:  
  * Gửi signal `grantDrawPermission`  
  * Giao diện học sinh sẽ hiện thêm nút Draw \+ bảng công cụ

**Cơ chế hoạt động & đồng bộ**

* Mỗi hành động vẽ (vẽ nét, xóa, thêm text, undo, redo, clear…) sẽ được tạo thành một **objectLog**.  
* **ObjectLog được gửi lên server và broadcast tới các client khác** để đồng bộ nét vẽ tức thời.  
* Đồng thời, các objectLog này cũng được lưu thành một **stack undo/redo riêng cho từng người dùng**.

Đồng bộ khi reconnect / vào lớp sau

* Khi người dùng (học sinh hoặc giáo viên) **vào lớp muộn** hoặc **bị mất mạng và reconnect**:  
  * Hệ thống sẽ **tự động gửi lại toàn bộ objectLog hiện tại** để vẽ lại toàn bộ nội dung đã vẽ từ trước.  
  * Các nét vẽ sẽ được render lại tuần tự đúng theo thứ tự thời gian gốc.

Một số lưu ý kỹ thuật

* Tất cả hành động vẽ phải có timestamp để đảm bảo thứ tự đúng khi render lại.  
* Nếu giáo viên clear toàn bộ bảng (clear all), objectLog cũng sẽ bị reset tương ứng trên tất cả client.  
* Nếu học sinh thoát khỏi lớp và vào lại, quyền vẽ sẽ mặc định bị tắt lại (trừ khi giáo viên cấp lại quyền).

##### 4.4.2. Transfer Files

1\. Đối tượng sử dụng

* Chức năng này **chỉ dành cho giáo viên** trong lớp học trực tuyến.

2\. Vị trí giao diện

* Nút **“Transfer Files”** nằm trong thanh công cụ chính của LiveRoom (gần các nút Chat, Share Screen, Exercise, etc.).

3\. Luồng hoạt động

Giáo viên gửi file cho học sinh

1. Giáo viên nhấn nút **Transfer Files** ➝ emit sự kiện `OPEN_MODAL_TRANSFER_FILE`.  
2. Mở **modal Transfer File**, bao gồm:  
   * **Khu vực chọn file** từ máy tính cá nhân.  
   * **Danh sách học sinh trong lớp**, cho phép tích chọn học sinh muốn gửi file đến.  
   * **Nút xác nhận (Confirm)** và **Huỷ (Cancel)**.  
3. Giao diện chọn học sinh:  
   * Sử dụng API `Get Participants` để lấy danh sách toàn bộ học sinh đang tham gia lớp học.  
   * Có thể **lọc theo trạng thái online** để dễ dàng tìm học sinh đang hoạt động.  
   * Có thể **chọn từng học sinh**, **chọn tất cả**, hoặc **bỏ chọn** tuỳ ý.  
4. Chọn file:  
   * Khi nhấn **“Chọn file”** ➝ gọi hành động `Trigger FileUpload`.  
   * Các file được chọn sẽ hiển thị danh sách ngay trong modal, với tên file và dung lượng.  
   * Có thể xóa file bằng cách nhấn dấu **(X)** ở từng dòng file.  
5. Nhấn **Confirm**:  
   * Gửi emit `ADD_UPLOAD_QUEUE` kèm theo danh sách file và danh sách userId học sinh đã chọn.  
   * Hệ thống thực hiện tải file lên **kho lưu trữ (Storage)**, sau đó học sinh có thể tải về.

4\. Hành vi trên giao diện học sinh

* Các file được chia sẻ bởi giáo viên sẽ được hiển thị trong **tab Files**, nằm trong **modal ChatBox**.  
* Mỗi file đi kèm:  
  * Tên file, dung lượng  
  * Nút **Download** để học sinh tải file về.

5\. Luồng socket

emit(`OPEN_MODAL_TRANSFER_FILE`)

* Mở giao diện chọn file và danh sách học sinh.

TriggerFileUpload

* Gọi hành động chọn file từ máy cá nhân.  
  emit(`ADD_UPLOAD_QUEUE`)  
  `{`  
    `"files": [`  
      `{`  
        `"name": "Homework.pdf",`  
        `"size": 120000,`  
        `"type": "application/pdf",`  
        `"tempUrl": "https://..."`  
      `}`  
    `],`  
    `"targets": ["userId1", "userId2", ...]`  
  `}`  
  emit(`RECEIVE_TRANSFER_FILE`)  
* Học sinh được nhận file sẽ thấy trong giao diện tab **Files** kèm link download.

6\. Quy tắc xử lý

* Không giới hạn số lượng file gửi một lần, nhưng nên giới hạn dung lượng tối đa mỗi file theo cấu hình hệ thống (ví dụ: 100MB).  
* Giáo viên có thể gửi file **cho một, nhiều hoặc tất cả học sinh**.  
* File đã gửi **không thể thu hồi**, nhưng có thể được thay thế bằng một file mới.

### **4.2 Microphone**

4.2.1. Vị trí giao diện

* **Biểu tượng micro** nằm ở thanh công cụ dưới cùng (footer) của phòng học.  
* Mic có 2 trạng thái hiển thị:  
  * **Mic bật**: icon micro rõ ràng, không gạch chéo.  
  * **Mic tắt**: icon micro bị gạch chéo.

4.2.2. Luồng hoạt động

**a. Người dùng tự bật/tắt micro**

* Khi người dùng (GV hoặc HS) nhấn vào nút microphone:  
  * Gửi sự kiện: `emit('TOGGLE_STREAM_AUDIO')`.  
  * Kiểm tra thiết bị:  
    * Nếu **không có thiết bị micro** ➝ hiển thị cảnh báo: `"Không phát hiện micro. Vui lòng kiểm tra kết nối."`  
    * Nếu **có thiết bị** ➝ chọn thiết bị mặc định ➝ gửi cấu hình `configure { muted: true/false }` đến Janus.

**b. Khi bắt đầu truyền âm thanh (publish):**

* Janus phản hồi với `publisherId`.  
* Lắng nghe phản hồi từ Janus qua `onmessage → handleVideoOnMessageEvent(msg, jsep)`:  
  * `"joined"`: tham gia thành công, nhận luồng.  
  * `"talking"`: người dùng đang nói.  
  * `"stop-talking"`: người dùng ngừng nói.

**c. Khi người dùng nói / ngừng nói:**

* Tự động phát sinh sự kiện `"talking"` và `"stop-talking"` từ Janus.  
* Dùng các sự kiện này để:  
  * Đổi màu hoặc hiệu ứng icon mic (ví dụ: sáng lên).  
  * Hiển thị hiệu ứng sóng âm hoặc khung viền trong danh sách người tham gia.

4.2.3. Quyền điều khiển Micro

**Đối với Giáo viên:**

* Có thể **bật/tắt mic của từng học sinh** từ tab **Participants hoặc Class Map**.  
* Có thể **tắt tất cả mic học sinh** bằng một thao tác tổng ở tab **Participants hoặc Class Map**.  
* Khi tắt mic học sinh:  
  * Gửi `configure { muted: true }` đến Janus.  
  * Học sinh nhận được thông báo: `"Micro của bạn đã bị tắt bởi giáo viên."`  
* Giáo viên **có thể cưỡng chế học sinh bật mic**.

**Đối với Học sinh:**

* Chỉ có thể điều khiển mic của chính mình.  
* Nếu bị tắt bởi giáo viên, học sinh **có thể bật lại thủ công**.

4.2.4. Trạng thái & Hiển thị

* **Mic tắt**: `muted: true` ➝ icon mic bị gạch chéo.  
* **Mic bật**: `muted: false` ➝ icon hiển thị bình thường.  
* **Mic đang nói**: icon mic sáng màu hoặc có hiệu ứng ở tab **Participants**.  
* Trạng thái "đang nói" được hiển thị:  
  * Trên khung video cá nhân.  
  * Trong danh sách người tham gia (Participants).

4.2.5. Xử lý khi mất mạng và reconnect

* Khi người dùng reconnect:  
  * Trạng thái `muted` được khôi phục từ phía client.  
  * Người dùng cần **tự bật lại mic** nếu muốn tiếp tục sử dụng.

### **4.3 Camera**

4.3.1. Vị trí giao diện

* Biểu tượng **Camera** nằm ở thanh công cụ (footer) dưới cùng của phòng học.  
* Có 2 trạng thái hiển thị:  
  * **Camera bật**: icon camera sáng, không gạch chéo.  
  * **Camera tắt**: icon camera bị gạch chéo.

4.3.2. Luồng hoạt động

**a. Người dùng bật/tắt camera của chính mình**

* Khi người dùng nhấn vào nút camera:  
  * Gửi sự kiện `emit('TOGGLE_STREAM_VIDEO')`.  
  * Hệ thống kiểm tra thiết bị:  
    * Nếu **không có thiết bị camera** ➝ hiển thị cảnh báo: `"Không phát hiện camera. Vui lòng kiểm tra kết nối."`  
    * Nếu có ➝ chọn thiết bị mặc định (`camera default`) ➝ gọi `janus.publishOwnFeed` để publish video.  
* Janus phản hồi `publisherId` nếu publish thành công.

**b. Xử lý phản hồi từ Janus**

* Lắng nghe các phản hồi qua `onmessage → handleVideoOnMessageEvent(msg, jsep)`:  
  * `"joined"`: người dùng vừa vào phòng.  
  * `"publish"`: người dùng vừa bật camera.  
  * `"unpublish"`: người dùng vừa tắt camera.  
* Với sự kiện `"publish"`:  
  * Thực hiện `handleVideoRoomPublishMsg()` để **subcribe video feed** của người mới bật cam.  
* Với sự kiện `"joined"`:  
  Khi người dùng vào phòng, hệ thống tự động **subcribe camera của các thành viên đang bật**.  
* Với `"unpublish"`:  
  * Gọi `stopFacecam()` để dừng camera của người vừa tắt.  
  * Các thành viên khác cũng **unsubcribe camera** của thành viên đó.

4.3.3. Quyền điều khiển Camera

**Giáo viên:**

* Có thể:  
  * **Bật/Tắt camera của từng học sinh**  
  * **Tắt camera của tất cả học sinh** cùng lúc  
* Khi giáo viên tắt camera học sinh:  
  * Gửi lệnh `configure { video: false }` hoặc gọi logic tương đương phía client để tắt camera của người đó.  
  * Học sinh **có thể bật lại camera thủ công** sau đó.

**Học sinh:**

* Có thể bật/tắt camera của chính mình.  
* Nếu bị giáo viên tắt, vẫn có quyền tự bật lại.

4.3.4. Trạng thái & Hiển thị

* **Camera tắt**: icon gạch chéo.  
* **Camera bật**: hiển thị video trong khung người dùng.  
* Người dùng nào đang bật camera sẽ hiển thị trong danh sách participants có icon camera.  
* Trong danh sách người dùng:  
  * Có thể hiển thị thumbnail preview hoặc icon chỉ trạng thái (bật/tắt camera).

4.3.5. Xử lý khi mất mạng và reconnect

* Khi người dùng reconnect lại sau khi mất mạng:  
  * Trạng thái camera không được tự bật lại ➝ người dùng cần **bật lại thủ công**.  
  * Các thành viên khác **chỉ subcribe camera** nếu người dùng thực hiện bật lại.

### **4.4 Tính năng: Draw (Vẽ)**

4.4.1 Vị trí giao diện

* Nút **Draw (Vẽ)** hiển thị trong **nhóm Tool** trên **thanh công cụ chính**, cùng hàng với các nút như **Mic**, **Camera**,…  
* Khi người dùng (giáo viên hoặc học sinh được cấp quyền) click vào nút **Draw**, một **bảng công cụ vẽ** sẽ hiển thị trên màn hình.

4.4.2 Các công cụ vẽ

Bảng công cụ vẽ bao gồm các thành phần sau:

* Công cụ bút vẽ: nét mảnh, nét đậm  
* Màu vẽ (color picker)  
* Kích thước nét vẽ  
* Vẽ hình khối: hình chữ nhật, hình tròn, mũi tên...  
* Text (viết chữ)  
* Công cụ **Undo**, **Redo**  
* Công cụ **Xóa nét**, **Xóa toàn bộ**

Lưu ý: Các công cụ này giống nhau cho cả giáo viên và học sinh (nếu được cấp quyền)

4.4.3 Phân quyền vẽ

* Mặc định:  
  * **Chỉ giáo viên** có quyền vẽ khi vào lớp.  
  * **Học sinh không có quyền vẽ**.  
* Giáo viên có thể bật/tắt quyền vẽ cho từng học sinh hoặc cho tất cả học sinh thông qua tab **Participants \> List**, thao tác cấp quyền sẽ:  
  * Gửi signal `grantDrawPermission`  
  * Giao diện học sinh sẽ hiện thêm nút Draw \+ bảng công cụ

4.4.4 Cơ chế hoạt động & đồng bộ

* Mỗi hành động vẽ (vẽ nét, xóa, thêm text, undo, redo, clear…) sẽ được tạo thành một **objectLog**.  
* **ObjectLog được gửi lên server và broadcast tới các client khác** để đồng bộ nét vẽ tức thời.  
* Đồng thời, các objectLog này cũng được lưu thành một **stack undo/redo riêng cho từng người dùng**.

4.4.5 Đồng bộ khi reconnect / vào lớp sau

* Khi người dùng (học sinh hoặc giáo viên) **vào lớp muộn** hoặc **bị mất mạng và reconnect**:  
  * Hệ thống sẽ **tự động gửi lại toàn bộ objectLog hiện tại** để vẽ lại toàn bộ nội dung đã vẽ từ trước.  
  * Các nét vẽ sẽ được render lại tuần tự đúng theo thứ tự thời gian gốc.

4.4.6 Một số lưu ý kỹ thuật

* Tất cả hành động vẽ phải có timestamp để đảm bảo thứ tự đúng khi render lại.  
* Nếu giáo viên clear toàn bộ bảng (clear all), objectLog cũng sẽ bị reset tương ứng trên tất cả client.  
* Nếu học sinh thoát khỏi lớp và vào lại, quyền vẽ sẽ mặc định bị tắt lại (trừ khi giáo viên cấp lại quyền).

