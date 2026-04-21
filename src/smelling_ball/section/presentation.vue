<template>
  <v-container fluid class=" pa-0 ma-0">
    
    <v-row class="background ma-0 align-center justify-center" style="min-height: 100vh;">
      
      <v-col 
        cols="12" 
        md="6" 
        class="d-flex flex-column align-center justify-center pa-10"
      >
        <div
          class="font-weight-black text-primary text-center font "
          :class="mobile ? 'text-h4' : 'text-h2'" 
          style="max-width: 800px;"
        >
          A tecnologia natural que elimina 100% dos odores da areia.
        </div>
        
        <div
          class="mt-7 text-center"
          :class="mobile ? 'text-h6' : 'text-h5'" 
          style="max-width: 600px;"
        >
          O Lelê Cat elimina odores indesejados de forma instantânea e natural. O cuidado que sua casa precisa e o carinho que seu gato merece.
        </div>

        <v-btn 
          text="Conheça a Linha"
          class="text-body-1 bg-secondary font-weight-black mt-8"
          rounded="lg"
          size="large"
          variant="tonal"
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

    <v-row class="ma-0">
      <v-col cols="12" class="d-flex align-center justify-center position-relative pa-0">
        <v-img :src="catImage" class="cover w-100" max-width="500">
          <div class="text-overlay">
            <div
              class="text-center px-5 rounded-lg border-lg pa-3 border-secondary mx-4"
              :class="mobile ? 'text-body-1' : 'text-h5'" 
            >
              Elimina o cheiro de urina e fezes instantaneamente, prolongando a vida útil da areia.
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
  window.location.replace("https://shopee.com.br/search?keyword=desodorizador%20de%20areia")
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
  font-family: 'Playfair+Display';
}

.background {
  background-image: url("../../assets/background2.png");
  width: 100%;
  min-height: 70vh; 
  background-size: 120%; 
  background-position: center center;
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