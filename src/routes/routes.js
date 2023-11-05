import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main";
import About from "../pages/About";
import AddProduct from "../pages/Dashboard/AddProduct";
import ProductList from "../pages/Dashboard/ProductList";
import Home from "../pages/Home";
import TopRated from "../pages/TopRated";
import ProductDetails from "../pages/ProductDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "product-details",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <ProductList />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

export default routes;
