import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactService from "../../../service/ContactService";
export default function ContactReply() {


    const { id } = useParams();
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
          const result = await ContactService.show(id);
          const contact = result.contact;
          setName(contact.name);
          setPhone(contact.phone);
          setEmail(contact.email);
          setTitle(contact.title);
          setContent(contact.content);
          setStatus(contact.status);
        })();
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
                  <h1 className="d-inline">Trả lời liên hệ</h1>
                  <div className="text-end">
                    <a href="contact_index.html" className="btn btn-sm btn-success">
                      <i className="fa fa-arrow-left" /> Về danh sách
                    </a>
                    <button type="submit" className="btn btn-success btn-sm text-end">
                      <i className="fa fa-save" aria-hidden="true" /> Trả lời liên hệ
                    </button>
                  </div>
                </section>
                <section className="content-body my-2">
                  <div className="row">
                    <div className="col-4">
                      <div className="mb-3">
                        <label htmlFor="name" className="text-main">
                          Họ tên
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        value={name}
                          className="form-control"
                          placeholder="Nhập họ tên"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label htmlFor="phone" className="text-main">
                          Điện thoại
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                          className="form-control"
                          placeholder="Nhập điện thoại"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label htmlFor="email" className="text-main">
                          Email
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          className="form-control"
                          placeholder="Nhập email"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="title" className="text-main">
                          Tiêu đề
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          className="form-control"
                          placeholder="Nhập tiêu đề"
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="content_old" className="text-main">
                          Nội dung
                        </label>
                        <textarea
                          onChange={(e) => setContent(e.target.value)}
                          value={content}
                          className="form-control"
                          placeholder="Nhập nội dung liên hệ"
                          readOnly
                          defaultValue={""}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="content" className="text-main">
                          Nội dung trả lời
                        </label>
                        <textarea
                          name="content"
                          id="content"
                          className="form-control"
                          placeholder="Nhập nội dung liên hệ"
                          rows={5}
                          defaultValue={""}
                        />
                      </div>
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
