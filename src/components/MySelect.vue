<script setup>
// import { reactive } from "vue";

// const data = reactive({
//   kategori: ["aksesories", " alat dapur"],
// });
defineProps({
  title: {
    type: String,
  },
  type: {
    default: "checkbox",
  },
  isMultiple: {
    type: Boolean,
  },
  data: {
    type: Array,
  },
  modelValue: [String, Number, Array, Object],
});
</script>
<template>
  <div class="mb-3">
    <label class="form-label">{{ title }}</label>
    <select
      class="form-select mb-3"
      aria-label="Default select example"
      :multiple="isMultiple"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
    >
      <option value>{{ title }}</option>
      <option v-for="(item, index) in data" :key="index" :value="item">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.form-select::selection {
  background-color: var(--first-color);
}
</style>
