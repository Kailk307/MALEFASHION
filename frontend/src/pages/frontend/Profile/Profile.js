import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../state/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.current);
  console.log("ðŸš€ ~ profile ~ user:", user);
const handleLogout = () => {
  dispatch(logout());
  toast.success("Đăng xuất thành công!");
};


 return (
   <div>
     <ToastContainer />
     <section className="bg-light">
       <div className="container">
         <div className="row">
           <div className="col-lg-12">
             <div className="breadcrumb__text">
               <h4>Trang chủ</h4>
               <div className="breadcrumb__links">
                 <a href="http://localhost:3000">Trang chủ</a>
                 <span>Thông tin </span>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
     <section className="hdl-maincontent py-2">
       <div className="container">
         <div className="row">
           <aside className="col-md-3 order-2 order-md-1">
             <nav className="list-group mb-3 list-category ">
               <a
                 className="list-group-item active"
                 href="page-profile-main.html"
                 style={{
                   backgroundColor: "black",
                   color: "white",
                   fontWeight: "bold",
                   fontSize: "18px",
                   textTransform: "uppercase",
                   letterSpacing: "1px",
                   textAlign: "center",
                 }}
               >
                 Thông tin
               </a>
               <a
                 className="list-group-item"
                 href="http://localhost:3000/profile"
                 style={{ color: "black", fontSize: "22px" }}
               >
                 Thông tin tài khoản
               </a>
               <a
                 className="list-group-item"
                 href="http://localhost:3000/change_pass"
                 style={{ color: "black", fontSize: "22px" }}
               >
                 Đổi mật khẩu
               </a>
               <a
                 className="list-group-item"
                 href="http://localhost:3000/profile_order"
                 style={{ color: "black", fontSize: "22px" }}
               >
                 Đơn hàng của tôi
               </a>
               <button
                 onClick={handleLogout}
                 className="list-group-item list-group-item-action"
                 style={{ color: "black", fontSize: "22px" }}
               >
                 Đăng xuất
               </button>
             </nav>
           </aside>
           <div className="col-md-9 order-1 order-md-2">
             <h1
               className="fs-2 text-main"
               style={{
                 color: "black",
                 fontSize: "32px",
                 textAlign: "center",
               }}
             >
               Thông tin tài khoản
             </h1>
             <table className="table table-borderless">
               <tbody>
                 <tr>
                   <td
                     style={{
                       width: "40%",
                       fontWeight: "bold",
                       fontSize: "22px",
                       textTransform: "uppercase",
                     }}
                   >
                     Tên tài khoản:
                   </td>
                   <td
                     style={{
                       color: "black",
                       fontSize: "22px",
                     }}
                   >
                     {user.name}
                   </td>
                 </tr>
                 <tr>
                   <td
                     style={{
                       width: "40%",
                       fontWeight: "bold",
                       fontSize: "22px",
                       textTransform: "uppercase",
                     }}
                   >
                     Tên đăng nhập:
                   </td>
                   <td
                     style={{
                       color: "black",
                       fontSize: "22px",
                     }}
                   >
                     {user.username}
                   </td>
                 </tr>
                 <tr>
                   <td
                     style={{
                       width: "40%",
                       fontWeight: "bold",
                       fontSize: "22px",
                       textTransform: "uppercase",
                     }}
                   >
                     Email:
                   </td>
                   <td
                     style={{
                       color: "black",
                       fontSize: "22px",
                     }}
                   >
                     {user.email}
                   </td>
                 </tr>
                 <tr>
                   <td
                     style={{
                       width: "40%",
                       fontWeight: "bold",
                       fontSize: "22px",
                       textTransform: "uppercase",
                     }}
                   >
                     Điện thoại:
                   </td>
                   <td
                     style={{
                       color: "black",
                       fontSize: "22px",
                     }}
                   >
                     {user.phone}
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </section>
   </div>
 );

}
