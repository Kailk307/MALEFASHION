import React, { useEffect } from "react";
import { useState } from "react";
import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
// import "react-owl-carousel2/lib/styles.css";
import CategoryService from "../../../service/CategoryService";
import BrandService from "../../../service/BrandService";
import ProductItem from "../../../components/ProductItem";

export default function ProductAll() {
  // state all product and page
  const [ProductAll, setProductALL] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // state lấy min max filter
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);

  // sắp sếp tăng
  const [sort_order, setsort_order] = useState("asc");

  // filter chung
  const [filter, setFilter] = useState({});

  // state left brand and category
  const [category, setCategory] = useState([]);
  const [brand, setbrand] = useState([]);

  useEffect(() => {
    (async () => {
      // const res = await ProductServie.productAll(currentPage); // chưa có filter price , cũng như mấy product cate,brand
      const res = await ProductService.productAll_filter_price(
        currentPage,
        minPrice,
        maxPrice,
        sort_order
      );
      console.log("🚀 ~ res:", res);
      setProductALL(res.products.data);
      setCurrentPage(res.products.current_page);
      setLastPage(res.products.last_page);

      // call brand and category left giao diện
      const fetCate = await CategoryService.index1();
      const fetchbrand1 = await BrandService.index();
      setCategory(fetCate.category);
      setbrand(fetchbrand1.brands);

      setLoading(false);
    })();
  }, [currentPage, sort_order]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilter((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("filter", filter);
    (async () => {
      // const res = await ProductServie.productAll(currentPage); // chưa có filter price , cũng như mấy product cate,brand
      const res = await ProductService.productAll_filter_price(
        currentPage,
        filter.minPrice,
        filter.maxPrice,
        sort_order
      );
      console.log("🚀 ~ res:", res);
      setProductALL(res.products.data);
      setCurrentPage(res.products.current_page);
      setLastPage(res.products.last_page);

      setFilter({ minPrice: "", maxPrice: "" });

      setLoading(false);
    })();
  };

  return (
    <div>
      <section className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <section class="breadcrumb-option">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="breadcrumb__text">
                        <h4>Trang chủ</h4>
                        <div class="breadcrumb__links">
                          <a href="./index.html">Trang sản phẩm</a>
                          <span>Tất cả sản phẩm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              className="col-9"
              style={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                marginTop: "17px",
              }}
            >
              <div className="filter_price">
                <form onSubmit={handleSubmit}>
                  <label style={{ marginBottom: "10px" }}>
                    Giá thấp nhất
                    <input
                      type="number"
                      name="minPrice"
                      value={filter.minPrice}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #ced4da",
                        outline: "none",
                        padding: "5px",
                        marginRight: "10px",
                      }}
                    />
                  </label>
                  <label>
                    Giá cao nhất
                    <input
                      type="number"
                      name="maxPrice"
                      value={filter.maxPrice}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #ced4da",
                        outline: "none",
                        padding: "5px",
                        marginRight: "10px",
                      }}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Lọc"
                    style={{
                      backgroundColor: "#8888",
                      color: "white",
                      border: "none",
                      marginRight: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      padding: "7px 10px",
                    }}
                  />
                </form>
              </div>
              <div className="filter-sort">
                <label>Sắp xếp</label>
                <select
                  value={sort_order}
                  onChange={(e) => setsort_order(e.target.value)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <option value="asc">Tăng</option>
                  <option value="desc">Giảm</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-3 order-2 order-md-1">
              <ul className="list-group mb-3 list-category">
                <li
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                  className="list-group-item bg-main py-3"
                >
                  Danh mục sản phẩm
                </li>

                {category &&
                  category.length > 0 &&
                  category.map((category) => {
                    return (
                      <li key={category.id} className="list-group-item">
                        <Link
                          to={`/product_category/${category.slug}`}
                          style={{ color: "black", fontSize: "22px" }}
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              <ul className="list-group mb-3 list-brand">
                <li
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                  className="list-group-item bg-main py-3"
                >
                  Thương hiệu
                </li>
                {brand &&
                  brand.length > 0 &&
                  brand.map((brand) => {
                    return (
                      <li key={brand.id} className="list-group-item">
                        <Link
                          to={`/product_brand/${brand.slug}`}
                          style={{ color: "black", fontSize: "22px" }}
                        >
                          {brand.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="col-md-9 order-1 order-md-2">
              <div className="category-title bg-main">
                <h2
                  class="section-title heading-border ls-20 border-0 "
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "28px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Tất cả sản phẩm
                </h2>
              </div>
              <div className="product-category mt-3">
                <div className="row product-list">
                  {ProductAll.map((product, index) => {
                    return (
                      <div className="col-6 col-md-3 mb-4" key={index}>
                        <ProductItem product={product} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        &lt;{" "}
                      </a>
                    </li>
                    {Array.from({ length: lastPage }, (_, i) => (
                      <li
                        className={`page-item ${
                          i + 1 === currentPage ? "active" : ""
                        }`}
                        key={i}
                      >
                        <a
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === lastPage ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        {" "}
                        &gt;
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
