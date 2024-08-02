import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaEdit,
  FaEye,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";

export default function ProductIndex() {
  const [status1, setStatus1] = useState(0);
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

    const [load, setLoad] = useState(true);
    const [reload, setReLoad] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await ProductService.index();
      console.log("ðŸš€ ~ file: ProductIndex.jsx:19 ~ result sseps:", result);
      setproducts(result.products);
      setLoading(false);
    })();
  }, [reload]);

    const handleDelete = async (id) => {
      try {
        const updatedContact = {
          status: status1,
        };
        const result = await ProductService.delete(updatedContact, id);
        //   toast("Da xoa vao thung rac");
        setReLoad(reload + 1); // Reload brands
      } catch (error) {
        console.error("Error deleting brand: ", error);
      }
    };

  const handleStatus = (id) => {
    (async () => {
      const result = await ProductService.status(id);
      setReLoad(Date.now);
    })();
  };

  return (
    <div className="content">
   
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th className="text-center" style={{ width: 130 }}>
                Hình ảnh
              </th>
              <th>Tất cả sản phẩm</th>
              <th>Giá</th>
              <th>category</th>
              <th>brand</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => {
                return (
                  <tr className="datarow" key={index}>
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <img
                        className="img-fluid"
                        src={urlImage + "product/" + product.image}
                        alt={product.image}
                      />
                    </td>
                    <td>
                      <div className="name">
                        <a href="product_edit.html">{product.name}</a>
                      </div>
                      <div className="function_style">
                        <button
                          onClick={() => handleStatus(product.id)}
                          className={
                            product.status === 1
                              ? "border-0 px-1 text-success"
                              : "border-0 px-1 text-danger"
                          }
                        >
                          {product.status === 1 ? (
                            <FaToggleOn />
                          ) : (
                            <FaToggleOn />
                          )}
                        </button>
                        <Link
                          to={"/admin/product/edit/" + product.id}
                          className="px-1 text-primary"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          to={"/admin/product/show/" + product.id}
                          className="px-1 text-info"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-1 text-danger"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.category_id}</td>
                    <td>{product.brand_id}</td>
                    <td className="text-center" style={{ width: 30 }}>
                      {product.id}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}
