<script setup>
import MyInput from "../components/MyInput.vue";
import MyTextarea from "../components/MyTextarea.vue";
// import MySelect from "../components/MySelect.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import { onMounted, reactive } from "vue";

const router = useRouter();

const data = reactive({
  form: {
    namaBarang: "",
    description: "",
    hargaBarang: null,
    categori: [],
    lokasi: "",
    image: "",
    preview: null,
  },
});
const onPostProduct = () => {
  const formData = new FormData();
  formData.append("name", data.form.namaBarang);
  formData.append("description", data.form.description);
  formData.append("base_price", data.form.hargaBarang);
  formData.append("category_ids", data.form.categori);
  formData.append("location", data.form.lokasi);
  formData.append("image", data.form.image);
  useAuthStore().postProduct(formData);
};
const setFile = (e) => {
  data.form.image = e.target.files[0];
  data.form.preview = URL.createObjectURL(data.form.image);
};

const onReview = () => {
  router.push({
    name: "review",
    params: {
      state: data.form,
    },
  });
};
onMounted(() => {
  useAuthStore().getCategory();
});
</script>
<template>
  <div class="mains" id="bodi">
    <div class="wrap ms-auto me-auto pb-5">
      <form @submit.prevent="onPostProduct">
        <MyInput
          v-model="data.form.namaBarang"
          title="Nama Barang"
          type="text"
        />
        <MyTextarea v-model="data.form.description" title="Description" />
        <MyInput
          v-model="data.form.hargaBarang"
          title="Harga Barang"
          type="text"
        />
        <div class="mb-3">
          <label class="form-label">Kategori</label>
          <select
            class="form-select mb-3"
            aria-label="Default select example"
            Multiple
            v-model="data.form.categori"
          >
            <option value>Kategori</option>
            <option
              v-for="item in useAuthStore().categori"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <MyInput v-model="data.form.lokasi" title="lokasi" type="text" />
        <div class="box-image" v-if="data.form.image">
          <img :src="data.form.preview" alt="" />
          <button class="btn_batal_image" @click="data.form.image = null">
            X
          </button>
        </div>
        <div
          v-else
          class="card-image-product curpoin d-flex align-items-right justify-content-center"
        >
          <i class="ri-camera-line" style="font-size: 2rem"></i>
          <input @input="setFile" type="file" />
        </div>

        <!-- ============== Button simpan ========= -->
        <div class="d-flex gap-2 mt-4" style="width: 100%">
          <button
            @click.prevent="onReview"
            class="btn btn_review"
            style="width: 50%"
            type="button"
          >
            Review
          </button>
          <button class="btn btn_terbitkan" style="width: 50%" type="submit">
            Terbitkan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.section {
  margin-top: 7rem;
}
.wrap {
  width: 500px;
}
.card-image-tambah {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  margin-left: auto;
  margin-right: auto;
}
.card-image-product {
  width: 80px;
  height: 100px;
  border: 1px solid var(--first-color);
  color: var(--first-color);
  border-style: dashed;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.box-image {
  width: 150px;
  height: auto;
  position: relative;
}
.box-image img {
  height: 100%;
}
.btn_batal_image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 30px;
  height: 30px;
  border: none;
  background-color: red;
  color: #fff;
  border-radius: 50%;
}
.card-image-product input[type="file"] {
  position: absolute;
  cursor: pointer;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.btn_review {
  border: 1px solid var(--first-color);
  color: var(--first-color);
}
.btn_terbitkan {
  background-color: var(--first-color);
  color: var(--text-color-light);
}
@media screen and (max-width: 767px) {
  .wrap {
    width: 100%;
  }
}
</style>
