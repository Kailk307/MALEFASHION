import httpAxios from "../httpAxios";

const ContactService = {
  //lấy ra danh sách
  index: () => {
    return httpAxios.get("contact/index");
  },
  index1: () => {
    return httpAxios.get("contact/index1");
  },
  show: (id) => {
    return httpAxios.get(`contact/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`contact/store`, data);
  },
  store1: (data) => {
    return httpAxios.post(`contact/store1`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`contact/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`contact/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`contact/status/${id}`);
  },
  delete: (data, id) => {
    return httpAxios.put(`contact/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("contact/thungrac");
  },
};
export default ContactService;
