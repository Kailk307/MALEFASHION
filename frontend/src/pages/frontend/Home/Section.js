import React from "react";

export default function Section() {
  return (
    <div>
      <section className="banner spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-4">
              <div className="banner__item">
                <div className="banner__item__pic">
                  <img
                    src={require("../../../assets/img/banner/banner-1.jpg")}
                    alt="Ảnh banner 1"
                  />
                </div>
                <div className="banner__item__text">
                  <h2>Bộ sưu tập Thời trang 2030</h2>
                  <a href="#">Mua ngay</a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner__item banner__item--middle">
                <div className="banner__item__pic">
                  <img
                    src={require("../../../assets/img/banner/banner-2.jpg")}
                    alt="Ảnh banner 2"
                  />
                </div>
                <div className="banner__item__text">
                  <h2>Phụ kiện</h2>
                  <a href="#">Mua ngay</a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="banner__item banner__item--last">
                <div className="banner__item__pic">
                  <img
                    src={require("../../../assets/img/banner/banner-3.jpg")}
                    alt="Ảnh banner 3"
                  />
                </div>
                <div className="banner__item__text">
                  <h2>Giày xuân 2030</h2>
                  <a href="#">Mua ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
