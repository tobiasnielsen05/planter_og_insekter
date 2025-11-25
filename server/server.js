import express from "express";
import cors from "cors";

// Importer Router-filer
import planterRoutes from "../src/router/planter.js"; // Offentlig: Kun GET
import adminRoutes from "../src/router/admin.js"; // Admin Planter: CRUD
import artikelRoutes from "../src/router/artikel.js"; // Offentlig: Kun GET
import adminArtikelRoutes from "../src/router/adminArtikel.js"; // NYT IMPORT: Admin Artikler: CRUD + GET
import authRoutes from "../src/router/auth.js"; // Auth: POST /login

const app = express();
const PORT = 3000;

// CORS Middleware
app.use(cors({
    origin: '*', // Tillader alle origins i udvikling
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API'et virker! 🔥 Serveren er nu korrekt konfigureret.");
});

// --- MONTERING AF ROUTES ---

// 1. Offentlige ruter (Kun GET)
app.use("/api/planter", planterRoutes); // Offentlig: GET /api/planter
app.use("/api/artikler", artikelRoutes); // Offentlig: GET /api/artikler

// 2. Auth ruter (Login/Logout)
app.use("/api/auth", authRoutes); // Auth: POST /api/auth/login

// 3. Admin ruter (CRUD og alt, der kræver login)
// VIGTIGT: CRUD for artikler sker KUN via adminArtikelRoutes, som har et GET for admin-visning.
app.use("/api/admin/artikler", adminArtikelRoutes); // Admin Artikler: CRUD + GET /api/admin/artikler
app.use("/api/admin/planter", adminRoutes); // Admin Planter: CRUD + GET /api/admin/planter


app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});