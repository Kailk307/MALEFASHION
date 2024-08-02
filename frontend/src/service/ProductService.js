import httpAxios from "../httpAxios";

const ProductService = {
  // code cũ
  index: () => {
    return httpAxios.get(`product/index`);
  },
  show: (id) => {
    return httpAxios.get(`product/show/${id}`);
  },

  store: (data) => {
    return httpAxios.post(`product/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`product/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`product/destroy/${id}`);
  },
  delete: (data, id) => {
    return httpAxios.put(`product/delete/${id}`, data);
  },
  thungrac: () => {
    return httpAxios.get("product/thungrac");
  },
  status: (id) => {
    return httpAxios.get(`product/status/${id}`);
  },
  productsale: (limit) => {
    return httpAxios.get(`product/productsale/${limit}`);
  },
  productBrand: (slug, page) => {
    return httpAxios.get(`product/product_brand/${slug}?page=${page}`);
  },
  producthotbuy: (limit) => {
    return httpAxios.get(`product/producthotbuy/${limit}`);
  },
  product_all: (page) => {
    return httpAxios.get(`product/product_all?page=${page}`);
  },

  getStore: () => {
    return httpAxios.get(`product/import`);
  },
  storeProductStore: (productstore) => {
    return httpAxios.post(`product/storeimport`, productstore);
  },
  productCategoryHome: (id) => {
    return httpAxios.get(`product_category_home/${id}`);
  },

  productAll: (page) => {
    return httpAxios.get(`product/product_all?page=${page}`);
  },
  productCategory: (slug, page) => {
    return httpAxios.get(`product/product_category/${slug}?page=${page}`);
  },

  productDetail: (slug) => {
    return httpAxios.get(`product_detail / ${slug}`);
  },

  productnew: (limit) => {
    console.log("🚀 ~ limit:", limit);
    return httpAxios.get(`product/productnew/${limit}`);
  },
  product_detail: (slug) => {
    return httpAxios.get(`product/product_detail/${slug}`);
  },
  product_category_home: (id) => {
    return httpAxios.get(`product/product_category_home/${id}`);
  },
  sale: () => {
    return httpAxios.get(`product/sale`);
  },
  storesale: (data) => {
    return httpAxios.post(`product/storesale`, data);
  },
  search: (sreach) => {
    return httpAxios.get(`product/search/${sreach}`);
  },

  productAll_filter_price: (page, min, max, sort_order) => {
    // hoàn thiện
    console.log("🚀 ~ min:", min, "max:", max, "sort_order:", sort_order);
    if (min === 0 && max === 0) {
      // nếu trường hợp người dùng ko truyền thì gọi all product
      return httpAxios.get(
        `product/product_all_filter?page=${page}&sort_order=${sort_order}`
      );
    } else {
      return httpAxios.get(
        `product/product_all_filter?page=${page}&min_price=${min}&max_price=${max}&sort_order=${sort_order}`
      );
    }
  },
  productCategory_price: (slug, page, min, max, sort_order) => {
    // hoàn thiện
    console.log("🚀 ~ min:", min, "max:", max, "sort_order:", sort_order);
    if (min === 0 && max === 0) {
      // nếu trường hợp người dùng ko truyền thì gọi all product
      return httpAxios.get(
        `product/product_category_filter/${slug}?page=${page}&sort_order=${sort_order}`
      );
    } else {
      return httpAxios.get(
        `product/product_category_filter/${slug}?page=${page}&min_price=${min}&max_price=${max}&sort_order=${sort_order}`
      );
    }
  },
  productBrand_price: (slug, page, min, max, sort_order) => {
    // hoàn thiện
    console.log("🚀 ~ min:", min, "max:", max, "sort_order:", sort_order);
    if (min === 0 && max === 0) {
      // nếu trường hợp người dùng ko truyền thì gọi all product
      return httpAxios.get(
        `product/product_brand_filter/${slug}?page=${page}&sort_order=${sort_order}`
      );
    } else {
      return httpAxios.get(
        `product/product_brand_filter/${slug}?page=${page}&min_price=${min}&max_price=${max}&sort_order=${sort_order}`
      );
    }
  },
  addComment: (commentData) => {
    return httpAxios.post("/comments", commentData); // Đảm bảo bạn có endpoint `comment/store` trong Laravel để xử lý yêu cầu này
  },
};
export default ProductService;
