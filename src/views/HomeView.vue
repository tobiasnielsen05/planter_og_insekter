<template>
    <HeroSection/>
    <FaqSection/>
    <caruselSection/>
    <InsectSection />
    <PlantCareSection/> 
    <OurGoalSection />
</template>

<script>
// VIGTIGT: Stierne skal være relative fra views/ til components/
import caruselSection from '../components/carusel-section.vue';
import FaqSection from '../components/faq-section.vue';
import HeroSection from '../components/hero-section.vue';
import InsectSection from '../components/insectSection.vue';
import OurGoalSection from '../components/ourGoalSection.vue';
import PlantCareSection from '../components/plantCareSection.vue';

export default {
    name: 'HomeView',
    components: {
        caruselSection,
        FaqSection,
        HeroSection,
        InsectSection,
        OurGoalSection,
        PlantCareSection
    }
};
</script>