import axios from "axios";

const instance = axios.create({
  baseURL: "https://market-final-project.herokuapp.com",
});
// API Product
const getProduct = async (params) =>
  await instance.get("/buyer/product", { params: params });
// API Id Product
const getIdProduct = async (idProduct) =>
  await instance.get("/buyer/product/" + idProduct);
// API kategori
const getCategori = async () => await instance.get("/seller/category");

export { getProduct, getCategori, getIdProduct, instance };
