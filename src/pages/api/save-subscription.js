let subscriptions = []; // À remplacer par une base de données en production

export default function handler(req, res) {
    if (req.method === 'POST') {
        const subscription = req.body;
        subscriptions.push(subscription);
        res.status(200).json({ success: true });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Méthode non autorisée.');
    }
}
