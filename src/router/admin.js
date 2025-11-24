// server/routes/admin.js
import express from "express";
import pool from '../../server/db.js';

const router = express.Router();

// I et produktionsmiljø SKAL du indsætte autentificerings-middleware her for at beskytte admin-ruterne.
// Eksempel: router.use(verifyAdminToken);

// GET (Read All)
// URL: /api/admin/planter
router.get("/planter", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM planteTabel");
        res.json(rows);
    } catch (error) {
        console.error("Fejl ved hentning af planter (ADMIN):", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke hente data" });
    }
});

// POST (Create)
// URL: /api/admin/planter
router.post("/planter", async (req, res) => {
    const { plante_navn, plante_farve, plante_blomstring, plante_lys } = req.body;
    
    try {
        const [result] = await pool.query(
            "INSERT INTO planteTabel (plante_navn, plante_farve, plante_blomstring, plante_lys) VALUES (?, ?, ?, ?)",
            [plante_navn, plante_farve, plante_blomstring, plante_lys]
        );
        res.status(201).json({ id: result.insertId, message: "Admin created item" });
    } catch (error) {
        console.error("Fejl ved oprettelse af item (ADMIN):", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke oprette item" });
    }
});

// PUT (Update)
// URL: /api/admin/planter/:id
router.put("/planter/:id", async (req, res) => {
    const { id } = req.params;
    const { plante_navn, plante_farve, plante_blomstring, plante_lys } = req.body;
    
    try {
        const [result] = await pool.query(
            "UPDATE planteTabel SET plante_navn=?, plante_farve=?, plante_blomstring=?, plante_lys=? WHERE plante_id=?",
            [plante_navn, plante_farve, plante_blomstring, plante_lys, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Item med ID ${id} ikke fundet` });
        }
        res.json({ message: "Admin updated item" });
    } catch (error) {
        console.error("Fejl ved opdatering af item (ADMIN):", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke opdatere item" });
    }
});

// DELETE
// URL: /api/admin/planter/:id
router.delete("/planter/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await pool.query("DELETE FROM planteTabel WHERE plante_id=?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Item med ID ${id} ikke fundet til sletning` });
        }
        res.json({ message: "Admin deleted item" });
    } catch (error) {
        console.error("Fejl ved sletning af item (ADMIN):", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke slette item" });
    }
});

export default router;