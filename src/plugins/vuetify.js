import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

const dark = {
  dark: true,
  colors: {
    background: '#000000',
    bgsec: '#1a1a1aff',
    surface: '#1a1a1aff',
    colorTable: '#212121',
    textTable: '#ffffff',
    activeItemNavDrawer: '#ffffff',
    stripedTable: '#000000',
    'surface-variant': '#161616ff',
    'surface-bright': '#bbbbbb',
    'on-surface-bright': '#000000',
    'on-surface': '#bbbbbb',
    'on-surface-variant': '#eeeeeeff',
    'on-bg': '#ffffff',
    primary: '#288334ff',
    secondary: '#39B54A',
    terciary: '#083a1e',
    lavanda: '#7b1c8a',
    hortela: '#0f4d1e',
    talcoBebe: '#3970b3',
    limao: '#fadf69',
    error: '#e55455',
    info: '#faa043',
    success: '#30c86f',
    warning: '#e55455',
    logoColor: "#f8bc68",
  },
  variables: {
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
  },
}

const light = {
  dark: false,
  colors: {
    background: '#F2F2F7',
    bgsec: '#1a1a1aff',
    colorTable: '#ffffff',
    textTable: '#000000',
    activeItemNavDrawer: '#000000',
    stripedTable: '#F6F7FB',
    surface: '#FFFFFF', 
    'surface-bright': '#3b3b3b8f',
    'on-surface-bright': '#FFFFFF',
    'surface-light': '#F6F7FB',
    'surface-variant': '#e5e5ea77',
    'on-background': '#1C1C1E',
    'on-surface': '#1C1C1E',
    'on-surface-variant': '#3A3A3C',
    'on-bg': '#000000',
    primary: '#288334ff',
    secondary: '#39B54A',
    terciary: '#083a1e',
    lavanda: '#7b1c8a',
    hortela: '#0f4d1e',
    talcoBebe: '#3970b3',
    limao: '#b49b2aff',
    warning: '#E55455',
    error: '#E55455',
    info: '#FAA043',
    field: '#E8EBF5',
    caption: '#6B6F85',
    logoColor: "#f8bc68",
  },
  variables: {
    'overlay-multiplier': 0.6,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'border-color': '#D1D1D6',
    'border-opacity': 0.6,
  },
}

export const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'pt',
    fallback: 'en',
    messages: { pt },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark,
      light,
    },
  },
})