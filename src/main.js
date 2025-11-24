import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // <-- Koden her leder efter mappen 'src/router/'

// Opretter appen
const app = createApp(App);

// Registrerer routeren for hele applikationen
app.use(router); 

// Monterer appen på DOM-elementet med id="app"
app.mount('#app');