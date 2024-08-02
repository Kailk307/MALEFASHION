import BrandEdit from "../pages/backend/brand/BrandEdit";
import BrandIndex from "../pages/backend/brand/BrandIndex";
import BrandShow from "../pages/backend/brand/BrandShow";
import BrandTrash from "../pages/backend/brand/BrandTrash";
import CategoryIndex from "../pages/backend/category/CategoryIndex";
import CategoryEdit from "../pages/backend/category/CategoryEdit";
import CategoryShow from "../pages/backend/category/CategoryShow";
import ContactIndex from "../pages/backend/contact/ContactIndex";
import ContactReply from "../pages/backend/contact/ContactReply";
import ContactShow from "../pages/backend/contact/ContactShow";
// import MenuIndex from "../pages/backend/menu/MenuIndex";
// import MenuEdit from "../pages/backend/menu/MenuEdit";
import OrderIndex from "../pages/backend/order/OrderIndex";
import OrderShow from "../pages/backend/order/OrderShow";
import PostIndex from "../pages/backend/post/PostIndex";
import PostEdit from "../pages/backend/post/PostEdit";
import PostCreate from "../pages/backend/post/PostCreate";
import PostShow from "../pages/backend/post/PostShow";
// import BannerIndex from "../pages/backend/banner/BannerIndex";
// import BannerEdit from "../pages/backend/banner/BannerEdit";
// import BannerShow from "../pages/backend/banner/BannerShow";
// import BannerCreate from "../pages/backend/banner/BannerCreate";
// import TopicIndex from "../pages/backend/topic/TopicIndex";
// import TopicEdit from "../pages/backend/topic/TopicEdit";
// import TopicShow from "../pages/backend/topic/TopicShow";
import ProductIndex from "../pages/backend/product/ProductIndex";
import ProductCreate from "../pages/backend/product/ProductCreate";
import ProductEdit from "../pages/backend/product/ProductEdit";
import ProductShow from "../pages/backend/product/ProductShow";
import ProductTrash from "../pages/backend/product/ProductTrash"
import UserIndex from "../pages/backend/user/UserIndex";
import UserEdit from "../pages/backend/user/UserEdit";
import UserCreate from "../pages/backend/user/UserCreate";
import UserShow from "../pages/backend/user/UserShow";
// import BannerTrash from "../pages/backend/banner/BannerTrash";
import CategoryTrash from "../pages/backend/category/CategoryTrash";
import ContactTrash from "../pages/backend/contact/ContactTrash";

// import PageIndex from "../pages/backend/page/PageIndex";
// import PageEdit from "../pages/backend/page/PageEdit";
// import PageShow from "../pages/backend/page/PageShow";
// import PageCreate from "../pages/backend/page/PageCreate";
// import PageTrash from "../pages/backend/page/PageTrash";

const RouteAdmin = [
  { path: "/admin/brand/index", component: BrandIndex },
  { path: "/admin/brand/edit/:id", component: BrandEdit },
  { path: "/admin/brand/show/:id", component: BrandShow },
  { path: "/admin/brand/trash/", component: BrandTrash },

  { path: "/admin/category/index", component: CategoryIndex },
  { path: "/admin/category/edit/:id", component: CategoryEdit },
  { path: "/admin/category/show/:id", component: CategoryShow },
  { path: "/admin/category/trash/", component: CategoryTrash },

  // { path: "/admin/banner/index", component: BannerIndex },
  // { path: "/admin/banner/create", component: BannerCreate },
  // { path: "/admin/banner/edit/:id", component: BannerEdit },
  // { path: "/admin/banner/show/:id", component: BannerShow },
  // { path: "/admin/banner/trash/", component: BannerTrash },

  { path: "/admin/contact/index", component: ContactIndex },
  { path: "/admin/contact/reply/:id", component: ContactReply },
  { path: "/admin/contact/show/:id", component: ContactShow },
  { path: "/admin/contact/trash", component: ContactTrash },

  // { path: "/admin/menu/index", component: MenuIndex },
  // { path: "/admin/menu/edit", component: MenuEdit },

  { path: "/admin/order/index", component: OrderIndex },
  { path: "/admin/order/show", component: OrderShow },

  { path: "/admin/post/index", component: PostIndex },
  { path: "/admin/post/edit/:id", component: PostEdit },
  { path: "/admin/post/create", component: PostCreate },
  { path: "/admin/post/show/:id", component: PostShow },

  // { path: "/admin/topic/index", component: TopicIndex },
  // { path: "/admin/topic/edit/:id", component: TopicEdit },
  // { path: "/admin/topic/show/:id", component: TopicShow },

  { path: "/admin/product/index", component: ProductIndex },
  { path: "/admin/product/edit/:id", component: ProductEdit },
  { path: "/admin/product/create", component: ProductCreate },
  { path: "/admin/product/show/:id", component: ProductShow },
  { path: "/admin/product/trash/", component: ProductTrash},

  { path: "/admin/user/index/", component: UserIndex },
  { path: "/admin/user/create/", component: UserCreate },
  { path: "/admin/user/edit/:id", component: UserEdit },
  { path: "/admin/user/show/:id", component: UserShow },

  // { path: "/admin/page/index", component: PageIndex },
  // { path: "/admin/page/create", component: PageCreate },
  // { path: "/admin/page/edit/:id", component: PageEdit },
  // { path: "/admin/page/show/:id", component: PageShow },
  // { path: "/admin/page/trash/", component: PageTrash },
];

export default RouteAdmin;
