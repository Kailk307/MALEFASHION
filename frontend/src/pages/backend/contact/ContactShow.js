import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from "react-router-dom";
import ContactService from "../../../service/ContactService";
export default function ContactShow() {
    const [contact, setContact] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      const fetchContact = async () => {
        try {
          const result = await ContactService.show(id);
          setContact(result.contact);
        } catch (error) {
          console.error("Error fetching brand: ", error);
        }
      };
      fetchContact();
    }, [id])
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
                                        <a href="contact_index.html" className="btn btn-primary btn-sm">
                                        <i className="fa fa-arrow-left" /> Về danh sách
                                        </a>
                                        <a href="contact_reply.html" className="btn btn-success btn-sm">
                                        <i className="fa fa-edit" /> Sửa
                                        </a>
                                        <a href className="btn btn-danger btn-sm">
                                        <i className="fa fa-trash" /> Xóa
                                        </a>
                                    </div>
                                    </div>
                                </section>
                                <section className="content-body my-2">
                                    <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Tên</th>
                                        <th>Điện thoại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contact ? (
                                             <tr>
                                            <td>{contact.id}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.phone}</td>
                                            </tr>
                                        ) : (
                                            <p>Loading ....</p>
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
