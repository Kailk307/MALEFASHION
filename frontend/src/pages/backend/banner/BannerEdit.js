import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BannerService from "../../../service/BannerService";
import { toast } from "react-toastify";

export default function BannerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReLoad] = useState(0);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState(1);
  const [status, setStatus] = useState(1);

 
    useEffect(() => {
      (async () => {
        const result = await BannerService.show(id);
        const banner = result.banner;
        setName(banner.name);
        setDescription(banner.description);
        setLink(banner.link);
        setStatus(banner.status);
        setPosition(banner.position);
      })();
    }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = document.getElementById("image");
    const banner = new FormData();
    banner.append("name", name);
    banner.append("link", link);
    banner.append("description", description);
    banner.append("position", position);
    banner.append("status", status);
    banner.append("image", image);
     banner.append("image", image.files.length === 0 ? "" : image.files[0]);
     (async () => {
       const result = await BannerService.update(banner, id);
       // alert(result.message);
       toast.success(result.message);
       navigate("/admin/banner/index", { replace: true });
     })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h3 className="d-inline">Cập nhật</h3>
              </div>
            </div>
          </div>
        </section>
        <section className="content p-3">
          <div className="card">
            <div className="card-header text-right">
              <a href="banner_index.html" className="btn btn-sm btn-info">
                <i className="fa fa-arrow-left" aria-hidden="true" />
                Về danh sách
              </a>
              <button
                type="submit"
                className="btn btn-sm btn-success"
                name="CAPNHAT"
              >
                <i className="fa fa-save" />
                Lưu [Cập nhật]
              </button>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">
                  <div className="mb-3">
                    <label>
                      <strong>Tên banner (*)</strong>
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
                      <strong>Liên kết</strong>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Mô tả (*)</strong>
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
                  <div className="mb-3">
                    <label>
                      <strong>Vị trí (*)</strong>
                    </label>
                    <select
                      onChange={(e) => setPosition(e.target.value)}
                      value={position}
                      className="form-control"
                    >
                      <option value={1}>Xuất bản</option>
                      <option value={2}>Chưa xuất bản</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Hình (*)</strong>
                    </label>
                    <input type="file" id="image" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Trạng thái</strong>
                    </label>
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      className="form-control"
                    >
                      <option value={1}>Xuất bản</option>
                      <option value={2}>Chưa xuất bản</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
