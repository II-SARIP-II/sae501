import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Result = () => {
    const router = useRouter();
    const [feedback, setFeedback] = useState('');
    const [correct, setCorrect] = useState(false);

    useEffect(() => {
        // Récupérer les données de feedback depuis le routeur ou un contexte
        const { correctAnswer, feedbackMessage } = router.query;
        setCorrect(correctAnswer === 'true');
        setFeedback(feedbackMessage || 'Aucune information disponible');
    }, [router.query]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl mb-4">Résultat de la Réponse</h1>
            <p className="text-xl">{feedback}</p>
            <p className={`text-2xl ${correct ? 'text-green-500' : 'text-red-500'}`}>
                {correct ? 'Bonne Réponse!' : 'Mauvaise Réponse!'}
            </p>
            <button
                onClick={() => router.push('/home')}
                className="mt-4 py-2 px-6 bg-black text-white rounded-lg"
            >
                Retour à l'accueil
            </button>
        </div>
    );
};

export default Result;
