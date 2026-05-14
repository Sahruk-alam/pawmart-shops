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
        element:<AddListing></AddListing>
      },
      {
        path:"/my-listing",
        element:<MyListing></MyListing>
      },
      {
        path:"/my-orders",
        element:<MyOrder></MyOrder>
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
      path:"/details-page:id",
      element:<DetailsPage></DetailsPage>
     },
     {
     path: "/category-filtered-product/:categoryName",
     element:<FilterCategory></FilterCategory>
     }
    ]
  },
  

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

