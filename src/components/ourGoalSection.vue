<template>
<section class="goal-section">
      <header>
        <h2 class="goal-header" id="ourGoal">Vores mål</h2>
      </header>
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
      <aside class="mission-green">
        <p>
          Vores mål er at motivere haveejere til at bruge hjemmehørende planter
          for at bevare Danmarks biodiversitet og øge den positive miljøpåvirkning.
        </p>
      </aside>
      <section class="logo-grid">
        <img v-for="(logo, index) in logos" :key="index" :src="logo.src" :alt="logo.alt" />
      </section>
    </section>
</template>

<script>
import greenFremtid from '../assests/partner1.png'
import seed from '../assests/partner2.png'
import sustain from '../assests/partner3.png'
import allGreen from '../assests/partner4.png'
import earth from '../assests/partner5.png'

export default {
    name: 'OurGoalSection',
    data () {
        return {
            logos: [
                { src: greenFremtid, alt: 'Grøn Fremtid logo' },
                { src: seed, alt: 'Seed logo' },
                { src: sustain, alt: 'Sustain logo' },
                { src: allGreen, alt: 'All Green logo' },
                { src: earth, alt: 'Earth logo' }
            ],
        }
    }
}
</script>