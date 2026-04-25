<template>
  <v-container class="py-16" style="min-height: 100dvh;">
    <v-row class="mb-10">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-black title-font mb-4">Conheça nossa linha</h2>
        <p class="text-h6 text-grey-darken-1">Fragrâncias exclusivas para cada necessidade</p>
      </v-col>
    </v-row>
    <v-row>
      <!-- Lavanda -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" max-width="600" class="product-card pa-4">
          <div class="d-flex flex-column align-center justify-center"> 
            <v-chip 
              class="font-weight-black mb-10 px-6" 
              color="#7b1c8a" 
              variant="flat" 
              size="large"
            >
              Lavanda
            </v-chip>
            <div class="position-relative d-flex align-center justify-center w-100" style="max-width: 500px;">               
              <div 
                class="bg-lavanda opacity-10"
                style="
                  position: absolute; 
                  width: 90%; 
                  height: 90%; 
                  border-radius: 50%;
                  z-index: 0;
                  filter: blur(20px);
                "
              ></div>
              <v-card
                flat
                class="info-badge pa-4 d-flex align-center justify-center text-center"
              >
                <div class="text-body-2 font-weight-bold text-grey-darken-3">
                  Liberação <br> de <br>
                  <span class="text-h6 font-weight-black" style="color: #7b1c8a;">Fragrância</span>
                </div>
              </v-card>

              <v-img 
                :src="lavanda" 
                width="300" 
                class="product-img"
              >
              </v-img>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Hortelã -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" max-width="600" class="product-card pa-4">
          <div class="d-flex flex-column align-center justify-center"> 
            <v-chip 
              class="font-weight-black mb-10 px-6" 
              color="hortela" 
              variant="flat" 
              size="large"
            >
              Hortelã
            </v-chip>
            <div class="position-relative d-flex align-center justify-center w-100" style="max-width: 500px;">               
              <div 
                class="bg-hortela opacity-10"
                style="
                  position: absolute; 
                  width: 90%; 
                  height: 90%; 
                  border-radius: 50%;
                  z-index: 0;
                  filter: blur(20px);
                "
              ></div>
              <v-card
                flat
                class="info-badge pa-4 d-flex align-center justify-center text-center"
              >
                <div class="text-body-2 font-weight-bold text-grey-darken-3">
                  Decompõe <br> o mau <br>
                  <span class="text-h6 font-weight-black" style="color: #0f4d1e;">Cheiro</span>
                </div>
              </v-card>

              <v-img 
                :src="hortela" 
                width="300" 
                class="product-img"
              >
              </v-img>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Talco de Bebê -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center mt-md-10">
        <v-card rounded="xl" flat width="100%" max-width="600" class="product-card pa-4">
          <div class="d-flex flex-column align-center justify-center"> 
            <v-chip 
              class="font-weight-black mb-10 px-6" 
              color="#3970b3" 
              variant="flat" 
              size="large"
            >
              Talco de Bebê
            </v-chip>
            <div class="position-relative d-flex align-center justify-center w-100" style="max-width: 500px;">               
              <div 
                class="bg-talcoBebe opacity-10"
                style="
                  position: absolute; 
                  width: 90%; 
                  height: 90%; 
                  border-radius: 50%;
                  z-index: 0;
                  filter: blur(20px);
                "
              ></div>
              <v-card
                flat
                class="info-badge pa-4 d-flex align-center justify-center text-center"
              >
                <div class="text-body-2 font-weight-bold text-grey-darken-3">
                  7 dias <br> de <br>
                  <span class="text-h6 font-weight-black" style="color: #3970b3;">Frescor</span>
                </div>
              </v-card>

              <v-img 
                :src="talcoDeBebe" 
                width="300" 
                class="product-img"
              >
              </v-img>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Limão -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center mt-md-10">
        <v-card rounded="xl" flat width="100%" max-width="600" class="product-card pa-4">
          <div class="d-flex flex-column align-center justify-center"> 
            <v-chip 
              class="font-weight-black mb-10 px-6" 
              color="limao" 
              variant="flat" 
              size="large"
            >
              Limão
            </v-chip>
            <div class="position-relative d-flex align-center justify-center w-100" style="max-width: 500px;">               
              <div 
                class="bg-limao opacity-10"
                style="
                  position: absolute; 
                  width: 90%; 
                  height: 90%; 
                  border-radius: 50%;
                  z-index: 0;
                  filter: blur(20px);
                "
              ></div>
              <v-card
                flat
                class="info-badge pa-4 d-flex align-center justify-center text-center"
                style="border-color: #fadf69 !important;"
              >
                <div class="text-body-2 font-weight-bold text-grey-darken-3">
                  100% Natural e<br>
                  <span class="text-h6 font-weight-black " style="color: #d4b42d;">Biodegradável</span>
                </div>
              </v-card>

              <v-img 
                :src="limao" 
                width="300" 
                class="product-img"
              >
              </v-img>
            </div>
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

.product-img {
  z-index: 1;
  transition: transform 0.5s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05) rotate(2deg);
}

.info-badge {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-150%);
  z-index: 2;
  width: 140px;
  border: 2px solid currentColor !important;
  border-radius: 24px !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
}

.bg-lavanda { background-color: #7b1c8a; }
.bg-hortela { background-color: #0f4d1e; }
.bg-talcoBebe { background-color: #3970b3; }
.bg-limao { background-color: #fadf69; }
</style>

<style>
.product-description{
  width: 300;
  height: 100px;
}
</style>