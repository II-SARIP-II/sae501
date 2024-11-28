const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Récupérer toutes les sessions
app.get('/api/sessions', async (req, res) => {
    try {
        const sessions = await prisma.sessions.findMany({
            include: { Players: true, Suspects: true }, // Inclure les joueurs et suspects associés
        });
        res.json({ message: 'Success', data: sessions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une session par ID
app.get('/api/sessions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const session = await prisma.sessions.findUnique({
            where: { id: parseInt(id) },
            include: { Players: true, Suspects: true }, // Inclure les joueurs et suspects associés
        });
        res.json({ message: 'Success', data: session });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle session
app.post('/api/sessions', async (req, res) => {
    const { name, code, space_left, total_questions, saboteur_id } = req.body;
    try {
        const newSession = await prisma.sessions.create({
            data: {
                name,
                code,
                space_left,
                total_questions,
                saboteur_id, // le saboteur_id si nécessaire
            },
        });
        res.json({ message: 'Session créée avec succès', data: newSession });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une session
app.put('/api/sessions/:id', async (req, res) => {
    const { id } = req.params;
    const { name, code, space_left, status, total_questions, killer_id, saboteur_id } = req.body;

    try {
        const updatedSession = await prisma.sessions.update({
            where: { id: parseInt(id) },
            data: {
                name,
                code,
                space_left,
                status,
                total_questions,
                killer_id, // Mise à jour du tueur
                saboteur_id, // Mise à jour du saboteur
            },
        });
        res.json({ message: 'Session mise à jour avec succès', data: updatedSession });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/players', async (req, res) => {
    const { session_id, name, role, is_ready, score, game_data } = req.body;
    try {
        const newPlayer = await prisma.players.create({
            data: {
                session_id,
                name,
                role,      // 0 = player, 1 = saboteur
                is_ready,
                score,
                game_data, // Données JSON liées au joueur
            },
        });
        res.json({ message: 'Joueur ajouté avec succès', data: newPlayer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/suspects', async (req, res) => {
    const { session_id, name, description, hints, is_killer } = req.body;
    try {
        const newSuspect = await prisma.suspects.create({
            data: {
                session_id,
                name,
                description,
                hints,
            },
        });
        res.json({ message: 'Suspect ajouté avec succès', data: newSuspect });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



REFAIRE CETTE PAGE ET D2COUPER CORRECTEMENT