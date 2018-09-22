/*

*/
$(document).ready(function () {
    var dsKhoaHoc = new DanhSachKhoaHoc();
    var svKhoaHoc = new KhoaHocService();
    var svNguoiDung = new NguoiDungService();
    // gọi pt từ service thông qua api đã cài đặt lấy dữ liệu
    svKhoaHoc.LayDanhSachKhoaHoc()
        .done(function (DanhSachKhoaHoc) {
            dsKhoaHoc.MangKhoaHoc = DanhSachKhoaHoc;
            LoaiDanhSachKhoaHoc(dsKhoaHoc.MangKhoaHoc);
        }).fail(function (error) {
            console.log(error);
        });
    svNguoiDung.LayDanhSachNguoiDung().done(function (MangNguoiDung) {
        // Gọi Hàm load nội dung cho thẻ select
        console.log(MangNguoiDung);
        LoadDanhSachNguoiDung(MangNguoiDung);
    }).fail(function (error) {
        console.log(error);
    });
    function LoadDanhSachNguoiDung(MangNguoiDung) {
        var noiDungSelect = '';
        MangNguoiDung.map(function (nguoiDung, index) {
            if (nguoiDung.MaLoaiNguoiDung == "GV") {
                noiDungSelect += `
                    <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
                `;
            }
        });
        $('#NguoiTao').html(noiDungSelect);
    }
    function LoaiDanhSachKhoaHoc(MangKhoaHoc) {
        var noiDungTable = '';


        MangKhoaHoc.map(function (khoahoc, index) {
            var moTa = khoahoc.MoTa;
            if (khoahoc.MoTa != null) {
                khoahoc.MoTa.length >= 100 ? moTa = khoahoc.MoTa.substring(0, 100) : moTa = khoahoc.MoTa;
            }
            noiDungTable += `
                <tr>
                    <td></td>
                    <td>${khoahoc.MaKhoaHoc}</td>
                    <td>${khoahoc.TenKhoaHoc}</td>
                    <td>${moTa}</td>
                    <td><img src='${khoahoc.HinhAnh}' width="75" height="50"></td>
                    <td>${khoahoc.LuotXem}</td>
                    <td>${khoahoc.NguoiTao}</td>
                    <td><button class="btn btn-primary" id="btnSuaKhoaHoc" makhoahoc=${khoahoc.MaKhoaHoc} type="button">Chĩnh Sửa</button></td>
                </tr>
            
            `
        })
        $('#tblDanhSachKhoaHoc').html(noiDungTable);
    }
    //Thêm khóa học
    $("#btnThemKhoaHoc").click(function () {
        $("#btnModal").trigger('click');
        $(".modal-title").html('Thêm khóa học');
        var modalFooter = `
    <button class = "btn btn-success" id="btnThemKH">Lưu</button>
    <button class = "btn btn-danger" data-dismiss = "modal">Hủy Bỏ</button>
    `

        $('.modal-footer').html(modalFooter);

        //Clear dữ liệu
        $('.modal-body input').val('');
    })
    //Xử lý thêm khóa học vào server
    $("body").delegate("#btnThemKH", "click", function () {
        var khoahoc = new KhoaHoc();
        khoahoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoahoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        khoahoc.MoTa = $("#Mota").val();
        khoahoc.LuotXem = $("#Luotxem").val();
        khoahoc.NguoiTao = $("#NguoiTao").val();
        console.log(khoahoc);
        //Gọi service để post dữ liệu khóa học lên server
        svKhoaHoc.ThemKhoaHoc(khoahoc)
            .done(function (ketqua) {
                console.log(ketqua);
            })
            .fail(function (loi) {
                console.log(loi)
            });

        $(".close").trigger('click');
    })
    $("body").delegate("#btnSuaKhoaHoc", "click", function () {
        $("#btnModal").trigger('click');
        $(".modal-title").html('Sửa khóa học');
        var modalFooter = `
    <button class = "btn btn-success" id="btnSuaKH">Lưu</button>
    <button class = "btn btn-danger" data-dismiss = "modal">Xoa</button>
    `
    
        $('.modal-footer').html(modalFooter);
        var khoahoc = new KhoaHoc();
        var MaKhoaHoc = $(this).attr("makhoahoc");
        var khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(MaKhoaHoc);
        console.log(khoaHoc);
        if(khoaHoc != null) {
            $("#MaKhoaHoc").val(khoaHoc.MaKhoaHoc);
            $("#TenKhoaHoc").val(khoaHoc.TenKhoaHoc);
            $("#Mota").val( khoaHoc.MoTa);
            $("#Luotxem").val(khoaHoc.LuotXem);
            $("#NguoiTao").val(khoaHoc.NguoiTao);
        }
    })
    $("body").delegate("#btnSuaKH", "click", function () {
        var khoahoc = new KhoaHoc();
        khoahoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoahoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        khoahoc.MoTa = $("#Mota").val();
        khoahoc.LuotXem = $("#Luotxem").val();
        khoahoc.NguoiTao = $("#NguoiTao").val();
        console.log(khoahoc);
        //Gọi service để post dữ liệu khóa học lên server
        svKhoaHoc.ThemKhoaHoc(khoahoc)
            .done(function (ketqua) {
                console.log(ketqua);
            })
            .fail(function (loi) {
                console.log(loi)
            });

        $(".close").trigger('click');
        location.reload();
    })
})

//Xử lý thêm khóa học vào server

