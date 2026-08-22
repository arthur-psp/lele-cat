<template>
  <div class=" px-4 pb-16 d-flex flex-column justify-center align-center" style="min-height: 100vh; width: 100%;">
    <section class="text-center px-2" style="padding-top: 100px;">
      <h1 class="title-font font-weight-black text-h4 text-md-h2">
        Escolha seus <span class="text-logoColor">produtos</span>
      </h1>
      <p class="text-body-1 text-medium-emphasis mx-auto mt-4" style="max-width: 560px;">
        Selecione a fragrância, defina a quantidade e finalize sua compra com segurança.
      </p>
    </section>

    <v-row class="bg-surface rounded-lg mt-5" style="width: 90% !important;">
      <v-col cols="12" md="7">
        <div
          class="h-100 d-flex align-center justify-center"
          style="width: 100%; height: clamp(620px, 44vw, 900px);"
        >
          <DepthCarousel
            :items="carouselItems"
            :depth="activeItem.name === 'Kit Completo' ? '1000' : '220'"
            :spread="55"
            :tilt="22"
            tilt-direction="right"
            :perspective="1900"
            :visible-cards="2"
            :falloff="0.2"
            :blur="4"
            :card-width="activeItem.name === 'Kit Completo' ? '1900' : '1000'"
            :card-height="1400"
            :radius="18"
            ease="power3.out"
            show-controls
            show-indicators
            @change="onCarouselChange"
          />
        </div>
      </v-col>

      <v-col cols="12" md="5" class="d-flex align-center justify-center">
        <section class="d-flex flex-column ga-5 w-100 mx-auto mt-2" style="max-width: 980px;">
          <v-card
            class="d-flex flex-column flex-md-row align-stretch pa-6 pa-md-8 ga-6 bg-liquid"
            rounded="xl"
            elevation="10"
            border
          >
            <div class="d-flex flex-column justify-center flex-grow-1" style="min-width: 0;">
              <v-chip
                :color="activeItem.chip"
                variant="flat"
                class="font-weight-black px-6 mb-4"
              >
                {{ activeItem.name }}
              </v-chip>

              <div class="d-flex align-baseline flex-wrap ga-3 mb-2">
                <span class="title-font font-weight-black text-h4">{{ formatBRL(activeItem.price) }}</span>
                <span
                  v-if="activeItem.oldPrice"
                  class="text-body-1 text-medium-emphasis text-decoration-line-through"
                >de {{ formatBRL(activeItem.oldPrice) }}</span>
                <span class="text-body-2 text-medium-emphasis">{{ activeItem.unitLabel }}</span>
              </div>

              <p class="text-body-1 text-medium-emphasis mt-1">{{ activeItem.description }}</p>

              <v-chip
                v-if="activeItem.isKit"
                color="logoColor"
                variant="flat"
                class="font-weight-bold mt-4"
              >
                <v-icon icon="mdi-package-variant-closed" size="16" start></v-icon>
                Kit com as 4 fragrâncias da linha · 20% OFF
              </v-chip>
            </div>

            <v-divider vertical class="mx-2 hidden-sm-and-down"></v-divider>

            <div class="d-flex flex-column align-center justify-center ga-4 flex-grow-1" style="min-width: 0;">
              <span class="text-overline font-weight-bold text-medium-emphasis">Quantidade</span>

              <div class="d-inline-flex align-center ga-4 pa-1 px-2 rounded-pill bg-surface-variant border">
                <v-btn
                  icon="mdi-minus"
                  size="large"
                  variant="tonal"
                  color="logoColor"
                  rounded="circle"
                  :disabled="qty <= 1"
                  aria-label="Diminuir quantidade"
                  @click="decreaseQty"
                ></v-btn>
                <div class="title-font text-h5 font-weight-black text-center" style="min-width: 34px;">{{ qty }}</div>
                <v-btn
                  icon="mdi-plus"
                  size="large"
                  variant="tonal"
                  color="logoColor"
                  rounded="circle"
                  :disabled="qty >= MAX_QTY"
                  aria-label="Aumentar quantidade"
                  @click="increaseQty"
                ></v-btn>
              </div>

              <span class="text-caption text-medium-emphasis d-inline-flex align-center ga-1">
                <v-icon icon="mdi-information-outline" size="14"></v-icon>
                Limite de {{ MAX_QTY }} unidades por produto
              </span>
            </div>
          </v-card>

          <v-card class="pa-6 pa-md-7 bg-liquid" rounded="xl" elevation="10" border>
            <div class="d-flex justify-space-between align-center text-body-2 text-medium-emphasis pb-4">
              <span>{{ activeItem.name }} × {{ qty }}</span>
              <span>{{ formatBRL(activeItem.price * qty) }}</span>
            </div>

            <div class="d-flex justify-space-between align-baseline py-4 border-t ">
              <span class="font-weight-bold text-body-2 text-uppercase">Total</span>
              <span class="title-font text-h4 font-weight-black text-logoColor">{{ formatBRL(activeItem.price * qty) }}</span>
            </div>

            <v-btn
              text="Continuar para pagamento"
              block
              size="x-large"
              rounded="xl"
              color="logoColor"
              variant="flat"
              class="font-weight-black text-none cta-button"
              elevation="8"
              @click="controller.generatePixQrCode"
            ></v-btn>

            <div class="d-flex justify-center flex-wrap ga-4 mt-4">
              <span class="d-inline-flex align-center ga-1 text-caption text-medium-emphasis">
                <v-icon icon="mdi-lock-outline" size="16"></v-icon>
                Pagamento seguro
              </span>
              <span class="d-inline-flex align-center ga-1 text-caption text-medium-emphasis">
                <v-icon icon="mdi-truck-fast-outline" size="16"></v-icon>
                Frete Grátis
              </span>
            </div>
          </v-card>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import DepthCarousel from "../../../components/depth_carousel.vue";
