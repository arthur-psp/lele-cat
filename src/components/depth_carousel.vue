<template>
  <div
    ref="rootEl"
    class="depth-carousel"
    :style="{ '--dc-perspective': `${perspective}px` }"
    role="group"
    aria-roledescription="carousel"
    aria-label="Depth carousel"
    tabindex="0"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerEnd"
    @pointercancel="onPointerEnd"
    @keydown="onKeyDown"
  >
    <div ref="stageEl" class="depth-carousel__stage">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="depth-carousel__card"
        :ref="(el) => setCardRef(el, i)"
        :style="{ width: `${cardWidth}px`, height: `${cardHeight}px`, borderRadius: `${radius}px` }"
        :aria-roledescription="'slide'"
        :aria-label="`${i + 1} of ${count}`"
        :aria-hidden="active !== i"
        @click="onCardClick(i)"
      >
        <img class="depth-carousel__img" :src="item.image" :alt="item.alt || ''" draggable="false" />
      </div>
    </div>

    <template v-if="showControls && count > 1">
      <button
        type="button"
        class="depth-carousel__arrow depth-carousel__arrow--prev"
        aria-label="Slide anterior"
        @click="navigateBy(-1)"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        class="depth-carousel__arrow depth-carousel__arrow--next"
        aria-label="Próximo slide"
        @click="navigateBy(1)"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </template>

    <div v-if="showIndicators && count > 1" class="depth-carousel__dots" role="tablist" aria-label="Slides">
      <button
        v-for="(_, i) in data"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="active === i"
        :aria-label="`Ir para o slide ${i + 1}`"
        :class="['depth-carousel__dot', { 'is-active': active === i }]"
        @click="setFocus(i, true)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import gsap from "gsap";

const props = defineProps({
  items: { type: Array, default: () => [] },
  cardWidth: { type: Number, default: 300 },
  cardHeight: { type: Number, default: 380 },
  radius: { type: Number, default: 18 },
  tint: { type: String, default: "#05060a" },
  depth: { type: Number, default: 220 },
  spread: { type: Number, default: 90 },
  tilt: { type: Number, default: 22 },
  tiltDirection: { type: String, default: "right" },
  perspective: { type: Number, default: 1400 },
  visibleCards: { type: Number, default: 4 },
  falloff: { type: Number, default: 0.2 },
  blur: { type: Number, default: 6 },
  duration: { type: Number, default: 700 },
  ease: { type: String, default: "power3.out" },
  autoplay: { type: Boolean, default: false },
  autoplayDelay: { type: Number, default: 3200 },
  loop: { type: Boolean, default: true },
  showControls: { type: Boolean, default: true },
  showIndicators: { type: Boolean, default: true },
});

const emit = defineEmits(["change"]);

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeItem = (it) => (typeof it === "string" ? { image: it, alt: "" } : it);

const data = computed(() => (Array.isArray(props.items) ? props.items : []).map(normalizeItem));
const count = computed(() => data.value.length);

const rootEl = ref(null);
const stageEl = ref(null);
const cardEls = ref([]);
const overlayEls = ref([]);

const pos = ref(0);
const focus = ref(0);
const active = ref(0);
const scale = ref(1);

let tween = null;
let drag = null;
let wheelTimer = null;
let autoTimer = null;
let reduced = false;
let ro = null;

const setCardRef = (el, i) => {
  cardEls.value[i] = el;
};
const setOverlayRef = (el, i) => {
  overlayEls.value[i] = el;
};

const layout = (p) => {
  const n = count.value;
  if (!n) return;
  const dir = props.tiltDirection === "left" ? -1 : 1;
  const sc = scale.value;

  for (let i = 0; i < n; i++) {
    const el = cardEls.value[i];
    if (!el) continue;

    let d = i - p;
    if (props.loop && n > 1) {
      d = ((d % n) + n) % n;
      if (d > n / 2) d -= n;
    }

    const back = Math.max(0, d);
    const az = Math.abs(d);
    const shown = az <= props.visibleCards + 0.5;

    const tz = -props.depth * d;
    const tx = dir * props.spread * d;
    const ry = dir * props.tilt * clamp(d, 0, 1);

    let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
    if (!shown) opacity = 0;

    const brightness = Math.max(0.15, 1 - back * props.falloff);
    const blurPx =
      props.blur > 0 ? Math.min(props.blur, (back / Math.max(1, props.visibleCards)) * props.blur) : 0;
    const zi = Math.round(2000 - d * 20);

    el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
    el.style.opacity = opacity.toFixed(3);
    el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
    el.style.zIndex = String(zi);
    el.style.pointerEvents = shown && opacity > 0.05 ? "auto" : "none";

    const ov = overlayEls.value[i];
    if (ov) ov.style.opacity = clamp(back * props.falloff * 1.25, 0, 0.86).toFixed(3);
  }
};

const notify = (idx) => {
  active.value = idx;
  emit("change", idx, data.value[idx]);
};

const tweenTo = (target, animate) => {
  if (tween) tween.kill();
  const proxy = { p: pos.value };
  const dur = animate && !reduced ? props.duration / 1000 : 0;
  tween = gsap.to(proxy, {
    p: target,
    duration: dur,
    ease: props.ease,
    onUpdate: () => {
      pos.value = proxy.p;
      layout(proxy.p);
    },
    onComplete: () => {
      const n = count.value;
      if (n > 0) pos.value = ((pos.value % n) + n) % n;
      layout(pos.value);
    },
  });
};

const setFocus = (rawIndex, animate = true) => {
  const n = count.value;
  if (!n) return;
  const idx = props.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
  let delta = idx - pos.value;
  if (props.loop && n > 1) {
    delta = ((delta % n) + n) % n;
    if (delta > n / 2) delta -= n;
  }
  tweenTo(pos.value + delta, animate);
  if (idx !== focus.value) {
    focus.value = idx;
    notify(idx);
  }
};

