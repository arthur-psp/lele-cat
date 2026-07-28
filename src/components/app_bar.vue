<template>
  <v-app-bar 
    elevation="0" 
    :density="mobile ? 'compact' : 'default'"
    class="px-md-10"
    style="background-color: rgba(var(--v-theme-bgsec)) !important;"
  >

   <template v-slot:prepend>
    <v-img :src="fiveicon" width="80" class="cursor-pointer"></v-img>
   </template>
    <template v-slot:title>
      <div class="d-flex justify-start align-center dancing-script">Lele cat</div>
    </template>

    <template v-slot:append>
      <v-btn 
        :icon="theme.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'" 
        variant="text"
        @click="changeTheme"
        class="mr-2"
        :color="theme.current.value.dark ? 'primary' : 'warning'"
      ></v-btn>
      <div class="d-none d-md-flex">
        <v-btn color="secondary" variant="flat" class="text-none font-weight-black text-bgsec ml-4 px-6" rounded="lg">
          Onde Comprar
          <v-icon icon="mdi-chevron-down" end></v-icon>
          
          <v-menu activator="parent" transition="slide-y-transition">
            <v-list rounded="xl" class="mt-2 pa-5">
              <v-list-item 
                prepend-icon="mdi-instagram" 
                title="Ver Instragram" 
                base-color="logoColor"
                href="https://www.instagram.com/lelecat.desodorizante?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rounded="lg"
              ></v-list-item>
              
              <v-list-item 
                prepend-icon="mdi-whatsapp" 
                title="Mais Informações" 
                base-color="success"
                href="https://wa.me/555496257038" 
                target="_blank"
                rounded="lg"
                class="mt-1"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import logoLight from "../assets/logo/logo_light-removebg-preview.png"
import logoDark from "../assets/logo/logo_dark-removebg-preview.png"
import fiveicon from "../assets/logo/fiveicon.png"

import { useTheme } from "vuetify";
import { onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

const theme = useTheme()
const currentTheme = ref("system");
const isLightTheme = ref(false)
const { mobile } = useDisplay()

const changeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

const getSystemTheme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkMode ? "dark" : "light";
};

const applyTheme = (mode) => {
  if (mode === 'system') {
    theme.global.name.value = getSystemTheme();
  } else {
    theme.global.name.value = mode;
  }
}

const handleChangeThemeMode = async (mode) => {
  currentTheme.value = mode;
  applyTheme(mode);
};

onMounted(() => {
  applyTheme(currentTheme.value)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentTheme.value === 'system') {
      applyTheme('system');
    }
  });
})
</script>

<style>
.dancing-script {
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-size: 40px;
  font-weight: 700;
  font-style: normal;
  color: #f8bc68;
}

.v-toolbar-title {
  margin-inline-start: 5px !important;
  height: 100%;
}

.v-toolbar-title__placeholder {
  display: flex;
  height: 100%;
  align-items: center;
  padding-inline: 5px;
}
</style>