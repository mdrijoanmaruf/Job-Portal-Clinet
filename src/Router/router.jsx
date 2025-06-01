import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import PageNotFound from "../Pages/ErrorPage/PageNotFound";
import Regester from "../Pages/Regester/Regester";
import Login from "../Pages/Login/Login";
import PrivacyPolicy from "../Extra/PrivacyPolicy";
import TermsOfService from "../Extra/TermsOfService";
import CookiePolicy from "../Extra/CookiePolicy";
import Accessibility from "../Extra/Accessibility";
import JobDetails from "../Pages/JobDetails/JobDetails";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../Pages/JobApply/JobApply";
import MyApplications from "../Pages/MyApplications/MyApplications";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <PageNotFound></PageNotFound>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/register',
                Component: Regester
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: 'job/:id',
                Component: JobDetails,
                loader: async ({ params }) => {
                  const response = await fetch(`https://job-portal-server-sooty-theta.vercel.app/jobs/${params.id}`)
                  if (!response.ok) {
                    throw new Error(`Failed to load job: ${response.status} ${response.statusText}`)
                  }
                  return response.json()
                }
            },
            {
                path:'jobApply/:id',
                element: <PrivateRoute>
                    <JobApply></JobApply>
                </PrivateRoute>
            },
            {
                path: '/my-applications',
                element: <PrivateRoute>
                    <MyApplications></MyApplications>
                </PrivateRoute>
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/privacy',
                Component: PrivacyPolicy
            },
            {
                path: '/terms',
                Component: TermsOfService
            },
            {
                path: '/cookies',
                Component: CookiePolicy
            },
            {
                path: '/accessibility',
                Component: Accessibility
            },
            
        ]
    }
])