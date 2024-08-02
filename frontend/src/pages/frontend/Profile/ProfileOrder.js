import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import OrderService from "../../../service/OrderService";
import { useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
import * as XLSX from "xlsx";

export default function QuanLy_Order() {
  const [order, setOrder] = useState([]);
  const [orderdetail, setOrderdetail] = useState([]);
  const [total, setTotal] = useState([]);
  const [users, setUser] = useState([]);
  const [reload, setReLoad] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navi = useNavigate();
  let user = useSelector((state) => state.user.current);

  useEffect(() => {
    if (!user || !user.id) {
      navi("/login");
      return;
    }

    const fetchOrders = async (page) => {
      try {
        const getOrder_From_User = await OrderService.getOrdersByUserId(
          user.id
        );
        if (getOrder_From_User.orders.length === 0) {
          toast.info("Không có đơn hàng nào.");
          return;
        }

        const orderId = getOrder_From_User.orders[0].id;
        const Show_Order = await OrderService.show(orderId, page);

        setUser(Show_Order.user);
        setOrder(Show_Order.order);
        setOrderdetail(Show_Order.orderdetail.data);
        setTotal(Show_Order.total);
        setCurrentPage(Show_Order.orderdetail.current_page);
        setTotalPages(Show_Order.orderdetail.last_page);
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu đơn hàng.");
      }
    };

    fetchOrders(currentPage);
  }, [reload, user, navi, currentPage]);

  const handleDelete = (id) => {
    (async function () {
      try {
        await OrderService.destroy(id);
        toast.success("Hủy đơn thành công");
        setReLoad(Date.now());
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi hủy đơn hàng.");
      }
    })();
  };

  const exportToExcel = () => {
    const data = orderdetail.map((item, index) => ({
      STT: index + 1,
      "Tên sản phẩm": item.name,
      Giá: item.price,
      "Số lượng": item.qty,
      "Thành tiền": item.price * item.qty,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order Details");

    XLSX.writeFile(workbook, "Order_Details.xlsx");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <section className="content-body my-2">
        <h3>Chi tiết đơn hàng</h3>
        <div className="row">
          <div className="col-md">
            <label>
              <strong>Họ tên (*)</strong>
            </label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-md">
            <label>
              <strong>Email (*)</strong>
            </label>
            <input
              type="text"
              name="email"
              value={user.email || ""}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-md">
            <label>
              <strong>Điện thoại (*)</strong>
            </label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-md-5">
            <label>
              <strong>Địa chỉ (*)</strong>
            </label>
            <input
              type="text"
              name="address"
              value={order.delivery_address || ""}
              className="form-control"
              readOnly
            />
          </div>
        </div>
        <h3>Chi tiết giỏ hàng</h3>
        <div className="row my-2">
          <div className="col-3">
            Tổng tiền: <strong>{total}</strong>
          </div>
          <div className="col-3">
            Ngày đặt: <strong>{order.created_at}</strong>
          </div>
          <div className="col-3">
            Trạng thái: <strong>Đang giao hàng</strong>
          </div>
          <div className="col-3">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(order.id)}
            >
              Hủy đơn hàng
            </button>
            <button className="btn btn-success" onClick={exportToExcel}>
              Xuất ra Excel
            </button>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>
                    Tên sản phẩm
                  </th>
                  <th style={{ textAlign: "center", padding: "10px" }}>
                    Hình ảnh
                  </th>
                  <th style={{ textAlign: "center", padding: "10px" }}>Giá</th>
                  <th style={{ textAlign: "center", padding: "10px" }}>
                    Số lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderdetail.length > 0 &&
                  orderdetail.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {item.name}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <img
                          style={{
                            height: 100,
                            width: 100,
                            objectFit: "cover",
                          }}
                          className="img-fluid"
                          src={`${urlImage}product/${item.image}`}
                          alt=""
                        />
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {item.price}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {item.qty}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
