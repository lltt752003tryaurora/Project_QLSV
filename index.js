/*
Thực hiện các chức năng quản lí sinh viên
-Tạo ra một array sinh viên giúp lưu trữ các đối tượng sinh viên từ người dùng tạo ra
*/

//Thêm sinh viên
/*
B1: lấy tất cả các thông tin của user nhập vào
B2: tạo ra một đối tượng có từ lớp đối tượng được định nghĩa và gán các giá trị user nhập đối tượng đó
B3: dùng mảng tạo ra bên trên để push đối tượng vào và lưu trữ
B4: hiển thị dữ liêụ ra cho user
*/

var arrSinhVien = [];
//mảng arrInput để hỗ trợ kĩ thuật PUSH DATA vào vòng lặp => truy xuất lấy giá trị nhanh hơn
//có thể truy xuất giá trị thuộc tính của 1 object như sau:  sinhvien["txtMaSV"]
var arrInput = [
  "txtMaSV",
  "txtTenSV",
  "txtEmail",
  "txtPass",
  "txtNgaySinh",
  "khSV",
  "txtDiemToan",
  "txtDiemLy",
  "txtDiemHoa",
];

var arrNoti = [
  "notiMaSV",
  "notiTenSV",
  "notiEmail",
  "notiPass",
  "notiNgaySinh",
  "notiKhoaHoc",
  "notiDiemToan",
  "notiDiemLy",
  "notiDiemHoa",
];

function themSinhVien() {
  // lấy dữ liệu từ người dùng
  // ngăn chặn sự kiện reload của trang khi bấm vào button
  event.preventDefault();
  var sv = new SinhVien();
  var valid = true;
  // &= sẽ check hết tất cả các điều kiện nếu true thì mới trả về true
  // valid &=
  //   checkInputRong("txtMaSV", "notiMaSV") &
  //   checkInputRong("txtTenSV", "notiMaSV") &
  //   checkInputRong("txtEmail", "notiEmail") &
  //   checkInputRong("txtPass", "notiPass") &
  //   checkInputRong("txtNgaySinh", "notiNgaySinh") &
  //   checkInputRong("khSV", "notiKhoaHoc") &
  //   checkInputRong("txtDiemToan", "notiDiemToan") &
  //   checkInputRong("txtDiemLy", "notiDiemLy") &
  //   checkInputRong("txtDiemHoa", "notiDiemHoa");

  // KĨ THUẬT PUSH DATA VÀO DÙNG VÒNG LẶP
  for (var i = 0; i < arrInput.length; i++) {
    valid &= checkInputRong(arrInput[i], arrNoti[i]);
    // lấy giá trị của từng ô input
    var giaTri = document.getElementById(arrInput[i]).value;
    // gán giá trị cho từng phần tử trong mảng sv bằng cách gọi sv["tên thuộc tính"]
    sv[arrInput[i]] = giaTri;
  }

  valid &=
    checkDinhDangEmail("txtEmail", "notiEmail") &
    checkDinhDangDiem("txtDiemToan", "notiDiemToan") &
    checkDinhDangDiem("txtDiemLy", "notiDiemLy") &
    checkDinhDangDiem("txtDiemHoa", "notiDiemHoa");

  if (valid == true) {
    arrSinhVien.push(sv);
    // console.log(arrSinhVien);
    renderSinhVien();
    // làm trắng ô nhập data sau khi nhập và render xong
    document.getElementById("formSinhVien").reset();
    luuLocal();
  }
}

document.getElementById("btnThemSV").onclick = themSinhVien;

