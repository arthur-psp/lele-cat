<template>
  <v-app-bar 
    elevation="0" 
    :density="mobile ? 'compact' : 'default'"
    class="px-md-10"
    style="background-color: rgba(var(--v-theme-surface), 0.8) !important; backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,0,0,0.05);"
  >
    <template v-slot:title>
      <v-img :src="theme.current.value.dark ? logoDark : logoLight" width="160" class="cursor-pointer"></v-img>
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
        <v-btn color="secondary" variant="flat" class="text-none font-weight-black ml-4 px-6" rounded="lg">
          Onde Comprar
          <v-icon icon="mdi-chevron-down" end></v-icon>
          
          <v-menu activator="parent" transition="slide-y-transition">
            <v-list rounded="xl" class="mt-2 pa-5">
              <v-list-item 
                prepend-icon="mdi-shopping" 
                title="Comprar na Shopee" 
                base-color="deep-orange"
                href="https://shopee.com.br/product/219423316/58256794939"
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
import { useTheme } from "vuetify";
import { onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

const theme = useTheme()
const isLightTheme = ref(false)
const { mobile } = useDisplay()

const changeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

onMounted(() => {
  if (theme.current.value.dark) {
    return isLightTheme.value = true
  } else {
    return isLightTheme.value = false
  }
})
</script>