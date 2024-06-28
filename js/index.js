let arrNhanVien = getLocalStorage();
renderNhanVien();
function getValueNhanVien() {
    let arrField = document.querySelectorAll(".modal-body input, .modal-body select");
    let nhanVien = new NhanVien();
    for (let field of arrField) {
        let { id, value } = field;
        nhanVien[id] = value;
    }
    return nhanVien;
}

function renderNhanVien(arr = arrNhanVien) {
    let string = "";
    for (nhanVien of arr) {
        let newNhanVien = new NhanVien();
        Object.assign(newNhanVien, nhanVien);
        let { tknv, name, email, password, datepicker, chucvu, gioLam } = newNhanVien;
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
    <button class="btn btn-outline-secondary my-2" data-target="#myModal" data-toggle="modal" onclick="getInfoNhanVien('${tknv}')">Sửa</button>
    <button class="btn btn-outline-danger my-2" onclick="deleteNhanVien('${tknv}')">Xóa</button>
    </td>
</tr>
        `
    }
    document.getElementById("tableDanhSach").innerHTML = string;
}

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


document.getElementById("btnThemNV").onclick = function () {
    let nhanVien = getValueNhanVien();
    if (!nhanVien) { return; }
    arrNhanVien.push(getValueNhanVien());
    renderNhanVien();
    hienThiThongBao("Thêm nhân viên thành công", 2000, "bg-success");
    saveLocalStorage();
    console.log(arrNhanVien);
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
            field.readOnly = true;
        }
    }
}

