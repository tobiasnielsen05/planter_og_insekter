<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-4 text-green-700">Botanisk Oversigt</h2>
    <p class="mb-8 text-gray-600">En oversigt over udvalgte planters livscyklus, farve, blomstring og lysbehov.</p>

    <div v-if="isLoading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      <p class="mt-4 text-green-600">Henter planter fra serveren...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">FEJL: Kunne ikke hente planter fra API'et!</strong>
      <p class="block sm:inline">Er serveren startet på port 3000?</p>
      <p class="text-sm mt-2">Detaljer: {{ error }}</p>
    </div>

    <div v-else class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-green-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navn</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farve</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blomstring</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lysbehov</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="planter.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">Ingen planter fundet. Opret nogle i admin-panelet.</td>
          </tr>
          <tr v-for="plante in planter" :key="plante.plante_id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ plante.plante_id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plante.plante_navn }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plante.plante_farve }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plante.plante_blomstring }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plante.plante_lys }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'PlanteTabel',
  setup() {
    // State variabler
    const planter = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    const hentPlanter = async () => {
      const API_URL = 'https://planter-og-insekter.onrender.com/api/planter'; 
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP-fejl: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        planter.value = data; // Tildel de hentede planter
        
      } catch (err) {
        console.error('Fetch fejl:', err.message);
        error.value = err.message || 'Kunne ikke oprette forbindelse til API\'et.';
        
      } finally {
        isLoading.value = false;
      }
    };

  
    onMounted(hentPlanter);


    return {
      planter,
      isLoading,
      error
    };
  }
}
</script>

<style scoped>
</style>