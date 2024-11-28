// pages/api/suspect.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Récupérer tous les suspects d'une session spécifique
        const { sessionId } = req.query;
        const suspects = await prisma.suspects.findMany({
            where: { sessionId: parseInt(sessionId) },
        });
        res.status(200).json(suspects);
    } else if (req.method === 'POST') {
        // Créer un nouveau suspect
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
