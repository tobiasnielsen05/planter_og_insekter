<template>
  <section class="top-nav">
        <img src="../assests/logo.svg" alt="Grøn Fremtid Logo" class="logo" />
        <div class="a11y-controls p-2 border-b border-gray-200 flex justify-center items-center space-x-4 bg-white shadow-sm">
    <span class="text-sm font-semibold text-gray-700">Tekststørrelse:</span>
    
    <div>
    <!-- Knap for at mindske tekststørrelsen -->
    <button 
      @click="decreaseFontSize"
      :disabled="currentScale <= minScale"
      class="scale-btn bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Formindsk tekststørrelse"
    >
      A-
    </button>

    <!-- Visuel indikator/Reset knap -->
    <span 
      class="text-base font-bold text-green-700 cursor-pointer"
      title="Nulstil tekststørrelse"
    >
      {{ currentScale.toFixed(2) }}x
    </span>

    <!-- Knap for at øge tekststørrelsen -->
    <button 
      @click="increaseFontSize"
      :disabled="currentScale >= maxScale"
      class="scale-btn bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Forøg tekststørrelse"
    >
      A+
    </button>
  </div>
  </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';


// Definer min/max skaleringsfaktorer
const minScale = 1.0;
const maxScale = 3.0;
const step = 0.1; 

// Ref til den aktuelle skaleringsfaktor
const currentScale = ref(1.0);
const localStorageKey = 'appTextScale';

//Anvend den aktuelle skaleringsfaktor på roden (<html>) af dokumentet
const applyScale = (scale) => {
  document.documentElement.style.setProperty('--text-scale', scale);
  localStorage.setItem(localStorageKey, scale);
};

//Håndterer logikken for at øge tekststørrelsen

const increaseFontSize = () => {
  if (currentScale.value < maxScale) {
    currentScale.value = parseFloat((currentScale.value + step).toFixed(2));
    applyScale(currentScale.value);
  }
};

// Håndterer logikken for at mindske tekststørrelsen
const decreaseFontSize = () => {
  if (currentScale.value > minScale) {
    currentScale.value = parseFloat((currentScale.value - step).toFixed(2));
    applyScale(currentScale.value);
  }
};


// Ved indlæsning: Tjek for gemt præference i localStorage
onMounted(() => {
  const savedScale = localStorage.getItem(localStorageKey);
  if (savedScale && !isNaN(parseFloat(savedScale))) {
    currentScale.value = parseFloat(savedScale);
    applyScale(currentScale.value);
  } else {

    applyScale(1.0);
  }
});
</script>


<style scoped>
.a11y-controls {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

/* Knapper med forbedret stil */
.scale-btn {
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.scale-btn:hover {
  background-color: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.scale-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>