import { useState } from "react";
import ContactService from "../../../service/ContactService";

export default function Contact() {
  const [inputs, setInputs] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
      user_id: 1,
      replay_id: 1,
      status: 1,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await ContactService.store1(inputs);
      setSuccessMessage("Gửi liên hệ thành công");
      setErrorMessage("");

      // Reset input fields to empty strings
      setInputs({
        name: "",
        email: "",
        phone: "",
        title: "",
        content: "",
        user_id: 1,
        replay_id: 1,
        status: 1,
      });
    } catch (error) {
      console.error("Error submitting contact:", error);
      setSuccessMessage("");
      setErrorMessage("Gửi liên hệ thất bại");
    }
    console.log(inputs);
  };

  return (
    <div>
      {/* Bắt đầu Bản đồ */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111551.9926412813!2d-90.27317134641879!3d38.606612219170856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1597926938024!5m2!1sen!2sbd"
          height={500}
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      {/* Kết thúc Bản đồ */}
      {/* Bắt đầu Phần Liên hệ */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__text">
                <div className="section-title">
                  <span>Thông tin</span>
                  <h2>Liên hệ với chúng tôi</h2>
                  <p>
                    Như bạn có thể mong đợi từ một công ty bắt đầu như một nhà
                    thầu nội thất cao cấp, chúng tôi chú ý nghiêm ngặt.
                  </p>
                </div>
                <ul>
                  <li>
                    <h4>Mỹ</h4>
                    <p>
                      195 E Parker Square Dr, Parker, CO 801 <br />
                      +43 982-314-0958
                    </p>
                  </li>
                  <li>
                    <h4>Pháp</h4>
                    <p>
                      109 Avenue Léon, 63 Clermont-Ferrand <br />
                      +12 345-423-9893
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__form">
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="name" className="text-main">
                        Họ tên
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={inputs.name || ""}
                        onChange={handleChange}
                        id="name"
                        className="form-control"
                        placeholder="Nhập họ tên"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="email" className="text-main">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        id="email"
                        className="form-control"
                        placeholder="Nhập email"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="title" className="text-main">
                        Tiêu đề
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        id="title"
                        className="form-control"
                        placeholder="Nhập tiêu đề"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="phone" className="text-main">
                        Điện thoại
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={inputs.phone || ""}
                        onChange={handleChange}
                        id="phone"
                        className="form-control"
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                    <div className="col-lg-12">
                      <label htmlFor="content" className="text-main">
                        Nội dung
                      </label>
                      <textarea
                        name="content"
                        value={inputs.content || ""}
                        onChange={handleChange}
                        id="detail"
                        className="form-control"
                        placeholder="Nhập nội dung"
                        defaultValue={""}
                        required
                      />
                      <button type="submit" className="site-btn">
                        Gửi tin nhắn
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Kết thúc Phần Liên hệ */}
    </div>
  );
}
