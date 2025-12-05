<template>
<div class="article plant-care-section-wrapper" style="flex-direction: column;">
    
    <header>
        <h2>Botanisk Oversigt</h2>
        <p>En oversigt over udvalgte planters livscyklus, farve, blomstring og lysbehov.</p>
    </header>

    <div v-if="loading" class="loading-message">
        <p>Henter botaniske data...</p>
    </div>
    <div v-else-if="error" class="error-message">
        <p>FEJL: Kunne ikke hente planter fra API'et. Er serveren startet på port 3000?</p>
        <p>Detaljer: {{ error }}</p>
    </div>
    
    <table v-else class="plant-table">
        <thead class="cM">
            <tr>
                <th>Navn</th>
                <th>Farve</th>
                <th>Blomstring</th>
                <th>Lys</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="plante in planter" :key="plante.plante_id">
                
                <td data-label="Navn">{{ plante.plante_navn }}</td>
                
                <td data-label="Farve">
                    <span class="color-circle" style="background-color: transparent;" :title="plante.plante_farve"></span>
                    {{ plante.plante_farve }}
                </td>
                
                <td data-label="Blomstring">{{ plante.plante_blomstring }}</td>
                
                <td data-label="Lys">{{ plante.plante_lys }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>


<script>
import { ref, onMounted } from 'vue';

export default {
    name: 'PlantCareSection',
    setup() {
        const planter = ref([]);
        const loading = ref(true);
        const error = ref(null);

        const fetchPlanter = async () => {
            // Dit API kører på http://localhost:3000
            const apiUrl = 'https://planter-og-insekter.onrender.com/api/planter'; 
            
            try {
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`Fejl ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                planter.value = data; 
                
            } catch (err) {
                console.error("Fejl ved hentning af planter:", err);
                error.value = err.message || 'Kunne ikke oprette forbindelse til API.';
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            fetchPlanter();
        });

        return {
            planter,
            loading,
            error
        };
    }
};
</script>

<style scoped>
.loading-message, .error-message {
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
}
.error-message {
    background-color: #fdd;
    color: #d00;
    border: 1px solid #d00;
}
</style>