import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Categories from "../pages/Categories/Categories";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../pages/Dashboard/AllSellers/AllSellers";
import MyBuyers from "../pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../pages/Dashboard/ReportedItems/ReportedItems";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/categories',
                element: <Categories />,
                loader: () => axios.get('http://localhost:5000/categories')
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <SellerRoute><MyProducts /></SellerRoute>
                    },
                    {
                        path: '/dashboard/addproduct',
                        element: <SellerRoute><AddProduct /></SellerRoute>
                    },
                    {
                        path: '/dashboard/mybuyers',
                        element: <SellerRoute><MyBuyers /></SellerRoute>
                    },
                    {
                        path: '/dashboard/myorders',
                        element: <BuyerRoute><MyOrders /></BuyerRoute>
                    },
                    {
                        path: '/dashboard/sellers',
                        element: <AdminRoute><AllSellers /></AdminRoute>
                    },
                    {
                        path: '/dashboard/buyers',
                        element: <AdminRoute><AllBuyers /></AdminRoute>
                    },
                    {
                        path: '/dashboard/reported',
                        element: <AdminRoute><ReportedItems /></AdminRoute>
                    },
                ]
            }
        ]
    }
])

export default router;