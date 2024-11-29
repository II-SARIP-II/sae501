// pages/api/player.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id, sessionId } = req.query;

            if (id) {
                const player = await prisma.players.findUnique({
                    where: { id: parseInt(id) },
                });

                if (!player) {
                    return res.status(404).json({ message: 'Player not found' });
                }

                res.status(200).json(player);
            } else if (sessionId) {
                const players = await prisma.players.findMany({
                    where: { sessionId: parseInt(sessionId) },
                });

                if (players.length === 0) {
                    return res.status(404).json({ message: 'No players found for this session' });
                }

                res.status(200).json(players);
            } else {
                const players = await prisma.players.findMany();
                res.status(200).json(players);
            }

        } else if (req.method === 'POST') {
            const { name } = req.body; // On récupère seulement le pseudo
            if (!name || name.trim() === '') {
                return res.status(400).json({ message: 'Le pseudo est obligatoire.' });
            }
            const player = await prisma.players.create({
                data: { name }, // On enregistre uniquement le pseudo
            });
            res.status(201).json(player);

        } else if (req.method === 'PUT') {
            const { id, sessionId, name, role, score, gameData } = req.body;

            const existingPlayer = await prisma.players.findUnique({
                where: { id },
            });

            if (!existingPlayer) {
                return res.status(404).json({ message: 'Player not found' });
            }

            const updatedPlayer = await prisma.players.update({
                where: { id },
                data: { sessionId, name, role, score, gameData },
            });

            res.status(200).json(updatedPlayer);

        } else if (req.method === 'DELETE') {
            const { id } = req.query;

            const existingPlayer = await prisma.players.findUnique({
                where: { id: parseInt(id) },
            });

            if (!existingPlayer) {
                return res.status(404).json({ message: 'Player not found' });
            }

            await prisma.players.delete({
                where: { id: parseInt(id) },
            });

            res.status(200).json({ message: 'Player deleted successfully' });
        } else {
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Erreur API /player:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
