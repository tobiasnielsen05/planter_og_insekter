<template>
<div class="article-wrapper p-6 bg-gray-50">
    <header class="article-header text-center mb-10">
        <h1 class="text-4xl font-extrabold text-green-800 border-b-4 border-green-300 inline-block pb-2">Artikler</h1>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p class="mt-4 text-green-600">Henter artikler fra serveren...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">FEJL: Kunne ikke hente artikler!</strong>
        <p class="block sm:inline">Er serveren startet på port 3000? Detaljer: {{ error }}</p>
    </div>
    
    <!-- Ingen artikler fundet -->
    <div v-else-if="!artikler.length" class="text-center py-10 text-gray-500 max-w-4xl mx-auto">
        Ingen artikler fundet i databasen. Tilføj nogle via Admin Panelet.
    </div>

    <!-- Artikler Vises Dynamisk -->
    <article v-else class="artikler grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <section v-for="artikel in artikler" :key="artikel.artikel_id">
            <!-- Her tvinges kortet til en fast højde og bruger flex til at fordele indholdet -->
            <article class="card bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden h-[450px] flex flex-col">
                
                <!-- Billede (højde er fast) -->
                <figure class="card-image h-50 w-full overflow-hidden flex-shrink-0">
                    <img 
                        :src="artikel.img_link || 'https://placehold.co/600x400/10B981/ffffff?text=Ingen+Billede'" 
                        :alt="artikel.titel" 
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                    />
                </figure>
                
                <!-- Kortets indhold (bruger flex-grow for at fylde pladsen) -->
                <section class="card-inner p-5 flex flex-col flex-grow">
                    <h2 class="card-title text-xl font-bold mb-3 text-gray-800 min-h-[3rem]">{{ artikel.titel }}</h2>

                    <!-- TRUNKERET TEKST: Vises kun hvis "Læs mere" IKKE er aktiv. Bruger flex-grow for at skubbe knappen ned. -->
                    <p v-if="!showMore[artikel.artikel_id]" class="card-text text-gray-600 mb-4 flex-grow">{{ truncateContent(artikel.indhold) }}</p>

                    <!-- Kildevisning -->
                    <p v-if="artikel.source" class="text-sm text-gray-400 italic mb-3 mt-auto flex-shrink-0">Kilde: {{ artikel.source }}</p>
                    
                    <!-- Vis mere/mindre knap (Baseret på om der er mere indhold) -->
                    <div v-if="artikel.indhold.length > TRUNCATE_LIMIT" class="text-center flex-shrink-0">
                        <button 
                            @click.prevent="toggleShowMore(artikel.artikel_id)" 
                            class="read-more text-green-600 hover:text-green-800 font-semibold transition duration-150 p-2 rounded-lg"
                        >
                            {{ showMore[artikel.artikel_id] ? 'Vis mindre' : 'Læs mere' }}
                        </button>
                    </div>
                </section>

                <!-- UDVIDET SEKTION: Viser HELE indholdet, når "Læs mere" er aktiv -->
                <transition name="fade">
                    <section v-if="showMore[artikel.artikel_id]" class="more-text p-5 border-t border-gray-200 bg-gray-50 flex-grow overflow-y-auto">
                        <!-- Her vises det fulde indhold. -->
                        <p class="text-gray-700 whitespace-pre-wrap">{{ artikel.indhold }}</p>
                    </section>
                </transition>
            </article>
        </section>
    </article>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// State til at holde artikler
const artikler = ref([]);
const isLoading = ref(true);
const error = ref(null);
// State til at styre "Vis mere/mindre" for hver artikel
const showMore = ref({});

const API_URL = 'http://localhost:3000/api/artikler'; 
const TRUNCATE_LIMIT = 150; // Max tegn før teksten afkortes

// Funktion til at afkorte indholdet til visning i kortet
const truncateContent = (content) => {
    if (content.length <= TRUNCATE_LIMIT) {
        return content;
    }
    return content.substring(0, TRUNCATE_LIMIT) + '...';
};

// Funktion til at skifte "Vis mere" state
const toggleShowMore = (artikelId) => {
    showMore.value[artikelId] = !showMore.value[artikelId];
};

// Fejlhåndtering for billeder (bruges hvis img_link er brudt)
const handleImageError = (event) => {
    console.error("Fejl ved indlæsning af billede:", event.target.src);
    // Erstat med en generisk placeholder, hvis originalen fejler
    event.target.src = 'https://placehold.co/600x400/9CA3AF/ffffff?text=Billede+Fejlet';
};

// Henter artikler fra API'et
const fetchArtikler = async () => {
    isLoading.value = true;
    error.value = null;

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP-fejl: ${response.status} ${response.statusText}`);
        }
        
        // Data fra databasen forventes at være et array af artikler
        const data = await response.json();
        artikler.value = data;
        
    } catch (err) {
        console.error('Fejl ved hentning af artikler:', err); 
        error.value = err.message || 'Kunne ikke hente data. Tjek netværksforbindelsen og serverens status.';
        
    } finally {
        isLoading.value = false;
    }
};

// Kald funktionen, når komponenten er mounted
onMounted(fetchArtikler);

</script>

<style scoped>
/* Transition for den udvidede sektion */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease, max-height 0.5s ease-out;
    overflow: hidden;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    max-height: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
    /* Da kortet nu har en fast højde (450px), skal max-height være stor nok til at vise indholdet */
    /* Jeg har justeret max-height her, men det er primært kortets faste højde, der sikrer konsistens */
    max-height: 500px; 
}

/* Base styling for artikler */
.article-wrapper {
    background-color: #f9fafb;
}

/* Sikrer, at titlen har en minimumshøjde, så kortene ikke ændrer højde, hvis titlen er kort */
.card-title {
    min-height: 2.5rem; 
}

/* Stil for Læs mere/Vis mindre knappen */
.read-more {
    background-color: transparent !important;
}
</style>