import httpAxios from "../httpAxios";

const TopicService = {
  //lấy ra danh sách
  index: () => {
    return httpAxios.get("topic/index");
  },
  show: (id) => {
    return httpAxios.get(`topic/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`topic/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`topic/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`topic/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`topic/status/${id}`);
  },
  delete: (data, id) => {
    return httpAxios.put(`topic/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("topic/thungrac");
  },
};
export default TopicService;
