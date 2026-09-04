<template>
  <v-app-bar 
    elevation="0" 
    color="transparent"
    :density="mobile ? 'compact' : 'default'"
    class="px-md-10"
    height="70"
    style="backdrop-filter: blur(2px); background-color: rgba(255, 255, 255, 0.02) !important;"
  >

    <template v-slot:prepend>
      <div style="width: 210px; height: 230px; flex: none; display: flex; justify-content: center;">
        <v-img :src="vetor" width="100%" height="100%" contain class="cursor-pointer" @click="redirectToHome"></v-img>
      </div>
    </template>

    <template v-slot:append>
        <v-btn 
          variant="text" 
          class="text-none font-weight-black ml-2 hover-bg" 
          rounded="lg" 
          style="color: #dfdfdf;"
          @click="goToChooseProductScreen"
        >
          Comprar
        </v-btn>

        <v-btn 
          v-if="statusPayment.status === 'PENDING' || statusPayment.status === 'PAID'"
          variant="text" 
          class="text-none font-weight-black ml-2 hover-bg" 
          rounded="lg" 
          style="color: #dfdfdf;"
          @click="myProductDialog = true"
        >
          Meus Produtos
        </v-btn>
      <!-- <v-btn 
        :icon="theme.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'" 
        variant="text"
        @click="changeTheme"
        class="mr-2"
        :color="theme.current.value.dark ? 'terciary' : 'warning'"
      ></v-btn> -->
      <div class="d-none d-md-flex">
        <v-btn variant="text" class="text-none font-weight-black ml-2 hover-bg" rounded="lg" style="color: #dfdfdf;">
          Informações
          <v-icon icon="mdi-chevron-down" end></v-icon>
          
          <v-menu activator="parent" transition="slide-y-transition">
            <v-list rounded="xl" class="mt-2 pa-5">
              <v-list-item 
                prepend-icon="mdi-instagram" 
                title="Ver Instragram" 
                base-color="logoColor"
                href="https://www.instagram.com/lelecat.desodorizante?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
              <v-list-item 
                prepend-icon="mdi-box" 
                title="Meus Produtos" 
                base-color="success"
                target="_blank"
                rounded="lg"
                class="mt-1"
                @click="controller.handleStatusPaymentOpen(true)"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-app-bar>

  <v-dialog
    v-model="myProductDialog"
    max-width="50%"
  >
    <v-card class="bg-liquid d-flex align-center justify-center" min-width="900" border>
      <v-card-title style="width: 100%;">
        <div class="d-flex justify-space-between align-center ">
          <div class="font-weight-bold text-h4">Meus Produtos</div>
          <v-btn
            icon="mdi-close"
            rounded="lg"
            density="comfortable"
            @click="myProductDialog = false"
          ></v-btn>
        </div>
      </v-card-title>

      <v-card-text class="d-flex flex-column align-center text-center">
        <div style="background-color: rgb(var(--v-theme-surface), 0.9); " class="rounded-lg pa-5">
          <v-img
            :src="productBought.image"
            width="200"
            cover
            class="rounded-lg mb-3"
          ></v-img>

          <v-chip :color="productBought.chip" class="font-weight-bold" label>
            {{ productBought.name }}
          </v-chip>
        </div>
      </v-card-text>

      <div class="d-flex align-center">
        <div class="d-flex w-75 align-center py-2 px-4">
          <v-alert :color="currentStatus.color" density="compact">
            <template v-slot:prepend>
              <v-icon :icon="currentStatus.icon"></v-icon>
            </template>

            <template v-slot:default>
              {{ currentStatus.message }}
            </template>
          </v-alert>
        </div>

        <div class="d-flex align-center justify-center py-2 px-4">
          <v-btn
            rounded="lg"
            class="text-body-2 mr-1"
            @click="handleClearStorage"
            :disabled="received"
          >
            <template v-slot:prepend>
              <v-icon
                icon="mdi-check"
                color="success"
              ></v-icon>
            </template>
            Recebido
          </v-btn>

          <v-btn
            rounded="lg"
            class="text-body-2 ml-1"
            variant="outlined"
            prepend-icon="mdi-whatsapp"
            href="https://wa.me/555496257038"
          >Fale Conosco</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>

