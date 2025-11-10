<template>
  <div id="app-wrapper">
    <section class="top-nav">
              <img src="@/assests/logo.svg" alt="Grøn Fremtid Logo" class="logo" />
      <header class="top-nav">
        <button class="menu-btn" aria-label="Åben menu">
          <span></span><span></span><span></span>
        </button>
      </header>
    </section>

    <section class="hero">
      <div class="hero-content">
            <h1>Grøn<br>Fremtid</h1>
          </div>

          <div class="mission-box">
            <p>Vores budskab er dette</p>
            <button class="mission-btn">Vores mission</button>
          </div>
    </section>

    <section class="article">
      <div class="articel-content">
        <h2>Hvorfor er det vigtigt</h2>
        <p>Du har måske hørt det før: Insekterne forsvinder. Selvom det kan lyde abstrakt, har det faktisk stor betydning for os alle – og især for de danske haver. Vores bier, sommerfugle og andre bestøvere er livsnerven i naturen, men deres levesteder og fødegrundlag er under pres.
          <br><br>
          I dag er mange private haver fyldt med importerede planter, som er flotte at se på, men som desværre er ubrugelige for de danske insekter. De har ikke den rette nektar eller det rigtige pollen, og de kan ikke fungere som værtsplanter for insekternes larver. Resultatet? Haven bliver et smukt, men dødt rum, som ikke bidtager til det lokale økosystem.
        </p>
      </div>
      <div>
        <img class="img-garden" :src="gardenImage" alt="Billede af dansk have">

        <div class="articel-box">
          <p class="p-White">Her du kommer ind i billedet! Tilsammen udgør vores private haver et enormt areal i Danmark, og det giver os en unik mulighed for at handle. Ved at bytte bare få af dine eksisterende planter ud med hjemmehørende danske arter, kan du omdanne din have til et livsvigtigt spisekammer og et trygt fristed for insekter.</p>
        </div>
      </div>
    </section>
    
    <section class="article faq-section">
      <h2 class="h2-w">Ofte Stillede Spørgsmål (FAQ)</h2>
      <div class="faq-container">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index" 
          class="faq-item"
          :class="{ 'active': activeIndex === index }"
        >
          <button 
            class="faq-question-box" 
            @click="toggleFaq(index)"
            :aria-expanded="activeIndex === index ? 'true' : 'false'"
            :aria-controls="`faq-answer-${index}`"
          >
            <span class="faq-question">{{ item.question }}</span>
            <span class="faq-icon">{{ activeIndex === index ? '–' : '+' }}</span>
          </button>

          <div 
            :id="`faq-answer-${index}`"
            class="faq-answer" 
            :class="{ 'show': activeIndex === index }"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="article carousel-section">
      <h2>Planteguide</h2>
      <div class="carousel-wrapper">
        <div class="carousel-slide-box">
          <button 
            @click="prevSlide" 
            :disabled="currentSlide === 0" 
            class="carousel-nav-btn prev"
            aria-label="Forrige plante"
          >
            &#10094;
          </button>

          <div class="carousel-card">
            <div 
              v-for="(plant, index) in plantSlides" 
              :key="index" 
              :class="['slide-content', { 'active': index === currentSlide }]"
            >
              <div class="slide-text">
                <h4>{{ plant.title }}</h4>
                <ul>
                  <li v-for="(item, i) in plant.items" :key="i">{{ item }}</li>
                </ul>
              </div>
              <span class="plant-illustration">🌱</span>
            </div>
          </div>

          <button 
            @click="nextSlide" 
            :disabled="currentSlide === plantSlides.length - 1" 
            class="carousel-nav-btn next"
            aria-label="Næste plante"
          >
            &#10095;
          </button>
        </div>

        <div class="carousel-indicators">
          <span 
            v-for="(plant, index) in plantSlides" 
            :key="index" 
            :class="['dot', { 'active': index === currentSlide }]"
            @click="goToSlide(index)"
            :aria-label="`Gå til slide ${index + 1}`"
          ></span>
        </div>
      </div>
    </section>

  <!-- Artikler starter her -->


  <!-- Insekt hotel -->

    <section>
      <div class="article-header">
        <h1>Artikler</h1>
      </div>
      <div class="card">
        <div class="card-inner">
          <h2 class="card-title">Insekt Hotel</h2>

          <div class="card-image">
            <img :src="insectHouse" alt="Insekt hotel" />
          </div>

          <p class="card-text">Haven bliver et smukt, men dødt rum, som ikke bidrager til det lokale økosystem.</p>

          <div class="read-more-row" v-if="!showMore.insectHotel">
            <a href="#" class="read-more" @click.prevent="toggleShowMore('insectHotel')">Læs mere</a>
          </div>
        </div>

        <transition name="fade">
          <div v-if="showMore.insectHotel" class="more-text">
            <p>Et insekthotel tiltrækker nyttige bestøvere og rovdyr som hjælper med at holde skadedyr nede. Det er nemt at bygge og kan laves af genbrugsmaterialer som bambus, træ og kogler.</p>
            <div class="read-less-row">
              <a href="#" class="read-less" @click.prevent="toggleShowMore('insectHotel')">Vis mindre</a>
            </div>
          </div>
        </transition>
      </div>
    </section>

  <!-- Sommerfugle tider -->

    <section>
      <div class="card">
        <div class="card-inner">
          <h2 class="card-title">Sommerfugle tider</h2>

          <div class="card-image">
            <img :src="butterflyTimes" alt="Insekt hotel" />
          </div>

          <p class="card-text">Sommerfugle bringer liv og farver til haven, mens de hjælper med at bestøve blomster.</p>

          <div class="read-more-row" v-if="!showMore.butterflyTimes">
            <a href="#" class="read-more" @click.prevent="toggleShowMore('butterflyTimes')">Læs mere</a>
          </div>
        </div>
        
        <transition name="fade">
          <div v-if="showMore.butterflyTimes" class="more-text">
            <p>De trives i solrige hjørner med blomster som lavendel og tidsler. <br> Lad nogle vilde planter stå og giv dem vand - så får du hurtigt besøg af smukke sommerfugle.</p>
            <div class="read-less-row">
              <a href="#" class="read-less" @click.prevent="toggleShowMore('butterflyTimes')">Vis mindre</a>
            </div>
          </div>
        </transition>
      </div>
    </section>

  <!-- Vores mål -->

    <section class="goal-section">
      <div>
        <h1 class="goal-header">Vores mål</h1>
      </div>
      <article class="goal-article">
        <p>Det overordnede formål er, at guiden skal fungere som en katalysator for adfærdsændring. 
          Vi sigter mod, at brugerne får den nødvendige viden og motivation til bevidst at vælge hjemmehørende, nektar- og pollenrige arter. 
          Dette vil direkte øge fødegrundlaget og levestederne for essentielle bestøvere som bier og sommerfugle i lokalområderne. </p>
          <p>Ved at oplyse om planter, der trives naturligt, fremmer vi desuden en mere robust og plejefri havekultur, som reducerer behovet for kemikalier og unødigt vandforbrug. 
          <br> Målet er, at hver have, der bruger vores information, bliver en lille, værdifuld oase i kampen for at bevare Danmarks biodiversitet for fremtidige generationer.</p>
      </article>
    </section>

    <section class="partners">
      <h2>Samarbejds partnere</h2>
      <div class="mission-green">
        <p>
          Vores mål er at motivere haveejere til at bruge hjemmehørende planter
          for at bevare Danmarks biodiversitet og øge den positive miljøpåvirkning.
        </p>
      </div>
      <div class="logo-grid">
        <img v-for="(logo, index) in logos" :key="index" :src="logo.src" :alt="logo.alt" />
      </div>
    </section>

    <div class="separator-gray"></div>

    <section class="social-share">
      <h3>Del denne side</h3>
      <div class="social-icons">
        <img v-for="(icon, index) in socialIcons" :key="index" :src="icon.src" :alt="icon.alt" class="social-icon" />
      </div>
    </section>


    <footer class="footer">
      <div class="footer-links">
        <div>
          <h4>Information</h4>
          <a href="#">Ofte stillede spørgsmål</a>
          <a href="#">Plantesygdomme</a>
          <a href="#">Kundeservice</a>
          <a href="#">Handels og leveringsbetingelser</a>
        </div>
        <div>
          <h4>Om os</h4>
          <a href="#">Plantekalkule</a>
          <a href="#">Haveblog</a>
          <a href="#">Cookieindstillinger</a>
        </div>
      </div>

      <div class="company">
        <p>Grøn Fremtid DK</p>
        <p>Zealand - Sjælland</p>
        <p>Erhvervsakademi</p>
        <p>CVR 1524125</p>
      </div>

      <div class="bottom-partners">
        <img v-for="(logo, index) in logos" :key="'bottom-' + index" :src="logo.src" :alt="logo.alt" />
      </div>
    </footer>
    
  </div>
