import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './component/MainLayout/MainLayout.jsx';
import Home from './component/Pages/Home.jsx';
import PetsSupplies from './component/Pages/PetsSupplies.jsx';
import AddListing from './component/Pages/AddListing.jsx';
import MyListing from './component/Pages/MyListing.jsx';
import MyOrder from './component/Pages/MyOrder.jsx';
import Login from './component/Users/Login.jsx';
import SignUp from './component/Users/SignUp.jsx';
import AuthProvider from './component/AuthProvider/AuthProvider.jsx';
import DetailsPage from './component/ExtraPage/DetailsPage.jsx';
import FilterCategory from './component/ExtraPage/FilterCategory.jsx';
import PrivateRoutes from './component/PrivateRoutes/PrivateRoutes.jsx';
import ErrorPage from './component/ExtraPage/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path:"/pets-supplies",
        element:<PetsSupplies></PetsSupplies>,
        loader:()=>fetch("http://localhost:3000/listings")
      },
      {
        path:"/add-listing",
        element:<PrivateRoutes><AddListing></AddListing>
          </PrivateRoutes>
      },
      {
        path:"/my-listing",
        element:<PrivateRoutes><MyListing></MyListing></PrivateRoutes>
      },
      {
        path:"/my-orders",
        element:<PrivateRoutes><MyOrder></MyOrder></PrivateRoutes>
      },
      {
        path:"/login",
        element:<Login></Login>
     },
     {
        path:"/signup",
        element:<SignUp></SignUp>
     },
     {
     path: "/category-filtered-product/:categoryName",
     element:<FilterCategory></FilterCategory>
     },
     {
      path:'/details-page/:id',
      element:<privateRoutes><DetailsPage></DetailsPage></privateRoutes>,
      loader:({params})=>fetch(`http://localhost:3000/listings/${params.id}`)
     }
    ]
  },
  {
    path:"*",
    element:<ErrorPage />
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

