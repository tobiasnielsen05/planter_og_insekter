<template>
  <Transition name="modal">
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" @click.self="closeModal">
      
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-50 p-6 sm:p-8" @click.stop>
        
        <div class="flex justify-between items-center pb-4 border-b mb-6">
          <h3 class="text-2xl font-bold text-green-600">{{ isEditMode ? 'Rediger Artikel' : 'Opret Ny Artikel' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form @submit.prevent="saveArticle" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="titel" class="block text-sm font-medium text-gray-700 mb-1">Titel</label>
              <input type="text" id="titel" v-model="form.titel" required
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500 transition">
            </div>
            <div>
              <label for="source" class="block text-sm font-medium text-gray-700 mb-1">Kilde (URL)</label>
              <input type="url" id="source" v-model="form.source" 
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500 transition">
            </div>
          </div>

          <div>
            <label for="billede_url" class="block text-sm font-medium text-gray-700 mb-1">Billede URL</label>
            <input type="url" id="billede_url" v-model="form.billede_url" 
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500 transition">
            
            <!-- Feltet til alt-tekst er flyttet herind, da det hører til billed-sektionen -->
            <div class="mt-4"> 
              <label for="image_alt" class="block text-sm font-medium text-gray-700 mb-1">Billedbeskrivelse (alt-tekst)</label>
              <input type="text" id="image_alt" v-model="form.image_alt" 
                      class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500 transition">
            </div>

            <!-- Forhåndsvisning -->
            <div v-if="form.billede_url" class="mt-4 border border-gray-200 rounded-lg p-3">
                <p class="text-xs text-gray-500 mb-2">Billede Forhåndsvisning:</p>
                <img :src="form.billede_url" :alt="form.image_alt || 'Artikelbillede'" 
                     class="w-full h-32 object-cover rounded-lg" 
                     onerror="this.onerror=null; this.src='https://placehold.co/600x200/cccccc/333333?text=Billede+fejl';"
                >
            </div>
          </div>

          <div>
            <label for="indhold" class="block text-sm font-medium text-gray-700 mb-1">Indhold (HTML/Markdown)</label>
            <textarea id="indhold" v-model="form.indhold" rows="15" required
                      class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-500 focus:border-green-500 transition resize-y"></textarea>
          </div>

          <div v-if="statusMessage" :class="{'bg-red-100 border-red-400 text-red-700': isError, 'bg-green-100 border-green-400 text-green-700': !isError}"
               class="border px-4 py-3 rounded relative">
            {{ statusMessage }}
          </div>
          
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button type="button" @click="closeModal" 
                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150">
              Annuller
            </button>
            <button type="submit" :disabled="isSaving"
                    :class="{'opacity-50 cursor-not-allowed': isSaving}"
                    class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-150">
              <span v-if="isSaving">Gemmer...</span>
              <span v-else>{{ isEditMode ? 'Gem Ændringer' : 'Opret Artikel' }}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    artikelData: {
      type: Object, 
      default: null,
    },
  },
  
  emits: ['update:isVisible', 'artikel-gemt'],

  setup(props, { emit }) {
    const AUTH_TOKEN_KEY = 'adminAuthToken';
    const ADMIN_API_URL = 'http://localhost:3000/api/admin/artikler';

    const initialFormState = {
      artikel_id: null,
      titel: '',
      source: '',
      billede_url: '',
      indhold: '',
      image_alt: '', // NYT: Tilføjet image_alt til standardtilstanden
    };

    const form = ref({ ...initialFormState });
    const isSaving = ref(false);
    const statusMessage = ref('');
    const isError = ref(false);

    const isEditMode = computed(() => !!props.artikelData && !!props.artikelData.artikel_id);


    const closeModal = () => {
      emit('update:isVisible', false);
      setTimeout(() => {
        form.value = { ...initialFormState };
        statusMessage.value = '';
        isError.value = false;
      }, 300);
    };

    const saveArticle = async () => {
      isSaving.value = true;
      statusMessage.value = '';
      isError.value = false;
      
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        statusMessage.value = 'Fejl: Du er ikke logget ind.';
        isError.value = true;
        isSaving.value = false;
        return;
      }
      
      const dataToSend = {
        titel: form.value.titel,
        source: form.value.source,
        billede_url: form.value.billede_url,
        indhold: form.value.indhold,
        image_alt: form.value.image_alt,
      };

      const method = isEditMode.value ? 'PUT' : 'POST';
      const url = isEditMode.value 
        ? `${ADMIN_API_URL}/${form.value.artikel_id}` 
        : ADMIN_API_URL;

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `API-fejl: ${response.status} ${response.statusText}`);
        }

        statusMessage.value = isEditMode.value ? 'Artikel opdateret succesfuldt!' : 'Artikel oprettet succesfuldt!';
        isError.value = false;
        
        emit('artikel-gemt');
        
        setTimeout(() => {
          closeModal();
        }, 1500);

      } catch (error) {
        statusMessage.value = `Fejl ved gemning: ${error.message}`;
        isError.value = true;
        console.error('Gemme-fejl:', error);
      } finally {
        isSaving.value = false;
      }
    };

    watch(() => props.isVisible, (newVal) => {
  if (newVal) {

    if (props.artikelData) {
      form.value = {
        ...props.artikelData,
        billede_url: props.artikelData.img_link || "",
        image_alt: props.artikelData.image_alt || ""
      };
    } else {
      form.value = { ...initialFormState };
    }

    statusMessage.value = '';
    isError.value = false;
  }
}, { immediate: true });

    
    return {
      form,
      isSaving,
      statusMessage,
      isError,
      isEditMode,
      closeModal,
      saveArticle,
    };
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
    transition: all 0.3s ease-in-out;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
    transform: translateY(50px);
    opacity: 0;
}
</style>