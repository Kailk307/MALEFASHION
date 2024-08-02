import { useEffect, useState } from "react";
import OrderService from "../../../service/OrderService";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { urlImage } from "../../../config";
const OrderShow = () => {
   const { id } = useParams();
   const [order, setOrder] = useState([]);
   const [orderdetail, setOrderdetail] = useState([]);
   const [total, setTotal] = useState([]);

   const [user, setUser] = useState([]);
   
   useEffect(() => {
      (async function () {
         const result = await OrderService.show(id);
         setOrder(result.order)
         setOrderdetail(result.orderdetail)
         setUser(result.user)
         setTotal(result.total)
         // console.log(result.order);
      })();
   }, [id])
   //deleteOrder
   const handleDelete = (id) => {
      (async function () {
         const result = await OrderService.deleteOrder(id);
         if (result.status === true) {
            toast.success(result.message);
         }
      })();
   }
   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết đơn hàng</h1>
            <div className="mt-1 text-end">
               <Link to="/admin/order" className="btn btn-sm btn-success mx-1">
                  <FaArrowLeft />Về danh sách
               </Link>
               <Link to={'/admin/order/edit/ order.id'} className="px-1 text-primary">
                  <FaEye />
               </Link>
               <button onClick={() => handleDelete(order.id)} className="border-0 px-1 text-danger">
                  <FaTrashAlt />
               </button>
            </div>
         </section>
         <section className="content-body my-2">
            <h3>Thông tin khách hàng</h3>
            <div className="row">
               <div className="col-md">
                  <label><strong>Họ tên (*)</strong></label>
                  <input type="text" name="name" value={user.name} className="form-control" readOnly />
               </div>
               <div className="col-md">
                  <label><strong>Email (*)</strong></label>
                  <input type="text" name="email" value={user.email} className="form-control" readOnly />
               </div>
               <div className="col-md">
                  <label><strong>Điện thoại (*)</strong></label>
                  <input type="text" name="phone" value={user.phone} className="form-control" readOnly />
               </div>
               <div className="col-md-5">
                  <label><strong>Địa chỉ (*)</strong></label>
                  <input type="text" name="address" value={user.address} className="form-control" readOnly />
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
                  Hình thức đặt: <strong>type</strong>
               </div>
               <div className="col-3">
                  Trạng thái: <strong>{order.status}</strong>
               </div>
            </div>
            <div className="row my-3">
               <div className="col-12">
                  <table className="table table-bordered table-striped">
                     <thead>
                        <tr>
                           <th className="text-center" style={{ width: "90px" }}>Hình ảnh</th>
                           <th>Tên sản phẩm</th>
                           <th style={{ width: "90px" }} className="text-center">Giá</th>
                           <th style={{ width: "90px" }} className="text-center">Số lượng</th>
                           <th style={{ width: "90px" }} className="text-center">Thành tiền</th>
                        </tr>
                     </thead>
                     <tbody>
                  {orderdetail && orderdetail.map(function (orderdetail, index) {
                     return (
                        <tr className="datarow" key={index}>                 
                       <td>
                                    <img
                                      className="img-fluid"
                                      src={urlImage + "product/" + orderdetail.image}
                                      alt={orderdetail.image}
                                    />
                                  </td>
                           <td>{orderdetail.name}</td>
                           <td>{orderdetail.price}</td>
                           <td>{orderdetail.qty}</td>
                           <td>{orderdetail.amount}</td>
                        </tr>);
                  })}
               </tbody>
                  </table>
               </div>
            </div>
         </section>
      </div>
   );
}

export default OrderShow;