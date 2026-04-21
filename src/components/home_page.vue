<template>
  <v-layout>
    <AppBar />

    <v-main>
      <Presentation />
      <Products />
    </v-main>
  </v-layout>

  
</template>

<script setup>
import AppBar from './app_bar.vue';
import Presentation from '../smelling_ball/section/presentation.vue';
import Products from '../smelling_ball/section/products.vue';
</script>