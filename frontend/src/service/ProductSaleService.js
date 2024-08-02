import httpAxios from "../Api/httpAxios";
const ProductSaleService = {
  getList: (status) => {
    return httpAxios.get(`store/index/${status}`);
  },
  getById: (id) => {
    return httpAxios.get(`store/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`store/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`store/update/${id}`, data);
  },
  status: (id) => {
    return httpAxios.get(`store/status/${id}`);
  },
  delete: (id) => {
    return httpAxios.get(`store/delete/${id}`);
  },
  restore: (id) => {
    return httpAxios.get(`store/restore/${id}`);
  },
  destroy: (id) => {
    return httpAxios.delete(`store/destroy/${id}`);
  },
  // thêm product sale
  sale: () => {
    return httpAxios.get(`product/sale`);
  },
  storesale: (data) => {
    return httpAxios.post(`product/storesale`, data);
  },
};
export default ProductSaleService;