</template>

<script setup>
import logoLight from "../assets/logo/logo_light-removebg-preview.png"
import logoDark from "../assets/logo/logo_dark-removebg-preview.png"
import fiveicon from "../assets/logo/fiveicon.png"
import logo from "../assets/logo/logo.png"
import vetor from "../assets/logo/vetor.png"
import { paymentController } from "../module/payment/controller/payment_controller"
import { useRouter } from "vue-router"
import { useTheme } from "vuetify";
import { computed, inject, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";
import { paymentKeys } from "../module/payment/keys/payment_keys.js"

const getPaymentStatusByIdUseCaseImpl = inject(paymentKeys.getPaymentStatusByIdUseCaseImpl)

const { controller } = paymentController()
const router = useRouter()
const theme = useTheme()
const currentTheme = ref("system");
const isLightTheme = ref(false)
const { mobile } = useDisplay()
const loading = ref(false)
const statusPayment = ref({})
const productBought = ref({})
const myProductDialog = ref(false)
const received = ref(false)

const changeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

const getSystemTheme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkMode ? "dark" : "light";
};

const applyTheme = (mode) => {
  if (mode === 'system') {
    theme.global.name.value = getSystemTheme();
  } else {
    theme.global.name.value = mode;
  }
}

const handleChangeThemeMode = async (mode) => {
  currentTheme.value = mode;
  applyTheme(mode);
};

const redirectToHome = () => {
  router.push({ path: '/' })
}

onMounted(async () => {
  applyTheme(currentTheme.value)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentTheme.value === 'system') {
      applyTheme('system');
    }
  });

  await checkPayment()
})

const goToChooseProductScreen = () => {
  router.push({ path: '/choose-products' })
}

const checkPayment = async () => {
  try {
    loading.value = true
    productBought.value = JSON.parse(localStorage.getItem('product_status'))

    if(!productBought.value.id) return    
    
    statusPayment.value = await getPaymentStatusByIdUseCaseImpl(productBought.value.id)
  } catch (err) {
      console.log('Erro ao consultar estado do pagamento: ', err);
      statusPayment.value = {}
      productBought.value = {}
  } finally {
      loading.value = false
  }
}

const paymentStatusMap = {
  PENDING: {
    color: 'info',
    icon: 'mdi-information-outline',
    message: 'Estamos aguardando confirmação do pagamento. Se isso persistir por muito tempo, tente recarregar a página.'
  },
  PAID: {
    color: 'success',
    icon: 'mdi-truck-fast-outline',
    message: 'Seu produto está sendo entregue. Se tiver alguma dúvida, entre em contato conosco no WhatsApp.'
  }
}
 
const currentStatus = computed(() => 
  paymentStatusMap[statusPayment.value.status] ?? paymentStatusMap.PENDING
)

const handleClearStorage = () => {
  localStorage.removeItem('product_status')
  received.value = true
  myProductDialog.value = false
}
</script>

<style>
.dancing-script {
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-size: 40px;
  font-weight: 700;
  font-style: normal;
  color: #f8bc68;
}

.v-toolbar-title {
  margin-inline-start: 5px !important;
  height: 100%;
}

.v-toolbar-title__placeholder {
  display: flex;
  height: 100%;
  align-items: center;
  padding-inline: 5px;
}

.hover-bg {
  transition: background-color 0.2s ease;
  border-radius: 4px;
}
.hover-bg:hover {
  background-color: rgba(var(--v-theme-logoColor));
  color: rgba(var(--v-theme-bgsec)) !important;
  transform: scale(1.1);
}

.bg-liquid{
  background-color: rgba(15, 15, 15, 0.289) !important;
  backdrop-filter: blur(15px) !important;
}
</style>