import { defineStore } from "pinia";
import { instance } from "../plugin";
import Swal from "sweetalert2";

export const useBuyerStore = defineStore("buyerOrder", {
  state: () => ({
    orderBuyer: [],
  }),
  getters: {},
  actions: {
    async PostBuyerOrder(harga_tawar, product_id) {
      await instance
        .post("/buyer/order", {
          product_id: product_id,
          bid_price: harga_tawar,
        })
        .then(() => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Tawaranmu Berhasil dikirim",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    async getBuyerOrder() {
      await instance.get("/buyer/order").then((res) => {
        this.orderBuyer = res.data;
      });
    },
  },
});
