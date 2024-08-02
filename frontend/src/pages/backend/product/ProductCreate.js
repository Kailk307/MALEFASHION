import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
export default function ProductCreate() {

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reload, setReLoad] = useState(0);

  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [name, setname] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [price, setprice] = useState(10);
  const [brand_id, setbrand_id] = useState("");
  const [status, setStatus] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = new FormData();
    product.append("description", description);
    product.append("detail", detail);
    product.append("name", name);
    product.append("category_id", category_id);
    product.append("brand_id", brand_id);
    product.append("price", price);
    product.append("status", status);
    const image = document.getElementById("image");
    product.append("image", image.files.length === 0 ? "" : image.files[0]);

    (async () => {
      const result = await ProductService.store(product);
      alert(result.message);
      // Reset form fields
      navigate("/admin/product/index", { replace: true });

      // document.getElementById('idreset').reset();
    })();
  };
  //category

  useEffect(() => {
    (async () => {
      const result = await CategoryService.index();
      console.log("🚀 ~ file: ProductIndex.jsx:19 ~ result:", result);
      setCategory(result.categories);
      setLoading(false);
    })();
  }, [reload]);
  //brand

  useEffect(() => {
    (async () => {
      const result = await BrandService.index();
      console.log("🚀 ~ file: ProductIndex.jsx:19 ~ result:", result);
      setBrand(result.brands);
      setLoading(false);
    })();
  }, [reload]);

  return (
    <div>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Thêm sản phẩm</h1>
          <div className="mt-1 text-end">
            <Link className="btn btn-sm btn-primary" style={{ color: "white" }} to="/admin/product/index">
              quay về
            </Link>
          </div>
        </section>
        <form onSubmit={handleSubmit} id="idreset" encType="multipart/form-data">
          <section className="content-body my-2">
            <div className="row">
              <div className="col-md-9">
                <div className="mb-3">
                  <label>
                    <strong>Tên sản phẩm (*)</strong>
                  </label>
                  <input
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    name="name"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Chi tiết (*)</strong>
                  </label>
                  <textarea
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                    name="detail"
                    placeholder="Nhập chi tiết sản phẩm"
                    rows={7}
                    className="form-control"
                    defaultValue={""}
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Mô tả (*)</strong>
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    name="description"
                    rows={3}
                    className="form-control"
                    placeholder="Nhập mô tả"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="box-container mt-4 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Đăng</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <select name="status" className="form-select" onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={1}>Xuất bản</option>
                      <option value={2}>Chưa xuất bản</option>
                    </select>
                  </div>
                  <div className="box-footer text-end px-2 py-2">
                    <button type="submit" className="btn btn-success btn-sm text-end">
                      <i className="fa fa-save" aria-hidden="true" /> Đăng
                    </button>
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Danh mục(*)</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <select name="category_id" className="form-select" onChange={(e) => setcategory_id(e.target.value)}
                          value={category_id}>
                      {category &&
                        category.map((category) => {
                          return <option value={category.id}>{category.name}</option>;
                        })}
                    </select>
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>thương hiệu(*)</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <select name="brand_id" className="form-select" onChange={(e) => setbrand_id(e.target.value)}
                          value={brand_id}>
                      {brand &&   
                        brand.map((brand) => {
                          return <option value={brand.id}>{brand.name}</option>;
                        })}
                    </select>
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Giá và số lượng</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <div className="mb-3">
                      <label>
                        <strong>Giá bán (*)</strong>
                      </label>
                      <input
                        onChange={(e) => setprice(e.target.value)}
                        type="number"
                        defaultValue={10000}
                        min={10000}
                        name="price"
                        className="form-control"
                      />
                    </div>
                    {/* <div className="mb-3">
                                            <label><strong>Giá khuyến mãi (*)</strong></label>
                                            <input type="number" defaultValue={10000} min={10000} name="pricesale" className="form-control" />
                                        </div> */}
                    {/* <div className="mb-3">
                                            <label><strong>Số lượng (*)</strong></label>
                                            <input type="number" defaultValue={1} min={1} name="qty" className="form-control" />
                                        </div> */}
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Hình đại diện(*)</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <input type="file" id="image" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
