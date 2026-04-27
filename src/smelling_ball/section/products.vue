<template>
  <v-container class="py-16" style="min-height: 100dvh;">
    <!-- Título da Seção -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-black title-font mb-4">Conheça nossa linha</h2>
        <p class="text-h6 text-grey-darken-1">Fragrâncias exclusivas, todas com o mesmo padrão de excelência</p>
      </v-col>
    </v-row>

    <!-- Cards de Benefícios Compartilhados (Legenda Separada) -->
    <v-row class="mb-16 justify-center">
      <v-col cols="12" md="10">
        <v-card rounded="xl" class="pa-8 blur-card-products" elevation="0">
          <v-row>
            <v-col cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-scent" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">Liberação de</div>
              <div class="text-h6 font-weight-black text-primary">Fragrância</div>
            </v-col>
            <v-col cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-molecule" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">Decompõe o</div>
              <div class="text-h6 font-weight-black text-primary">mau Cheiro</div>
            </v-col>
            <v-col cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-clock-outline" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">7 dias de</div>
              <div class="text-h6 font-weight-black text-primary">Frescor</div>
            </v-col>
            <v-col cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-leaf" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">100% Natural e</div>
              <div class="text-h6 font-weight-black text-primary">Biodegradável</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Grid de Produtos -->
    <v-row>
      <!-- Lavanda -->
      <v-col cols="12" sm="6" md="3" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="product-card pa-4 text-center">
          <v-chip 
            class="font-weight-black mb-6 px-6" 
            color="#7b1c8a" 
            variant="flat" 
          >
            Lavanda
          </v-chip>
          <div class="position-relative d-flex align-center justify-center w-100">               
            <div class="bg-lavanda circle-bg"></div>
            <v-img :src="lavanda" width="220" class="product-img"></v-img>
          </div>
        </v-card>
      </v-col>

      <!-- Hortelã -->
      <v-col cols="12" sm="6" md="3" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="product-card pa-4 text-center">
          <v-chip 
            class="font-weight-black mb-6 px-6" 
            color="hortela" 
            variant="flat" 
          >
            Hortelã
          </v-chip>
          <div class="position-relative d-flex align-center justify-center w-100">               
            <div class="bg-hortela circle-bg"></div>
            <v-img :src="hortela" width="220" class="product-img"></v-img>
          </div>
        </v-card>
      </v-col>

      <!-- Talco de Bebê -->
      <v-col cols="12" sm="6" md="3" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="product-card pa-4 text-center">
          <v-chip 
            class="font-weight-black mb-6 px-6" 
            color="#3970b3" 
            variant="flat" 
          >
            Talco de Bebê
          </v-chip>
          <div class="position-relative d-flex align-center justify-center w-100">               
            <div class="bg-talcoBebe circle-bg"></div>
            <v-img :src="talcoDeBebe" width="220" class="product-img"></v-img>
          </div>
        </v-card>
      </v-col>

      <!-- Limão -->
      <v-col cols="12" sm="6" md="3" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="product-card pa-4 text-center">
          <v-chip 
            class="font-weight-black mb-6 px-6" 
            color="limao" 
            variant="flat" 
          >
            Limão
          </v-chip>
          <div class="position-relative d-flex align-center justify-center w-100">               
            <div class="bg-limao circle-bg"></div>
            <v-img :src="limao" width="220" class="product-img"></v-img>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import lavanda from "../../assets/lavanda.png"
import hortela from "../../assets/hortela.png"
import talcoDeBebe from "../../assets/talco_de_bebe.png"
import limao from "../../assets/limao.png"

</script>

<style scoped>
.title-font {
  font-family: 'Playfair Display', serif !important;
}

.product-card {
  transition: transform 0.3s ease;
  background: transparent !important;
}

.product-card:hover {
  transform: translateY(-10px);
}

.circle-bg {
  position: absolute; 
  width: 180px; 
  height: 180px; 
  border-radius: 50%;
  z-index: 0;
  filter: blur(40px);
  opacity: 0.15;
}

.product-img {
  z-index: 1;
  transition: transform 0.5s ease;
}

.product-card:hover .product-img {
  transform: scale(1.1);
}

.blur-card-products {
  background: rgba(var(--v-theme-surface), 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
}

.v-theme--dark .blur-card-products {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.bg-lavanda { background-color: #7b1c8a; }
.bg-hortela { background-color: #0f4d1e; }
.bg-talcoBebe { background-color: #3970b3; }
.bg-limao { background-color: #fadf69; }
</style>
