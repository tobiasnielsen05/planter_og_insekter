<template>
  <!-- Baggrund og Centering -->
  <div class="login-container p-4 flex justify-center items-center min-h-screen">
    <div class="login-card p-8 rounded-2xl shadow-xl w-full max-w-sm">
      
      <!-- Hovedoverskrift og Logo -->
      <div class="text-center mb-8">
        
        <!-- LOGO: Erstatter SVG med billede fra assets -->
        <div class="mx-auto mb-3 login-logo-container">
            <!-- PRØV DETTE SOM ALTERNATIV -->
            <img src="src/assets/logo.svg" alt="App Logo" class="login-logo"/>
        </div>
        
        <h2 class="text-3xl font-extrabold text-gray-800">Admin Log Ind</h2>
        <p class="text-gray-500 mt-1">Få adgang til redigeringsværktøjerne</p>
      </div>

      <!-- Vis fejlbesked -->
      <div v-if="error" class="error-alert px-4 py-3 rounded-lg mb-4" role="alert">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <!-- Email Felt -->
        <div class="form-group">
          <label for="email" class="form-label">E-mail Adresse:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
            placeholder="admin@example.com"
            class="form-input"
          >
        </div>
        
        <!-- Adgangskode Felt -->
        <div class="form-group">
          <label for="password" class="form-label">Adgangskode:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="********"
            class="form-input"
          >
        </div>
        
        <!-- Login Knap -->
        <div class="pt-2">
          <button 
            type="submit" 
            :disabled="loading"
            class="login-button w-full font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Logger ind...' : 'Log Ind' }}
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();

// Erstat med din server-URL
const API_URL = 'http://localhost:3000/api/auth/login'; 

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail_admin: email.value,
        pass_admin: password.value,
      }),
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      localStorage.setItem('adminToken', result.token);
      localStorage.setItem('adminName', result.name);
      router.push('/admin');
    } else {
      error.value = result.message || 'Login mislykkedes. Prøv igen.';
    }

  } catch (err) {
    console.error("Login fejl:", err);
    // Tjek for specifikke fejl, hvis serveren ikke svarer
    error.value = 'Kunne ikke forbinde til serveren. Tjek din netværksforbindelse og serverens status.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* 1. BAGGRUND & CENTRERING (Fikser vertikal centrering) */
.login-container {
    background-color: #ecfdf5;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* 2. KORT STIL (Fikser hvid baggrund, skygge, top border og TILFØJER padding) */
.login-card {
    background-color: #ffffff;
    border-top: 8px solid #059669;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 400px;
}

/* 3. TEKST CENTRERING (Sikrer at overskriften er centreret, som Tailwind gør med 'text-center') */
.text-center {
    text-align: center;
}
.font-extrabold {
    font-weight: 800;
}
.text-gray-800 {
    color: #1f2937;
}

/* 4. LOGO STYLING (Ny sektion for at sikre korrekt visning af billedet) */
.login-logo-container {
    margin-left: auto;
    margin-right: auto;
    width: 6rem;
    height: 6rem;
    margin-bottom: 0.75rem; 
    
    background-color: #059669; 
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.login-logo {
    /* Sikrer, at SVG'en passer inden for containeren */
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
}

/* 5. INPUT FELTER (Fikser afrunding og padding) */
.form-group {
    margin-bottom: 1.5rem;
}
.form-label {
    display: block;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;
    transition: all 0.15s ease-in-out;
    color: #1f2937;
}
.form-input:focus {
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.3);
}

/* 6. KNAP STIL (Fikser farver og padding) */
.login-button {
    background-color: #059669;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.15s ease-in-out;
}
.login-button:hover {
    background-color: #047857;
}
.login-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* 7. FEJL ALERT */
.error-alert {
    background-color: #fee2e2;
    border: 1px solid #f87171;
    color: #b91c1c;
}
</style>