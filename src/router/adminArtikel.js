import express from 'express';
import db from '../../server/db.js'; 

const adminArtikelRouter = express.Router();

const ARTIKEL_TABLE = 'articles';

adminArtikelRouter.get('/', async (req, res) => {
    try {
        const [results] = await db.query(`SELECT * FROM ${ARTIKEL_TABLE} ORDER BY created_at DESC`);
        res.json(results);
    } catch (error) {
        console.error("Fejl ved hentning af artikler (Admin):", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke hente artikler til administrationen.' });
    }
});

adminArtikelRouter.post('/', async (req, res) => {
    const { titel, source, indhold, img_link } = req.body;
    if (!titel || !indhold) {
        return res.status(400).json({ status: 'error', message: 'Titel og indhold er påkrævet.' });
    }
    const query = `INSERT INTO ${ARTIKEL_TABLE} (titel, source, indhold, img_link) VALUES (?, ?, ?, ?)`;
    try {
        const [result] = await db.query(query, [titel, source || null, indhold, img_link || null]);
        res.status(201).json({ status: 'success', message: 'Artikel oprettet', artikel_id: result.insertId });
    } catch (error) {
        console.error("Fejl ved oprettelse af artikel:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke oprette artikel.' });
    }
});

adminArtikelRouter.put('/:id', async (req, res) => {
    const { titel, source, indhold, img_link } = req.body;
    const artikel_id = req.params.id;
    if (!titel || !indhold || !artikel_id) {
        return res.status(400).json({ status: 'error', message: 'Titel, indhold og ID er påkrævet.' });
    }
    const query = `UPDATE ${ARTIKEL_TABLE} SET titel = ?, source = ?, indhold = ?, img_link = ? WHERE artikel_id = ?`;
    try {
        await db.query(query, [titel, source || null, indhold, img_link || null, artikel_id]);
        res.json({ status: 'success', message: 'Artikel opdateret' });
    } catch (error) {
        console.error("Fejl ved opdatering af artikel:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke opdatere artikel.' });
    }
});

adminArtikelRouter.delete('/:id', async (req, res) => {
    const artikel_id = req.params.id;
    const query = `DELETE FROM ${ARTIKEL_TABLE} WHERE artikel_id = ?`;
    try {
        await db.query(query, [artikel_id]);
        res.json({ status: 'success', message: 'Artikel slettet' });
    } catch (error) {
        console.error("Fejl ved sletning af artikel:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke slette artikel.' });
    }
});

export default adminArtikelRouter;