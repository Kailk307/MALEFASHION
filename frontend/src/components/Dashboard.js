// Dashboard.js
import React from 'react';
import { FaProductHunt, FaPlus, FaRegCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Dashboard() {
    function handleItemClick(item) {
        const hdlitem = document.getElementById(item);
        hdlitem.classList.toggle("active");
    }

    return (
      <div className="col-md-2 bg-dark p-0 hdl-left">
        <div className="hdl-left">
          <div className="dashboard-name">Bản điều khiển</div>
          <nav className="m-2 mainmenu">
            <ul className="main">
              <li
                className="hdlitem item-sub"
                id="item1"
                onClick={() => handleItemClick("item1")}
              >
                <a href="#st" className="d-flex align-items-center">
                  <FaProductHunt className="icon-left" />
                  <span className="menu-text ms-2 me-auto">Sản phẩm</span>
                  <FaPlus className="icon-right" />
                </a>

                <ul className="submenu">
                  <li>
                    <a href="http://localhost:3000/admin/product/index">
                      Tất cả sản phẩm
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/product/productImport">
                      Nhập hàng
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/category/index">
                      Danh mục
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/brand/index">
                      Thương hiệu
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/product/productsale">
                      Khuyễn mãi
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className="hdlitem item-sub"
                id="item2"
                onClick={() => handleItemClick("item2")}
              >
                <a href="#st" className="d-flex align-items-center">
                  <FaProductHunt className="icon-left" />
                  <span className="menu-text ms-2 me-auto">Bài viết</span>
                  <FaPlus className="icon-right" />
                </a>

                <ul className="submenu">
                  <li>
                    <a href="http://localhost:3000/admin/post/index">
                      Tất cả bài viết
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/topic/index">Chủ đề</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/page/index">
                      Trang đơn
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className="hdlitem item-sub"
                id="item3"
                onClick={() => handleItemClick("item3")}
              >
                <a href="#st" className="d-flex align-items-center">
                  <FaProductHunt className="icon-left" />
                  <span className="menu-text ms-2 me-auto">
                    Quản lý bán hàng
                  </span>
                  <FaPlus className="icon-right" />
                </a>
                <ul className="submenu">
                  <li>
                    <a href="http://localhost:3000/admin/order/index">
                      Tất cả đơn hàng
                    </a>
                  </li>
                  <li>
                    <a href="order_export.html">Xuất hàng</a>
                  </li>
                </ul>
              </li>
              <li className="hdlitem">
                <a href="http://localhost:3000/admin/customer/index">
                  <FaRegCircle className="icon-left" />
                  <span className="menu-text ms-2 me-auto">Khách hàng</span>
                </a>
              </li>
              <li className="hdlitem">
                <a href="http://localhost:3000/admin/contact/index">
                  <FaRegCircle className="icon-left" />
                  <span className="menu-text ms-2 me-auto">Liên hệ</span>
                </a>
              </li>
              <li
                className="hdlitem item-sub"
                id="item4"
                onClick={() => handleItemClick("item4")}
              >
                <a href="#st" className="d-flex align-items-center">
                  <FaProductHunt className="icon-left" />
                  <span className="menu-text ms-2 me-auto">Giao diện</span>
                  <FaPlus className="icon-right" />
                </a>
                <ul className="submenu">
                  <li>
                    <a href="http://localhost:3000/admin/menu/index">Menu</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/banner/index">
                      Banner
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className="hdlitem item-sub"
                id="item5"
                onClick={() => handleItemClick("item5")}
              >
                <a href="#st" className="d-flex align-items-center">
                  <FaProductHunt className="icon-left" />
                  <span className="menu-text ms-2 me-auto">Hệ thống</span>
                  <FaPlus className="icon-right" />
                </a>
                <ul className="submenu">
                  <li>
                    <a href="http://localhost:3000/admin/user/index">
                      Thành viên
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/admin/config/index">
                      Cấu hình
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
}
