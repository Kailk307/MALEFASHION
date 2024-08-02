import httpAxios from "../httpAxios";

const PostService = {
  //lấy ra danh sách
  index: (page) => {
    return httpAxios.get(`post/index?page=${page}`);
  },
  show: (id) => {
    return httpAxios.get(`post/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`post/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`post/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`post/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`post/status/${id}`);
  },
  postnew: () => {
    return httpAxios.get("post/postnew");
  },
  delete: (data, id) => {
    return httpAxios.put(`post/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("post/thungrac");
  },
  postnew: () => {
    return httpAxios.get("post/postnew");
  },
  PostDetail: (slug) => {
    return httpAxios.get(`post/post_detail/${slug}`);
  },

  postAll: (page) => {
    return httpAxios.get(`post/post_all?page=${page}`);
  },
  // post_topic
  postTopic: (slug, page) => {
    return httpAxios.get(`post/post_topic/${slug}?page=${page}`);
  },
};
export default PostService;
