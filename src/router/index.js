import { createRouter, createWebHistory } from 'vue-router';
// Importér den nye forside
import HomeView from '../views/HomeView.vue'; 

const routes = [
  {
    path: '',
    name: 'Home',
    component: HomeView // Nu viser denne HomeView.vue, som indeholder alle dine sektioner
  },
  {
    path: '/admin', 
    name: 'Admin',
    // VIGTIGT: Husk du skal have AdminTabel.vue i 'src/views/' mappen
    component: () => import('../views/AdminTabel.vue') 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;