import { Server } from 'socket.io';
import questions from '../../data/questions.json';

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


            // Rejoindre une session
            socket.on('joinSession', (sessionId, player) => {
                console.log(`${player.name} a rejoint la session ${sessionId}`);

                // Initialiser la session si elle n'existe pas
                if (!sessions[sessionId]) sessions[sessionId] = { players: [], questions: [], answered: false };

                sessions[sessionId].players.push(player);
                socket.join(sessionId);

                io.to(sessionId).emit('updatePlayers', sessions[sessionId].players);
            });


            // Démarrer une partie
            socket.on('startGame', (sessionId) => {
                console.log(`La partie dans la session ${sessionId} commence.`);
                io.to(sessionId).emit('gameStarted', '/role');
            });


            // Lancer les questions
            socket.on('launchQuestions', (sessionId) => {
                console.log(`Lancement des questions pour la session : ${sessionId}`);

                if (sessions[sessionId]) {
                    // Charger les questions si elles ne sont pas encore chargées
                    if (sessions[sessionId].questions.length === 0) {
                        console.log('Chargement des questions...');
                        sessions[sessionId].questions = [...questions];
                    }

                    console.log(`Questions restantes : ${sessions[sessionId].questions.length}`);
                    const firstQuestion = sessions[sessionId].questions.shift();

                    if (firstQuestion) {
                        sessions[sessionId].answered = false; // Réinitialiser l'état de réponse
                        io.to(sessionId).emit('nextQuestion', firstQuestion);
                    } else {
                        console.log('Aucune question disponible.');
                    }
                } else {
                    console.log(`La session ${sessionId} n'existe pas.`);
                }
            });


            socket.on('submitAnswer', ({ sessionId, questionId, answer }) => {
                console.log(`Réponse reçue : questionId=${questionId}, answer=${answer}`);

                const question = questions.find(q => q.id === questionId);
                if (!question) {
                    console.log(`Question avec l'ID ${questionId} introuvable`);
                    socket.emit('answerFeedback', { correct: false, feedback: "Question introuvable" });
                    return;
                }

                const isCorrect = Array.isArray(question.answer)
                    ? question.answer.some(correctAnswer => correctAnswer.toLowerCase() === answer.toLowerCase())
                    : question.answer.toLowerCase() === answer.toLowerCase();

                const feedback = isCorrect ? "Bonne réponse !" : "Mauvaise réponse.";

                console.log(`Feedback : ${feedback}`);

                const session = Object.values(sessions).find(session => session.questions.some(q => q.id === questionId));
                if (session?.answered) {
                    console.log('Réponse déjà donnée pour cette question.');
                    return;
                }

                if (session) session.answered = true;

                io.to(sessionId).emit('answerSubmitted', {
                    correct: isCorrect,
                    feedback,
                });
            });

        });

        res.socket.server.io = io;
    }
    res.end();
}
