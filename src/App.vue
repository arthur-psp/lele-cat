<template>
  <v-app>
    <AppBar />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <v-main>
          <router-view></router-view>
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import AppBar from './components/app_bar.vue';
</script>