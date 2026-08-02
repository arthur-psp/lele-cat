<template>
  <v-app>
    <AppBar />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <v-main class="main-no-top-padding">
          <router-view></router-view>
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import AppBar from './components/app_bar.vue';
</script>

<style>
/* Remove o padding-top automático que o Vuetify aplica ao v-main
   por causa da v-app-bar fixa. A toolbar continua fixa e sobrepõe o conteúdo. */
.main-no-top-padding.v-main {
  padding-top: 0 !important;
}
</style>