import express from "express";
import cors from "cors";

// RETTET: Stierne skal nu pege fra 'server/' til 'src/router/'
import planterRoutes from "../src/router/planter.js"; 
import adminRoutes from "../src/router/admin.js"; 

const app = express();
// app.use(cors()); // CORS er fint
app.use(cors({
    origin: '*', // Tillader alle origins i udvikling
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API'et virker! 🔥");
});

// --- MONTERING AF ROUTES ---

// 1. Offentlige ruter: http://localhost:3000/api/planter
app.use("/api/planter", planterRoutes);

// 2. Admin ruter: http://localhost:3000/api/admin/planter
app.use("/api/admin", adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});