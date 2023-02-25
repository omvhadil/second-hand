<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { debounce } from "lodash";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Textsearch } from "../stores/product";
import { useAuthStore, useNotifStore } from "../stores";
import { formatDate } from "../plugin";
import { onClickOutside } from "@vueuse/core";

const autStore = useAuthStore();
const router = useRouter();
const target = ref();
const dropdown = reactive({
  profile: false,
  notif: false,
});

onClickOutside(target, () => {
  (dropdown.notif = false), (dropdown.profile = false);
});
const navbar = ref(null);

window.onscroll = function () {
  var scrollUp = window.pageYOffset;
  if (scrollUp > 80) {
    navbar.value.classList.add("bg-scrool");
  } else {
    navbar.value.classList.remove("bg-scrool");
  }
};

const onlogOut = () => {
  autStore.logOut();
};

const delaySearch = debounce((e) => {
  Textsearch.value = e.target.value;
}, 500);

const detailNotif = (item) => {
  useNotifStore().patchNotif(item.id);

  if (item.notification_type === "seller") {
    if (item.status === "create") {
      router.push("/detailsellerproduct/" + item.product_id);
    } else if (item.status === "bid") {
      router.push("/infopenawar/" + item.product_id);
    } else {
      console.log("ok");
    }
  } else {
    router.push("/tawaransaya");
  }
};

