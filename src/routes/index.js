import React from "react";
import Layout from "../components/Layout";
import Login from "../screens/auth/login";
import Signup from "../screens/auth/signup";
import Product from "../screens/home/product";
import CartPage from "../screens/home/addToCart";
import ProductForm from "../screens/home/addProduct";
import AddressPage from "../screens/address/userAddress";
import ResetPassword from "../screens/auth/resetPassword";
import ForgotPassword from "../screens/auth/forgotPassword";
import ProductDetailCard from "../screens/home/detailProduct";
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
              <Route path="auth/signup" element={<Signup />} />
              <Route path="auth/forgotPassword" element={<ForgotPassword />} />
              <Route path="auth/resetPassword" element={<ResetPassword />} />
            </Route>
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="home/products" element={<Product />} />
              <Route path="home/addProduct/:id?" element={<ProductForm />} />
              <Route path="home/detail/:id" element={<ProductDetailCard />} />
              <Route path="home/addTOCart" element={<CartPage />} />
              <Route path="address/userAddress" element={<AddressPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
