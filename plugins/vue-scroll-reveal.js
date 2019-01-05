import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal';

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal',
  duration: 600,
  scale: 1,
  easing: 'ease-out',
  distance: '15px',
  mobile: true,
  reset: false
});