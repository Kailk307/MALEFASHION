import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Dashboard from "../../../components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import BannerService from "../../../service/BannerService";
import { urlImage } from "../../../config";
import { useParams } from "react-router-dom";
export default function BannerShow() {
  const [banner, setBanner] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const result = await BannerService.show(id);
        setBanner(result.banner);
      } catch (error) {
        console.error("Error fetching Banner: ", error);
      }
    };
    fetchBanner();
  }, [id]);
  return (
    <div>

      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-10">
              {/*CONTENT  */}
              <div className="content">
                <section className="content-header my-2">
                  <h1 className="d-inline">Chi tiết</h1>
                  <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                      <a
                        href="banner_index.html"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-arrow-left" /> Về danh sách
                      </a>
                      <a
                        href="banner_edit.html"
                        className="btn btn-success btn-sm"
                      >
                        <i className="fa fa-edit" /> Sửa
                      </a>
                      <a
                        href="banner_index.html"
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fa fa-trash" /> Xóa
                      </a>
                    </div>
                  </div>
                </section>
                <section className="content-body my-2">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center" style={{ width: 30 }}>
                          <input type="checkbox" id="checkboxAll" />
                        </th>
                        <th className="text-center" style={{ width: 90 }}>
                          Hình ảnh
                        </th>
                        <th>Tên banner</th>
                        <th>Liên kết</th>
                        <th>Vị trí</th>
                        <th>Chi tiết</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th className="text-center" style={{ width: 30 }}>
                          ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {banner ? (
                        <tr className="datarow">
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td>
                            <img
                              className="img-fluid"
                              src={urlImage + "banner/" + banner.image}
                              alt={banner.image}
                            />
                          </td>
                          <td>
                            <div className="name">
                              <a href="banner_index.html">{banner.name}</a>
                            </div>
                          </td>
                          <td>{banner.link}</td>
                          <td>{banner.position}</td>
                          <td>{banner.description}</td>
                          <td>{banner.created_at}</td>
                          <td>{banner.updated_at}</td>
                          <td className="text-center">{banner.id}</td>
                        </tr>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </tbody>
                  </table>
                </section>
              </div>
              {/*END CONTENT*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
