import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../service/UserService";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../../state/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const result = await UserService.login({ username, password });
      console.log(result.user);
      // lưu vào redux và local
      dispatch(setCurrent(result.user));
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Đăng nhập thành công!", {
        onClose: () => {
          if (result.user.roles === "customer") {
            navigate("/");
          } else {
            navigate("/product");
          }
        },
        autoClose: 2000, // Đóng toast sau 2 giây
      });
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login failure
      setMessage(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Đăng Nhập</h2>
              <form onSubmit={handleSubmit} name="logincustomer">
                <button
                  type="button"
                  className="btn btn-facebook btn-block mb-2"
                  style={{
                    backgroundColor: "#3b5998",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  <i className="fab fa-facebook-f"></i> &nbsp; Đăng Nhập với
                  Facebook
                </button>
                <button
                  type="button"
                  className="btn btn-google btn-block mb-4"
                  style={{
                    backgroundColor: "#db4437",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textAlign: "center",
                  }}
                >
                  <i className="fab fa-google"></i> &nbsp; Đăng Nhập với Google
                </button>
                <div className="form-group">
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
                    Tên đăng nhập:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="Nhập tài khoản đăng nhập"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="form-group">
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
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <a href="#" className="float-right">
                    Quên mật khẩu?
                  </a>
                  <label className="float-left custom-control custom-checkbox">
                    {" "}
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      defaultChecked
                    />{" "}
                    <div className="custom-control-label"> Nhớ mật khẩu</div>{" "}
                  </label>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
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
                  Đăng Nhập
                </button>
                {message && <p>{message}</p>}
                <ToastContainer position="top-right" autoClose={500} />
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
                <p className={message ? "text-success" : "text-danger"}>
                  {message}
                </p>
              </form>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "black",
                  }}
                >
                  <span>Bạn chưa có tài khoản?</span>
                  <a
                    href="http://localhost:3000/register"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Đăng ký
                  </a>
                </div>
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
