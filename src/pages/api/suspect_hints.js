// pages/api/suspect_hints.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // -----------------------------------------------------RÉCUPERE LES INDICES PAR SUSPECT ID---------------------------------------------------------//
        const { suspectId, hintId } = req.query;
        try {
            if (suspectId && !hintId) {
                const suspect_hints = await prisma.suspect_hints.findMany({
                    where: {suspect_id: parseInt(suspectId)},
                    include: { Suspects: true },
                });
                res.status(200).json(suspect_hints);
            } else if (suspectId && hintId) {
                // -----------------------------------------------------RÉCUPERE LES INDICES PAR SUSPECT ID + l'id de la question---------------------------------------------------------//

                const suspectHint = await prisma.suspect_hints.findFirst({
                    where: {
                        suspectId: parseInt(suspectId),
                        hintId: parseInt(hintId)
                    },
                    include: {
                        Suspects: true,
                    },
                });
                res.status(200).json(suspectHint);

            } else {
                res.status(405).json({message: 'No arguments received or invalid parameters provided'});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
