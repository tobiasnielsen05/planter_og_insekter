import express from 'express';
import db from '../../server/db.js'; 
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { mail_admin, pass_admin } = req.body;

    if (!mail_admin || !pass_admin) {
        return res.status(400).json({ status: 'error', message: 'Mail og kodeord er påkrævet.' });
    }

    const query = 'SELECT admin_id, name_admin, pass_admin FROM admin_users WHERE mail_admin = ?';
    try {
        const [users] = await db.query(query, [mail_admin]);

        if (users.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Ugyldig mail eller kodeord.' });
        }

        const user = users[0];
        if (user.pass_admin === pass_admin) {
            res.json({ 
                status: 'success', 
                message: 'Login succesfuldt', 
                token: `admin-token-${user.admin_id}`,
                userId: user.admin_id,
                name: user.name_admin
            });
            db.query('UPDATE admin_users SET lastLog_admin = CURRENT_TIMESTAMP WHERE admin_id = ?', [user.admin_id]);

        } else {
            res.status(401).json({ status: 'error', message: 'Ugyldig mail eller kodeord.' });
        }

    } catch (error) {
        console.error("Fejl ved login:", error);
        res.status(500).json({ status: 'error', message: 'Der opstod en serverfejl under login.' });
    }
});

export default authRouter;