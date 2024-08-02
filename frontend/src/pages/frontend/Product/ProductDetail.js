import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentService from "../../../service/CommentService";
import ProductService from "../../../service/ProductService";

import { setCurrent } from "../../../state/UserSlice";
import { urlImage } from "../../../config";
import { addToCart } from "../../../state/CartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function ProductDetail() {
   const { slug } = useParams();
   const [product, setProduct] = useState({});
   const [productOther, setProductOther] = useState([]);
   const [qty, setQty] = useState(1);
   const [comments, setComments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [commentData, setCommentData] = useState({
     name: "",
     email: "",
     phone: "",
     comment: "",
   });

   const user = useSelector((state) => state.user.current);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
     const fetchProductDetail = async () => {
       try {
         const result = await ProductService.product_detail(slug);
         setProduct(result.product);
         setProductOther(result.product_other);
         setLoading(false);
       } catch (error) {
         console.error("Error fetching product detail: ", error);
       }
     };

      const fetchComments = async () => {
        try {
          // Lấy bình luận từ localStorage (nếu có)
          const savedComments =
            JSON.parse(localStorage.getItem("comments")) || [];
          setComments(savedComments);

          // Fetch bình luận từ API nếu cần
          const commentsResult = await CommentService.getCommentsByProductSlug(
            slug
          );
          // Nếu không có dữ liệu từ localStorage, sử dụng kết quả từ API
          if (!savedComments.length) {
            setComments(commentsResult);
          }
        } catch (error) {
          console.error("Error fetching comments: ", error);
        }
      };


     fetchProductDetail();
     fetchComments();
   }, [slug]);

   const handleClickToCart = () => {
     const itemToAdd = { ...product, count: +qty };
     const action = addToCart({ item: itemToAdd });
     dispatch(action);
   };

   const handleCommentChange = (e) => {
     const { name, value } = e.target;
     setCommentData({ ...commentData, [name]: value });
   };

     const handleCommentSubmit = async (e) => {
       e.preventDefault();
       if (user && user.id) {
         try {
           const response = await CommentService.addComment({
             ...commentData,
             userName: user.name,
           });
           console.log("Comment submitted:", response.data);
           const updatedComments = [...comments, response.data];
           setComments(updatedComments);
           setCommentData({ name: "", email: "", phone: "", comment: "" });

           // Lưu bình luận vào localStorage
           localStorage.setItem("comments", JSON.stringify(updatedComments));
         } catch (error) {
           console.error("Error submitting comment:", error);
         }
       } else {
         navigate("/login");
       }
     };

   if (loading) {
     return <div>Loading...</div>;
   }




  return (
    <>
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Trang sản phẩm</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">Trang chủ</a>
                  <span>Chi tiết sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="hdl-maincontent py-4"
        style={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="image">
                <img
                  style={{
                    height: "500px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                  id="productimage"
                  className="img-fluid w-100"
                  src={urlImage + "product/" + product.image}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <h1
                style={{
                  color: "#333",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
                className="text-main"
              >
                {product.name}
              </h1>
              <h3
                className="fs-5"
                style={{
                  color: "#666",
                  marginBottom: "20px",
                  whiteSpace: "pre-line",
                }}
              >
                {product.description}
              </h3>
              <h2 className="py-4">
                <span style={{ textDecoration: "underline", color: "#333" }}>
                  Giá :
                </span>
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>
              </h2>

              <div className="mb-3">
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Số lượng
                </label>
                <input
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                  type="number"
                  min={1}
                  name="qty"
                  className="form-control"
                  style={{ width: 200, padding: "10px", borderRadius: "5px" }}
                />
              </div>
              <Link to={`/cart`}>
                <div className="mb-3">
                  <button
                    onClick={handleClickToCart}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#888")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "black")
                    }
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="row">
            <h2
              className="text-main fs-4 pt-4"
              style={{
                color: "#333",
                fontWeight: "600",
                marginBottom: "40px",
                textAlign: "center",
                fontSize: "32px",
              }}
            >
              Chi tiết sản phẩm
            </h2>
            <p
              style={{
                color: "#666",
                lineHeight: "1.6",
                fontSize: "32px",
                whiteSpace: "pre-line",
              }}
            >
              {product.detail}
            </p>
          </div>
          <div className="row">
            <h2
              className="text-main fs-4 pt-4"
              style={{ color: "#333", fontWeight: "600", marginBottom: "20px" }}
            >
              Sản phẩm liên quan
            </h2>
            <div className="product-category mt-3">
              <div className="row product-list">
                {productOther.map((product, index) => (
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
                ))}
              </div>
            </div>
          </div>
          <div className="blog__details__comment" style={{ marginTop: "40px" }}>
            <h4
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Để lại bình luận
            </h4>
            {user && user.id ? (
              <form
                className="comment-form"
                onSubmit={handleCommentSubmit}
                style={{ marginBottom: "20px" }}
              >
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={commentData.name}
                      onChange={handleCommentChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={commentData.email}
                      onChange={handleCommentChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={commentData.phone}
                      onChange={handleCommentChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                  <div className="col-lg-12 text-center">
                    <textarea
                      placeholder="Comment"
                      name="comment"
                      value={commentData.comment}
                      onChange={handleCommentChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginBottom: "10px",
                        resize: "vertical",
                      }}
                    />
                    <button
                      type="submit"
                      className="site-btn"
                      style={{
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background-color 0.3s",
                      }}
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <p>Vui lòng đăng nhập để có thể bình luận.</p>
            )}
            <div className="comment-list" style={{ marginTop: "20px" }}>
              <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Bình luận
              </h4>
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index}>
                    <div className="comment-item">
                      <p>
                        <strong
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          {user.name}
                        </strong>{" "}
                        <span style={{ color: "#888" }}>
                          ({comment.created_at})
                        </span>
                      </p>
                      <p>{comment.comment}</p>
                    </div>
                    {index < comments.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <p>Chưa có bình luận nào.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
