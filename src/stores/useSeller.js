import { defineStore } from "pinia";
import { instance } from "../plugin";

export const useSellerStore = defineStore("seller", {
  state: () => ({
    allProduct: [],
    orderProduct: [],
    banner: [],
    penawar: {},
  }),
  getters: {},
  actions: {
    async onGetProduct() {
      instance
        .get("/seller/product")
        .then((res) => {
          this.allProduct = res.data;
        })
        .catch(() => {});
    },
    async getSellerProduct() {
      await instance
        .get("/seller/order", {
          params: {
            status: "",
          },
        })
        .then(({ data }) => {
          this.orderProduct = data;
        });
    },
    // ======== Get Seller Banner =====
    async getSellerBanner() {
      await instance.get("/seller/banner").then((res) => {
        this.banner = res.data;
      });
    },
    // ======== Get Penawar product ===
    async getPenawarProduct(getPenawarProduct) {
      await instance.get("/seller/order/" + getPenawarProduct).then((res) => {
        this.penawar = res.data;
      });
    },
    // ======== Post Seller Order ===
    async postSellerOrder(id, status) {
      await instance.patch("/seller/order/" + id, status);
    },
  },
});
