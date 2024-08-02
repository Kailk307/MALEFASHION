import React, { useEffect, useState } from "react";
import PostService from "../../../service/PostService";
import CommentService from "../../../service/CommentService";
import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopicService from "../../../service/TopicService";

export default function PostAll() {
     const { slug } = useParams();
     const [post, setPost] = useState({});
     const [related_posts, setRelatedPosts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [comments, setComments] = useState([]);
     const [commentData, setCommentData] = useState({
       name: "",
       email: "",
       phone: "",
       comment: "",
     });
     const user = useSelector((state) => state.user.current);
     const navigate = useNavigate();
     const [topic, setTopic] = useState([]);

     useEffect(() => {
       const fetchPostDetails = async () => {
         try {
           const res = await PostService.PostDetail(slug);
           setPost(res.post);
           setRelatedPosts(res.related_posts);
           const fetchTopic = await TopicService.index();
           setTopic(fetchTopic.topics);
           setLoading(false);
         } catch (error) {
           console.error("Error fetching post details: ", error);
         }
       };

        const fetchComments = async () => {
          try {
            // Lấy bình luận từ localStorage (nếu có)
            const savedComments =
              JSON.parse(localStorage.getItem("comments")) || [];
            setComments(savedComments);

            // Fetch bình luận từ API nếu cần
            const commentsResult =
              await CommentService.getCommentsByProductSlug(slug);
            // Nếu không có dữ liệu từ localStorage, sử dụng kết quả từ API
            if (!savedComments.length) {
              setComments(commentsResult);
            }
          } catch (error) {
            console.error("Error fetching comments: ", error);
          }
        };

       fetchPostDetails();
       fetchComments();
     }, [slug]);

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
    <div>
      <section className="blog-hero spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-9 text-center">
              <div className="blog__hero__text">
                {topic &&
                  topic.length > 0 &&
                  topic.map((topic) => {
                    return (
                      <li
                        key={topic.id}
                        className="list-group-item"
                        style={{
                          fontSize: "44px",
                          fontWeight: "bold",
                          marginBottom: "20px",
                        }}
                      >
                        {topic.name}
                      </li>
                    );
                  })}
                <ul>
                  <li>By Deercreative</li>
                  <li>February 21, 2019</li>
                  <li>8 Comments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-details spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12">
              <div className="blog__details__pic">
                <img src={urlImage + "blog/" + post.image} alt />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="blog__details__content">
                <div className="blog__details__share">
                  <span>share</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="twitter">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="youtube">
                        <i className="fa fa-youtube-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="linkedin">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="blog__details__text">
                  <p
                    style={{
                      fontSize: "35px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    {post.title}
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      // fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    {post.detail}
                  </p>
                </div>
                <div className="blog__details__quote">
                  <i className="fa fa-quote-left" />
                  <p>
                    “When designing an advertisement for a particular product
                    many things should be researched like where it should be
                    displayed.”
                  </p>
                  <h6>_ John Smith _</h6>
                </div>
                <div className="blog__details__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__author">
                        <div className="blog__details__author__pic">
                          {/* <img src="img/blog/details/blog-author.jpg" alt /> */}
                        </div>
                        <div className="blog__details__author__text">
                          <h5>Aiden Blair</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__tags">
                        <a href="#">#Fashion</a>
                        <a href="#">#Trending</a>
                        <a href="#">#2020</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog__details__btns">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <a href className="blog__details__btns__item">
                        <p>
                          <span className="arrow_left" /> Previous Pod
                        </p>
                        <h5>
                          It S Classified How To Utilize Free Classified Ad
                          Sites
                        </h5>
                      </a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <a
                        href
                        className="blog__details__btns__item blog__details__btns__item--next"
                      >
                        <p>
                          Next Pod <span className="arrow_right" />
                        </p>
                        <h5>
                          Tips For Choosing The Perfect Gloss For Your Lips
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="blog__details__comment"
                  style={{ marginTop: "40px" }}
                >
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
                      comments.map((comment) => (
                        <div className="comment-item">
                          <p>
                            <span>Xin chào, {user.name}!</span>
                            <strong>{comment.name}</strong>{" "}
                            <span style={{ color: "#888" }}>
                              ({comment.created_at})
                            </span>
                          </p>
                          <p>{comment.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p>Chưa có bình luận nào.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
