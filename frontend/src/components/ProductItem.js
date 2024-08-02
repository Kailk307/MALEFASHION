import React from "react";
import { urlImage } from "../config";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/CartSlice";

export default function ProductItem({ product }) {
  // console.log("🚀 ~ ProductItem ~ product:", product)

  // redux
  const dispatch = useDispatch();

  const handleClickToCart = (e) => {
    e.preventDefault();

    dispatch(
      addToCart({
        item: { ...product, count: 1 },
      })
    );
  };

  let priceSale = product.pricesale ? product.pricesale : 0;
  return (
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
              <del
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
              </del>
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
  );
}
