<template>
  <v-container style="min-height: 100dvh;">
    <v-row>
      <v-col cols="12">
        <div class="text-h4 d-flex align-center justify-center">Conheça nossa linha</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="lg" flat width="100%" max-width="700">
          <template v-slot:text>
            <div class="d-flex flex-column align-center justify-center"> 
              <v-chip 
                class="font-weight-black mb-10 px-6" 
                color="#7b1c8a" 
                variant="flat" 
                size="large"
              >
                Lavanda
              </v-chip>
              <div class="position-relative d-flex align-center justify-center" style="width: 100%; max-width: 500px;">               
                <div 
                  class="bg-lavanda opacity-20"
                  style="
                    position: absolute; 
                    width: 80%; 
                    height: 75%; 
                    border-radius: 40px;
                    z-index: 0;
                  "
                ></div>
                <v-card
                  flat
                  class="pa-4 d-flex align-center justify-center text-center"
                  style="
                    position: absolute;
                    right: -20px;
                    top: 50%;
                    transform: translateY(-150%);
                    z-index: 2;
                    width: 120px;
                    height: 90px;
                    border: 2px solid #7b1c8a !important;
                    border-radius: 24px !important;
                    background-color: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(4px);
                  "
                >
                  <div class="text-body-2 font-weight-bold text-grey-darken-3">
                    Liberação <br> de <br>
                    <span class="text-h6 font-weight-black" style="color: #7b1c8a;">Fragrância</span>
                  </div>
                </v-card>

                <v-img 
                  :src="lavanda" 
                  width="320" 
                  class="position-relative" 
                  style="z-index: 1;"
                >
                </v-img>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="lg" flat width="100%" max-width="700">
          <template v-slot:text>
            <div class="d-flex flex-column align-center justify-center"> 
              <v-chip 
                class="font-weight-black mb-10 px-6" 
                color="hortela" 
                variant="flat" 
                size="large"
              >
                Hortelã
              </v-chip>
              <div class="position-relative d-flex align-center justify-center" style="width: 100%; max-width: 500px;">               
                <div 
                  class="bg-hortela opacity-20"
                  style="
                    position: absolute; 
                    width: 80%; 
                    height: 75%; 
                    border-radius: 40px;
                    z-index: 0;
                  "
                ></div>
                <v-card
                  flat
                  class="pa-4 d-flex align-center justify-center text-center"
                  style="
                    position: absolute;
                    right: -20px;
                    top: 50%;
                    transform: translateY(-150%);
                    z-index: 2;
                    width: 120px;
                    height: 90px;
                    border: 2px solid #0f4d1e !important;
                    border-radius: 24px !important;
                    background-color: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(4px);
                  "
                >
                  <div class="text-body-2 font-weight-bold text-grey-darken-3">
                    Decompõe <br> o mau <br>
                    <span class="text-h6 font-weight-black" style="color: #0f4d1e;">Cheiro</span>
                  </div>
                </v-card>

                <v-img 
                  :src="hortela" 
                  width="320" 
                  class="position-relative" 
                  style="z-index: 1;"
                >
                </v-img>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="lg" flat width="100%" max-width="700">
          <template v-slot:text>
            <div class="d-flex flex-column align-center justify-center"> 
              <v-chip 
                class="font-weight-black mb-10 px-6" 
                color="#3970b3" 
                variant="flat" 
                size="large"
              >
                Talco de Bebê
              </v-chip>
              <div class="position-relative d-flex align-center justify-center" style="width: 100%; max-width: 500px;">               
                <div 
                  style="
                    position: absolute; 
                    width: 80%; 
                    height: 75%;
                    border-radius: 40px;
                    z-index: 0;
                  "
                  class="bg-talcoBebe opacity-20"
                ></div>
                <v-card
                  flat
                  class="pa-4 d-flex align-center justify-center text-center"
                  style="
                    position: absolute;
                    right: -20px;
                    top: 50%;
                    transform: translateY(-150%);
                    z-index: 2;
                    width: 120px;
                    height: 90px;
                    border: 2px solid #3970b3 !important;
                    border-radius: 24px !important;
                    background-color: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(4px);
                  "
                >
                  <div class="text-body-2 font-weight-bold text-grey-darken-3">
                    7 dias <br> de <br>
                    <span class="text-h6 font-weight-black" style="color: #3970b3;">Frescor</span>
                  </div>
                </v-card>

                <v-img 
                  :src="talcoDeBebe" 
                  width="320" 
                  class="position-relative" 
                  style="z-index: 1;"
                >
                </v-img>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="lg" flat width="100%" max-width="700">
          <template v-slot:text>
            <div class="d-flex flex-column align-center justify-center"> 
              <v-chip 
                class="font-weight-black mb-10 px-6" 
                color="limao" 
                variant="flat" 
                size="large"
              >
                Limão
              </v-chip>
              <div class="position-relative d-flex align-center justify-center" style="width: 100%; max-width: 500px;">               
                <div 
                  class="bg-limao opacity-20"
                  style="
                    position: absolute; 
                    width: 80%; 
                    height: 75%; 
                    border-radius: 40px;
                    z-index: 0;
                  "
                ></div>
                <v-card
                  flat
                  class="pa-4 d-flex align-center justify-center text-center"
                  style="
                    position: absolute;
                    right: -20px;
                    top: 50%;
                    transform: translateY(-150%);
                    z-index: 2;
                    width: 160px;
                    height: 90px;
                    border: 2px solid #fadf69 !important;
                    border-radius: 24px !important;
                    background-color: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(4px);
                  "
                >
                  <div class="text-body-2 font-weight-bold text-grey-darken-3">
                    100% Natural e<br><br>
                    <span class="text-h6 font-weight-black" style="color: #d4b42d;">Biodegradável</span>
                  </div>
                </v-card>

                <v-img 
                  :src="limao" 
                  width="320" 
                  class="position-relative" 
                  style="z-index: 1;"
                >
                </v-img>
              </div>
            </div>
          </template>
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

<style>
.product-description{
  width: 300;
  height: 100px;
}
</style>