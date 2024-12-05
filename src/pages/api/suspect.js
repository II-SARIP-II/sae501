// pages/api/suspect.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // -----------------------------------------------------RÉCUPERE SUSPECT PAR SESSION ID---------------------------------------------------------//
        const { sessionId } = req.query;
        const suspects = await prisma.suspects.findMany({
            where: { sessionId: parseInt(sessionId) },
        });
        res.status(200).json(suspects);

    } else if (req.method === 'POST') {
        // -----------------------------------------------------CRÉE UN SUSPECT (pas pour les joueurs mais je laisse quand meme pour l'instant)---------------------------------------------------------//

        const { sessionId, name, description, hints } = req.body;
        const suspect = await prisma.suspects.create({
            data: {
                sessionId,
                name,
                description,
                hints,
            },
        });
        res.status(201).json(suspect);
    } else if (req.method === 'PUT') {
        // -----------------------------------------------------MODIFIE UN SUSPECT (pas pour les joueurs mais je laisse quand meme pour l'instant)---------------------------------------------------------//

        // Mettre à jour un suspect
        const { id, sessionId, name, description, hints } = req.body;

        // Vérifier si le suspect existe
        const existingSuspect = await prisma.suspects.findUnique({
            where: { id },
        });

        if (!existingSuspect) {
            return res.status(404).json({ message: 'Suspect not found' });
        }

        // Mettre à jour les informations du suspect
        const updatedSuspect = await prisma.suspects.update({
            where: { id },
            data: {
                sessionId,
                name,
                description,
                hints,
            },
        });

        res.status(200).json(updatedSuspect);
    } else if (req.method === 'DELETE') {
        // -----------------------------------------------------DELETE UN SUSPECT (A SUPPRIMER POUR EVITER LES PB A LA FIN)---------------------------------------------------------//

        // Supprimer un suspect par ID
        const { id } = req.query;

        // Vérifier si le suspect existe
        const existingSuspect = await prisma.suspects.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingSuspect) {
            return res.status(404).json({ message: 'Suspect not found' });
        }

        // Supprimer le suspect
        await prisma.suspects.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Suspect deleted successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