const navigateBy = (step) => setFocus(focus.value + step, true);

const onWheel = (e) => {
  if (count.value < 2) return;
  e.preventDefault();
  if (tween) tween.kill();
  const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  const delta = e.deltaMode === 1 ? raw * 24 : raw;
  const step = clamp(delta / (props.cardWidth * 0.9), -0.6, 0.6);
  pos.value += step;
  layout(pos.value);
  if (wheelTimer) clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => setFocus(Math.round(pos.value), true), 130);
};

const onPointerDown = (e) => {
  if (count.value < 2) return;
  if (tween) tween.kill();
  drag = {
    x: e.clientX,
    startPos: pos.value,
    lastX: e.clientX,
    lastT: performance.now(),
    v: 0,
    moved: false,
    id: e.pointerId,
  };
};

const onPointerMove = (e) => {
  if (!drag) return;
  const stepPx = Math.max(props.cardWidth * 0.55 * scale.value, 40);
  const dx = e.clientX - drag.x;
  if (!drag.moved && Math.abs(dx) > 4) {
    drag.moved = true;
    rootEl.value?.setPointerCapture(drag.id);
  }
  if (!drag.moved) return;
  const now = performance.now();
  const dt = Math.max(now - drag.lastT, 1);
  drag.v = (e.clientX - drag.lastX) / dt;
  drag.lastX = e.clientX;
  drag.lastT = now;
  pos.value = drag.startPos - dx / stepPx;
  layout(pos.value);
};

const onPointerEnd = () => {
  if (!drag) return;
  const { moved, v, startPos } = drag;
  drag = null;
  if (!moved) return;
  const stepPx = Math.max(props.cardWidth * 0.55 * scale.value, 40);
  const projected = pos.value - (v * 180) / stepPx;
  setFocus(Math.round(projected), true);
};

const onKeyDown = (e) => {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    navigateBy(-1);
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    navigateBy(1);
  }
};

const onCardClick = (index) => {
  if (drag?.moved) return;
  setFocus(index, true);
};

onMounted(() => {
  reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const root = rootEl.value;
  if (root) {
    ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const needed = props.cardWidth + Math.abs(props.spread) * 2 + 120;
      scale.value = clamp(w / needed, 0.4, 1);
      layout(pos.value);
    });
    ro.observe(root);

    // wheel é registrado manualmente com passive:false para permitir preventDefault
    root.addEventListener("wheel", onWheel, { passive: false });

    if (props.autoplay && !reduced && count.value > 1) {
      let hovered = false;
      let focused = false;
      const stop = () => {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = null;
      };
      const start = () => {
        stop();
        autoTimer = setInterval(() => {
          if (!hovered && !focused) navigateBy(1);
        }, Math.max(props.autoplayDelay, 600));
      };
      const onEnter = () => (hovered = true);
      const onLeave = () => (hovered = false);
      const onFocusIn = () => (focused = true);
      const onFocusOut = () => (focused = false);
      root.addEventListener("mouseenter", onEnter);
      root.addEventListener("mouseleave", onLeave);
      root.addEventListener("focusin", onFocusIn);
      root.addEventListener("focusout", onFocusOut);
      start();
    }
  }

  layout(pos.value);
});

onBeforeUnmount(() => {
  if (tween) tween.kill();
  if (wheelTimer) clearTimeout(wheelTimer);
  if (autoTimer) clearInterval(autoTimer);
  ro?.disconnect();
  const root = rootEl.value;
  if (root) root.removeEventListener("wheel", onWheel);
});

watch(
  () => [
    props.depth,
    props.spread,
    props.tilt,
    props.tiltDirection,
    props.visibleCards,
    props.falloff,
    props.blur,
    props.cardWidth,
    props.cardHeight,
    props.radius,
    count.value,
  ],
  () => layout(pos.value),
  { flush: "post" }
);
</script>

<style scoped>
.depth-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: var(--dc-perspective, 1400px);
  perspective-origin: 50% 50%;
  touch-action: pan-y;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
}

.depth-carousel:active {
  cursor: grabbing;
}

.depth-carousel:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 4px;
  border-radius: 12px;
}

.depth-carousel__stage {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.depth-carousel__card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  overflow: hidden;
  background: #0b0d12;
  box-shadow:
    0 30px 60px -20px rgba(0, 0, 0, 0.65),
    0 8px 20px -10px rgba(0, 0, 0, 0.5);
  will-change: transform, opacity, filter;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.depth-carousel__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
  -webkit-user-drag: none;
}

.depth-carousel__tint {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.depth-carousel__label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 26px 16px 12px;
  font-family: "Playfair Display", serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  text-align: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
  pointer-events: none;
}

.depth-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3000;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(18, 20, 26, 0.55);
  backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.depth-carousel__arrow:hover {
  background: rgba(28, 31, 40, 0.85);
  border-color: rgba(255, 255, 255, 0.4);
}

.depth-carousel__arrow:active {
  transform: translateY(-50%) scale(0.94);
}

.depth-carousel__arrow--prev {
  left: 16px;
}

.depth-carousel__arrow--next {
  right: 16px;
}

.depth-carousel__dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(14, 16, 22, 0.4);
  backdrop-filter: blur(6px);
}

.depth-carousel__dot {
  width: 7px;
  height: 7px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.32);
  cursor: pointer;
  transition:
    width 0.25s ease,
    background 0.25s ease;
}

.depth-carousel__dot.is-active {
  width: 20px;
  background: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .depth-carousel__card {
    will-change: auto;
  }
  .depth-carousel__arrow,
  .depth-carousel__dot {
    transition: none;
  }
}
</style>
