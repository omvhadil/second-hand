<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";
defineProps({
  title: {
    type: String,
    default: "<<Title goes here>>",
  },
});
let modalEle = ref(null);
let thisModalObj = null;

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
});
function _show() {
  thisModalObj.show();
}
defineExpose({ show: _show });
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="modalEle"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-dialog {
  max-width: 23rem;
}
.modal-body {
  padding-top: 2rem;
}
</style>
