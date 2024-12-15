import React from "react";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Layout from "../components/Layout";
import Product from "../screens/product";
import CartPage from "../screens/addToCart";
import ProductForm from "../screens/addProduct";
import AddressPage from "../screens/userAddress";
import ResetPassword from "../screens/resetPassword";
import ForgotPassword from "../screens/forgotPassword";
import ProductDetailCard from "../screens/detailProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "../components/ProtectedRoutes/PublicRoute";
import PrivateRoute from "../components/ProtectedRoutes/PrivateRoute";

export const Router = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {/* Wrap all public routes with PublicRoute */}
          <Route element={<PublicRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Route>
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Product />} />
              <Route path="/addProduct/:id?" element={<ProductForm />} />
              <Route path="/detail/:id" element={<ProductDetailCard />} />
              <Route path="/addTOCart" element={<CartPage />} />
              <Route path="/address" element={<AddressPage />} />
              AddressPage
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
