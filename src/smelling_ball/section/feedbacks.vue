<template>
  <v-container class="py-16 mt-10" id="feedbacks">
    <div class="text-center mb-12">
      <h2 class="text-h3 font-weight-black title-font mb-4">
        O que dizem os <span class="text-primary">Tutores</span>
      </h2>
      <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
        A satisfação dos nossos clientes e o bem-estar dos seus gatinhos são nossa maior recompensa. Confira alguns depoimentos:
      </p>
    </div>

    <v-row>
      <!-- Feedback 1: Marisa -->
      <v-col cols="12" md="4">
        <v-card 
          elevation="0" 
          rounded="xl" 
          class="pa-8 blur-card-feedback h-100 d-flex flex-column"
          style="border: 1px solid rgba(var(--v-theme-primary), 0.1);"
        >
          <v-icon icon="mdi-format-quote-open" size="48" color="primary" class="mb-4" style="opacity: 0.2;"></v-icon>
          
          <p class="text-body-1 text-grey-darken-2 mb-6 flex-grow-1" style="line-height: 1.6;">
            "Dica maravilhosa para tutores de gatos! 😻 O produto dura muito (45 dias) e realmente acaba com o mau cheiro da urina e das fezes. É super fácil de usar, basta misturar na areia. Vale muito a pena pelo custo-benefício e pela eficiência!"
          </p>

          <div class="d-flex align-center mt-auto">
            <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
              <span class="text-h6 font-weight-bold">M</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-black">Marisa</div>
              <div class="text-caption text-grey">Tutor(a) de Gato</div>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Feedback 2: Katia -->
      <v-col cols="12" md="4">
        <v-card 
          elevation="0" 
          rounded="xl" 
          class="pa-8 blur-card-feedback h-100 d-flex flex-column"
          style="border: 1px solid rgba(var(--v-theme-primary), 0.1);"
        >
          <v-icon icon="mdi-format-quote-open" size="48" color="primary" class="mb-4" style="opacity: 0.2;"></v-icon>
          
          <p class="text-body-1 text-grey-darken-2 mb-6 flex-grow-1" style="line-height: 1.6;">
            "Simplesmente maravilhoso! Além de cumprir tudo o que promete no controle de odores, ele deixa a casa com um cheirinho muito agradável e leve. Eu aproveitei para comprar um de cada fragrância e amei a experiência com todos; um melhor que o outro!"
          </p>

          <div class="d-flex align-center mt-auto">
            <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
              <span class="text-h6 font-weight-bold">K</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-black">Katia</div>
              <div class="text-caption text-grey">Tutor(a) de Gato</div>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Feedback 3: Arthur -->
      <v-col cols="12" md="4">
        <v-card 
          elevation="0" 
          rounded="xl" 
          class="pa-8 blur-card-feedback h-100 d-flex flex-column"
          style="border: 1px solid rgba(var(--v-theme-primary), 0.1);"
        >
          <v-icon icon="mdi-format-quote-open" size="48" color="primary" class="mb-4" style="opacity: 0.2;"></v-icon>
          
          <p class="text-body-1 text-grey-darken-2 mb-6 flex-grow-1" style="line-height: 1.6;">
            "O atendimento é diferenciado! É nítido que os donos têm o máximo cuidado com a entrega e uma preocupação real com o bem-estar dos bichinhos. O produto chega impecável e o carinho da marca com os clientes é simplesmente incrível. Recomendo de olhos fechados!"
          </p>

          <div class="d-flex align-center mt-auto">
            <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
              <span class="text-h6 font-weight-bold">A</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-black">Arthur</div>
              <div class="text-caption text-grey">Tutor(a) de Gato</div>
            </div>
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

.blur-card-feedback {
  background: rgba(var(--v-theme-surface), 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.03) !important;
  transition: transform 0.3s ease;
}

.blur-card-feedback:hover {
  transform: translateY(-5px);
}

.v-theme--dark .blur-card-feedback {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
</style>
