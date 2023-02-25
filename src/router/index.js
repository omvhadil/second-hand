import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/PrimaryLayout.vue"),
      children: [
        {
          path: "/",
          name: "Home View",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/detailsellerproduct/:id",
          name: "deatil seller peoduct",
          component: () => import("../views/detailSellerProduct.vue"),
        },
        {
          path: "/reviewproduct",
          name: "review",
          props: (router) => ({
            ...router.params,
          }),
          component: () => import("../views/ReviewProduct.vue"),
        },
        {
          path: "/tokosaya",
          name: "toko saya",
          component: () => import("../views/productPenjual/TokoSaya.vue"),
          children: [
            {
              path: "",
              name: "toko saya",
              component: () =>
                import("../views/productPenjual/ProductToko.vue"),
            },
            {
              path: "/tokosaya/diminati",
              name: "diminati",
              component: () => import("../views/productPenjual/Diminati.vue"),
            },
            {
              path: "/tokosaya/terjual",
              name: "terjual",
              component: () => import("../views/productPenjual/Tejual.vue"),
            },
            {
              path: "/statistik",
              name: "statistik",
              component: () => import("../views/productPenjual/Statistik.vue"),
            },
          ],
        },
        {
          path: "/profilesaya",
          name: "profile saya",
          component: () => import("../views/ProfileSaya.vue"),
        },
        {
          path: "/tawaransaya",
          name: "tawaran saya",
          component: () => import("../views/TawaranSaya.vue"),
        },
        {
          path: "/forminfoakun",
          name: "Info Akun",
          component: () => import("../views/FormInfoAkun.vue"),
        },
        {
          path: "/formtambahproduct",
          name: "Form Tambah Product",
          component: () => import("../views/FormTambahProduct.vue"),
        },
        {
          path: "/infopenawar/:id",
          name: "Info Penawar",
          component: () => import("../views/InfoPenawar.vue"),
        },
        {
          path: "/detailproduct/:id",
          name: "Detail Product",
          component: () => import("../views/DetailProoduct.vue"),
        },
        {
          path: "/wishlist",
          name: "Wishlist",
          component: () => import("../views/Wishlist.vue"),
        },
        {
          path: "/changepassword",
          name: "changepassword",
          component: () => import("../views/UbahPassword.vue"),
        },
        {
          path: "/notification",
          name: "notification",
          component: () => import("../views/NotifMobile.vue"),
        },
        {
          path: "/usermobile",
          name: "usermobile",
          component: () => import("../views/UserMobile.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/FullLayout.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/Login.vue"),
        },
        {
          path: "/register",
          name: "register",
          component: () => import("../views/Register.vue"),
        },
      ],
    },
  ],
});

router.afterEach(() => {
  window.scroll(0, 0);
});

export default router;
