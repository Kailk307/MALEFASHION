import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Dashboard from "../../../components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlImage } from "../../../config";
import CategoryService from "../../../service/CategoryService";
import { useParams } from "react-router-dom";
export default function CategoryShow() {
  const [category, setCategory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const result = await CategoryService.show(id);
        setCategory(result.category);
      } catch (error) {
        console.error("Error fetching category: ", error);
      }
    };
    fetchcategory();
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
                        href="category_index.html"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-arrow-left" /> Về danh sách
                      </a>
                      <a
                        href="category_edit.html"
                        className="btn btn-success btn-sm"
                      >
                        <i className="fa fa-edit" /> Sửa
                      </a>
                      <a
                        href="category_index.html"
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
                        <th>Tên thương hiệu</th>
                        <th>Tên slug</th>
                        <th>Từ khóa</th>
                        <th>chi tiết</th>
                        <th>ngày tạo</th>
                        <th>ngày cập nhật</th>
                        <th className="text-center" style={{ width: 30 }}>
                          ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category ? (
                        <tr className="datarow">
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td>
                            <img
                              className="img-fluid"
                              src={urlImage + "category/" + category.image}
                              alt={category.image}
                            />
                          </td>
                          <td>
                            <div className="name">
                              <a href="category_index.html">{category.name}</a>
                            </div>
                          </td>
                          <td>{category.slug}</td>
                          <td>{category.metakey}</td>
                          <td>{category.description}</td>
                          <td>{category.created_at}</td>
                          <td>{category.updated_at}</td>
                          <td className="text-center">{category.id}</td>
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
