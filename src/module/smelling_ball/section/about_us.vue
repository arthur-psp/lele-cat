<template>
  <v-container class="py-16 mt-10" id="about-us">
    <v-row align="center" justify="center">
      <!-- Coluna de Texto -->
      <v-col cols="12" md="6" class="pa-md-10">
        <h2 class="text-h3 font-weight-black title-font mb-6">
          Nossa <span class="text-primary">História</span>
        </h2>
        
        <p class="text-body-1 text-grey-darken-2 mb-6" style="line-height: 1.8;">
          Nascemos no coração do <strong>Rio Grande do Sul</strong> com um propósito claro: transformar a convivência entre tutores e seus gatos através de tecnologia natural e carinho. 
        </p>

        <p class="text-body-1 text-grey-darken-2 mb-6" style="line-height: 1.8;">
          Estamos apenas começando nossa jornada, mas já carregamos o orgulho de ter iniciado nossas vendas de forma presencial, conquistando a confiança e o sorriso de diversos clientes que já testaram e aprovaram o <strong>Lelê Cat</strong> em suas casas.
        </p>

        <v-row class="mt-4">
          <v-col cols="12" sm="6">
            <div class="d-flex align-center mb-4">
              <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
                <v-icon icon="mdi-map-marker" color="primary"></v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-2 font-weight-black">Origem Chinesa</div>
                <div class="text-caption text-grey">Qualidade Internacional Direto para o seu Lar</div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center mb-4">
              <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
                <v-icon icon="mdi-star" color="primary"></v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-2 font-weight-black">Clientes Felizes</div>
                <div class="text-caption text-grey">Aprovação presencial garantida</div>
              </div>
            </div>
          </v-col>
        </v-row>

        <p class="text-body-1 text-grey-darken-2 mt-6 font-italic" style="line-height: 1.8;">
          "Nosso estoque está crescendo! Em breve, traremos ainda mais soluções inovadoras para o bem-estar do seu pet."
        </p>
      </v-col>

      <!-- Coluna Visual / Card de Destaque -->
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-card 
          elevation="0" 
          rounded="xl" 
          class="pa-8 blur-card-about position-relative overflow-visible"
          style="border: 1px solid rgba(var(--v-theme-primary), 0.1);"
        >
          <div class="text-center">
            <v-icon icon="mdi-heart-pulse" size="64" color="primary" class="mb-6"></v-icon>
            <h3 class="text-h5 font-weight-black mb-4 title-font">Em Expansão</h3>
            <p class="text-body-2 text-grey-darken-1 mb-6">
              O Lelê Cat é apenas o primeiro passo. Estamos trabalhando diariamente para ampliar nosso catálogo com produtos que facilitam sua rotina e mimam seu gato.
            </p>
            <v-chip color="secondary" variant="flat" class="px-6 font-weight-bold">Novidades em Breve</v-chip>
          </div>

          <!-- Elemento decorativo -->
          <div 
            class="position-absolute" 
            style="bottom: -20px; right: -20px; z-index: -1;"
          >
            <v-icon icon="mdi-cat" size="120" color="primary" style="opacity: 0.05; transform: rotate(15deg);"></v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.title-font {
  font-family: 'Playfair Display', serif !important;
}

.blur-card-about {
  background: rgba(var(--v-theme-surface), 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
}

.v-theme--dark .blur-card-about {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
</style>
