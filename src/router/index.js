import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView 
  },
  {
    path: '/admin', 
    name: 'Admin',
    component: () => import('../views/AdminTabel.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const isAuthenticated = localStorage.getItem('adminToken'); 

  if (requiresAuth && !isAuthenticated) {

    next('/login');
  } else if (isAuthenticated && to.path === '/login') {
 
    next('/admin');
  } else {
    next();
  }
});


export default router;