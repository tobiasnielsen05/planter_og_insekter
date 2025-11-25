import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue'; // <-- NY LOGIN VIEW IMPORT

const routes = [
  {
    path: '/', // <-- RETTET: Rodruten skal være '/'
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login', // <-- NY LOGIN ROUTE
    name: 'Login',
    component: LoginView 
  },
  {
    path: '/admin', 
    name: 'Admin',
    component: () => import('../views/AdminTabel.vue'),
    meta: { requiresAuth: true } // <-- NY METADATA: Denne rute kræver login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// --- GLOBAL NAVIGATION GUARD (SIKKERHED) ---
// Denne funktion køres FØR hver navigation.
router.beforeEach((to, from, next) => {
  // Tjekker om den destination, vi er på vej til, kræver autentificering
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // Tjekker om vi har en adminToken gemt i browseren (som vi sætter efter login)
  const isAuthenticated = localStorage.getItem('adminToken'); 

  if (requiresAuth && !isAuthenticated) {
    // 1. Hvis ruten kræver login, og brugeren IKKE er logget ind, sendes de til login-siden
    next('/login');
  } else if (isAuthenticated && to.path === '/login') {
    // 2. Hvis brugeren ER logget ind og forsøger at tilgå /login-siden direkte, 
    // sendes de til admin-siden i stedet for.
    next('/admin');
  } else {
    // 3. Ellers: Fortsæt normal navigation (enten home/login er åben, eller admin er åben, og brugeren er logget ind)
    next();
  }
});


export default router;