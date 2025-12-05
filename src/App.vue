<template>
    <HeaderTop/>

    <!-- Accessibility Kontrol placeret over alt indhold for at sikre, at den altid er tilgængelig -->
    <AccessibilityControls />

    <main class="app-content-wrapper">
        <!-- router-view skal være her, da den indlæser selve sidens indhold -->
        <router-view />
    </main>
    
    <FooterSection/>
</template>

<script>
import FooterSection from './components/footerSection.vue';
import AccessibilityControls from './components/AccessibilityControls.vue';

export default {
    name: 'App',
    components: {
        FooterSection,
        AccessibilityControls, // Registreret for brug i template
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
    /* Hvis dine styles.css bruger REM eller EM, skaleres denne tekst nu automatisk */
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 0 10px;
}
.main-nav a.router-link-exact-active {
    color: #4CAF50; /* Grøn farve for aktiv rute */
}
</style>