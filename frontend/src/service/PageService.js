import httpAxios from "../httpAxios";

const PageService = {
  //lấy ra danh sách
  index: () => {
    return httpAxios.get(`page/index`);
  },
  show: (id) => {
    return httpAxios.get(`page/show/${id}`);
  },
  store: (data) => {
    return httpAxios.page(`page/store`, data);
  },
  update: (data, id) => {
    return httpAxios.page(`page/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`page/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`page/status/${id}`);
  },
  pagenew: () => {
    return httpAxios.get("page/pagenew");
  },
  delete: (data, id) => {
    return httpAxios.put(`page/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("page/thungrac");
  },
};
export default PageService;
