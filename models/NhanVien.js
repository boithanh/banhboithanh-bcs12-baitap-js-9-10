class NhanVien {
    tknv = "";
    name = "";
    email = "";
    password = "";
    datepicker = "";
    luongCB = "";
    chucvu = "";
    gioLam = "";
    tongLuong = function () {
        let cV = this.chucvu;
        let lCB = this.luongCB;
        switch (cV) {
            case "Giám Đốc": {
                return lCB * 3;
            }
            case "Trưởng Phòng": {
                return lCB * 2;
            }
            default: {
                return lCB * 1;
            }
        }
    }
    xepLoai = function () {
        let gL = this.gioLam;
        if (gL >= 192) {
            return "Xuất Sắc";
        }
        else if (gL >= 176 && gL < 192) {
            return "Giỏi";
        }
        else if (gL >= 160 && gL < 176) {
            return "Khá";
        }
        else {
            return "Trung Bình";
        }
    }
}