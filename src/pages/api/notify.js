import webPush from 'web-push';

const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
};

webPush.setVapidDetails(
    'mailto:contact@jeu.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let subscriptions = []; // Utilise les abonnements sauvegardés

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, body } = req.body;

        try {
            const notifications = subscriptions.map(sub =>
                webPush.sendNotification(sub, JSON.stringify({ title, body }))
            );
            await Promise.all(notifications);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Erreur d’envoi:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Méthode non autorisée.');
    }
}
