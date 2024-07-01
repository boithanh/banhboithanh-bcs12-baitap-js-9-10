document.getElementById("btnThem").onclick = () => { $('#modalNhanVien').modal('show') };
document.getElementById("btnDong").onclick = () => { $('#modalNhanVien').modal('hide') };

let formQLNV = document.getElementById("QLNV");
let arrNhanVien = getLocalStorage();
renderNhanVien();


function hienThiThongBao(text, duration, className) {
    Toastify({
        text,
        className,
        duration,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        backgroundColor: "orange",
    }).showToast();
}


function getValueNhanVien() {
    let arrField = document.querySelectorAll(".modal-body input, .modal-body select");
    let nhanVien = new NhanVien();
    let isValid = true;
    for (let field of arrField) {
        let { id, value } = field;
        let dataValidation = field.getAttribute("data-validation");
        // console.log(dataValidation);
        nhanVien[id] = value;
        let theCha = field.parentElement;
        let theOngNoi = theCha.parentElement;
        let theSpanThongBao = theOngNoi.querySelector(".sp-thongbao");
        let isEmpty = checkEmptyValue(value, theSpanThongBao); // true false
        theSpanThongBao.style.display = "block";
        isValid &= isEmpty;
        // xử lí nếu dữ liệu rỗng thì sẽ không xử lí bất kỳ hành động nào bên dưới
        if (!isEmpty) {
            continue;
        }
        if (dataValidation == "ktTaiKhoan") {
            isValid &= checkMinMaxValue(value, theSpanThongBao, 4, 6);
        } else if (dataValidation == "ktEmail") {
            isValid &= checkEmailValue(value, theSpanThongBao);
        } else if (dataValidation == "ktNgayThang") {
            isValid &= checkDateTime(value, theSpanThongBao);
        } else if (dataValidation == "ktHoTen") {
            isValid &= checkHoTen(value, theSpanThongBao);
        } else if (dataValidation == "ktPW") {
            isValid &= checkPassWord(value, theSpanThongBao);
        } else if (dataValidation == "ktMucLuong") {
            isValid &= checkMucLuongToiThieu(value, theSpanThongBao, 1000000, 20000000);
        } else if (dataValidation == "ktGioLam") {
            isValid &= checkGioLam(value, theSpanThongBao, 80, 200);
        }
    }
    if (!isValid) {
        return;
    }
    return nhanVien;
}

function renderNhanVien(arr = arrNhanVien) {
    let string = "";
    for (nhanVien of arr) {
        let newNhanVien = new NhanVien();
        Object.assign(newNhanVien, nhanVien);
        let { tknv, name, email, datepicker, chucvu } = newNhanVien;
        let tongLuong = newNhanVien.tongLuong();
        let xepLoai = newNhanVien.xepLoai();
        string += `
        <tr>
	<td>${tknv}</td>
	<td>${name}</td>
	<td>${email}</td>
	<td>${datepicker}</td>
    <td>${chucvu}</td>
	<td>${tongLuong.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
        })}</td>
    <td>${xepLoai}</td>
	<td>
    <button class="btn btn-outline-secondary my-2" onclick="$('#modalNhanVien').modal('show');getInfoNhanVien('${tknv}')">Sửa</button>
    <button class="btn btn-outline-danger my-2" onclick="deleteNhanVien('${tknv}')">Xóa</button>
    </td>
</tr>
        `
    }
    document.getElementById("tableDanhSach").innerHTML = string;
}


formQLNV.onsubmit = function (event) {
    event.preventDefault();
    let nhanVien = getValueNhanVien();
    if (!nhanVien) { return; }
    arrNhanVien.push(nhanVien);
    renderNhanVien();
    hienThiThongBao("Thêm nhân viên thành công", 2000, "bg-success");
    saveLocalStorage();
    formQLNV.reset();
    // console.log(arrNhanVien);
}

document.getElementById("btnCapNhat").onclick = updateNhanVien;


document.getElementById("searchName").oninput = (event) => {
    let convertCustomString = removeVietnameseTones(event.target.value).trim().toLowerCase();
    // Kinh nghiệm xương máu: arrFilter chỉ áp dụng được cho 1 mảng bình thường, không dùng được với 1 lớp đối tượng => phải chạy trực tiếp object.asign bên trong fiter để lấy lại phương thức xếp loại từ đối tượng để sử dụng.
    let arrFilter = arrNhanVien.filter((item, index) => {
        let newNV = new NhanVien();
        Object.assign(newNV, item);
        // console.log(newNV);
        let newItemNameInArr = removeVietnameseTones(newNV.xepLoai()).trim().toLowerCase();
        return newItemNameInArr.includes(convertCustomString);
    });
    renderNhanVien(arrFilter);
}


function saveLocalStorage(key = "arrNhanvien", value = arrNhanVien) {
    let nhanVienJson = JSON.stringify(value);
    localStorage.setItem(key, nhanVienJson);
}


function getLocalStorage(key = "arrNhanvien") {
    let dataLocal = localStorage.getItem(key)
    let convertData = JSON.parse(dataLocal);
    return convertData ? convertData : [];
}

function deleteNhanVien(tKNV) {
    let index = arrNhanVien.findIndex((item, index) => {
        return item.tknv == tKNV;
    });
    if (index != -1) {
        arrNhanVien.splice(index, 1);
        renderNhanVien();
        hienThiThongBao("Xóa nhân viên thành công", 2000, "bg-danger");
        saveLocalStorage();
    }
}

function getInfoNhanVien(tKNV) {
    let nhanVien = arrNhanVien.find((item, index) => {
        let taiKhoanHienTai = item.tknv;
        let taiKhoanCanTim = taiKhoanHienTai == tKNV;
        return taiKhoanCanTim;
    });
    let arrField = document.querySelectorAll(".modal-body input, .modal-body select");
    for (let field of arrField) {
        let { id } = field;
        // console.log(field.id);
        field.value = nhanVien[id];
        if (id == "tknv") {
            field.disabled = true;
        }
    }
}

function updateNhanVien() {
    let nhanVien = getValueNhanVien();
    if (!nhanVien) {
        return;
    }
    let index = arrNhanVien.findIndex((item, index) => {
        return item.tknv == nhanVien.tknv;
    });
    if (index != 1) {
        arrNhanVien[index] = nhanVien;
    }
    renderNhanVien();
    let arrResult = document.querySelectorAll("#tableDanhSach tr");
    arrResult[index].style.border = "3px dashed #7A8CD7";
    // console.log(arrResult);
    hienThiThongBao("Cập nhật nhân viên thành công", 2000, "bg-warning");
    saveLocalStorage();
    document.getElementById("tknv").disabled = false;
    formQLNV.reset();
    $('#modalNhanVien').modal('hide');
}










