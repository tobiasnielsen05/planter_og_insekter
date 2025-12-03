<script setup>
import { ref, onMounted, computed } from 'vue';

const API_ROOT_URL = 'http://localhost:3000/api/admin';

const ENTITY_CONFIG = {
    planter: {
        apiPath: 'planter',
        title: 'Plante',
        idKey: 'plante_id',
        defaultState: {
            plante_id: null,
            plante_navn: '',
            plante_farve: '',
            plante_blomstring: '',
            plante_lys: ''
        }
    },
    artikler: {
        apiPath: 'artikler',
        title: 'Artikel',
        idKey: 'artikel_id',
        defaultState: {
            artikel_id: null,
            titel: '',
            source: '',
            indhold: '',
            billede_url: '',
            image_alt: '',
            
            created_at: new Date().toISOString().slice(0, 10) 
        }
    }
};

const activeEntity = ref('planter');
const items = ref([]);
const loading = ref(true);
const error = ref(null);
const isEditing = ref(false);


const currentFormItem = ref({ ...ENTITY_CONFIG.planter.defaultState });


const showConfirm = ref(false);
const confirmMessage = ref('');
const confirmAction = ref(() => {});


const currentConfig = computed(() => ENTITY_CONFIG[activeEntity.value]);
const currentIdKey = computed(() => currentConfig.value.idKey);
const apiUrlBase = computed(() => `${API_ROOT_URL}/${currentConfig.value.apiPath}`);

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString); 
    return date.toLocaleDateString('da-DK', { year: 'numeric', month: 'short', day: 'numeric' });
};

const resetForm = () => {
    currentFormItem.value = { ...currentConfig.value.defaultState };
    isEditing.value = false;
    error.value = null; 
};

