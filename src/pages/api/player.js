// pages/api/player.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Vérifier si l'id ou le sessionId est passé dans les query params
        const { id, sessionId } = req.query;

        if (id) {
            // -----------------------------------------------------RÉCUPERE PAR ID---------------------------------------------------------//
            const player = await prisma.players.findUnique({
                where: { id: parseInt(id) },
            });

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            res.status(200).json(player);
        } else if (sessionId) {
            // -----------------------------------------------------RÉCUPERE PAR SESSION---------------------------------------------------------//
            const players = await prisma.players.findMany({
                where: { sessionId: parseInt(sessionId) },
            });

            if (players.length === 0) {
                return res.status(404).json({ message: 'No players found for this session' });
            }

            res.status(200).json(players);
        } else {
            // -----------------------------------------------------RÉCUPERE TOUT SI PAS D'ID ET SESSION---------------------------------------------------------//
            const players = await prisma.players.findMany();
            res.status(200).json(players);
        }
    } else if (req.method === 'POST') {
        // -----------------------------------------------------Crée un nouveau player---------------------------------------------------------//
        const { sessionId, name, role, score, gameData } = req.body;
        const player = await prisma.players.create({
            data: {
                sessionId,
                name,
                role,
                score,
                gameData,
            },
        });
        res.status(201).json(player);
    } else if (req.method === 'PUT') {
        // -----------------------------------------------------MET A JOUR PAR ID---------------------------------------------------------//
        const { id, sessionId, name, role, score, gameData } = req.body;

        // Vérifier si le joueur existe
        const existingPlayer = await prisma.players.findUnique({
            where: { id },
        });

        if (!existingPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Mettre à jour les données du joueur
        const updatedPlayer = await prisma.players.update({
            where: { id },
            data: {
                sessionId,
                name,
                role,
                score,
                gameData,
            },
        });

        res.status(200).json(updatedPlayer);
    } else if (req.method === 'DELETE')
        // -----------------------------------------------------SUPPRIME PAR ID---------------------------------------------------------//
    {
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
}
