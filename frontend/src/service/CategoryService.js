import httpAxios from "../httpAxios";

const CategoryService = {
  //lấy ra danh sách
  index: () => {
    return httpAxios.get("category/index");
  },
  index1: () => {
    return httpAxios.get("category/index1");
  },
  show: (id) => {
    return httpAxios.get(`category/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`category/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`category/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`category/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`category/status/${id}`);
  },
  delete: (data, id) => {
    return httpAxios.put(`category/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("category/thungrac");
  },
};
export default CategoryService;
