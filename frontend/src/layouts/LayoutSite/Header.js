import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { setCurrent } from "../../state/UserSlice";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    window.location.href = `/product_search/${encodeURIComponent(search)}`;
  };

  const dispatch = useDispatch();
  let cartItem = useSelector((state) => state.cart.items);
  const totalItem = cartItem.reduce((total, item) => {
    return total + item.count;
  }, 0);

  let user = useSelector((state) => state.user.current);
  console.log("🚀 ~ Header ~ user:", user);

  const handleLogout = () => {
    dispatch(setCurrent({}));
    localStorage.clear();
  };

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
                  <div
                    className="header__top__links"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "10px",
                      color: "white",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {user.name ? (
                      <div
                        className="header__user"
                        style={{
                          color: "white",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        <span>Xin chào, {user.name}!</span>
                        {/* <a href="#" onClick={handleLogout}>
                          Đăng xuất
                        </a> */}
                      </div>
                    ) : (
                      <a href="/login" style={{ color: "white" }}>
                        Đăng nhập
                      </a>
                    )}
                    <div style={{ position: "relative" }}>
                      <Link
                        to="/cart"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <FaShoppingCart
                          style={{ fontSize: "20px", color: "white" }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-10px",
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "12px",
                          }}
                        >
                          {totalItem}
                        </span>
                      </Link>
                    </div>
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
                <a href="http://localhost:3000/">
                  <img src={require("../../assets/img/logo.png")} alt="Logo" />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    <a href="http://localhost:3000/">Trang chủ</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/product">Sản phẩm</a>
                  </li>
                  <li>
                    <a href="#">Trang</a>
                    <ul className="dropdown">
                      <li>
                        <a href="http://localhost:3000/aboutus">Về chúng tôi</a>
                      </li>
                      <li>
                        <a href="http://localhost:3000/cart">Giỏ hàng</a>
                      </li>
                      <li>
                        <a href="http://localhost:3000/checkout">Thanh toán</a>
                      </li>
                      <li>
                        <a href="http://localhost:3000/profile">Thông tin</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="http://localhost:3000/blog">Blog</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/contact">Liên hệ</a>
                  </li>
                </ul>
                <div className="header__search-user">
                  <div className="input-group mb-3">
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      type="text"
                      className="form-control"
                      placeholder="Nhập nội dung tìm kiếm"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      style={{ border: "2px solid #ced4da", outline: "none" }}
                    />
                    <span
                      style={{ backgroundColor: "#8888", color: "white" }}
                      className="input-group-text bg-main"
                      id="basic-addon2"
                    >
                      <FaSearch
                        onClick={handleSearch}
                        style={{ marginLeft: "3px" }}
                      />
                    </span>
                  </div>
                  {/* {user.name && (
                    <span className="header__user-info">
                      <FaUser
                        style={{ color: "black", marginLeft: "3px" }}
                        className="dropdown-toggle"
                      />
                      Xin chào, {user.name}!
                    </span>
                  )} */}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
