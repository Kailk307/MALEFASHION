import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";
import ProductItem from "../../../components/ProductItem";

export default function ProductSearch() {
  const { search } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await ProductService.search(search);
      console.log("ðŸš€ ~ res:", res);
      setProduct(res.product);
    })();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div class="col-md-12">
            <div class="category-title">
              <h1 class="fs-5 py-3 my-3 text-center text-uppercase">
              Kết quả tìm kiếm
              </h1>
            </div>
            <div class="col-md-12">
              <div class="row product-list">
                {product.map((product, index) => {
                  return (
                    <div className="col-6 col-md-3 mb-4" key={index}>
                      <div className="product-item border">
                        <Link to={`/product_detail/${product.slug}`}>
                          <div className="product-item-image">
                            <p>
                              <img
                                style={{ width: "350px", height: "350px" }}
                                className="img-fluid"
                                src={urlImage + "product/" + product.image}
                                alt=""
                              />
                            </p>
                          </div>
                          <div className="product-details">
                            <h3
                              className="product-title"
                              style={{
                                fontSize: "20px",

                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                                color: "#333",
                              }}
                            >
                              <a
                                href="#st"
                                style={{
                                  color: "black",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                {product.name}
                              </a>
                            </h3>
                            <div
                              className="price-box"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "black",
                                fontFamily: "Arial, sans-serif",
                              }}
                            >
                              <div
                                className="prices"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  color: "black",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                {/* <del
                            className="old-price"
                            style={{
                              marginRight: "10px",
                              color: "#999",
                              fontFamily: "Arial, sans-serif",
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(priceSale)}
                          </del> */}
                                <span
                                  className="product-price"
                                  style={{
                                    fontWeight: "bold",
                                    color: "#333",
                                    fontFamily: "Arial, sans-serif",
                                  }}
                                >
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(product.price)}
                                </span>
                              </div>
                            </div>
                            <div
                              className="product-action"
                              style={{
                                border: "1px solid #ddd",
                                color: "black",
                                fontFamily: "Arial, sans-serif",
                              }}
                            ></div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
