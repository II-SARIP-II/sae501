import { useState, useEffect } from 'react';

export default function Game() {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchRandomQuestion = async () => {
            const response = await fetch('/api/enigma'); // Charge toutes les questions
            const questions = await response.json();
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setQuestion(randomQuestion); // Choisit une question aléatoire
        };

        fetchRandomQuestion();
    }, []);

    return (
        <div>
            <h1>Jeu d'énigmes</h1>
            {question ? (
                <div>
                    <h2>{question.question}</h2>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const answer = e.target.answer.value;

                        const response = await fetch(`/api/answer`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: question.id, answer }), // Inclure l'ID
                        });

                        const result = await response.json();
                        alert(result.message); // Affiche si c'est correct ou incorrect
                    }}>
                        <input type="text" name="answer" placeholder="Votre réponse" />
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}
