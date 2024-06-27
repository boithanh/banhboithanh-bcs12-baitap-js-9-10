//Một thẻ thông báo
// Value dữ lieju người đăng nhập
function checkEmptyValue(value, span) {
    if (value) {
        // Xử lý khi dữ liệu được người dùng nhập vào
        //Tham số span đại diện cho một câu lệnh DOM tới thẻ span thông báo;
        span.innerHTML = "";
        return true;
    } else {
        // xử lý khi dữ liệu là chuỗi rỗng
        span.innerHTML = "Vui lòng không bỏ trống trường này";
        return false;
    }
}


function checkMinMaxValue(value, span, min, max) {
    let doDaiKyTu = value.length; //Cát tường
    if (doDaiKyTu >= min && doDaiKyTu <= max) {
        span = "";
        return true;
    }
    else {
        span.innerHTML = `Vui lòng nhập tối thiểu ${min} ký tự và tối đa ${max} ký tự`
        return false;
    }
}


function checkEmailValue(value) {
    let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Phương thức test ==> value ==> true | false
    let isValid = regexEmail.test(value);
    if (isValid) {
        // Đây là trường hợp khi dữ liệu người dùng là email và qua được phương thức test
        span.innerHTML = "";
        return true;
    }
    else {
        // Đây là trường hợp khi dữ liệu người dùng  không phải email
        span.innerHTML = "Vui lòng nhập đúng định dạng email";
        return false;
    }

}