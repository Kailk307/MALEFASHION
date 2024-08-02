import React, { useEffect, useState } from "react";
import UserService from "../../../service/UserService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Register() {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setemail] = useState("");
  const [roles, setroles] = useState("");

  const [status, setStatus] = useState(1);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = new FormData();
    user.append("name", name);
    user.append("username", username);
    user.append("password", password);
    user.append("gender", gender);
    user.append("email", email);
    user.append("phone", phone);
    user.append("roles", roles);
    user.append("status", status);

    // (async () => {
    //   alert(result.message);
    //   // navigate("/admin/user/index", { replace: true });
    // })();
    try {
      const result = await UserService.store(user);
      setSuccessMessage("Đăng ký thành công");
      //reset lại input
      setname("");
      setusername("");
      setpassword("");
      setgender("");
      setemail("");
      setPhone("");
      setroles("");
      setStatus(1);
    } catch (error) {
      console.error("Error submitting contact:", error);
      setErrorMessage("Đăng ký thất bại");
    }
  };

  return (
    <div>
      <section className="bg-light">
        <div className="container">
          <nav
            style={{ "--bsBreadcrumbDivider": '" > "' }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb py-2 my-0">
              <li className="breadcrumb-item">
                <a className="text-main" href="index.html">
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Đăng ký tài khoản
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <form
          onSubmit={handleSubmit}
          id="idreset"
          encType="multipart/form-data"
        >
          <div className="container">
            <h1 className="fs-2 text-main text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
            <div className="row">
              <ToastContainer />
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="text-main"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Họ tên(*)
                  </label>
                  <input
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="phone"
                    className="text-main"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Điện thoại(*)
                  </label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Điện thoại"
                  />
                </div>
                <div className="mb-3">
                  <label
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    <strong>roles(*)</strong>
                  </label>
                  <input
                    onChange={(e) => setroles(e.target.value)}
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="roles"
                  />
                </div>
                {/* <div className="mb-3">
                  <div className="card">
                    <div className="card-header text-main">Địa chỉ</div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="form-control"
                          placeholder="Nhập địa chỉ"
                        />
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <select name="tinhtp" id="tinhtp" className="form-control">
                            <option value>Chọn Tỉnh/TP</option>
                          </select>
                        </div>
                        <div className="col-4">
                          <select name="quanhuyen" id="quanhuyen" className="form-control">
                            <option value>Chọn Quận/Huyện</option>
                          </select>
                        </div>
                        <div className="col-4">
                          <select name="phuongxa" id="phuongxa" className="form-control">
                            <option value>Chọn Phường/Xã</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="mb-3">
                  <label
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    <strong>Giới tính</strong>
                  </label>
                  <select
                    onChange={(e) => setgender(e.target.value)}
                    name="gender"
                    id="gender"
                    className="form-select"
                  >
                    <option>Chọn giới tinh</option>
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="text-main"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Tên tài khoản(*)
                  </label>
                  <input
                    onChange={(e) => setusername(e.target.value)}
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="text-main"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Email(*)
                  </label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="text-main"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Mật khẩu(*)
                  </label>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password_re"
                    className="text-main"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Xác nhận Mật khẩu(*)
                  </label>
                  <input
                    type="password"
                    name="password_re"
                    id="password_re"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    required
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-main"
                    name="REGISTER"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "center",
                    }}
                  >
                    Đăng ký
                  </button>
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