import lavanda from "../../../assets/lavanda.png";
import hortela from "../../../assets/hortela.png";
import talcoDeBebe from "../../../assets/talco_de_bebe.png";
import limao from "../../../assets/limao.png";
import todas from "../../../assets/todas.png";

import { paymentController } from "../controller/payment_controller";

const { controller } = paymentController()

const route = useRoute()

const MAX_QTY = 10

const PRODUCTS = [
  {
    id: "lavanda",
    name: "Lavanda",
    image: lavanda,
    alt: "Desodorizante Lelê Cat Lavanda",
    label: "Lavanda",
    price: 55,
    unitLabel: "/ un",
    chip: "#7b1c8a",
    description: "Aroma floral e relaxante, perfeito para criar um ambiente acolhedor.",
  },
  {
    id: "hortela",
    name: "Hortelã",
    image: hortela,
    alt: "Desodorizante Lelê Cat Hortelã",
    label: "Hortelã",
    price: 55,
    unitLabel: "/ un",
    chip: "#0f4d1e",
    description: "Frescor revigorante que purifica o ar da sua casa.",
  },
  {
    id: "talco",
    name: "Talco de Bebê",
    image: talcoDeBebe,
    alt: "Desodorizante Lelê Cat Talco de Bebê",
    label: "Talco de Bebê",
    price: 55,
    unitLabel: "/ un",
    chip: "#3970b3",
    description: "Suavidade clássica e aconchegante, como um abraço.",
  },
  {
    id: "limao",
    name: "Limão",
    image: limao,
    alt: "Desodorizante Lelê Cat Limão",
    label: "Limão",
    price: 55,
    unitLabel: "/ un",
    chip: "#fadf69",
    description: "Cítrico e vibrante, elimina os odores com energia.",
  },
  {
    id: "kit",
    name: "Kit Completo",
    image: todas,
    alt: "Kit completo com as 4 fragrâncias Lelê Cat",
    label: "Kit Completo",
    price: 159.6,
    oldPrice: 200,
    unitLabel: "/ kit",
    chip: "#f8bc68",
    isKit: true,
    description: "As 4 fragrâncias da linha completa com 20% de desconto.",
  },
]

const VALID_IDS = PRODUCTS.map((p) => p.id)
const selectedId = VALID_IDS.includes(route.query.product) ? route.query.product : null

// O produto escolhido na home aparece em primeiro lugar no carrossel
const items = computed(() => {
  if (!selectedId) return PRODUCTS
  const selected = PRODUCTS.find((p) => p.id === selectedId)
  return [selected, ...PRODUCTS.filter((p) => p.id !== selectedId)]
})

const carouselItems = computed(() =>
  items.value.map((p) => ({ image: p.image, alt: p.alt, label: p.label }))
)

const selectedItem = computed(() => (selectedId ? items.value[0] : null))

const activeIndex = ref(0)
const activeItem = computed(() => items.value[activeIndex.value])

const quantities = reactive(
  Object.fromEntries(PRODUCTS.map((p) => [p.id, 1]))
)

const qty = computed(() => quantities[activeItem.value.id])

const onCarouselChange = (index) => {
  activeIndex.value = index
}

const increaseQty = () => {
  quantities[activeItem.value.id] = Math.min(MAX_QTY, qty.value + 1)
}

const decreaseQty = () => {
  quantities[activeItem.value.id] = Math.max(1, qty.value - 1)
}

const formatBRL = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
</script>

<style scoped>
.title-font {
  font-family: "Playfair Display", serif;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.bg-liquid{
  background-color: rgba(0, 0, 0, 0.436);
  backdrop-filter: blur(8px);
}
</style>
