<template>
<div class="admin-wrapper">
    <h2>Administrator Panel - Plante Redigering</h2>
    <p class="api-status" :class="{ 'error': error }">
        API Status: {{ loading ? 'Henter data...' : (error ? error : 'Forbundet') }}
    </p>

    <div class="form-container">
        <h3>{{ isEditing ? 'Rediger Plante (ID: ' + currentPlante.plante_id + ')' : 'Opret Ny Plante' }}</h3>
        <form @submit.prevent="savePlante">
            <input type="hidden" v-model="currentPlante.plante_id">
            
            <label>Navn:</label>
            <input v-model="currentPlante.plante_navn" required placeholder="Plante Navn">

            <label>Farve:</label>
            <input v-model="currentPlante.plante_farve" required placeholder="Plante Farve">

            <label>Blomstring:</label>
            <input v-model="currentPlante.plante_blomstring" required placeholder="Blomstring">
            
            <label>Lysbehov:</label>
            <input v-model="currentPlante.plante_lys" required placeholder="Fuld sol, Skygge, etc.">
            
            <div class="form-actions">
                <button type="submit" :disabled="loading">{{ isEditing ? 'Opdater Plante' : 'Opret Plante' }}</button>
                <button type="button" @click="resetForm" class="cancel-btn">Annuller</button>
            </div>
        </form>
    </div>

    <table class="plant-table admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Navn</th>
                <th>Farve</th>
                <th>Blomstring</th>
                <th>Lys</th>
                <th>Handlinger</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="plante in planter" :key="plante.plante_id">
                <td>{{ plante.plante_id }}</td>
                <td>{{ plante.plante_navn }}</td>
                <td>{{ plante.plante_farve }}</td>
                <td>{{ plante.plante_blomstring }}</td>
                <td>{{ plante.plante_lys }}</td>
                <td>
                    <button @click="editPlante(plante)" class="edit-btn">Rediger</button>
                    <button @click="deletePlante(plante.plante_id)" class="delete-btn">Slet</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';

// Den IP, hvor din Node.js server kører
const API_URL_BASE = 'http://localhost:3000/api/admin/planter';

// Initial state for en ny plante
const newPlanteState = {
    plante_id: null,
    plante_navn: '',
    plante_farve: '',
    plante_blomstring: '',
    plante_lys: ''
};

export default {
    name: 'AdminTabel',
    setup() {
        const planter = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const currentPlante = ref({ ...newPlanteState }); // Data til formularen
        const isEditing = ref(false);

        // --- 1. READ (Hent alle) ---
        const fetchPlanter = async () => {
            loading.value = true;
            error.value = null;
            try {
                const response = await fetch(API_URL_BASE);
                if (!response.ok) {
                    throw new Error(`Fejl ${response.status}. Tjek server/firewall.`);
                }
                const data = await response.json();
                planter.value = data; 
            } catch (err) {
                error.value = err.message || 'Failed to fetch (Netværksfejl)';
            } finally {
                loading.value = false;
            }
        };

        // --- 2. CREATE / UPDATE (Gem) ---
        const savePlante = async () => {
            loading.value = true;
            const method = isEditing.value ? 'PUT' : 'POST';
            let url = API_URL_BASE;

            if (isEditing.value) {
                // For PUT skal ID'et med i URL'en
                url = `${API_URL_BASE}/${currentPlante.value.plante_id}`;
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentPlante.value)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Fejl: ${response.status} - ${errorText}`);
                }

                // Nulstil formularen og hent den opdaterede liste
                resetForm();
                await fetchPlanter(); 

            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };

        // --- 3. DELETE (Slet) ---
        const deletePlante = async (id) => {
            if (!confirm(`Er du sikker på du vil slette plante ID: ${id}?`)) {
                return;
            }

            loading.value = true;
            error.value = null;

            try {
                const response = await fetch(`${API_URL_BASE}/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Sletning fejlede. Status: ${response.status}`);
                }
                
                // Opdater listen efter sletning
                await fetchPlanter(); 

            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };

        // --- Form Handlers ---
        const resetForm = () => {
            currentPlante.value = { ...newPlanteState };
            isEditing.value = false;
            error.value = null; // Ryd fejlbesked
        };
        
        const editPlante = (plante) => {
            currentPlante.value = { ...plante }; // Kopier data til formularen
            isEditing.value = true;
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll op til formularen
        };

        // Hent data, når komponenten er indlæst
        onMounted(fetchPlanter);

        return {
            planter,
            loading,
            error,
            currentPlante,
            isEditing,
            savePlante,
            deletePlante,
            resetForm,
            editPlante
        };
    }
};
</script>

<style scoped>
/* Standard styling for Admin UI (kan justeres i din CSS mappe) */
.admin-wrapper {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
}

.api-status {
    padding: 10px;
    background-color: #e0f7fa;
    color: #00796b;
    border-radius: 4px;
    margin-bottom: 20px;
}
.api-status.error {
    background-color: #ffebee;
    color: #c62828;
}

/* Form Styling */
.form-container {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 30px;
    background-color: #f9f9f9;
}
label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
}
input {
    width: 98%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.form-actions {
    margin-top: 20px;
}
button {
    padding: 10px 15px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
}
button.cancel-btn {
    background-color: #ccc;
}

/* Tabel Styling */
.admin-table {
    width: 100%;
    border-collapse: collapse;
}
.admin-table th, .admin-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
.edit-btn {
    background-color: #2196F3;
    margin-right: 5px;
}
.delete-btn {
    background-color: #f44336;
}
</style>