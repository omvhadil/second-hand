<script setup>
defineProps({
  title: {
    type: String,
  },
  modelValue: [String, Number],
});
</script>
<template>
  <div class="mb-3">
    <label :for="title" class="form-label">{{ title }}</label>
    <textarea
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      class="form-control"
      :id="title"
      rows="3"
    ></textarea>
  </div>
</template>
