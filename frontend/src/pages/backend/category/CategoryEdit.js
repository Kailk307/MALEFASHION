import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "../../../components/Dashboard";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../../service/CategoryService";
import { toast } from "react-toastify";
export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
    const [parent_id, setParent_id] = useState("");

  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    (async () => {
      const result = await CategoryService.show(id);
      const category = result.category;
     setName(category.name);
     setDescription(category.description);
     setSortOrder(category.sort_order);
     setParent_id(category.parent_id);

     setStatus(category.status);
     setSlug(category.slug);
    })();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = document.getElementById("image");
    const category = new FormData();
     category.append("name", name);
     category.append("slug", slug);
     category.append("description", description);
     category.append("sort_order", sort_order);
     category.append("parent_id", parent_id);

     category.append("status", status);
     category.append("image", image);    
    category.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await CategoryService.update(category, id);
      // alert(result.message);
      toast.success(result.message);
      navigate("/admin/category/index", { replace: true });
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <section className="hdl-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10">
                {/*CONTENT  */}
                <div className="content">
                  <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật danh mục</h1>
                    <div className="text-end">
                      <a href="category_index.html">Về danh sách</a>
                    </div>
                  </section>
                  <section className="content-body my-2">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="mb-3">
                          <label>
                            <strong>Tên danh mục (*)</strong>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Slug</strong>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setSlug(e.target.value)}
                            value={slug}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Mô tả</strong>
                          </label>
                          <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="form-control"
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
                            <p>Chọn trạng thái đăng</p>
                            <select
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                              className="form-control"
                            >
                              <option value={1}>Xuất bản</option>
                              <option value={2}>Chưa xuất bản</option>
                            </select>
                          </div>
                          <div className="box-footer text-end px-2 py-3">
                            <button
                              type="submit"
                              className="btn btn-success btn-sm text-end"
                            >
                              <i className="fa fa-save" aria-hidden="true" />{" "}
                              Câp nhật
                            </button>
                          </div>
                        </div>
                        <div className="box-container mt-4 bg-white">
                          <div className="box-header py-1 px-2 border-bottom">
                            <strong>Danh mục cha (*)</strong>
                          </div>
                          <div className="box-body p-2">
                            <select
                              onChange={(e) => setParent_id(e.target.value)}
                              value={parent_id}
                              className="form-select"
                            >
                              <option value={1}>None</option>
                              <option value={2}>Tên danh mục</option>
                            </select>
                          </div>
                        </div>
                        <div className="box-container mt-4 bg-white">
                          <div className="box-header py-1 px-2 border-bottom">
                            <strong>Thứ tự</strong>
                          </div>
                          <div className="box-body p-2">
                            <select
                              onChange={(e) => setSortOrder(e.target.value)}
                              value={sort_order}
                              className="form-control"
                            >
                              <option value>Trước</option>
                              <option value={2}>Sau</option>
                            </select>
                          </div>
                        </div>
                        <div className="box-container mt-4 bg-white">
                          <div className="box-header py-1 px-2 border-bottom">
                            <strong>Hình (*)</strong>
                          </div>
                          <div className="box-body p-2 border-bottom">
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/*END CONTENT*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
