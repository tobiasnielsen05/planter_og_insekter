<template>
  <div>
    <h2>Planteliste fra API</h2>
    
    <p v-if="loading">Henter data fra serveren...</p>
    
    <p v-else-if="error" class="error">{{ error }}</p>
    
    <div v-else>
      <p v-if="planter.length === 0">Ingen planter fundet i databasen.</p>
      
      <ul v-else class="plant-list">
        <li v-for="plante in planter" :key="plante.plante_id" class="plant-item">
          <h3>{{ plante.plante_navn }}</h3>
          <p><strong>Farve:</strong> {{ plante.plante_farve }}</p>
          <p><strong>Blomstring:</strong> {{ plante.plante_blomstring }}</p>
          <p><strong>Lysbehov:</strong> {{ plante.plante_lys }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Importer 'onMounted' fra Vue for at køre kode, når komponenten er klar
import { ref, onMounted } from 'vue';

export default {
  // Komponentens navn
  name: 'PlanteTabel',
  
  // Vue 3 Composition API setup
  setup() {
    // Reactive data state
    const planter = ref([]); // Holder arrayet af planter
    const loading = ref(true); // Viser loading-status
    const error = ref(null); // Holder eventuelle fejlbeskeder

    // Funktion til at hente data fra dit Node.js API
    const fetchPlanter = async () => {
      // Dit API kører på http://localhost:3000
      const apiUrl = 'http://localhost:3000/api/planter'; 
      
      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          // Kaster en fejl, hvis HTTP status ikke er 2xx (f.eks. 404 eller 500)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        planter.value = data; // Opdaterer den reaktive 'planter' variabel
        
      } catch (err) {
        console.error("Fejl ved hentning af planter:", err);
        error.value = 'Kunne ikke hente data fra API. Er serveren startet?';
      } finally {
        loading.value = false; // Stop loading, uanset om det lykkedes eller ej
      }
    };

    // onMounted køres, når komponenten er blevet monteret i DOM'en
    onMounted(() => {
      fetchPlanter();
    });

    // Returner reaktive variabler og metoder til brug i <template>
    return {
      planter,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
.plant-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.plant-item {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: 250px;
}
.plant-item h3 {
  margin-top: 0;
  color: #2c3e50;
}
</style>