<template>
    <section class="article faq-section">
        <h2 class="h2-w">Ofte Stillede Spørgsmål (FAQ)</h2>
        <dl class="faq-container">
            <article 
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

            <dd 
                :id="`faq-answer-${index}`"
                class="faq-answer" 
                :class="{ 'show': activeIndex === index }"
            >
                <p>{{ item.answer }}</p>
            </dd>
            </article>
        </dl>
    </section>
</template>

<script>
    export default {
    name: 'FaqComponent',
    data () {
        return {
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
            ]
        }
    },
    methods: {
        toggleFaq(index) {
            this.activeIndex = this.activeIndex === index ? -1 : index;
        }
    }
}
</script>