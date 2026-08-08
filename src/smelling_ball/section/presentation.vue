<template>
  <v-container fluid class=" pa-0 ma-0 bg-bgsec">
    <div
      ref="heroSection"
      class="hero-wrapper position-relative overflow-hidden"
    >
      <div class="hero-video-wrapper">
        <video
          ref="heroVideo"
          class="hero-video"
          muted
          playsinline
          preload="auto"
        >
          <source :src="firstOptionVideo + '#t=0.5'" type="video/mp4" />
        </video>
      </div>

      <v-row
        class="ma-0 align-center justify-center position-relative"
        style="z-index: 1; height: 100%;"
      >
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column align-center justify-center pa-10 position-relative"
          style="height: 80vh; z-index: 1;"
        >
          <div
            class="font-weight-black text-center blur-container font"
            :class="mobile ? 'text-h4' : 'text-h2'"
            style="max-width: 800px;"
          >
            <div
              class="pa-6 rounded-xl mb-16 position-absolute w-100 h-100 highlight-bg"
              style="z-index: -1; filter: blur(10px);"
            ></div>
            <div class="" id="title">A tecnologia <span class="text-terciary">natural</span> que elimina <span class="text-terciary">100% dos odores</span> da areia.</div>
          </div>

          <div
            class="mt-12 text-center font-weight-medium text-bgsec"
            :class="mobile ? 'text-h6' : 'text-h5'"
            style="max-width: 600px;"
            id="subtitle"
          >
            O Lelê Cat elimina odores indesejados de forma instantânea e natural. O cuidado que sua casa precisa e o carinho que seu gato merece.
          </div>

          <v-btn
            text="Conheça a Linha"
            class="text-body-1 bg-bgsec font-weight-black mt-8"
            rounded="lg"
            color="terciary"
            variant="flat"
            size="x-large"
            elevation="4"
            @click="redirect"
          ></v-btn>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
        </v-col>
      </v-row>
    </div>

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
            <v-col id="frag" cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-scent" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">Liberação de</div>
              <div class="text-h6 font-weight-black text-primary">Fragrância</div>
            </v-col>
            <v-col id="dec" cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-molecule" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">Decompõe o</div>
              <div class="text-h6 font-weight-black text-primary">mau Cheiro</div>
            </v-col>
            <v-col id="duration" cols="6" sm="3" class="text-center">
              <v-icon icon="mdi-clock-outline" color="primary" size="32" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold">7 dias de</div>
              <div class="text-h6 font-weight-black text-primary">Frescor</div>
            </v-col>
            <v-col id="natural" cols="6" sm="3" class="text-center">
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
      <v-col id="lavanda" cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class=" pa-4 text-center d-flex flex-column align-center">
          <v-chip 
            id="lavanda-chip"
            class="font-weight-black mb-6 px-6" 
            color="#7b1c8a" 
            variant="flat" 
          >
            Lavanda
          </v-chip>
                
          <v-img :src="lavanda" width="55%" class="product-img"></v-img>
        
          <div class="d-flex align-baseline justify-center mb-4">
            <span class="text-h5 font-weight-medium">R$ 55,00</span>
            <span class="text-caption text-medium-emphasis ml-1">/ un</span>
          </div>

          <v-btn
            color="logoColor"
            width="250"
            size="large"
            rounded="lg"
            prepend-icon="mdi-cart-outline"
            class="font-weight-bold buy-animation"
            elevation="0"
          >
            Comprar
          </v-btn>
        </v-card>
      </v-col>

      <!-- Hortelã -->
      <v-col id="hortela" cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="pa-6 text-center d-flex flex-column align-center">
          
          <v-chip id="hortela-chip" class="font-weight-black mb-4 px-6" color="hortela" variant="flat">
            Hortelã
          </v-chip>

          <v-img :src="hortela" width="55%" class="product-img"></v-img>


          <div class="d-flex align-baseline justify-center mb-4">
            <span class="text-h5 font-weight-medium">R$ 55,00</span>
            <span class="text-caption text-medium-emphasis ml-1">/ un</span>
          </div>

          <v-btn
            color="logoColor"
            width="250"
            size="large"
            rounded="lg"
            prepend-icon="mdi-cart-outline"
            class="font-weight-bold buy-animation"
            elevation="0"
          >
            Comprar
          </v-btn>

        </v-card>
      </v-col>

      <v-divider v-if="!mobile" class="my-4"></v-divider>

      <!-- Talco de Bebê -->
      <v-col id="talco" cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="pa-4 text-center d-flex flex-column align-center">
          <v-chip 
            id="talco-chip"
            class="font-weight-black mb-6 px-6" 
            color="#3970b3" 
            variant="flat" 
          >
            Talco de Bebê
          </v-chip>
                  
          <v-img :src="talcoDeBebe" width="55%" class="product-img"></v-img>

          <div class="d-flex align-baseline justify-center mb-4">
            <span class="text-h5 font-weight-medium">R$ 55,00</span>
            <span class="text-caption text-medium-emphasis ml-1">/ un</span>
          </div>

          <v-btn
            color="logoColor"
            width="250"
            size="large"
            rounded="lg"
            prepend-icon="mdi-cart-outline"
            class="font-weight-bold buy-animation"
            elevation="0"
          >
            Comprar
          </v-btn>
        </v-card>
      </v-col>

      <!-- Limão -->
      <v-col id="limao" cols="12" md="6" class="d-flex align-center justify-center">
        <v-card rounded="xl" flat width="100%" class="pa-4 text-center d-flex flex-column align-center">
          <v-chip 
            id="limao-chip"
            class="font-weight-black mb-6 px-6" 
            color="limao" 
            variant="flat" 
          >
            Limão
          </v-chip>
             
          <v-img :src="limao" width="55%" class="product-img"></v-img>

          <div class="d-flex align-baseline justify-center mb-4">
            <span class="text-h5 font-weight-medium">R$ 55,00</span>
            <span class="text-caption text-medium-emphasis ml-1">/ un</span>
          </div>
          
          <v-btn
            color="logoColor"
            width="250"
            size="large"
            rounded="lg"
            prepend-icon="mdi-cart-outline"
            class="font-weight-bold buy-animation"
            elevation="0"
          >
            Comprar
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="space-evenly" class="my-10 px-4">
      <v-col id="box1" data-speed="1.2" cols="6" md="2" class="d-flex flex-column align-center text-center">
        <div >
          <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
            <v-icon icon="mdi-leaf" size="32" ></v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold">100% Natural</div>
          <div class="text-caption">Seguro para seu pet e para o planeta</div>
        </div>
      </v-col>

      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <div id="box2" data-speed="1.2">
          <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
            <v-icon icon="mdi-clock-fast" size="32"></v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold">Ação Instantânea</div>
          <div class="text-caption">Elimina odores no momento do contato</div>
        </div>
      </v-col>

      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <div id="box3" data-speed="1.2">
          <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
            <v-icon icon="mdi-cat" size="32"></v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold">Amigo dos Gatos</div>
          <div class="text-caption">Sem fragrâncias irritantes ou químicas</div>
        </div>
      </v-col>

      <v-col cols="6" md="2" class="d-flex flex-column align-center text-center">
        <div id="box4" data-speed="1.2">
          <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
            <v-icon icon="mdi-trending-up" size="32"></v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold">Alto Rendimento</div>
          <div class="text-caption">Prolonga em até 3x a vida útil da areia</div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div
          class="text-center px-6 py-4 rounded-lg mx-4 blur-card"
          style="max-width: 80%; border: 1px solid                 
            rgba(255,255,255,0.1); background: rgba(255, 255, 255, 0.04);         
           backdrop-filter: blur(10px);"     
        >
          <div
            id="legend"
            class="font-weight-black"
            :class="mobile ? 'text-body-1' : 'text-h4'"
          >
            Elimina o cheiro de urina e fezes <span class="text-secondary">instantaneamente</span>, prolongando a vida útil da areia.
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center pa-0">
        <v-img
          :src="catImage"
          class="rounded-xl overflow-visible"
          max-width="700"
        >
        </v-img>
      </v-col>
    </v-row>

    <v-row class="ma-0 products-section">
      <v-col cols="12" md="6" class="d-flex align-center justify-center pa-md-8">
        <div class="product-image-wrap position-relative">
          <div class="product-glow"></div>
          <img
            id="all-product"
            :src="products"
            alt="Linha completa de produtos Lelê Cat"
            class="product-image"
          />
        </div>
      </v-col>

      <v-col id="offer-card" cols="12" md="6" class="d-flex align-center justify-center pa-md-8">
        <div class="offer-card">
          <div class="d-flex align-center mb-3">
            <v-chip color="bgsec" variant="flat" class="font-weight-black text-logoColor mr-3">OFERTA</v-chip>
            <span class="text-bgsec font-weight-black">-20% OFF comprando 4 un.</span>
          </div>

          <h3 class="offer-card__title text-bgsec font-weight-black mb-2">Lelê Cat Desodorizante</h3>
          <p class="text-bgsec mb-6">
            Elimina 100% dos odores da areia de forma instantânea e natural.
          </p>

          <div class="offer-card__price text-bgsec mb-6">
            <div class="old-price">De R$ 200,00</div>
            <div class="d-flex align-end">
              <span class="current-price">R$ 159</span>
              <span class="cents mb-1">,60</span>
            </div>
          </div>

          <v-btn
            text="Comprar Agora"
            block
            size="x-large"
            rounded="xl"
            class="text-body-1 bg-bgsec font-weight-black text-logoColor"
            elevation="6"
            @click="redirect"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
