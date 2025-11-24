<template>
<div class="hero-and-article-wrapper">
    <section class="hero">
        <hgroup class="hero-content">
            <h1>Grøn<br>Fremtid</h1>
        </hgroup>

        <aside class="mission-box">
            <p>Gør din have til et hjem for dansk natur, og gør en forskel.</p>
            
            <a href="#ourGoal" class="mission-btn">Vores mission</a>
        </aside>
    </section>

    <section class="article">
        <header class="articel-content">
            <h2>Hvorfor er det vigtigt</h2>
            <p>Du har måske hørt det før: Insekterne forsvinder. Selvom det kan lyde abstrakt, har det faktisk stor betydning for os alle – og især for de danske haver. Vores bier, sommerfugle og andre bestøvere er livsnerven i naturen, men deres levesteder og fødegrundlag er under pres.
            <br><br>
            I dag er mange private haver fyldt med importerede planter, som er flotte at se på, men som desværre er ubrugelige for de danske insekter. De har ikke den rette nektar eller det rigtige pollen, og de kan ikke fungere som værtsplanter for insekternes larver. Resultatet? Haven bliver et smukt, men dødt rum, som ikke bidtager til det lokale økosystem.
            </p>
        </header>
        <figure>
            <img class="img-garden" :src="gardenImage" alt="Billede af dansk have">

            <figcaption class="articel-box">
            <p class="p-White">Her du kommer ind i billedet! Tilsammen udgør vores private haver et enormt areal i Danmark, og det giver os en unik mulighed for at handle. Ved at bytte bare få af dine eksisterende planter ud med hjemmehørende danske arter, kan du omdanne din have til et livsvigtigt spisekammer og et trygt fristed for insekter.</p>
            </figcaption>
        </figure>
    </section>
</div>
</template>

<script>
import dkGardenImage from '../assests/dkgarden.jpg'


export default {
    name: 'HeroSection',
    data () {
        return {
            gardenImage: dkGardenImage,
        }
    }
}
</script>