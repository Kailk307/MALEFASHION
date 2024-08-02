import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomerIndex() {
  return (
 <form action method="post">
  <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-12">
            <h3 className="d-inline">Cấu hình</h3>
          </div>
        </div>
      </div>
    </section>
    <section className="content p-3">
      <div className="card">
        <div className="card-body">
          <input type="hidden" name="id" defaultValue />
          <div className="mb-3">
            <label htmlFor="author">Tác giả</label>
            <input type="text" name="author" defaultValue id="author" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" defaultValue id="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Điện thoại</label>
            <input type="text" name="phone" defaultValue id="phone" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="zalo">Zalo</label>
            <input type="text" name="zalo" defaultValue id="zalo" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="facebook">Facebook cá nhân</label>
            <input type="text" name="facebook" defaultValue id="facebook" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Địa chỉ</label>
            <input type="text" name="address" defaultValue id="address" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="youtube">Kênh Youtube</label>
            <input type="text" name="youtube" defaultValue id="youtube" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="metadesc">Mô tả seo</label>
            <textarea name="metadesc" id="metadesc" className="form-control" defaultValue={""} />
          </div>
          <div className="mb-3">
            <label htmlFor="metakey">Từ khoa seo</label>
            <textarea name="metakey" id="metakey" className="form-control" defaultValue={""} />
          </div>
          <div className="mb-3">
            <label htmlFor="status">Trạng thái</label>
            <select name="status" id="status" className="form-control">
              <option value={1}>Online
              </option>
              <option value={2}>Offline
              </option>
            </select>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              <i className="fa fa-save" aria-hidden="true" /> Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</form>

  );
}
