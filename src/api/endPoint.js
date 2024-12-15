import api from "./index";

export const signup = async (data) => {
  return await api.post("signup", data);
};

export const login = async (data) => {
  return await api.post("login", data);
};

export const forgotPassword = async (data) => {
  return await api.post("forgotPassword", data);
};

export const resetPassword = async (data, token) => {
  return await api.post(`resetPassword/${token}`, data);
};

export const postProduct = async (data) => {
  return await api.post("postProduct", data);
};

export const getProducts = async () => {
  return await api.get("getProducts");
};

export const deleteProduct = async (productId) => {
  return await api.delete(`deleteProduct/${productId}`);
};

export const getProductById = async (productId) => {
  return await api.get(`getProductById/${productId}`);
};

export const updateProduct = async (id, data) => {
  return await api.put(`updateProduct/${id}`, data);
};

export const UserAdress = async (data) => {
  return await api.post("address", data);
};
