import { Server } from 'socket.io';

const sessions = {}; // Stock temporaire pour les sessions et leurs joueurs

export default function handler(req, res) {
    if (!res.socket.server.io) {
        console.log('Initialisation du serveur Socket.IO...');
        const io = new Server(res.socket.server, {
            path: '/api/socket',
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        io.on('connection', (socket) => {
            console.log('Nouvelle connexion établie :', socket.id);

            socket.on('joinSession', (sessionId, player) => {
                console.log(`${player.name} a rejoint la session ${sessionId}`);

                // Ajout du joueur dans la session
                if (!sessions[sessionId]) sessions[sessionId] = [];
                sessions[sessionId].push(player);

                // Rejoindre la "room"
                socket.join(sessionId);

                // Émettre la mise à jour
                io.to(sessionId).emit('updatePlayers', sessions[sessionId]);
            });

            socket.on('startGame', (sessionId) => {
                console.log(`La partie dans la session ${sessionId} commence.`);
                io.to(sessionId).emit('gameStarted', '/role');
            });

            socket.on('joinSession', (sessionId, player) => {
                console.log(`Reçu : joinSession - sessionId: ${sessionId}, player: ${JSON.stringify(player)}`);
            });

            socket.on('disconnect', () => {
                console.log('Utilisateur déconnecté :', socket.id);
            });
        });

        res.socket.server.io = io;
    }
    res.end();
}
