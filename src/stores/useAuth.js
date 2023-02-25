import router from "../router";
import { defineStore } from "pinia";
import { instance } from "../plugin/Api";
import { Textsearch } from "../stores/product";
import Swal from "sweetalert2";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: {},
    userData: JSON.parse(localStorage.getItem("users")) || null,
    product: [],
    productId: [],
    productSellerId: [],
    categori: [],
    perPage: 30,
    idCategori: 0,
    Textsearch: "",
    loading: false,
  }),
  getters: {
    // ======== Access Token ========
    getToken() {
      return this.userData?.access_token;
    },
  },
  actions: {
    // =========== Change Password ============
    async changepass(data) {
      await instance.put("/auth/change-password", data).then(() => {
        router.push("/tokosaya");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    // =========== LogOut ============
    logOut() {
      localStorage.removeItem("users");
      this.userData = null;
      router.push("/login");
    },
    // =========== Load More =======
    loadMore() {
      this.perPage += 30;
    },
    // =========== Post Register =========
    async register(payload) {
      await instance
        .post("/auth/register", payload)
        .then(() => {
          instance
            .post("/auth/login", {
              email: payload.email,
              password: payload.password,
            })
            .then((res) => {
              localStorage.setItem("users", JSON.stringify(res.data));
              this.userData = res.data;
              router.push("/");
            });
          router.push("/login");
        })
        .catch(() => {
          console.log("error");
        });
    },
    // =========== Post Login =============
    async postUsers(getLogin) {
      await instance
        .post("/auth/login", getLogin)
        .then((res) => {
          localStorage.setItem("users", JSON.stringify(res.data));
          this.userData = res.data;
          router.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    // ========== Get User ==============
    async getUser() {
      await instance.get("/auth/user").then((res) => {
        this.userId = res.data;
      });
    },

    async putUser(data) {
      await instance.put("/auth/user", data).then(() => {
        router.push("/tokosaya");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    // =========== Get Category ======
    async getCategory() {
      await instance.get("/seller/category").then(({ data }) => {
        console.log();
        this.categori = data;
      });
    },
    // =========== Get Buyer Product ===
    async getProduct() {
      this.loading = true;
      await instance
        .get("/buyer/product", {
          params: {
            page: 1,
            per_page: this.perPage,
            category_id: this.idCategori || null,
            search: Textsearch.value || null,
          },
        })
        .then(({ data }) => {
          this.product = data;
          this.loading = false;
        });
    },
    // =========== Get Buyer Detail Product =======
    async getProductId(idProduct) {
      await instance.get("/buyer/product/" + idProduct).then((Response) => {
        this.productId = Response.data;
      });
    },
    // =========== Get Seller Detail Product =======
    async getProductIdSeller(idProduct) {
      await instance.get("/seller/product/" + idProduct).then((Response) => {
        this.productSellerId = Response.data;
      });
    },
    // =========== Post Seller Detail Product =======
    async postProduct(ttt) {
      await instance.post("/seller/product", ttt).then(() => {
        router.push("/tokosaya");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product berhasil ditambah",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    // =========== Post Seller Detail Product =======
    async delProduct(item) {
      await instance.delete("/seller/product/" + item).then(() => {
        router.push("/tokosaya");
      });
    },
  },
});
