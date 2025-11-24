<template>
    <!-- Disse er statiske elementer, der vises på alle sider -->
    <HeaderTop/>

    <nav class="main-nav">
        <router-link to="/">Forside</router-link> |
        <router-link to="/admin">Admin Panel</router-link>
    </nav>

    <!-- !!! HER BLIVER INDHOLDET FRA ROUETEREN INJICERET !!! -->
    <!-- Hvis stien er '/', viser den HomeView.vue -->
    <!-- Hvis stien er '/admin', viser den AdminTabel.vue -->
    <main class="app-content-wrapper">
        <router-view />
    </main>
    
    <!-- Denne er også statisk og vises på alle sider -->
    <FooterSection/>
</template>

<script>
import FooterSection from './components/footerSection.vue';
import HeaderTop from './components/header-Top.vue';

export default {
    name: 'App',
    components: {
        HeaderTop,
        FooterSection,
    }
};
</script>

<style>
@import '@/styles/styles.css'; 

.main-nav {
    padding: 15px;
    background-color: #f0f0f0;
    text-align: center;
    border-bottom: 2px solid #ddd;
}
.main-nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 0 10px;
}
.main-nav a.router-link-exact-active {
    color: #4CAF50; /* Grøn farve for aktiv rute */
}
</style>