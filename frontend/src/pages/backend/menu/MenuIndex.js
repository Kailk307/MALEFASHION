import { useEffect, useState } from "react";
import MenuService from "../../../services/MenuService";
import LoadingSpinner from "../../../LoadingSpinner";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MenuIndex = () => {
   const [load, setLoad] = useState(0);
   const [menus, setMenus] = useState([]);
   const [categorys, setCategorys] = useState([]);
   const [brands, setBrands] = useState([]);
   const [topics, setTopics] = useState([]);
   const [pages, setPages] = useState([]);
   const [countall, setCountAll] = useState(0);
   const [counttrash, setCountTrash] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [position, setPosition] = useState('mainmenu');
   const [parent_id, setParent_id] = useState('0');
   const [name, setName] = useState('');
   const [link, setLink] = useState('');
   const [status1, setStatus1] = useState(0);
   //getListMenu
   useEffect(function () {
      (async function () {
         setIsLoading(true);
         const result = await MenuService.index();
         setMenus(result.menu);
         setCategorys(result.categories);
         setBrands(result.brands);
         setTopics(result.topics);
         setPages(result.pages);
         setCountAll(result.count_all);
         setCountTrash(result.count_trash);
         setIsLoading(false);
         // console.log(result.menus);
      })();
   }, [load])
   //deleteMenu
   const handleDelete = async (id) => {
      try {
       
        const updatedBrand = {
          status: status1,
        };
        const result = await MenuService.delete(updatedBrand, id);
        setLoad(load + 1); // Reload brands
        toast("da xoa vao thung rac");
      } catch (error) {
        console.error("Error deleting brand: ", error);
      }
    };
   //statusMenu
   const handleStatus = (id) => {
      (async function () {
         const result = await MenuService.status(id);
         if (result.status === true) {
            setLoad(Date.now());
            toast.success("Thay đổi trạng thái thành công");
         }
      })();
   }
   const handleSubmit = (event) => {
      event.preventDefault();
      // console.log(categoryids);
      const nameBtn = event.nativeEvent.submitter.name;
      const menu = {
         position: position,
         parent_id:parent_id
      }
      //ADDCATEGORY
      if (nameBtn === "ADDCATEGORY") {
         const categoryid = [];
         const categoryidchecked = document.querySelectorAll(".categoryid");
         categoryidchecked.forEach(function (item) {
            if (item.checked) {
               categoryid.push(item.value);
            }
         });
         menu['ADDCATEGORY'] = nameBtn;
         menu['categoryid'] = categoryid;
            
      };
      //ADDBRAND
      if (nameBtn === "ADDBRAND") {
         const brandid = [];
         const brandidchecked = document.querySelectorAll(".brandid");
         brandidchecked.forEach(function (item) {
            if (item.checked) {
               brandid.push(item.value);
            }
         });
         menu['ADDBRAND'] = nameBtn;
         menu['brandid'] = brandid;
      };
      //ADDTOPIC
      if (nameBtn === "ADDTOPIC") {
         const topicid = [];
         const topicidchecked = document.querySelectorAll(".topicid");
         topicidchecked.forEach(function (item) {
            if (item.checked) {
               topicid.push(item.value);
            }
         });
         menu['ADDTOPIC'] = nameBtn;
         menu['topicid'] = topicid;
      };
      //ADDPAGE
      if (nameBtn === "ADDPAGE") {
         const pageid = [];
         const pageidchecked = document.querySelectorAll(".pageid");
         pageidchecked.forEach(function (item) {
            if (item.checked) {
               pageid.push(item.value);
            }
         });
         menu['ADDPAGE'] = nameBtn;
         menu['pageid'] = pageid;
    
      };
      //ADDCUSTOM
      if (nameBtn === "ADDCUSTOM") {
         menu['ADDCUSTOM'] = nameBtn;
         menu['name'] = name;
         menu['link'] = link;
         
      };
      (async function () {
         console.log('menu', menu)
         const result = await MenuService.store(menu);
         if (result.status === true) {
            setLoad(Date.now());
            toast.success(result.message);
         }
      })();
   }
   return (
      <form onSubmit={handleSubmit}>
         <div className="content">
         <ToastContainer />
            <section className="content-header my-2">
               <h1 className="d-inline">Quản lý menu</h1>
               <div className="row mt-3 align-items-center">
                  <div className="col-6">
                     <ul className="manager">
                        <li>
                           <Link to="/admin/menu">Tất cả ({countall})</Link>
                        </li>
                        <li>
                           <Link to="#">Xuất bản (12)</Link>
                        </li>
                        <li>
                           <Link to="/admin/menu/trash">Rác ({counttrash})</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="col-6 text-end">
                     <input type="text" className="search d-inline" />
                     <button className="d-inline btnsearch">Tìm kiếm</button>
                  </div>
               </div>
            </section>
            <section className="content-body my-2">
               <div className="row">
                  <div className="col-md-3">
                     <ul className="list-group">
                        <li className="list-group-item mb-2">
                           <select
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              className="form-select">
                              <option value="mainmenu">Main Menu</option>
                              <option value="footermenu">Footer Menu</option>
                           </select>
                        </li>
                        <li className="list-group-item mb-2">
                           <select
                              value={parent_id}
                              onChange={(e) => setParent_id(e.target.value)}
                              className="form-select">
                                  {menus && menus.map((menus, index) => {
                                 return (
                                    <option value={menus.id}>{menus.name}</option>
                                 );
                              })}
                             
                             
                           </select>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <a className="d-block" href="#multiCollapseCategory" data-bs-toggle="collapse">
                              Danh mục sản phẩm
                           </a>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCategory">
                              {categorys && categorys.map((category, index) => {
                                 return (
                                    <div className="form-check" key={index}>
                                       <input
                                          value={category.id}
                                          className="form-check-input categoryid"
                                          type="checkbox"
                                          id={"categoryid" + category.id} />
                                       <label className="form-check-label" htmlFor={"categoryid" + category.id}>
                                          {category.name}
                                       </label>
                                    </div>
                                 );
                              })}
                              <div className="my-3">
                                 <button name="ADDCATEGORY" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <a className="d-block" href="#multiCollapseBrand" data-bs-toggle="collapse">
                              Thương hiệu
                           </a>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseBrand">
                              {brands && brands.map((brand, index) => {
                                 return (
                                    <div className="form-check" key={index}>
                                       <input
                                          value={brand.id}
                                          className="form-check-input brandid"
                                          type="checkbox"
                                          id={"brandid" + brand.id} />
                                       <label className="form-check-label" htmlFor={"brandid" + brand.id}>
                                          {brand.name}
                                       </label>
                                    </div>
                                 );
                              })}
                              <div className="my-3">
                                 <button name="ADDBRAND" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <a className="d-block" href="#multiCollapseTopic" data-bs-toggle="collapse">
                              Chủ đề bài viết
                           </a>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseTopic">
                              {topics && topics.map((topic, index) => {
                                 return (
                                    <div className="form-check" key={index}>
                                       <input
                                          value={topic.id}
                                          className="form-check-input topicid"
                                          type="checkbox"
                                          id={"topicid" + topic.id} />
                                       <label className="form-check-label" htmlFor={"topicid" + topic.id}>
                                          {topic.name}
                                       </label>
                                    </div>
                                 );
                              })}
                              <div className="my-3">
                                 <button name="ADDTOPIC" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <a className="d-block" href="#multiCollapsePage" data-bs-toggle="collapse">
                              Trang đơn
                           </a>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapsePage">
                              {pages && pages.map((page, index) => {
                                 return (
                                    <div className="form-check" key={index}>
                                       <input value={page.id}
                                          className="form-check-input pageid"
                                          type="checkbox"
                                          id={"pageid" + page.id} />
                                       <label className="form-check-label" htmlFor={"pageid" + page.id}>
                                          {page.title}
                                       </label>
                                    </div>
                                 );
                              })}
                              <div className="my-3">
                                 <button name="ADDPAGE" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <a className="d-block" href="#multiCollapseCustom" data-bs-toggle="collapse">
                              Tùy biến liên kết
                           </a>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCustom">
                              <div className="mb-3">
                                 <label>Tên menu</label>
                                 <input type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control" />
                              </div>
                              <div className="mb-3">
                                 <label>Liên kết</label>
                                 <input type="text"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="form-control" />
                              </div>
                              <div className="my-3">
                                 <button name="ADDCUSTOM" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div className="col-md-9">
                     <div className="row mt-1 align-items-center">
                        <div className="col-md-8">
                           <select name="" className="d-inline me-1">
                              <option value="">Hành động</option>
                              <option value="">Bỏ vào thùng rác</option>
                           </select>
                           <button className="btnapply">Áp dụng</button>
                        </div>
                        <div className="col-md-4 text-end">
                           <nav aria-label="Page navigation example">
                              <ul className="pagination pagination-sm justify-content-end">
                                 <li className="page-item disabled">
                                    <Link className="page-link">&laquo;</Link>
                                 </li>
                                 <li className="page-item">
                                    <Link className="page-link" to="#">1</Link>
                                 </li>
                                 <li className="page-item">
                                    <Link className="page-link" to="#">2</Link>
                                 </li>
                                 <li className="page-item">
                                    <Link className="page-link" to="#">3</Link>
                                 </li>
                                 <li className="page-item">
                                    <Link className="page-link" to="#">&raquo;</Link>
                                 </li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                     {isLoading ? <LoadingSpinner /> : ""}
                     <table className="table table-bordered">
                        <thead>
                           <tr>
                              <th className="text-center" style={{ width: "30px" }}>
                                 <input type="checkbox" />
                              </th>
                              <th>Tên menu</th>
                              <th>Liên kết</th>
                              <th>Vị trí</th>
                              <th className="text-center" style={{ width: "30px" }}>ID</th>
                           </tr>
                        </thead>
                        <tbody>
                           {menus && menus.map((menu, index) => {
                              return (
                                 <tr className="datarow" key={index}>
                                    <td className="text-center">
                                       <input type="checkbox" />
                                    </td>
                                    <td>
                                       <div className="name">
                                          <Link to={'/admin/menu/edit/' + menu.id}>
                                             {menu.name}
                                          </Link>
                                       </div>
                                       <div className="function_style">
                                          <button
                                             onClick={() => handleStatus(menu.id)}
                                             className={menu.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}>
                                             {menu.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                          </button>
                                          <Link to="#" className="px-1 text-success">
                                          </Link>
                                          <Link to={'/admin/menu/update/' + menu.id} className="px-1 text-primary">
                                             <FaEdit />
                                          </Link>
                                          <Link to={'/admin/menu/show/' + menu.id} className="px-1 text-info">
                                             <FaEye />
                                          </Link>
                                          <button onClick={() => handleDelete(menu.id)} className="border-0 px-1 text-danger"><FaTrashAlt /></button>
                                       </div>
                                    </td>
                                    <td>{menu.link}</td>
                                    <td>{menu.position}</td>
                                    <td className="text-center">{menu.id}</td>
                                 </tr>);
                           })}
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>
         </div>
      </form>
   );
}

export default MenuIndex;