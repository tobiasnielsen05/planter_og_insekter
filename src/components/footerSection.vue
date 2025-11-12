<template>
<div class="footer-wrapper">
    <section class="separator-gray"></section>

    <section class="social-share">
        <h3>Del denne side</h3>
        <section class="social-icons">
            <img 
                v-for="(icon, index) in socialIcons" 
                :key="index" 
                :src="icon.src" 
                :alt="icon.alt" 
                class="social-icon" 
            />
        </section>
    </section>


    <footer class="footer">
        <nav class="footer-links">
            <section>
                <h4>Information</h4>
                <a href="#">Ofte stillede spørgsmål</a>
                <a href="#">Plantesygdomme</a>
                <a href="#">Kundeservice</a>
                <a href="#">Handels og leveringsbetingelser</a>
            </section>
            <section>
                <h4>Om os</h4>
                <a href="#">Plantekalkule</a>
                <a href="#">Haveblog</a>
                <a href="#">Cookieindstillinger</a>
            </section>
        </nav>

        <address class="company">
            <p>Grøn Fremtid DK</p>
            <p>Zealand - Sjælland</p>
            <p>Erhvervsakademi</p>
            <p>CVR 1524125</p>
        </address>

        <aside class="bottom-partners">
            <img 
                v-for="(logo, index) in logos" 
                :key="'bottom-' + index" 
                :src="logo.src" 
                :alt="logo.alt" 
            />
        </aside>
    </footer>
</div>
</template>

<script>
import greenFremtid from '../assests/partner1.png'
import seed from '../assests/partner2.png'
import sustain from '../assests/partner3.png'
import allGreen from '../assests/partner4.png'
import earth from '../assests/partner5.png'
import facebookIcon from '../assests/facebook.png'
import shareIcon from '../assests/share.png'
import xIcon from '../assests/x.png'


export default {
    name: 'App',
    data () {
        return {
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
            showMore: {
                insectHotel: false,
                butterflyTimes: false
            }
        }
    },
    methods: {
    }
}
</script>