import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BannerService from "../../../service/BannerService";
import { urlImage } from "../../../config";
import { Link, useNavigate } from 'react-router-dom';

export default function BannerEdit() {
  const navigate = useNavigate()

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
      setLoad(false);
      const result = await BannerService.index();
      setBanners(result.banners);
      setLoad(false);
    })();
  }, [reload]);

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
    banner.append(
      "image",
      image.isDefaultNamespace.length === 0 ? "" : image.files[0]
    );
    (async () => {
      const result = await BannerService.store(banner);
      alert(result.message);
      setReLoad(result.banner.id);
      navigate("/admin/banner/index", { replace: true });
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-12">
                <h3 class="d-inline">Thêm mới</h3>
              </div>
            </div>
          </div>
        </section>
        <section class="content p-3">
          <div class="card">
            <div class="card-header text-end">
              <a href="banner_index.html" class="btn btn-sm btn-info">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                Về danh sách
              </a>
              <button type="submit" class="btn btn-sm btn-success" name="THEM">
                <i class="fa fa-save"></i>
                Lưu [Thêm]
              </button>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-9">
                  <div class="mb-3">
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
                  <div class="mb-3">
                    <label>
                      <strong>Liên kết</strong>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                      className="form-control"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label>
                      <strong>Mô tả (*)</strong>
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      rows="4"
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label>
                      <strong>Vị trí (*)</strong>
                    </label>
                    <select
                      onChange={(e) => setPosition(e.target.value)}
                      value={status}
                      className="form-control"
                    >
                      <option value={1}>none</option>
                      <option value={2}>tên danh mục</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label>
                      <strong>Hình (*)</strong>
                    </label>
                    <input type="file" id="image" className="form-control" />
                  </div>
                  <div class="mb-3">
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
