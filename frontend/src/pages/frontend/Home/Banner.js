import React from "react";
import "../../../assets/js/bootstrap.bundle.min";

export default function Banner() {
  const carouselStyle = {
    height: "900px", 
    weight:"auto"
  };

  const imgStyle = {
    height: "900px", // Ensure images fit within the specified height
    objectFit: "cover", // Maintain image aspect ratio
  };

  return (
    <div>
      <section className="hero">
        <div
          id="carousel1_indicator"
          className="hero__slider carousel slide"
          data-ride="carousel"
          style={carouselStyle}
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carousel1_indicator"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carousel1_indicator" data-slide-to="1"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="hero__items set-bg"
                style={{
                  backgroundImage: `url(${require("../../../assets/img/hero/hero-1.jpg")})`,
                  ...imgStyle,
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5 col-lg-7 col-md-8">
                      <div className="hero__text">
                        <h6>Bộ sưu tập Mùa Hè</h6>
                        <h2>Bộ sưu tập Thu - Đông 2030</h2>
                        <p>
                          Một nhãn hiệu chuyên nghiệp tạo ra những sản phẩm
                          thiết yếu cao cấp. Được chế tác đạo đức với cam kết
                          không ngừng đối với chất lượng xuất sắc.
                        </p>
                        <a href="#" className="primary-btn">
                          Mua ngay <span className="arrow_right" />
                        </a>
                        <div className="hero__social">
                          <a href="#">
                            <i className="fa fa-facebook" />
                          </a>
                          <a href="#">
                            <i className="fa fa-twitter" />
                          </a>
                          <a href="#">
                            <i className="fa fa-pinterest" />
                          </a>
                          <a href="#">
                            <i className="fa fa-instagram" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="hero__items set-bg"
                style={{
                  backgroundImage: `url(${require("../../../assets/img/hero/hero-2.jpg")})`,
                  ...imgStyle,
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5 col-lg-7 col-md-8">
                      <div className="hero__text">
                        <h6>Bộ sưu tập Mùa Hè</h6>
                        <h2>Bộ sưu tập Thu - Đông 2030</h2>
                        <p>
                          Một nhãn hiệu chuyên nghiệp tạo ra những sản phẩm
                          thiết yếu cao cấp. Được chế tác đạo đức với cam kết
                          không ngừng đối với chất lượng xuất sắc.
                        </p>
                        <a href="#" className="primary-btn">
                          Mua ngay <span className="arrow_right" />
                        </a>
                        <div className="hero__social">
                          <a href="#">
                            <i className="fa fa-facebook" />
                          </a>
                          <a href="#">
                            <i className="fa fa-twitter" />
                          </a>
                          <a href="#">
                            <i className="fa fa-pinterest" />
                          </a>
                          <a href="#">
                            <i className="fa fa-instagram" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carousel1_indicator"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carousel1_indicator"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
    </div>
  );
}
