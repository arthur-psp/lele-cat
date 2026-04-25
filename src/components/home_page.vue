<template>
  <v-layout>
    <AppBar />

    <v-main>
      <Presentation />
      <Products />
      <AboutUs />
      <FooterSection />
    </v-main>
  </v-layout>

  
</template>

<script setup>
import AppBar from './app_bar.vue';
import Presentation from '../smelling_ball/section/presentation.vue';
import Products from '../smelling_ball/section/products.vue';
import AboutUs from '../smelling_ball/section/about_us.vue';
import FooterSection from './footer_section.vue';
</script>