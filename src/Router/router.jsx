import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import PageNotFound from "../Pages/ErrorPage/PageNotFound";
import Regester from "../Pages/Regester/Regester";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <PageNotFound></PageNotFound>,
        children: [
            {
                index: true,
                Component:Home
            },
            {
                path: '/register',
                Component: Regester
            },
            {
                path: '/login',
                Component: Login
            }
        ]
    }
])