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
    let doDaiKyTu = value.length;
    if (doDaiKyTu >= min && doDaiKyTu <= max) {
        span = "";
        return true;
    }
    else {
        span.innerHTML = `Vui lòng nhập tối thiểu ${min} ký tự và tối đa ${max} ký tự`
        return false;
    }
}

function checkEmailValue(value, span) {
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

function checkDateTime(value, span) {
    let regexDatetime = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    let isValid = regexDatetime.test(value);
    if (isValid) {
        span.innerHTML = "";
        return true;
    }
    else {
        span.innerHTML = "Vui lòng nhập đúng định dạng mm/dd/yyyy";
        return false;
    }

}


function checkHoTen(value, span) {
    let regexHoTen = /^[a-zA-Z\s]+$/;

    let isValid = regexHoTen.test(value);
    if (isValid) {
        span.innerHTML = "";
        return true;
    }
    else {
        span.innerHTML = "Họ Tên phải là chữ, không bao gồm số, symbol :(("
        return false;
    }
}


function checkPassWord(value, span) {
    let regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    let isValid = regexPass.test(value);
    if (isValid) {
        span.innerHTML = "";
        return true;
    }
    else {
        span.innerHTML = "Mật khẩu tối thiểu 6-10 ký tự, chứa ít nhất 1 chữ số, 1 chữ in hoa và 1 ký tự đặc biệt"
        return false;
    }
}


function checkMucLuongToiThieu(value, span, min, max) {
    if (value >= min && value <= max) {
        span = "";
        return true;
    }
    else {
        let newMin = min.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
        });
        let newMax = max.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
        });
        span.innerHTML = `Vui lòng nhập mức lương tối thiểu ${newMin} và tối đa ${newMax} `
        return false;
    }
}

function checkGioLam(value, span, min, max) {
    if (value >= min && value <= max) {
        span = "";
        return true;
    }
    else {
        span.innerHTML = `Vui lòng nhập tối thiểu ${min} giờ và tối đa ${max} giờ `
        return false;
    }
}


