import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Role() {
    const [isVisible, setIsVisible] = useState(false);
    const [role, setRole] = useState(null);
    const router = useRouter();

    const getStoredUserData = () => {
        try {
            const storedPlayer = sessionStorage.getItem('userData');
            if (storedPlayer) {
                return JSON.parse(storedPlayer);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
        return null;
    };

    useEffect(() => {
        async function fetchPlayerRole() {
            const storedPlayer = getStoredUserData();
            if (!storedPlayer) return; // Si aucune donnée n'est stockée, on sort de la fonction.
            try {
                console.log(storedPlayer.id);

                const playerResponse = await axios.get('/api/player', {
                    params: { id: storedPlayer.id },
                });
                console.log(playerResponse.data);
                const updatedUserData = {
                    ...playerResponse.data,
                    role: playerResponse.data.role,
                };
                // Mettre à jour la session du joueur
                sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
                setRole(playerResponse.data.role);
            } catch (error) {
                console.error('Erreur lors de la récupération des joueurs :', error);
            }
        }

        fetchPlayerRole(); // Appel de la fonction
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100); // Ajoute un délai avant l'apparition.
        return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté.
    }, []);

    useEffect(() => {
        const timerRouterPush = setTimeout(() => {
            router.push('/enigma');
        }, 10000);

        return () => clearTimeout(timerRouterPush); // Nettoie le timer si le composant est démonté.
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="font-Amatic text-xl mb-4">TON ROLE EST :</h2>
            {role === 0 ? (
                <h1
                    className={`font-Amatic text-4xl font-bold text-green-500 transition-opacity duration-[5000ms] ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    ENQUÊTEUR
                </h1>
            ) : role === 1 ? (
                <h1
                    className={`font-Amatic text-4xl font-bold text-red-500 transition-opacity duration-[5000ms] ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    SABOTEUR
                </h1>
            ) : (
                <h1
                    className={`font-Amatic text-4xl font-bold text-gray-500 transition-opacity duration-[5000ms] ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    Problème de rôle
                </h1>
            )}
        </div>
    );
}
