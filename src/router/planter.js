import express from "express";
import pool from '../../server/db.js';
const router = express.Router();

// GET
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM plantetabel");
        res.json(rows); 
    } catch (error) {
        console.error("Fejl ved hentning af planter:", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke hente data" });
    }
});

// POST
router.post("/", async (req, res) => {
    const { plante_navn, plante_farve, plante_blomstring, plante_lys } = req.body;
    
    if (!plante_navn || !plante_farve) {
        return res.status(400).json({ error: "Plante_navn og plante_farve skal angives." });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO plantetabel (plante_navn, plante_farve, plante_blomstring, plante_lys) VALUES (?, ?, ?, ?)",
            [plante_navn, plante_farve, plante_blomstring, plante_lys]
        );
        
        res.status(201).json({ 
            plante_id: result.insertId, 
            message: "Plante created" 
        });
    } catch (error) {
        console.error("Fejl ved oprettelse af plante:", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke oprette plante" });
    }
});

// PUT
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { plante_navn, plante_farve, plante_blomstring, plante_lys } = req.body;
    
    try {
        const [result] = await pool.query(
            "UPDATE plantetabel SET plante_navn=?, plante_farve=?, plante_blomstring=?, plante_lys=? WHERE plante_id=?",
            [plante_navn, plante_farve, plante_blomstring, plante_lys, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Plante med ID ${id} ikke fundet` });
        }
        
        res.json({ message: "Plante updated" });
    } catch (error) {
        console.error("Fejl ved opdatering af plante:", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke opdatere plante" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await pool.query("DELETE FROM plantetabel WHERE plante_id=?", [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Plante med ID ${id} ikke fundet til sletning` });
        }
        
        res.json({ message: "Plante deleted" });
    } catch (error) {
        console.error("Fejl ved sletning af plante:", error);
        res.status(500).json({ error: "Serverfejl: Kunne ikke slette plante" });
    }
});

export default router;