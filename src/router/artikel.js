import express from 'express';
import db from '../../server/db.js'; 

const artikelRouter = express.Router();

const ARTIKEL_TABLE = 'articles';

// Hent alle artikler (inkluderer nu implicit image_alt fra SELECT *)
artikelRouter.get('/', async (req, res) => {
    try {
        const [results] = await db.query(`SELECT * FROM ${ARTIKEL_TABLE} ORDER BY created_at DESC`);
        res.json(results);
    } catch (error) {
        console.error("Fejl ved hentning af artikler:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke hente artikler.' });
    }
});

// Opret ny artikel (justeret til at inkludere image_alt)
artikelRouter.post('/', async (req, res) => {
    // VIGTIGT: image_alt er tilføjet til destruktureringen
    const { titel, source, indhold, img_link, image_alt } = req.body; 

    if (!titel || !indhold) {
        return res.status(400).json({ status: 'error', message: 'Titel og indhold er påkrævet.' });
    }

    // NYT: image_alt er tilføjet til SQL-forespørgslen
    const query = `INSERT INTO ${ARTIKEL_TABLE} (titel, source, indhold, img_link, image_alt) VALUES (?, ?, ?, ?, ?)`;
    try {
        const [result] = await db.query(query, [titel, source || null, indhold, img_link, image_alt || null]);
        res.status(201).json({ status: 'success', message: 'Artikel oprettet', artikel_id: result.insertId });
    } catch (error) {
        console.error("Fejl ved oprettelse af artikel:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke oprette artikel.' });
    }
});

// Opdater eksisterende artikel (justeret til at inkludere image_alt)
artikelRouter.put('/:id', async (req, res) => {
    // VIGTIGT: image_alt er tilføjet til destruktureringen
    const { titel, source, indhold, img_link, image_alt } = req.body; 
    const artikel_id = req.params.id;

    if (!titel || !indhold || !artikel_id) {
        return res.status(400).json({ status: 'error', message: 'Titel, indhold og ID er påkrævet.' });
    }

    // NYT: image_alt er med i SET-klausulen, og den er nu med i arrayet af parametre
    const query = `UPDATE ${ARTIKEL_TABLE} SET titel = ?, source = ?, indhold = ?, img_link = ?, image_alt = ? WHERE artikel_id = ?`;
    try {
        await db.query(query, [titel, source || null, indhold, img_link, image_alt || null, artikel_id]);
        res.json({ status: 'success', message: 'Artikel opdateret' });
    } catch (error) {
        console.error("Fejl ved opdatering af artikel:", error);
        res.status(500).json({ status: 'error', message: 'Kunne ikke opdatere artikel.' });
    }
});

// Slet artikel (ingen ændring nødvendig her)
artikelRouter.delete('/:id', async (req, res) => {
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

export default artikelRouter;