// mỗi lần mảng được cập nhật data sinh viên: xóa data, thêm data, lấy data lên,... thì ta cần gọi hàm renderSinhVien ra để hiển thị cho người dùng
function renderSinhVien() {
  var content = "";
  for (var i = 0; i < arrSinhVien.length; i++) {
    var sVien = arrSinhVien[i];
    var new_SV_LayPT = new SinhVien();
    // lấy dữ liệu thuộc tính của sVien để truyền vào cho new_SV_LayPT (vì sVien có dữ liệu THUỘC TÍNH đang được lưu trữ nhưng phương thức thì ko)
    Object.assign(new_SV_LayPT, sVien);
    // console.log(sVien);
    // console.log(new_SV_LayPT);
    content += `
    <tr>
      <td>${new_SV_LayPT.txtMaSV}</td>
      <td>${new_SV_LayPT.txtTenSV}</td>
      <td>${new_SV_LayPT.txtEmail}</td>
      <td>${new_SV_LayPT.txtNgaySinh}</td>
      <td>${new_SV_LayPT.khSV}</td>
      <td>${new_SV_LayPT.tinhDiemTB()}</td>
      <td>
      <button onclick="xoaSinhVien(${
        new_SV_LayPT.txtMaSV
      })" class="btn btn-danger">Xóa</button>
      <button onclick="layThongTinSinhVien(${
        new_SV_LayPT.txtMaSV
      })" class="btn btn-warning">Sửa</button>
      </td> 
    </tr>
    `;
  }
  document.getElementById("tbodySinhVien").innerHTML = content;
}

function xoaSinhVien(maSV) {
  /*Khi xóa cần xác định một thuộc tính có giá trị giống như một mã định danh, là đặc trưng và không thể bị trùng
  Khi tìm được sẽ dùng giá trị đó để chạy vòng lặp qua tất cả các phần tử và tìm xem đối tượng là ai nằm ở đâu
  splice sẽ giúp xóa phần tử trong mảng 
  */
  var index = -1;
  for (var i = 0; i < arrSinhVien.length; i++) {
    var sinhVien = arrSinhVien[i];
    if (sinhVien.txtMaSV == maSV) {
      index = i;
    }
  }
  // Xóa phần tử đó ra khỏi mảng
  arrSinhVien.splice(index, 1);
  console.log(arrSinhVien);
  // mảng có 3 phần tử --> render lên giao diện -> xóa đi 1 phần tử thì mảng có 2 phần tử -> phải render lại để giao diện được cập nhật
  // mặc dù xóa thì mảng vẫn đã được xóa đi 1 phần tử nhưng phải render lại để chạy lại hiện ra giao diện
  renderSinhVien();
  luuLocal();
}

// document.getElementById("").onclick = ;
// document.getElementById("").addEventListener("click", function() {})

// // LOCAL STORAGE
// /*
// Phương thức: setItem
// -setItem có 2 tham số: tham số đầu là key, tham số thứ 2 là giá trị cần lưu trữ
// Phương thức: getItem
// -getItem có 1 tham số: chính là key muốn lấy ra
// -removeItem có 1 tham số: truyền vào 1 key để xóa
// */
// localStorage.setItem("Họ tên","Lê Long Trường Thịnh")
// localStorage.setItem("Năm sinh",2003)

// /*có thể truyền dữ liệu number, string nhưng nếu giá trị thứ 2 là 1 object hoặc mảng thì ko thể lưu trữ được, nên trước khi truyền phải dùng phương
// thức JSON.stringify để chuyển đổi về kiểu chuỗi json mới có thể lưu. Lúc này, giá trị sẽ có kiểu dữ liệu là chuỗi(json) chứ ko phải là object(hay mảng) nữa
// +Khi đó, muốn chuyển về kiểu dữ liệu object(hay mảng) thì dùng JSPON.parse
// +Khi getItem một key không có trong local sẽ trả về null
// */
// var thongTinkhac = {
//   MSSV: 21120139,
//   School: "HCMUS"
// }
// localStorage.setItem("Thông tin khác",JSON.stringify(thongTinkhac))

// var data_local = localStorage.getItem("Thông tin khác")
// console.log(JSON.parse(data_local));

// localStorage.removeItem("Họ tên")

function luuLocal() {
  //lấy mảng arrSinhVien lưu xuống localStorage
  localStorage.setItem("arrSinhVien", JSON.stringify(arrSinhVien));
}

