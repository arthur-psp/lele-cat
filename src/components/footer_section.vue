<template>
  <v-footer class="bg-surface-variant py-12 border-t">
    <v-container>
      <v-row justify="space-between">
        <!-- Logo e Slogan -->
        <v-col cols="12" md="4" class="text-center text-md-left mb-8 mb-md-0">
          <div class="title-font text-h5 font-weight-black mb-2 text-primary">Lelê Cat</div>
          <p class="text-body-2 text-grey-darken-1">
            Cuidado natural para sua casa, <br> carinho essencial para seu gato.
          </p>
          <div class="mt-6">
            <v-btn
              icon="mdi-instagram"
              variant="text"
              color="primary"
              size="large"
              class="mr-2"
              href="https://www.instagram.com/lelecat.desodorizante?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            ></v-btn>
            <v-btn
              icon="mdi-whatsapp"
              variant="text"
              color="primary"
              size="large"
              href="https://wa.me/54996257038"
              target="_blank"
            ></v-btn>
          </div>
        </v-col>

        <!-- Contato Rápido -->
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="font-weight-black text-subtitle-1 mb-4 text-uppercase">Contato</div>
          <div class="d-flex align-center justify-center justify-md-start mb-3 text-grey-darken-2">
            <v-icon icon="mdi-map-marker" size="18" class="mr-2 text-primary"></v-icon>
            <span class="text-body-2">Rio Grande do Sul, Brasil</span>
          </div>
          <div class="d-flex align-center justify-center justify-md-start mb-3 text-grey-darken-2">
            <v-icon icon="mdi-instagram" size="18" class="mr-2 text-primary"></v-icon>
            <span class="text-body-2">@lelecat.desodorizante</span>
          </div>
          <div class="d-flex align-center justify-center justify-md-start text-grey-darken-2">
            <v-icon icon="mdi-email" size="18" class="mr-2 text-primary"></v-icon>
            <span class="text-body-2">rfimpdistribuidora@gmail.com</span>
          </div>
        </v-col>

        <!-- <v-col cols="12" md="3" class="text-center text-md-left">
          <div class="font-weight-black text-subtitle-1 mb-4 text-uppercase">Links Úteis</div>
          <v-btn 
            variant="text" 
            class="pa-0 text-none text-body-2 mb-1 mx-auto mx-md-0" 
            color="grey-darken-2"
            href="https://shopee.com.br/product/219423316/58256794939?d_id=08cb3&uls_trackid=55g9tvvg00f2&utm_content=3V5Px4oyY62T8fz9ZFrmodRQPwRR"
            target="_blank"
          >
            Comprar na Shopee
          </v-btn>
          <v-btn 
            variant="text" 
            class="pa-0 text-none text-body-2 d-block mx-auto mx-md-0" 
            color="grey-darken-2"
          >
            Política de Privacidade
          </v-btn>
        </v-col> -->
      </v-row>

      <v-divider class="my-8"></v-divider>

      <v-row>
        <v-col cols="12" class="text-center text-caption text-grey">
          © {{ new Date().getFullYear() }} Lelê Cat - Feito com ❤️ no Rio Grande do Sul
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
</script>

<style scoped>
.title-font {
  font-family: 'Playfair Display', serif !important;
}
</style>
