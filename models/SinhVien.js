function SinhVien() {
    this.txtMaSV = '';
    this.txtTenSV = '';
    this.txtEmail = '';
    this.txtPass ='';
    this.txtNgaySinh = '';
    this.khSV = '';
    this.txtDiemToan = 0;
    this.txtDiemLy = 0;
    this.txtDiemHoa = 0;
    this.tinhDiemTB = function () {
        return (this.txtDiemToan * 1 + this.txtDiemLy * 1 + this.txtDiemHoa * 1) / 3;
    }
}