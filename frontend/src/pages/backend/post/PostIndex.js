import React, { useEffect, useState } from "react";
import PostService from "../../../service/PostService";
import { urlImage } from "../../../config";

import {
  FaEdit,
  FaEye,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function PortIndex() {
  const [status1, setStatus1] = useState(0);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReLoad] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await PostService.index();
      console.log("🚀 ~ file: PortIndex.jsx:26 ~ result:", result);
      setPosts(result.posts);
      setLoading(false);
    })();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      const updatedTopic = {
        status: status1,
      };
      const result = await PostService.delete(updatedTopic, id);
      setReLoad(reload + 1); // Reload posts
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleStatus = (id) => {
    (async () => {
      const result = await PostService.status(id);
      setReLoad(Date.now);
    })();
  };

  return (
    <div>
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
                <th>Tiêu đề bài viết</th>
                <th>Chi tiết</th>
                <th className="text-center" style={{ width: 30 }}>
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post, index) => {
                  return (
                    <tr className="datarow" key={index}>
                      <td>
                        <input type="checkbox" id="checkId" />
                      </td>
                      <td>
                        <img
                          className="img-fluid"
                          src={urlImage + "blog/" + post.image}
                          alt={post.image}
                        />
                      </td>
                      <td>
                        <div className="name">
                          <Link to={"/admin/post/edit/" + post.id}>
                            {post.title}
                          </Link>
                        </div>
                        <div className="function_style">
                          <button
                            onClick={() => handleStatus(post.id)}
                            className={
                              post.status === 1
                                ? "border-0 px-1 text-success"
                                : "border-0 px-1 text-danger"
                            }
                          >
                            {post.status === 1 ? (
                              <FaToggleOn />
                            ) : (
                              <FaToggleOff />
                            )}
                          </button>
                          <Link
                            to={"/admin/post/edit/" + post.id}
                            className="px-1 text-primary"
                          >
                            <FaEdit />
                          </Link>
                          <Link
                            to={`/admin/post/show/${post.id}`}
                            className="px-1 text-info"
                          >
                            <FaEye />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-1 text-danger"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                      <td>{post.detail}</td>
                      <td className="text-center">{post.id}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      </div>
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
    </div>
  );
}
