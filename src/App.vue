<template>
  <section class="top-nav">
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


</template>

<script>
// importer styling
import '@/styles/hero.css'
import insectHouse from '@/assests/træhus.png'
import butterflyTimes from '@/assests/sommerfugl.png'

export default {
  name: 'App',
  data () {
    return {
      showMore: {
        insectHotel: false,
        butterflyTimes: false
      },
      insectHouse,
      butterflyTimes
    }
  },
  methods: {
    toggleShowMore (key) {
      if (!key) return
      this.showMore[key] = !this.showMore[key]
    }
  }
}
</script>