import catImage from "../../assets/cat_image.png"
import firstOptionVideo from "../../assets/firstOption.mp4"
import products from "../../assets/todas.png"
import { smellingBallController } from "../controller/smelling_ball_controller";
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import lavanda from "../../assets/lavanda.png"
import hortela from "../../assets/hortela.png"
import talcoDeBebe from "../../assets/talco_de_bebe.png"
import limao from "../../assets/limao.png"

gsap.registerPlugin(ScrollTrigger);

const { mobile } = useDisplay();
const { controller } = smellingBallController()

const heroSection = ref(null);
const heroVideo = ref(null);
let videoScrollTrigger = null;

function initVideoScrollScrub() {
  const video = heroVideo.value;
  const section = heroSection.value;
  if (!video || !section) return;

  const bindScrub = () => {
    videoScrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 0,
      end: "+=100%",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        if (video.duration) {
          const startOffset = 0.5; 
          video.currentTime = startOffset + (self.progress * (video.duration - startOffset));
        }
      },
    });
  };

  if (video.readyState >= 1) {
    bindScrub();
  } else {
    video.addEventListener("loadedmetadata", bindScrub, { once: true });
  }
  video.play().then(() => video.pause()).catch(() => {});
}

onMounted(async () => {
  controller.initSmellingBallScroll()
  initVideoScrollScrub()
})

