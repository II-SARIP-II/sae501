import React, { useState, useEffect } from 'react';
import Button from '../components/_button';

export default function Game() {
    const [question, setQuestion] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            const response = await fetch('/api/question/enigma');
            const questions = await response.json();
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setQuestion(randomQuestion);
            setQuestionNumber(questions.indexOf(randomQuestion) + 1); // Met à jour le numéro de l'énigme
        };

        fetchRandomQuestion();
    }, []);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
        setIsAnswered(e.target.value !== '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Empêche la soumission par défaut du formulaire

        if (answer === '') {
            console.log('Aucune réponse donnée');
            return;  // Si pas de réponse, on ne fait rien
        }

        console.log('Réponse envoyée:', answer);  // Affiche la réponse envoyée

        const response = await fetch('/api/question/answer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: question.id, answer}),
        });

        const result = await response.json();
        console.log('Réponse de l\'API:', result);  // Affiche la réponse de l'API

        if (result.correct) {
            setFeedback('Bonne réponse !');
        } else {
            setFeedback('Mauvaise réponse, essayez encore.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white p-8">
            <div className="w-full max-w-lg flex flex-col items-center py-20 space-y-12">
                <h1 className="text-6xl font-Amatic text-yellow-400 mb-12">
                    Énigme #{questionNumber}
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
                        {feedback && (
                            <p className={`mt-4 text-xl ${feedback === 'Bonne réponse !' ? 'text-green-500' : 'text-red-500'}`}>
                                {feedback} {/* Affiche si la réponse est correcte ou incorrecte */}
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="text-xl text-gray-400">Chargement...</p>
                )}
            </div>
        </div>
    );
}
