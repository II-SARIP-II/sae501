import pool from '/src/lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { endpoint, keys } = req.body;

        if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
            return res.status(400).json({ message: "Invalid subscription data" });
        }

        try {
            const conn = await pool.getConnection();
            const query = `
                INSERT INTO subscriptions (endpoint, p256dh, auth)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE endpoint=VALUES(endpoint)
            `;
            await conn.query(query, [endpoint, keys.p256dh, keys.auth]);
            await conn.release();

            return res.status(200).json({ message: "Subscription saved successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method not allowed');
    }
}
