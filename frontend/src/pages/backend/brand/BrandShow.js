import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import BrandService from "../../../service/BrandService";
import { urlImage } from "../../../config";
import { useParams } from "react-router-dom";
export default function BrandShow() {
  const [brand, setBrand] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const result = await BrandService.show(id);
        setBrand(result.brand);
      } catch (error) {
        console.error("Error fetching brand: ", error);
      }
    };
    fetchBrand();
  }, [id]);

  return (
    <div>
      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {/*CONTENT  */}
              <div className="content">
                <section className="content-header my-2">
                  <h1 className="d-inline">Thương hiệu</h1>
                  <hr style={{ border: "none" }} />
                </section>
                <section className="content-body my-6">
                  <div className="row">
                    <div className="col-md-12">
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
                            <th>từ khóa</th>
                            <th>chi tiết</th>
                            <th>ngày tạo</th>
                            <th>ngày cập nhật</th>
                            <th className="text-center" style={{ width: 30 }}>
                              ID
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {brand ? (
                            <tr className="datarow">
                              <td className="text-center">
                                <input type="checkbox" />
                              </td>
                              <td>
                                <img className="img-fluid" src={urlImage + "brand/" + brand.image} alt={brand.image} />
                              </td>
                              <td>
                                <div className="name">
                                  <a href="brand_index.html">{brand.name}</a>
                                </div>
                              </td>
                              <td>{brand.slug}</td>
                              <td>{brand.sortr_order}</td>
                              <td>{brand.description}</td>
                              <td>{brand.created_at}</td>
                              <td>{brand.updated_at}</td>
                              <td className="text-center">{brand.id}</td>
                            </tr>
                          ) : (
                            <p>Loading ...</p>
                          )}
                        </tbody>
                      </table>
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
  );
}

// {brand ? (

// ) : (
//   <p>Loading ...</p>
// )}