<template>
<div class="article-wrapper">
    <header class="article-header">
        <h1>Artikler</h1>
    </header>
    <article class="artikler">
        <section>
            <article class="card">
                <section class="card-inner">
                    <h2 class="card-title">Insekt Hotel</h2>

                    <figure class="card-image">
                        <img :src="insectHouse" alt="Insekt hotel" />
                    </figure>

                    <p class="card-text">Haven bliver et smukt, men dødt rum, som ikke bidrager til det lokale økosystem.</p>

                    <p class="read-more-row" v-if="!showMore.insectHotel">
                        <a href="#" class="read-more" @click.prevent="toggleShowMore('insectHotel')">Læs mere</a>
                    </p>
                </section>

                <transition name="fade">
                    <section v-if="showMore.insectHotel" class="more-text">
                        <p>Et insekthotel tiltrækker nyttige bestøvere og rovdyr som hjælper med at holde skadedyr nede. Det er nemt at bygge og kan laves af genbrugsmaterialer som bambus, træ og kogler.</p>
                        <p class="read-less-row">
                            <a href="#" class="read-less" @click.prevent="toggleShowMore('insectHotel')">Vis mindre</a>
                        </p>
                    </section>
                </transition>
            </article>
        </section>

        <section>
            <article class="card">
                <section class="card-inner">
                    <h2 class="card-title">Sommerfugle tider</h2>

                    <figure class="card-image">
                        <img :src="butterflyTimes" alt="Insekt hotel" />
                    </figure>

                    <p class="card-text">Sommerfugle bringer liv og farver til haven, mens de hjælper med at bestøve blomster.</p>

                    <p class="read-more-row" v-if="!showMore.butterflyTimes">
                        <a href="#" class="read-more" @click.prevent="toggleShowMore('butterflyTimes')">Læs mere</a>
                    </p>
                </section>
                
                <transition name="fade">
                    <section v-if="showMore.butterflyTimes" class="more-text">
                        <p>De trives i solrige hjørner med blomster som lavendel og tidsler. <br> Lad nogle vilde planter stå og giv dem vand - så får du hurtigt besøg af smukke sommerfugle.</p>
                        <p class="read-less-row">
                            <a href="#" class="read-less" @click.prevent="toggleShowMore('butterflyTimes')">Vis mindre</a>
                        </p>
                    </section>
                </transition>
            </article>
        </section>
    </article>
</div>
</template>

<script>
import insectHouse from '../assests/træhus.png'
import butterflyTimes from '../assests/sommerfugl.png'

export default {
    name: 'App',
    
    data () {
        return {
            showMore: {
                insectHotel: false,
                butterflyTimes: false
            },
            insectHouse,
            butterflyTimes,
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