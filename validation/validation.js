/*
Validation (Kiểm tra dữ liệu đầu vào) cho sinh viên
- Không để trống trường nhập
- Check định dạng email
*/

function checkInputRong(idInput, idNoti) {
  //gọi dom tới và check xem dữ liệu có rỗng không, nếu rỗng sễ xuất ra câu thông báo và chặn user thêm SV
  var valInput = document.getElementById(idInput).value;
  if (valInput == "") {
    document.getElementById(idNoti).innerHTML = "Vui lòng không để trống.";
    return false;
  } else {
    document.getElementById(idNoti).innerHTML = "";
    return true;
  }
}

function checkDinhDangEmail(idInput, idNoti) {
  // Viết một Regrex để kiểm tra email
  var RegrexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var valueInput = document.getElementById(idInput).value;
  // 2 cách giúp check regrex
  // sử dụng regrex.test sẽ trả về 2 kết quả nếu dữ liệu phù hợp với regrex sẽ trả về true và ngược lại
  if (RegrexEmail.test(valueInput) == false && valueInput != "") {
    document.getElementById(idNoti).innerHTML = "Không đúng định dạng email.";
    return false;
  } else if (RegrexEmail.test(valueInput) == true && valueInput != "") {
    document.getElementById(idNoti).innerHTML = "";
    return true;
  }
}

function checkDinhDangDiem(idInput, idNoti) {
  //regrex Express cho những số float
  var regexNumber = /^-?[0-9]+(\.[0-9]+)?$/;
  var valueInput = document.getElementById(idInput).value;
  // match sẽ trả về null hoặc mảng
  if (!valueInput.match(regexNumber) && valueInput != "") {
    document.getElementById(idNoti).innerHTML =
      "Vui lòng nhập đúng định dạng điểm.";
    return false;
  } else if (valueInput.match(regexNumber) && valueInput != "") {
    //check thêm số từ 0->10 (dữ liệu lúc này là number)
    if (valueInput >= 0 && valueInput <= 10) {
      document.getElementById(idNoti).innerHTML = "";
      return true;
    } else {
      document.getElementById(idNoti).innerHTML = "Điểm phải từ 0 đến 10.";
      return false;
    }
  }
}
