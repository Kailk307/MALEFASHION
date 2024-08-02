import httpAxios from "../httpAxios";

const BannerService = {
  //lấy ra danh sách
  index: () => {
    return httpAxios.get("banner/index");
  },
  index1: () => {
    return httpAxios.get("banner/index1");
  },
  show: (id) => {
    return httpAxios.get(`banner/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`banner/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`banner/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`banner/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`banner/status/${id}`);
  },
  delete: (data, id) => {
    return httpAxios.put(`banner/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("banner/thungrac");
  },
};
export default BannerService;
