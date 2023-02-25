<script setup>
defineProps({
  title: {
    type: String,
  },
  type: {
    default: "text",
  },
  modelValue: [String, Number],
});
</script>
<template>
  <div class="mb-3">
    <label :for="title" class="form-label">{{ title }}</label>
    <input
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      :type="type"
      class="form-control"
      :id="title"
      :placeholder="title"
    />
  </div>
</template>