function layLocalHienThi() {
  //Phương thức getItem để lấy dữ liệu từ dưới local lên trên, dùng JSON.parse để chuyển đổi JSON đang có thành object(hay array)
  // Đầu tiên, cho biến giá trị để hứng data từ local về
  var data = localStorage.getItem("arrSinhVien");
  console.log(data);
  // nếu user lần đầu dùng thì arrSinhVien = null
  // do đó cần phải check điều kiện phải có dữ liệu mới gán vào array
  if (data != null) {
    arrSinhVien = JSON.parse(data);
    // render lên giao diện để reload trang tránh bị mất data
    renderSinhVien();
  }
}

//để ở ngoài do khi user bấm reload lại trang thì ta cần phải lấy dữ liệu đã được lưu ở localStorage lên lại để hiển thị user (tránh bị mất data)
layLocalHienThi();

// LƯU Ý !!!
/*
localStorage chỉ lưu những thuộc tính chứ không lưu những phương thức trong lớp đối tượng
-bài trên lúc đầu gặp lỗi, vì khi ta lưu trữ các object sinh viên xuống local storage thì lúc đó CHỈ lưu trữ những THUỘC TÍNH (ko lưu trữ phương thức)
có trong object đó thôi. Sau đó, ta gọi renderSinhVien thì nó chạy vẫn oke cho đến khi đến phần phương thức (tinhdiemTB)
=> Cách khắc phục: tạo 1 đối tượng new_SV_LayPT (để lấy giá trị ở PHƯƠNG THỨC) còn các dữ liệu THUỘC TÍNH sẽ lấy từ dữ liệu của sinhVien(ban đầu )
*/

//SỬA SINH VIÊN
/*
Đầu tiên sửa sinh viên cần dùng gì để xác định được sinh viên đó
Khi lấy được sinh viên, làm gì để người dùng có thể chỉnh sửa và nhập nội dung mới

*/

function layThongTinSinhVien(maSV) {
  // gọi object rỗng
  var sinhVien = {};
  for (var i = 0; i < arrSinhVien.length; i++) {
    // check maSV cần tìm
    if (arrSinhVien[i].txtMaSV == maSV) {
      sinhVien = arrSinhVien[i];
    }
  }
  // sau khi tìm được sinhVien, ta sẽ chạy một vòng lặp để đưa hết tất cả các giá trị trong thuộc tính của sinhVien lên bên trên input cho người dùng chỉnh sửa
  for (var j = 0; j < arrInput.length; j++) {
    document.getElementById(arrInput[j]).value = sinhVien[arrInput[j]];
  }
  //Xử lý cho input mã sinh viên chỉ được đọc không được chỉnh sửa (vì MaSV như là 1 khóa chính không được trùng lắp để định danh một sinh viên)
  document.getElementById("txtMaSV").readOnly = true;
  document.getElementById("btnCapNhat").style.display = "inline-block";
}

function CapNhatThongTinSinhVien() {
  //lấy dữ liệu mới từ người dùng
  event.preventDefault();
  var sinhVien = new SinhVien();
  for (var i = 0; i < arrInput.length; i++) {
    var valueInput = document.getElementById(arrInput[i]).value;
    sinhVien[arrInput[i]] = valueInput;
  }
  // tìm lại vị trí của object cũ đang nằm trong arrSinhVien bằng mã SV
  // Tìm lại bởi vì sau khi lấy được dữ liệu mới từ user thì ta phải thay thế data mới đó cho data cũ nên cần phải biết vị trí của object cũ
  var index = -1;
  for (var i = 0; i < arrSinhVien.length; i++) {
    if (arrSinhVien[i].txtMaSV == sinhVien.txtMaSV) {
      index = i;
    }
  }
  arrSinhVien[index] = sinhVien;
  //clear đang hiển thị ở ô input
  document.getElementById("formSinhVien").reset();
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("txtMaSV").readOnly = false;
  renderSinhVien();
  luuLocal();
}

document.getElementById("btnCapNhat").onclick = CapNhatThongTinSinhVien;
