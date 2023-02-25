<script setup>
import { RouterView } from "vue-router";
import Navigation from "../components/Navigation.vue";
import NavbarMobile from "../components/NavbarMobile.vue";
</script>
<template>
  <Navigation />
  <NavbarMobile />
  <RouterView />
</template>
