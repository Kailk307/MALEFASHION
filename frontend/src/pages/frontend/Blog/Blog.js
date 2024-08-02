import React, { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import PostService from "../../../service/PostService";
import { urlImage } from "../../../config";

export default function PostAll() {
  const [PostAll, setPostAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await PostService.postAll(currentPage);
      console.log("tải dữ liệu thành công:", res);
      setPostAll(res.posts.data);
      setCurrentPage(res.posts.current_page);
      setLastPage(res.posts.last_page);
      setLoading(false);
    })();
  }, [currentPage]);

  return (
    <div>
      <section
        className="breadcrumb-blog set-bg"
        style={{
          backgroundImage: `url(${require("../../../assets/img/breadcrumb-bg.jpg")})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Bài viết</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <div className="row">
            <section className="blog spad">
              <div className="container">
                <div className="row">
                  {PostAll &&
                    PostAll.length > 0 &&
                    PostAll.map((post) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          <div className="blog__item">
                            <div
                              className="blog__item__pic set-bg"
                              style={{
                                backgroundImage: `url(${require("../../../assets/img/blog/" +
                                  post.image)})`,
                              }}
                            ></div>

                            <div className="blog__item__text">
                              <span>
                                <img
                                  src={require("../../../assets/img/icon/calendar.png")}
                                  alt=""
                                />{" "}
                              </span>
                              <h5>{post.title}</h5>
                              <Link to={`/blog_detail/${post.slug}`}>
                                Đọc thêm
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </div>
        </div>

     
      </section>
    </div>
  );
}
