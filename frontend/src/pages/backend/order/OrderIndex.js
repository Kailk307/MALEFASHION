import { useEffect, useState } from "react";
import OrderService from "../../../service/OrderService";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const OrderIndex = () => {
   const [load, setLoad] = useState(0);
   const [order, setOrders] = useState([]);
   const [countall, setCountAll] = useState(0);
   const [counttrash, setCountTrash] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [status1, setStatus1] = useState(0);
   const [reload, setReLoad] = useState(0);
   //input
   //end
   useEffect(function () {
      setIsLoading(true);
      (async function () {
         setIsLoading(true);
         const result = await OrderService.index('index');
         setOrders(result.order);
         setIsLoading(false);
         // console.log(result.orders);
      })();
   }, [load])
   //deleteOrder
   const handleDelete = async (id) => {
      try {
        const updatedBrand = {
          status:status1
        };
        const result = await OrderService.delete(updatedBrand, id);
        toast("Da xoa vao thung rac");
        setLoad(Date.now());
      } catch (error) {
        console.error("Error deleting brand: ", error);
      }
    };
   //status
   const handleStatus = (id) => {
      (async function () {
         const result = await OrderService.status(id);
         if (result.status === true) {
            setLoad(Date.now());
            toast.success('Thay doi trang thai thanh cong');
         }
      })();
   }
   return (
      <div className="content">
             <ToastContainer />
       
         <section className="content-body my-2">
            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" />
                     </th>
                     <th>Họ tên khách hàng</th>
                     <th>Điện thoại</th>
                     <th>Email</th>
                     <th>Ngày đặt hàng</th>
                     <th className="text-center" style={{ width: "30px" }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {order && order.map(function (order, index) {
                     return (
                       <tr className="datarow" key={index}>
                         <td>
                           <input type="checkbox" />
                         </td>
                         <td>
                           <div className="name">
                             <Link to={"/admin/order/edit/" + order.id}>
                               {order.delivery_name}
                             </Link>
                           </div>
                           <div className="function_style">
                             <button
                               onClick={() => handleStatus(order.id)}
                               className={
                                 order.status === 1
                                   ? "border-0 px-1 text-success"
                                   : "border-0 px-1 text-danger"
                               }
                             >
                               {order.status === 1 ? (
                                 <FaToggleOn />
                               ) : (
                                 <FaToggleOff />
                               )}
                             </button>
                             <Link to="#" className="px-1 text-success"></Link>
                             <Link
                               to={"/admin/order/edit/" + order.id}
                               className="px-1 text-primary"
                             >
                               <FaEdit />
                             </Link>
                             <Link
                               to={"/admin/order/show/" + order.id}
                               className="px-1 text-info"
                             >
                               <FaEye />
                             </Link>
                             <button
                               onClick={() => handleDelete(order.id)}
                               className="border-0 px-1 text-danger"
                             >
                               <FaTrashAlt />
                             </button>
                           </div>
                         </td>
                         <td>{order.delivery_email}</td>
                         <td>{order.delivery_phone}</td>
                         <td>{order.created_at}</td>
                         <td className="text-center">{order.id}</td>
                       </tr>
                     );
                  })}
               </tbody>
            </table>
         </section>
      </div>
   );
}

export default OrderIndex;