<script>
import caruselSection from './components/carusel-section.vue';
import FaqSection from './components/faq-section.vue';
import FooterSection from './components/footerSection.vue';
import HeaderTop from './components/header-Top.vue';
import HeroSection from './components/hero-section.vue';
import InsectSection from './components/insectSection.vue';
import OurGoalSection from './components/ourGoalSection.vue';
import PlantCareSection from './components/plantCareSection.vue';

export default {
  name: 'App',
  components: {
    caruselSection,
    FaqSection,
    FooterSection,
    HeaderTop,
    HeroSection,
    InsectSection,
    OurGoalSection,
    PlantCareSection
  }
};
</script>

<template>
  <HeaderTop/>
  <HeroSection/>
  <FaqSection/>
  <caruselSection/>
  <InsectSection />
  <PlantCareSection/>
  <OurGoalSection />
  <FooterSection/>
</template>

<style>
@import '@/styles/styles.css'; 

</style>