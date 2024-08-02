import Home from "../pages/frontend/Home/Main";
//cart
import Cart from "../pages/frontend/Cart/Cart"
import Checkout from "../pages/frontend/Cart/CheckOut";

import Blog from "../pages/frontend/Blog/Blog"
import BlogDetail from "../pages/frontend/Blog/BlogDetail";

import Profile from "../pages/frontend/Profile/Profile"
import ProfileOrder from "../pages/frontend/Profile/ProfileOrder";


//login
import Contact from "../pages/frontend/Contact/Contact";
import Login from "../pages/frontend/Login/Login";
import ChangePass from "../pages/frontend/Login/ChangePassword";

import Register from "../pages/frontend/Login/Register";

//product
import Product from "../pages/frontend/Product/Product";
import ProductSearch from "../pages/frontend/Product/ProductSearch";
import ProductBrand from "../pages/frontend/Product/ProductBrand";
import ProductCategory from "../pages/frontend/Product/ProductCategory";
import ProductDetail from "../pages/frontend/Product/ProductDetail";


const RouteSite = [
  { path: "/", component: Home },
  //product
  {
    path: "/product_detail/:slug",
    component: ProductDetail,
  },
  {
    path: "/product",
    component: Product,
  },
  {
    path: "/product_category/:slug",
    component: ProductCategory,
  },

  { path: "/product_brand/:slug", component: ProductBrand },
  { path: "/product_search/:search", component: ProductSearch },

  //login
  { path: "/contact", component: Contact },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  //cart
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },

  {
    path: "/blog",
    component: Blog,
  },
  { path: "/blog_detail/:slug", component: BlogDetail },
  { path: "/profile", component: Profile },
  { path: "/change_pass", component: ChangePass },

  { path: "/profile_order", component: ProfileOrder },
];
export default RouteSite;
