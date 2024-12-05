// pages/api/suspect_hints.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // -----------------------------------------------------RÉCUPÈRE LES INDICES---------------------------------------------------------//
        const { suspectId, hintId } = req.query;

        try {
            if (suspectId && !hintId) {
                // Récupère tous les indices pour un suspect donné
                const suspectHints = await prisma.suspect_hints.findMany({
                    where: { suspectId: parseInt(suspectId) },
                    include: { Suspects: true },
                });
                res.status(200).json(suspectHints);
            } else if (suspectId && hintId) {
                // Récupère un indice spécifique pour un suspect donné
                const suspectHint = await prisma.suspect_hints.findFirst({
                    where: {
                        suspectId: parseInt(suspectId),
                        hintId: parseInt(hintId),
                    },
                    include: { Suspects: true },
                });
                res.status(200).json(suspectHint);
            } else {
                // Si aucune condition n'est remplie
                res.status(400).json({ message: 'Veuillez fournir un suspectId ou suspectId et hintId' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    } else if (req.method === 'POST') {
        try {
            const { suspectId, hintText } = req.body;

            // Vérification des données
            if (!suspectId || !hintText) {
                return res.status(400).json({ message: 'Invalid data: suspectId and hintText are required.' });
            }

            const suspectHint = await prisma.suspect_hints.create({
                data: { suspectId: suspectId, hintText: hintText },
            });

            res.status(201).json(suspectHint);
        } catch (error) {
            console.error('Server Error: ccc', error);
            res.status(500).json({ message: 'CACA', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
