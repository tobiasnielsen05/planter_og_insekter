<template>
    <section class="article carousel-section">
        <h2>Planteguide</h2>
        <figure class="carousel-wrapper">
            <section class="carousel-slide-box">
                <button 
                    @click="prevSlide" 
                    :disabled="currentSlide === 0" 
                    class="carousel-nav-btn prev"
                    aria-label="Forrige plante"
                >
                    &#10094;
                </button>

                <article 
                    v-for="(plant, index) in plantSlides" 
                    :key="index" 
                    v-show="index === currentSlide" 
                    class="carousel-card"
                >
                    <section class="slide-text">
                        <h4>{{ plant.title }}</h4>
                        <ul>
                            <li v-for="(item, i) in plant.items" :key="i">{{ item }}</li>
                        </ul>
                    </section>
                    <span class="plant-illustration">🌱</span>
                </article>

                <button 
                    @click="nextSlide" 
                    :disabled="currentSlide === plantSlides.length - 1" 
                    class="carousel-nav-btn next"
                    aria-label="Næste plante"
                >
                    &#10095;
                </button>
            </section>

            <ol class="carousel-indicators">
                <li 
                    v-for="(plant, index) in plantSlides" 
                    :key="index" 
                    :class="['dot', { 'active': index === currentSlide }]"
                    @click="goToSlide(index)"
                    :aria-label="`Gå til slide ${index + 1}`"
                ></li>
            </ol>
        </figure>
    </section>
</template>

<script>
export default {
    name: 'PlantGuideCarousel',
    data() {
        return {
            currentSlide: 0,
            plantSlides: [
                {
                    title: "Naturvenlige buske til haven:",
                    items: ["Hvidtjørn", "Gøgeurt", "Brombær", "Rosa canina", "Calluna vulgaris"],
                    type: "busk"
                },
                {
                    title: "Blomster til bier og sommerfugle:",
                    items: ["Rødkløver", "Blåhat", "Kornblomst", "Stor knopurt", "Vild Merian"],
                    type: "blomst"
                },
                {
                    title: "Træer og hække til insekter:",
                    items: ["Vintereg", "Røn", "Alm. Hassel", "Bævreasp", "Skovfyr"],
                    type: "træ"
                }
            ],
        }
    },
    methods: {
        nextSlide() {
            if (this.currentSlide < this.plantSlides.length - 1) {
                this.currentSlide++;
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        goToSlide(index) {
            this.currentSlide = index;
        }
    }
}
</script>

<style>
.plant-illustration {
  display: inline-block; /* Gør det inline med teksten */
  font-size: 2rem; /* Juster størrelsen som ønsket */
  line-height: 1; /* Sikrer at størrelsen er ensartet */
  vertical-align: middle; /* Jævnt med teksten */
  margin-left: 1rem; /* lidt afstand fra teksten */
}

/* Skjul illustrationen på meget små skærme */
@media (max-width: 700px) {
  .plant-illustration {
    display: none;
  }
}
</style>