<template>
  <v-app-bar elevation="0" :density="mobile ? 'compact' : 'default'">
    <template v-slot:title>
      <v-img :src="theme.current.value.dark ? logoDark : logoLight" width="200"></v-img>
    </template>

    <template v-slot:append>
      <v-btn prepend-icon="mdi-segment" variant="text">
        <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-switch label="Tema" v-model="isLightTheme" @change="changeTheme">
                <template v-slot:thumb>
                  <v-icon 
                    :icon="theme.current.value.dark 
                      ? 'mdi-moon-waning-crescent' 
                      : 'mdi-weather-sunny'"
                    :color="!theme.current.value.dark ? 'yellow' : ''"
                  ></v-icon>
                </template>
              </v-switch>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      </v-btn>
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