import "./App.css";
import "./assets/css/style.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/elegant-icons.css";
import "./assets/css/font-awesome.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOutSite from "./layouts/LayoutSite";
import AppRoute from "./router";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOutSite />}>
          {AppRoute.RouteSite.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} key={index} element={<Page />} />;
          })}
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          {AppRoute.RouteAdmin.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} key={index} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
