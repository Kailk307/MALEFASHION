import React from "react";
import "./LayoutAdminStyle.css";
import { FaPlus, FaProductHunt } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "../../components/Dashboard";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function LayoutAdmin() {
  function handleItemClick(item) {
    const hdlitem = document.getElementById(item);
    hdlitem.classList.toggle("active");
  }

  return (
    <div>
      
        
          <HeaderAdmin></HeaderAdmin>
       
      <section class="hdl-content">
        <div class="container-fluid">
          <div class="row">
            <Dashboard></Dashboard>
            <div class="col-md-10">
              <div class="content">
                <section class="content-header my-2">
                  <h1 class="d-inline">Blank Page</h1>
                  <a href="#stst" class="btn btn-secondary btn-sm">
                    Thêm mới
                  </a>
                  <div class="row mt-3 align-items-center">
                    <div class="col-6">
                      <ul class="manager">
                        <li>
                          <a href="#st">Tất cả (123)</a>
                        </li>
                        <li>
                          <a href="#st">Xuất bản (12)</a>
                        </li>
                        <li>
                          <a href="#st">Rác (12)</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-6 text-end">
                      <input type="text" class="search d-inline" />
                      <button class="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                  </div>
                  <div class="row mt-1 align-items-center">
                    <div class="col-md-8">
                      <select name="" class="d-inline me-1">
                        <option value="">Hành động</option>
                        <option value="">Bỏ vào thùng rác</option>
                      </select>
                      <button class="btnapply">Áp dụng</button>
                      <select name="" class="d-inline me-1">
                        <option value="">Tất cả danh mục</option>
                      </select>
                      <select name="" class="d-inline me-1">
                        <option value="">Tất cả thương hiệu</option>
                      </select>
                      <button class="btnfilter">Lọc</button>
                    </div>
                    <div class="col-md-4 text-end">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm justify-content-end">
                          <li class="page-item disabled">
                            <a href="#st" class="page-link">
                              &laquo;
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#st">
                              1
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#st">
                              2
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#st">
                              3
                            </a>
                          </li>
<li class="page-item">
                            <a class="page-link" href="#st">
                              &raquo;
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </section>
                <section class="content-body my-2">
                  <Outlet />
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}