onBeforeUnmount(() => {
  videoScrollTrigger?.kill();
})

const redirect = () => {
  window.open("https://shopee.com.br/product/219423316/58256794939?d_id=08cb3&uls_trackid=55g9tvvg00f2&utm_content=3V5Px4oyY62T8fz9ZFrmodRQPwRR")
}
</script>

<style scoped>
.font {
  font-family: 'Playfair+Display' !important;
}

.products-section {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 24px 16px;
}

.product-image-wrap {
  z-index: 2;
  width: 100%;
  max-width: 850px;
}

.product-image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: auto;
  display: block;
}

.product-glow {
  position: absolute;
  inset: 8%;
  background: radial-gradient(circle, rgba(var(--v-theme-logoColor), 0.28) 0%, transparent 70%);
  filter: blur(12px);
  z-index: 0;
}

.offer-card {
  background: rgb(var(--v-theme-logoColor));
  border-radius: 32px;
  padding: 40px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.offer-card__title {
  font-family: 'Playfair Display', serif !important;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.2;
}

.old-price {
  font-size: 20px;
  text-decoration: line-through;
  opacity: 0.55;
}

.current-price {
  font-family: 'Playfair Display', serif !important;
  font-size: clamp(52px, 6vw, 72px);
  font-weight: 900;
  line-height: 1;
}

.cents {
  font-size: 24px;
  font-weight: 900;
}

@media (min-width: 960px) {
  /* Imagem sobrepõe levemente o card de oferta */
  .product-image-wrap {
    margin-right: -70px;
  }
}

@media (max-width: 959px) {
  .products-section {
    padding: 24px 8px;
  }

  .offer-card {
    padding: 28px 20px;
    border-radius: 24px;
  }
}

.hero-wrapper {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
}

.hero-video-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.hero-video-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(26, 26, 26, 1) 0%,
    rgba(26, 26, 26, 0) 5%
  );
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.title-font {
  font-family: 'Playfair Display', serif !important;
}

.buy-animation {
  transition: transform 0.3s ease;
}

.buy-animation:hover {
  transform: translateY(-2px);
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

.product-img {
  max-width: 50% !important;
}
</style>