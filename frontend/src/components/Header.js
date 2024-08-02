import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Header() {
  return (
    <div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="header__top__left">
                  <p>
                    Miễn phí vận chuyển, bảo đảm hoàn trả trong vòng 30 ngày.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="header__top__right">
                  <div className="header__top__links">
                    <a href="/login">Đăng nhập</a>
                    <a href="#">Câu hỏi thường gặp</a>
                  </div>
                  <div className="header__top__hover">
                    <span>
                      USD <i className="arrow_carrot-down" />
                    </span>
                    <ul>
                      <li>USD</li>
                      <li>EUR</li>
                      <li>USD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header__logo">
                <a href="./">
                  <img src={require("../assets/img/logo.png")} alt />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    <a href="./">Trang chủ</a>
                  </li>
                  <li>
                    <a href="./shop.html">Cửa hàng</a>
                  </li>
                  <li>
                    <a href="#">Trang</a>
                    <ul className="dropdown">
                      <li>
                        <a href="./about.html">Về chúng tôi</a>
                      </li>
                      <li>
                        <a href="./shop-details.html">Chi tiết cửa hàng</a>
                      </li>
                      <li>
                        <a href="./shopping-cart.html">Giỏ hàng</a>
                      </li>
                      <li>
                        <a href="./checkout">Thanh toán</a>
                      </li>
                      <li>
                        <a href="./blog-details.html">Chi tiết Blog</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="./blog">Blog</a>
                  </li>
                  <li>
                    <a href="./contact">Liên hệ</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <a href="#" className="search-switch">
                  <img src={require("../assets/img/icon/search.png")} alt />
                </a>
                <a href="#">
                  <img src={require("../assets/img/icon/heart.png")} alt />
                </a>
                <a href="#">
                  <img src={require("../assets/img/icon/cart.png")} alt />{" "}
                  <span>0</span>
                </a>
                <div className="price">$0.00</div>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>
    </div>
  );
}