const editItem = (item) => {
    currentFormItem.value = JSON.parse(JSON.stringify(item));
    
    if (activeEntity.value === 'artikler' && currentFormItem.value.created_at) {
        if (typeof currentFormItem.value.created_at === 'string' && currentFormItem.value.created_at.includes('T')) {
            currentFormItem.value.created_at = currentFormItem.value.created_at.slice(0, 10);
        }
    }
    
    isEditing.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const switchEntity = (entity) => { 
    activeEntity.value = entity;
    resetForm();
    fetchData(); 
};



const fetchData = async () => {
    loading.value = true;
    error.value = null;
    items.value = []; 

    try {
        const response = await fetch(apiUrlBase.value);
        if (!response.ok) {
            throw new Error(`Fejl ${response.status}. Tjek server/firewall for ${activeEntity.value}.`);
        }
        const data = await response.json();
        items.value = data; 
    } catch (err) {
        error.value = err.message || `Netværksfejl: Kunne ikke forbinde til ${apiUrlBase.value}`;
    } finally {
        loading.value = false;
    }
};

const saveItem = async () => {
    loading.value = true;
    error.value = null;
    const method = isEditing.value ? 'PUT' : 'POST';
    let url = apiUrlBase.value;

    if (isEditing.value) {
        const id = currentFormItem.value[currentIdKey.value];
        if (!id) {
            error.value = "Fejl: Kunne ikke finde ID for opdatering.";
            loading.value = false;
            return;
        }
        url = `${apiUrlBase.value}/${id}`;
    }

    try {
        const payload = { ...currentFormItem.value };
        if (method === 'POST') {
            delete payload[currentIdKey.value];
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            let errorMessage = `Fejl: ${response.status} ved ${method} - ${errorBody.substring(0, 100)}...`;
            
            try {
                const errorJson = JSON.parse(errorBody);
                errorMessage = errorJson.message || errorMessage;
            } catch (e) {
                // Ignorer JSON parsing fejl - brug standardfejl
            }
            throw new Error(errorMessage);
        }

        resetForm();
        await fetchData(); 

    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const triggerDelete = (id) => {
    const config = currentConfig.value;
    confirmMessage.value = `Er du sikker på du vil slette ${config.title} ID: ${id}?`;
    confirmAction.value = () => deleteItem(id);
    showConfirm.value = true;
};

const deleteItem = async (id) => {
    showConfirm.value = false;
    loading.value = true;
    error.value = null;

    try {
        const response = await fetch(`${apiUrlBase.value}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Sletning fejlede for ${currentConfig.value.title}. Status: ${response.status}`);
        }
        
        if (isEditing.value && currentFormItem.value[currentIdKey.value] === id) {
            resetForm();
        }

        await fetchData(); 

    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const closeConfirm = () => showConfirm.value = false;

onMounted(fetchData);
</script>

<template>
<div class="admin-wrapper">
    <h2 class="text-center">Administrator Panel - {{ currentConfig.title }} Redigering</h2>
    
    <!-- Entitetsvælger -->
    <div class="entity-selector">
        <button @click="switchEntity('planter')" :class="{ 'active-entity': activeEntity === 'planter' }">Administrer Planter</button>
        <button @click="switchEntity('artikler')" :class="{ 'active-entity': activeEntity === 'artikler' }">Administrer Artikler</button>
    </div>

    <p class="api-status" :class="{ 'error': error }">
        API Status: 
        <template v-if="loading && !error">Henter data...</template>
        <template v-else-if="error">{{ error }}</template>
        <template v-else>Forbundet</template>
    </p>

    <!-- FORMULAR -->
    <div class="form-container">
        <h3>{{ isEditing ? 'Rediger ' + currentConfig.title + ' (ID: ' + currentFormItem[currentIdKey] + ')' : 'Opret Ny ' + currentConfig.title }}</h3>
        <form @submit.prevent="saveItem">
            <!-- Hidden ID field - Vigtigt for opdatering -->
            <input type="hidden" :name="currentIdKey" v-model="currentFormItem[currentIdKey]">
            
            <!-- Dynamiske Felter for Planter -->
            <template v-if="activeEntity === 'planter'">
                <label>Navn:</label>
                <input v-model="currentFormItem.plante_navn" required placeholder="Plante Navn">

                <label>Farve:</label>
                <input v-model="currentFormItem.plante_farve" required placeholder="Plante Farve">

                <label>Blomstring:</label>
                <input v-model="currentFormItem.plante_blomstring" required placeholder="Blomstring">
                
                <label>Lysbehov:</label>
                <input v-model="currentFormItem.plante_lys" required placeholder="Fuld sol, Skygge, etc.">
            </template>
            
            <!-- Dynamiske Felter for Artikler -->
            <template v-else-if="activeEntity === 'artikler'">
                <label>Titel:</label>
                <input v-model="currentFormItem.titel" required placeholder="Artikel Titel">
                
                <label>Kilde (Source):</label>
                <input v-model="currentFormItem.source" required placeholder="Kilde/Forfatter">
                
                <label>Indhold:</label>
                <textarea v-model="currentFormItem.indhold" required rows="6" placeholder="Artikel Indhold"></textarea>
                
                <label>Billede Link (img_link):</label>
                <input v-model="currentFormItem.billede_url" placeholder="URL til billede">

                <label>Alt-Tekst:</label>
                <input v-model="currentFormItem.image_alt" placeholder="Alt-tekst for billede">
                
                <label>Oprettet Dato:</label>
                <input type="date" v-model="currentFormItem.created_at" required>
            </template>

            <div class="form-actions">
                <button type="submit" :disabled="loading" class="save-btn">{{ isEditing ? 'Opdater ' + currentConfig.title : 'Opret ' + currentConfig.title }}</button>
                <button type="button" @click="resetForm" class="cancel-btn" :disabled="loading">Annuller</button>
            </div>
        </form>
    </div>

    <!-- TABEL -->
    <table class="plant-table admin-table">
        <thead>
            <!-- Headers for Planter -->
            <tr v-if="activeEntity === 'planter'">
                <th>ID</th>
                <th>Navn</th>
                <th>Farve</th>
                <th>Blomstring</th>
                <th>Lys</th>
                <th>Handlinger</th>
            </tr>
            <!-- Headers for Artikler -->
            <tr v-else-if="activeEntity === 'artikler'">
                <th>ID</th>
                <th>Titel</th>
                <th>Kilde</th>
                <th>Billede Link</th>
                <th>Alt-Tekst</th>
                <th>Oprettet</th>
                <th>Handlinger</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="items.length === 0 && !loading && !error">
                <td :colspan="activeEntity === 'planter' ? 6 : 6" class="text-center">Ingen {{ currentConfig.title }}er fundet.</td>
            </tr>
            <tr v-for="item in items" :key="item[currentIdKey]">
                <!-- Kolonner for Planter -->
                <template v-if="activeEntity === 'planter'">
                    <td>{{ item.plante_id }}</td>
                    <td>{{ item.plante_navn }}</td>
                    <td>{{ item.plante_farve }}</td>
                    <td>{{ item.plante_blomstring }}</td>
                    <td>{{ item.plante_lys }}</td>
                </template>
                <!-- Kolonner for Artikler -->
                <template v-else-if="activeEntity === 'artikler'">
                    <td>{{ item.artikel_id }}</td>
                    <td>{{ item.titel }}</td>
                    <td>{{ item.source }}</td>
                    <td><a :href="item.img_link" target="_blank" class="link-btn" title="Se Billede">{{ item.img_link ? 'Link' : '-' }}</a></td>
                    <td>{{ item.image_alt }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                </template>
                <!-- Handlinger (Fælles) -->
                <td>
                    <button @click="editItem(item)" class="edit-btn">Rediger</button>
                    <button @click="triggerDelete(item[currentIdKey])" class="delete-btn">Slet</button>
                </td>
            </tr>
        </tbody>
    </table>
    
    <!-- BEKRÆFTELSES MODAL (CUSTOM) -->
    <div v-if="showConfirm" class="confirmation-modal-overlay">
        <div class="confirmation-modal">
            <p>{{ confirmMessage }}</p>
            <div class="modal-actions">
                <!-- Kalder den definerede action, og lukker derefter modalen -->
                <button @click="confirmAction(); closeConfirm()" class="delete-btn">Ja, Slet</button>
                <button @click="closeConfirm()" class="cancel-btn">Annuller</button>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Standard styling for Admin UI */
.admin-wrapper {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.text-center { text-align: center; }

/* Entitetsvælger (Tabs) */
.entity-selector {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
}
.entity-selector button {
    padding: 12px 25px;
    border: 2px solid #00796b;
    background-color: #e0f7fa;
    color: #00796b;
    font-weight: bold;
    border-radius: 6px;
    transition: all 0.3s;
    font-size: calc(16px * var(--text-scale));
}
.entity-selector button.active-entity {
    background-color: #00796b;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 121, 107, 0.3);
    font-size: calc(16px * var(--text-scale));
}
.entity-selector button:hover:not(.active-entity) {
    background-color: #b2dfdb;
}

.api-status {
    padding: 10px;
    background-color: #e0f7fa;
    color: #00796b;
    border-radius: 4px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
    word-wrap: break-word; /* Sikrer at lange fejlbeskeder ikke overløber */
}
.api-status.error {
    background-color: #ffebee;
    color: #c62828;
}

/* Form Styling */
.form-container {
    padding: 25px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 30px;
    background-color: #f9f9f9;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}
label {
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}
input, textarea {
    width: 100%; /* Sat til 100% for bedre responsivitet */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    box-sizing: border-box;
}
textarea {
    resize: vertical;
}
.form-actions {
    margin-top: 25px;
    display: flex;
    gap: 10px;
}
button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s, box-shadow 0.2s;
}
.save-btn {
    background-color: #4CAF50;
    color: white;
    font-size: calc(16px * var(--text-scale));
    
}
.save-btn:hover { background-color: #45a049; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); }

button.cancel-btn {
    background-color: #9e9e9e;
    color: white;
    font-size: calc(16px * var(--text-scale));
}
button.cancel-btn:hover { background-color: #888; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); }
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none !important;
}

/* Tabel Styling */
.admin-table {
    width: 100%;
    border-collapse: collapse; /* Brug collapse for clean look */
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden; /* Sikrer runde hjørner for hele tabellen */
}
.admin-table th, .admin-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
    word-wrap: break-word; /* Sikrer at indhold kan brydes */
}
.admin-table th {
    background-color: #00796b;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
}
.admin-table tr:nth-child(even) {
    background-color: #f3f3f3;
}
.admin-table tr:hover {
    background-color: #e6f5f4;
}
.edit-btn, .delete-btn {
    padding: 8px 12px;
    font-size: 0.9em;
    border-radius: 4px;
}
.edit-btn {
    background-color: #2196F3;
    margin-right: 5px;
    color: white;
}
.delete-btn {
    background-color: #f44336;
    color: white;
}
.edit-btn:hover { background-color: #1e88e5; }
.delete-btn:hover { background-color: #e53935; }

.link-btn {
    color: #2196F3;
    text-decoration: underline;
    font-size: 0.9em;
    display: inline-block;
    padding: 5px 0;
}

/* Custom Confirmation Modal */
.confirmation-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.confirmation-modal {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    width: 90%;
    max-width: 400px;
    text-align: center;
    animation: fadeIn 0.3s ease-out;
}
.confirmation-modal p {
    margin-bottom: 25px;
    font-size: 1.1em;
    color: #333;
}
.modal-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
}
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

/* Responsive for Small Screens */
@media (max-width: 768px) {
    .admin-wrapper {
        margin: 20px 10px;
        padding: 15px;
    }
    .admin-table th, .admin-table td {
        padding: 10px;
        font-size: 0.9em;
    }
    .entity-selector {
        flex-direction: column;
        gap: 10px;
    }
    .form-actions button {
        flex-grow: 1;
    }
}
</style>