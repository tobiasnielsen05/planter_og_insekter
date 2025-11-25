import express from 'express';
// Bemærk: Stien til db.js er rettet til den korrekte relative sti
import db from '../../server/db.js'; 

const adminRouter = express.Router();

// Tabelnavnet er nu 'plantetabel' overalt for at matche din database.
const TABLE_NAME = 'plantetabel'; 

// --- 1. HENT ALLE PLANTER (READ ALL for AdminTabel) ---
adminRouter.get('/', async (req, res) => {
    try {
        // Henter alle felter fra plantetabel
        const [results] = await db.query(`SELECT * FROM ${TABLE_NAME} ORDER BY plante_id DESC`);
        res.json(results);
    } catch (error) {
        console.error("Fejl ved hentning af planter (Admin):", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke hente planter til administrationen.' });
    }
});

// --- 2. OPRET PLANTE (CREATE) ---
adminRouter.post('/', async (req, res) => {
    const { plante_navn, plante_farve, plante_blomstring, plante_lys } = req.body;
    if (!plante_navn) {
        return res.status(400).json({ status: 'error', message: 'Plantenavn er påkrævet.' });
    }
    
    // Indsæt i plantetabel
    const query = `INSERT INTO ${TABLE_NAME} (plante_navn, plante_farve, plante_blomstring, plante_lys) VALUES (?, ?, ?, ?)`;
    try {
        const [result] = await db.query(query, [plante_navn, plante_farve, plante_blomstring, plante_lys]);
        res.status(201).json({ status: 'success', message: 'Plante oprettet', plante_id: result.insertId });
    } catch (error) {
        console.error("Fejl ved oprettelse af plante:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke oprette plante.' });
    }
});

// --- 3. OPDATER PLANTE (UPDATE) ---
adminRouter.put('/:id', async (req, res) => {
    const { plante_navn, plante_farve, plante_blomstring, plante_lys } = req.body;
    const plante_id = req.params.id;
    
    if (!plante_navn || !plante_id) {
        return res.status(400).json({ status: 'error', message: 'Plantenavn og ID er påkrævet.' });
    }

    // Opdater plantetabel
    const query = `UPDATE ${TABLE_NAME} SET plante_navn = ?, plante_farve = ?, plante_blomstring = ?, plante_lys = ? WHERE plante_id = ?`;
    try {
        await db.query(query, [plante_navn, plante_farve, plante_blomstring, plante_lys, plante_id]);
        res.json({ status: 'success', message: 'Plante opdateret' });
    } catch (error) {
        console.error("Fejl ved opdatering af plante:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke opdatere plante.' });
    }
});

// --- 4. SLET PLANTE (DELETE) ---
adminRouter.delete('/:id', async (req, res) => {
    const plante_id = req.params.id;

    // Slet fra plantetabel
    const query = `DELETE FROM ${TABLE_NAME} WHERE plante_id = ?`;
    try {
        await db.query(query, [plante_id]);
        res.json({ status: 'success', message: 'Plante slettet' });
    } catch (error) {
        console.error("Fejl ved sletning af plante:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke slette plante.' });
    }
});

export default adminRouter;