import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">
                <div className="footer__logo">
                  <a href="#">
                    <img src={require("../../assets/img/footer-logo.png")} alt />
                  </a>
                </div>
                <p>
                  Khách hàng là trung tâm của mô hình kinh doanh độc đáo của
                  chúng tôi, bao gồm thiết kế.
                </p>
                <a href="#">
                  <img src={require("../../assets/img/payment.png")} alt />
                </a>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
              <div className="footer__widget">
                <h6>Mua sắm</h6>
                <ul>
                  <li>
                    <a href="#">Cửa hàng quần áo</a>
                  </li>
                  <li>
                    <a href="#">Giày thời trang</a>
                  </li>
                  <li>
                    <a href="#">Phụ kiện</a>
                  </li>
                  <li>
                    <a href="#">Khuyến mãi</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="footer__widget">
                <h6>Mua sắm</h6>
                <ul>
                  <li>
                    <a href="#">Liên hệ</a>
                  </li>
                  <li>
                    <a href="#">Phương thức thanh toán</a>
                  </li>
                  <li>
                    <a href="#">Giao hàng</a>
                  </li>
                  <li>
                    <a href="#">Hoàn trả và đổi hàng</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
              <div className="footer__widget">
                <h6>Bản tin</h6>
                <div className="footer__newslatter">
                  <p>
                    Hãy là người đầu tiên biết về hàng mới, lookbook, khuyến mãi
                    &amp; giảm giá!
                  </p>
                  <form action="#">
                    <input type="text" placeholder="Email của bạn" />
                    <button type="submit">
                      <span className="icon_mail_alt" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="footer__copyright__text">
                {/* Link về Colorlib không thể được loại bỏ. Template được cấp phép theo CC BY 3.0. */}
                <p>
                  Bản quyền © 2024 Đã đăng ký bản quyền | Mẫu này được tạo bởi{" "}
                  <i className="fa fa-heart-o" aria-hidden="true" /> bởi{" "}
                  <a href="https://colorlib.com" target="_blank">
                 Khải
                  </a>
                </p>
                {/* Link về Colorlib không thể được loại bỏ. Template được cấp phép theo CC BY 3.0. */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
