import { defineStore } from "pinia";
import { instance } from "../plugin";

export const useWhishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: [],
    loading: false,
  }),
  getters: {},
  actions: {
    async postWishlist(productid) {
      await instance.post("/buyer/wishlist", {
        product_id: productid,
      });
    },
    async getWislist() {
      this.loading = true;
      await instance.get("/buyer/wishlist").then((res) => {
        this.loading = false;
        this.wishlist = res.data;
      });
    },
    async delWishlist(idProduct) {
      await instance.delete("/buyer/wishlist/" + idProduct).then(() => {
        this.getWislist();
      });
    },
  },
});
