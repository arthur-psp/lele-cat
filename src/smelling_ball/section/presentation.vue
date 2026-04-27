<template>
  <v-container fluid class=" pa-0 ma-0">
    
    <v-row class="background ma-0 align-center justify-center" style="min-height: 80vh;">
      
      <v-col 
        cols="12" 
        md="6" 
        class="d-flex flex-column align-center justify-center pa-10"
        style="height: 80vh;"
      >
        <div
          class="font-weight-black text-center blur-container font"
          :class="mobile ? 'text-h4' : 'text-h2'" 
          style="max-width: 800px;"
        >
          <div 
            class="pa-6 rounded-xl mb-n16 position-absolute w-100 h-100 highlight-bg" 
            style="z-index: -1; filter: blur(10px);"
          ></div>
          <div>A tecnologia <span class="text-primary">natural</span> que elimina <span class="text-primary">100% dos odores</span> da areia.</div>
        </div>
        
        <div
          class="mt-12 text-center font-weight-medium"
          :class="mobile ? 'text-h6' : 'text-h5'" 
          style="max-width: 600px;"
        >
          O Lelê Cat elimina odores indesejados de forma instantânea e natural. O cuidado que sua casa precisa e o carinho que seu gato merece.
        </div>

        <v-btn 
          text="Conheça a Linha"
          class="text-body-1 bg-secondary font-weight-black mt-8"
          rounded="lg"
          size="x-large"
          elevation="4"
          @click="redirect"
        ></v-btn>
      </v-col>

      <v-col 
        cols="12" 
        md="6" 
        class="d-flex align-center justify-center pa-5"
      >
        <v-img :src="products" max-width="800"></v-img>
      </v-col>
    </v-row>

    <v-row justify="space-evenly" class="my-10 px-4">
      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-leaf" size="32"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">100% Natural</div>
        <div class="text-caption">Seguro para seu pet e para o planeta</div>
      </v-col>

      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-clock-fast" size="32"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">Ação Instantânea</div>
        <div class="text-caption">Elimina odores no momento do contato</div>
      </v-col>

      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-cat" size="32"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">Amigo dos Gatos</div>
        <div class="text-caption">Sem fragrâncias irritantes ou químicas</div>
      </v-col>

      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-trending-up" size="32"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">Alto Rendimento</div>
        <div class="text-caption">Prolonga em até 3x a vida útil da areia</div>
      </v-col>
    </v-row>

    <v-row class="ma-0 mt-16">
      <v-col cols="12" class="d-flex align-center justify-center position-relative pa-0">
        <v-img 
          :src="catImage" 
          class="rounded-xl overflow-visible" 
          max-width="500"
        >
          <div class="fill-height d-flex align-start justify-center">
            <div
              class="text-center px-6 py-4 rounded-xl mx-4 blur-card"
              :class="mobile ? 'text-caption' : 'text-body-2'" 
              style="max-width: 90%; border: 1px solid                 
                rgba(255,255,255,0.3); background: rgba(255, 255, 255, 0.1);         
               backdrop-filter: blur(12px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0,  
                0.1);"     
            >
              <div 
                class="font-weight-black" 
                :class="mobile ? 'text-body-1' : 'text-h6'"
              >
                Elimina o cheiro de urina e fezes <span class="text-secondary">instantaneamente</span>, prolongando a vida útil da areia.
              </div>
            </div>
          </div>
        </v-img>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
import catImage from "../../assets/cat_image.png"
import products from "../../assets/todas.png"

const { mobile } = useDisplay();

const redirect = () => {
  window.open("https://shopee.com.br/product/219423316/58256794939?d_id=08cb3&uls_trackid=55g9tvvg00f2&utm_content=3V5Px4oyY62T8fz9ZFrmodRQPwRR")
}
</script>

<style scoped>
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 50px;
  z-index: 1;
}

.font {
  font-family: 'Playfair+Display' !important;
}

.background {
  background-image: url("../../assets/background2.png");
  width: 100%;
  min-height: 60vh; 
  background-size: 120%; 
  background-position: center;
  background-repeat: no-repeat;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100% 
  );
  
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

@media (max-width: 960px) {
  .background {
    background-size: cover;

    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}
</style>