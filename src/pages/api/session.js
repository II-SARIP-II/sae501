// pages/api/session.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;

        if(id){
            // -----------------------------------------------------RÉCUPERE SESSION PAR ID---------------------------------------------------------//
            const session = await prisma.sessions.findUnique({
                where: { id: parseInt(id) },
            });
            if (!session) {
                return res.status(404).json({ message: 'Session not found' });
            }
        } else {
            // -----------------------------------------------------RÉCUPERE SESSIONS---------------------------------------------------------//
            const sessions = await prisma.sessions.findMany();
            res.status(200).json(sessions);
        }

    } else if (req.method === 'POST') {
        //-----------------------------------------------------CRÉE UNE SESSION---------------------------------------------------------//
        const { code, playersNumber, status } = req.body;
        const session = await prisma.sessions.create({
            data: {
                code,
                playersNumber,
                status,
            },
        });
        res.status(201).json(session);
    } else if (req.method === 'PUT') {
        // -----------------------------------------------------MET A JOUR SESSION PAR ID---------------------------------------------------------//
        const { id, code, playersNumber, status, questions, killerId } = req.body;

        // Vérifier si la session existe
        const existingSession = await prisma.sessions.findUnique({
            where: { id },
        });

        if (!existingSession) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const updatedSession = await prisma.sessions.update({
            where: { id },
            data: {
                code,
                playersNumber,
                status,
                questions,
                killerId,
            },
        });

        res.status(200).json(updatedSession);
    } else if (req.method === 'DELETE') {
        // -----------------------------------------------------DELETE SESSION PAR ID---------------------------------------------------------//
        const { id } = req.query;

        // Vérifier si la session existe
        const existingSession = await prisma.sessions.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingSession) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Supprimer la session
        await prisma.sessions.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Session deleted successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
