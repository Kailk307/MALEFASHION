import React, { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import ProductItem from "../../../components/ProductItem";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../state/CartSlice";
import { urlImage } from "../../../config";

const ProductHotBuy = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductService.producthotbuy(4);
        setProducts(result.products);
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Product Hot Buy</span>
              <h2>Sản phẩm bán chạy</h2>
            </div>
          </div>
        </div>
        <div class="row product-list">
          {products.map((product, index) => {
            const priceSale = product.pricesale ? product.pricesale : 0;

            return (
              <div className="col-6 col-md-3 mb-4" key={index}>
                {/* <ProductItem product={product}  /> */}
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
    </>
  );
};
export default ProductHotBuy;
