import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";



export default function CustomerIndex() {
  
  return (
   <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-12">
          <h3 className="d-inline">Tất cả khách hàng</h3>
          <a href="customer_create.html" className="btn btn-sm btn-primary">
            Thêm khách hàng
          </a>
        </div>
      </div>
    </div>
  </section>
  <section className="content p-3">
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col-12">
            <nav className="nav">
              <a className="nav-link py-0 ps-0" href="#">
                Tất cả (67)
              </a>
              <a className="nav-link py-0 ps-0" href="#">
                Thùng rác (11)
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered" id="mytable">
          <thead>
            <tr>
              <th className="text-center" style={{width: 30}}>
                <input type="checkbox" />
              </th>
              <th className="text-center" style={{width: 130}}>
                Hình ảnh
              </th>
              <th>Họ tên</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th className="text-center" style={{width: 30}}>
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="datarow">
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <img className="img-fluid" src="public/images/user/default_user.jpg" alt="user.jpg" />
              </td>
              <td>
                <div className="name">Hồ Diên Lợi</div>
                <div className="function_style">
                  <a href="#" className="btn btn-success btn-sm">
                    <i className="fa fa-toggle-on" />
                  </a>
                  <a href="customer_edit.html" className="btn btn-primary btn-sm">
                    <i className="fa fa-edit" />
                  </a>
                  <a href="customer_show.html" className="btn btn-info btn-sm">
                    <i className="fa fa-eye" />
                  </a>
                  <a href="#" className="btn btn-danger btn-sm">
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </td>
              <td>0987654331</td>
              <td>dienloisoft@gmail.com</td>
              <td className="text-center">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>

  );
}