onMounted(() => {
  useNotifStore().getNotif();
  useAuthStore().getUser();
});
</script>
<template>
  <nav
    class="navbar navbar-light navbar-expand-lg position-fixed top-0 w-100"
    ref="navbar"
  >
    <div class="container-fluid" id="bodi">
      <!-- === Logo === -->
      <a
        @click="router.push('/')"
        class="navbar-brand d-flex align-items-center"
        ><img
          src="../assets/Untitled-1.png"
          style="width: 30px; margin-right: 0.5rem"
        />
        SecondHand
      </a>
      <!-- === Searcing === -->
      <form>
        <input
          class="form-control me-2 nav-search"
          type="search"
          placeholder="Cari ..."
          aria-label="Search"
          @input="delaySearch"
        />
      </form>
      <!-- === btn toggle === -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- === Menu === -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto gap-4">
          <!-- ========== My Store ========== -->
          <li @click="router.push('/tokosaya')" class="nav-item">
            <div class="nav_icon">
              <i class="ri-store-2-fill"></i>
            </div>
          </li>
          <!-- ========== notification ========== -->
          <li @click="dropdown.notif = !dropdown.notif" class="nav-item">
            <div class="nav_icon nav_badge">
              <i class="ri-notification-2-fill"></i>
              <span class="nav_badge_body">{{ useNotifStore().jmlNotif }}</span>
            </div>
            <!-- ----- Dropdown Notification ----- -->
            <div
              :class="{ notif_active: dropdown.notif }"
              class="drop_notif_container"
              ref="target"
            >
              <ul class="drop_notif_content">
                <h3>Notification ({{ useNotifStore().jmlNotif }})</h3>
                <li
                  v-for="item in useNotifStore().notification"
                  :key="item.id"
                  class="drop_notif_item"
                  @click="detailNotif(item)"
                >
                  <div>
                    <div class="notif_item_image">
                      <img :src="item.image_url" alt="" />
                    </div>
                  </div>
                  <div class="notif_item_detail">
                    <div class="notif_item_type justify-content-between">
                      <div class="d-flex">
                        <p class="m-0">{{ item.notification_type }}</p>
                        <p v-if="item.status == 'create'" class="m-0">
                          Product berhasil diterbitkan
                        </p>
                        <p v-if="item.status == 'bid'" class="m-0">
                          Penawaran Product
                        </p>
                        <p v-if="item.status == 'accepted'" class="m-0">
                          Penawaran telah diterima
                        </p>
                        <p v-if="item.status == 'declined'" class="m-0">
                          Penawaran ditolak
                        </p>
                      </div>
                      <div class="notif_date d-flex">
                        <span class="m-0">{{
                          formatDate(item.updatedAt)
                        }}</span>
                        <div v-if="!item.read"></div>
                      </div>
                    </div>
                    <h3 class="notif_item_title m-0">
                      {{ item.product_name }}
                    </h3>
                    <div class="notif_item_price">
                      <div
                        class="d-flex gap-2"
                        v-if="item.notification_type == 'seller'"
                      >
                        <p v-if="item.status == 'create'" class="m-0">
                          Rp. {{ item.base_price }}
                        </p>
                        <del v-if="item.status == 'bid'" class="m-0">
                          Rp. {{ item.base_price }}
                        </del>
                        <p v-if="item.status == 'bid'" class="m-0">
                          Ditawar Rp. {{ item.bid_price }}
                        </p>
                      </div>

                      <div
                        class="d-flex gap-2"
                        v-if="item.notification_type == 'buyer'"
                      >
                        <del
                          v-if="item.status == 'declined' || 'accepted'"
                          class="m-0"
                        >
                          Rp. {{ item.base_price }}
                        </del>
                        <p
                          v-if="item.status == 'declined' || 'accepted'"
                          class="m-0"
                        >
                          Saya tawar Rp. {{ item.bid_price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <!-- ========== Profile ========== -->
          <li
            v-if="autStore.getToken"
            class="nav-item"
            @click="dropdown.profile = !dropdown.profile"
          >
            <div class="nav_icon menu_profile">
              <img
                :src="useAuthStore().userId.image_url"
                class="image_profile"
              />
              <i class="ri-arrow-down-s-fill"></i>
            </div>
            <!-- ---- Dropdown Profile ----  -->
            <div
              class="drop_profile_container"
              ref="target"
              :class="{ drop_profile_active: dropdown.profile }"
            >
              <ul class="drop_profile">
                <li class="drop_list_item">
                  <div class="drop_info_profile_image">
                    <img :src="useAuthStore().userId.image_url" />
                  </div>
                  <h5 class="drop_profile_name m-0">
                    {{ useAuthStore().userId.full_name }}
                  </h5>
                </li>
                <hr />
                <li @click="router.push('/profilesaya')" class="drop_list_item">
                  <div class="drop_icon">
                    <i class="ri-user-follow-line"></i>
                  </div>
                  <p class="drop_title m-0">Profile Saya</p>
                  <i class="ri-arrow-right-s-line"></i>
                </li>
                <li @click="router.push('/tawaransaya')" class="drop_list_item">
                  <div class="drop_icon">
                    <i class="ri-building-line"></i>
                  </div>
                  <p class="drop_title m-0">Tawaran Saya</p>
                  <i class="ri-arrow-right-s-line"></i>
                </li>
                <li class="drop_list_item">
                  <div class="drop_icon">
                    <i class="ri-heart-2-line"></i>
                  </div>
                  <p @click="router.push('/wishlist')" class="drop_title m-0">
                    Whislish
                  </p>
                  <i class="ri-arrow-right-s-line"></i>
                </li>
                <li @click="onlogOut" class="drop_list_item">
                  <div class="drop_icon">
                    <i class="ri-logout-box-r-line"></i>
                  </div>
                  <p class="drop_title m-0">Log Out</p>
                  <i class="ri-arrow-right-s-line"></i>
                </li>
              </ul>
            </div>
          </li>
          <!-- ========== btn login ========== -->
          <button
            v-else
            @click="router.push('/login')"
            class="btn d-flex align-items-center btn_login"
            type="submit"
          >
            <i class="ri-login-box-line icon text-white me-2"></i>
            <span>Login</span>
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  height: 4.5rem;
  background-color: var(--body-color);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  z-index: 99;
}
.bg-scrool {
  background-color: var(--body-color);
}
/* ===== Logo =====*/
.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--first-color);
  cursor: pointer;
}
.nav-search {
  width: 300px;
}
/* ===== Menu =====*/
.nav_icon {
  font-size: var(--h3-font-size);
  color: rgb(85, 85, 85);
  cursor: pointer;
}
.nav_icon:hover {
  color: var(--text-color-alt);
}
.btn_login {
  display: inline-flex;
  background-color: var(--first-color);
  color: var(--text-color-light);
}
.nav_badge {
  position: relative;
}
.nav_badge_body {
  position: absolute;
  background-color: rgb(231, 4, 4);
  border: 2px solid var(--body-color);
  font-size: 0.6rem;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -7px;
  right: -7px;
}
/* ===== Toggle =====*/
.navbar-toggler:focus {
  box-shadow: none;
}
.navbar-toggler {
  border: none;
}
.navbar-collapse.show {
  background-color: var(--body-color);
}
/* ===== Drop Profile =====*/
.image_profile {
  width: 30px;
  border-radius: 50%;
}
.menu_profile {
  display: flex;
  align-items: center;
  column-gap: 0.3rem;
}
.drop_profile_container {
  position: absolute;
  top: 100%;
  right: 10%;
  width: 15rem;
  max-height: 0px;
  transition: max-height 0.4s;
  overflow: hidden;
}
.drop_profile_active {
  max-height: 400px;
}
.drop_profile {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 1rem;
  display: grid;
  row-gap: 1rem;
}
.drop_profile_name {
  font-size: var(--h3-font-size);
}
.drop_list_item {
  display: flex;
  column-gap: var(--mb-0-5);
  align-items: center;
  cursor: pointer;
}
.drop_icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.drop_list_item:hover {
  font-weight: 700;
  color: var(--first-color);
}
.drop_info_profile_image {
  width: 30px;
  height: 30px;
  border-radius: 0.5rem;
  overflow: hidden;
}
.drop_title {
  width: 100%;
}
hr {
  margin: 0.1rem 0;
}
/* ===== Drop Notif ===== */
.drop_notif_container {
  position: absolute;
  top: 80%;
  right: 14%;
  width: 400px;
  max-height: 0;
  overflow: auto;
  border-radius: 1rem;
  transition: max-height 0.4s;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-top: 1;
}
.notif_active {
  max-height: 300px;
}
.drop_notif_content {
  background-color: rgb(255, 255, 255);
  padding: 1rem;
}
.drop_notif_content h3 {
  font-size: var(--normal-font-size);
  margin-left: var(--mb-0-5);
}
.notif_item_image {
  width: 50px;
  height: 50px;
  background-color: var(--body-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
}
.drop_notif_item {
  padding: 0.5rem;
  display: flex;
  column-gap: 1rem;
  cursor: pointer;
  border-top: 1px solid #ccc;
}
.drop_notif_item:hover {
  background-color: rgb(228, 228, 228);
}
.notif_date div {
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
}
.notif_item_detail {
  width: 100%;
}
.drop_notif_item:hover .notif_item_detail h3 {
  color: var(--first-color);
}
.notif_item_detail h3 {
  font-size: var(--normal-font-size);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.notif_item_price {
  display: flex;
  column-gap: 1rem;
}
.notif_item_price p,
.notif_item_price del {
  font-size: 0.75rem;
}
.notif_item_type {
  display: flex;
  width: 100%;
}
.notif_item_type p,
.notif_item_type span {
  font-size: 0.6rem;
  padding-right: 0.5rem;
}
/* ====== BreacPoint Mobile Device ====== */
@media screen and (max-width: 567px) {
  /* = Logo = */
  .navbar {
    display: none;
  }
}
</style>
