import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import RoleSlide from "../components/_roleSlide";
import Button from "../components/_button";

export default function Game() {
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [socket, setSocket] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Initialiser la connexion Socket.IO
        const socketInstance = io({
            path: '/api/socket',
        });

        setSocket(socketInstance);

        socketInstance.emit('joinSession', 'sessionId', { name: 'Player 1' });
        socketInstance.emit('launchQuestions', 'sessionId');

        // Écouter l'événement 'nextQuestion' pour recevoir une nouvelle question
        socketInstance.on('nextQuestion', (newQuestion) => {
            console.log('Question reçue :', newQuestion);
            setQuestion(newQuestion);
            setAnswer(''); // Réinitialiser la réponse
            setFeedback(''); // Réinitialiser le feedback
        });

        // Écouter le feedback et rediriger vers la page de résultat
        socketInstance.on('answerSubmitted', ({ correct, feedback }) => {
            if (correct !== undefined) {
                router.push('/result');
            }
        });

        return () => {
            socketInstance.off('nextQuestion');
            socketInstance.off('answerSubmitted');
            socketInstance.disconnect(); // Déconnecter le socket
        };
    }, [router]);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (answer === '') {
            console.log('Aucune réponse donnée');
            return;
        }

        console.log('Réponse envoyée:', answer);

        // Émettre la réponse via WebSocket pour validation
        socket.emit('submitAnswer', { sessionId: 'yourSessionId', questionId: question.id, answer });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <RoleSlide />

            <div className="w-full max-w-lg flex flex-col items-center py-20 space-y-12">
                <h1 className="text-6xl font-Amatic text-yellow-400 mb-12">
                    Énigme
                </h1>
                {question ? (
                    <div className="w-full max-w-md text-center">
                        <h2 className="text-3xl font-Amatic mb-6">{question.question}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                            <input
                                type="text"
                                name="answer"
                                placeholder="Votre réponse"
                                value={answer}
                                onChange={handleAnswerChange}
                                className="w-full p-3 bg-black text-white border border-gray-500 rounded-lg mb-6"
                            />
                            <Button
                                label="Envoyer"
                                type="submit"
                                className={`py-3 ${answer ? 'bg-black text-green-500 border-green-500' : 'text-gray-300 border-gray-500 cursor-not-allowed'}`}
                                disabled={!answer}
                            />
                        </form>
                    </div>
                ) : (
                    <p className="text-xl text-gray-400">Chargement...</p>
                )}
            </div>
        </div>
    );
}