</template>

<script>
// importer styling og billeder
import '@/styles/hero.css'
import dkGardenImage from '@/assests/dkgarden.jpg'
import insectHouse from '@/assests/træhus.png'
import butterflyTimes from '@/assests/sommerfugl.png'
import greenFremtid from '@/assests/partner1.png'
import seed from '@/assests/partner2.png'
import sustain from '@/assests/partner3.png'
import allGreen from '@/assests/partner4.png'
import earth from '@/assests/partner5.png'
import facebookIcon from '@/assests/facebook.png'
import shareIcon from '@/assests/share.png'
import xIcon from '@/assests/x.png'

export default {
  name: 'App',
  data () {
    return {
      // billeder
      gardenImage: dkGardenImage,
      insectHouse,
      butterflyTimes,
      
      // partner logoer
      logos: [
        { src: greenFremtid, alt: 'Grøn Fremtid logo' },
        { src: seed, alt: 'Seed logo' },
        { src: sustain, alt: 'Sustain logo' },
        { src: allGreen, alt: 'All Green logo' },
        { src: earth, alt: 'Earth logo' }
      ],

      // sociale medie ikoner
      socialIcons: [
        { src: facebookIcon, alt: 'Del på Facebook' },
        { src: xIcon, alt: 'Del på X (Twitter)' },
        { src: shareIcon, alt: 'Del via andre platforme' }
      ],

      // vis flere (artikler)
      showMore: {
        insectHotel: false,
        butterflyTimes: false
      },

      // FAQ
      activeIndex: -1,
      faqItems: [
        {
          question: "Hvad er hjemmehørende danske planter?",
          answer: "Hjemmehørende planter er arter, der naturligt har vokset i Danmark i tusinder af år, og som det lokale dyreliv (især insekter) har tilpasset sig at bruge som føde og levested. Disse planter er livsvigtige for økosystemet."
        },
        {
          question: "Hvordan kommer jeg i gang med at hjælpe insekterne?",
          answer: "Start småt! Du behøver ikke at lave hele haven om. Begynd med at udskifte et par importerede buske eller blomster med danske vilde arter som f.eks. Rødkløver, Blåhat eller forskellige vilde roser. Du kan også lade et hjørne af plænen gro vildt."
        },
        {
          question: "Bliver min have grim af vilde planter?",
          answer: "Absolut ikke! Mange danske vilde planter er utroligt smukke og kan give din have et unikt og naturligt udseende. Ved at planlægge, kan du skabe et 'kontrolleret vildt' look, der både er æstetisk og biologisk værdifuldt. Derudover tiltrækker de sommerfugle og bier, hvilket gør haven mere levende."
        }
      ],

      // Carousel Data & State
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
      ]
    }
  },
  methods: {
    toggleShowMore (key) {
      if (!key) return
      this.showMore[key] = !this.showMore[key]
    },
    // FAQ
    toggleFaq(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index;
    },

    // Carousel
    nextSlide() {
      if (this.currentSlide === this.plantSlides.length - 1) {
        this.currentSlide = 0
      } else {
        this.currentSlide++
      }
    },
    prevSlide() {
      if (this.currentSlide === 0) {
        this.currentSlide = this.plantSlides.length - 1
      } else {
        this.currentSlide--
      }
    },
    goToSlide(index) {
      this.currentSlide = index
    }
  }
}
</script>