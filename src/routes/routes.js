import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Blogs from "../pages/Blogs/Blogs";
import BookDetails from "../pages/BookDetails/BookDetails";
import Categories from "../pages/Categories/Categories";
import SingleCategory from "../pages/Categories/SingleCategory/SingleCategory";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../pages/Dashboard/AllSellers/AllSellers";
import MyBuyers from "../pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../pages/Dashboard/ReportedItems/ReportedItems";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: () => axios.get("https://rebook-server-nine.vercel.app/categories"),
      },
      {
        path: "/categories/:name",
        element: (
          <PrivateRoute>
            <SingleCategory />
          </PrivateRoute>
        ),
        // loader: () => axios.get('https://rebook-server-nine.vercel.app/categories')
      },
      {
        path: "/categories/:category/:name",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <SellerRoute>
                <MyProducts />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/addproduct",
            element: (
              <SellerRoute>
                <AddProduct />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/mybuyers",
            element: (
              <SellerRoute>
                <MyBuyers />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/myorders",
            element: (
              <BuyerRoute>
                <MyOrders />
              </BuyerRoute>
            ),
          },
          {
            path: "/dashboard/sellers",
            element: (
              <AdminRoute>
                <AllSellers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/buyers",
            element: (
              <AdminRoute>
                <AllBuyers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/reported",
            element: (
              <AdminRoute>
                <ReportedItems />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
