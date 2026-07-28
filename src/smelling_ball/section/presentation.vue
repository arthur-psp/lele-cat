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
            <div class="text-bgsec" id="title">A tecnologia <span class="text-logoColor">natural</span> que elimina <span class="text-logoColor">100% dos odores</span> da areia.</div>
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
            class="text-body-1 bg-secondary font-weight-black mt-8 text-bgsec"
            rounded="lg"
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

    <v-row>
      <v-col cols="12" style="min-height: 100vh;" class="d-flex align-center justify-center">
        <v-img
          id="all-product"
          :src="products"
          class=" overflow-visible"
          max-width="1200"
        ></v-img>
      </v-col>
    </v-row>

    <v-row justify="space-evenly" class="my-10 px-4">
      <v-col data-speed="1.5" cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-leaf" size="32" id="box1"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">100% Natural</div>
        <div class="text-caption">Seguro para seu pet e para o planeta</div>
      </v-col>

      <v-col data-speed="1.2" cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-clock-fast" size="32" id="box2"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">Ação Instantânea</div>
        <div class="text-caption">Elimina odores no momento do contato</div>
      </v-col>

      <v-col data-speed="1.5" cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-cat" size="32" id="box3"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">Amigo dos Gatos</div>
        <div class="text-caption">Sem fragrâncias irritantes ou químicas</div>
      </v-col>

      <v-col data-speed="1.2" cols="6" md="2" class="d-flex flex-column align-center text-center">
        <v-avatar color="primary" variant="tonal" size="64" class="mb-3">
          <v-icon icon="mdi-trending-up" size="32" id="box4"></v-icon>
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold">Alto Rendimento</div>
        <div class="text-caption">Prolonga em até 3x a vida útil da areia</div>
      </v-col>
    </v-row>

    <v-row class="ma-0 mt-16">
      <v-col cols="12" class="d-flex align-center justify-center position-relative pa-0">
        <v-img
          :src="catImage"
          class="rounded-xl overflow-visible"
          max-width="500"
        >
          <div class="fill-height d-flex align-start justify-center">
            <div
              id="finality"
              class="text-center px-6 py-4 rounded-xl mx-4 blur-card"
              :class="mobile ? 'text-caption' : 'text-body-2'"
              style="max-width: 90%; border: 1px solid                 
                rgba(255,255,255,0.3); background: rgba(255, 255, 255, 0.1);         
               backdrop-filter: blur(12px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0,  
                0.1);"     
            >
              <div
                id="legend"
                class="font-weight-black"
                :class="mobile ? 'text-body-1' : 'text-h6'"
              >
                Elimina o cheiro de urina e fezes <span class="text-secondary">instantaneamente</span>, prolongando a vida útil da areia.
              </div>
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
import firstOptionVideo from "../../assets/firstOption.mp4"
import products from "../../assets/todas.png"
import { smellingBallController } from "../controller/smelling_ball_controller";
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  font-family: 'Playfair+Display' !important;
}

.hero-wrapper {
  width: 100%;
  min-height: calc(100vh - var(--appbar-height, 64px));
  min-height: calc(100dvh - var(--appbar-height, 64px));
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
</style>