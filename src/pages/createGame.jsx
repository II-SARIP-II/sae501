import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/_button';
import Link from 'next/link';
import axios from 'axios';

export default function CreateGame() {
    const [sessionCode, setSessionCode] = useState('');
    const [players, setPlayers] = useState([]); // Initialisé comme tableau
    const [gameCreated, setGameCreated] = useState(false); // État pour savoir si la session est créée

    const router = useRouter();

    // Fonction utilitaire pour récupérer les données utilisateur
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

    // Fonction pour récupérer les données de session via l'ID de l'utilisateur stocké
    const fetchSessionBySessionId = async (sessionId) => {
        try {
            const response = await axios.get('/api/session', {
                params: { id: sessionId },
            });
            setSessionCode(response.data.code);

        } catch (error) {
            console.error('Erreur lors de la récupération de la session :', error);
            alert('Une erreur est survenue lors de la récupération de la session.');
        }
    };

    const fetchPlayersBySessionId = async (sessionId) => {
        try {
            const response = await axios.get('/api/player', {
                params: { sessionId }, // Utilisation correcte des paramètres
            });
            setPlayers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Erreur lors de la récupération des joueurs :', error);
            alert('Une erreur est survenue lors de la récupération des joueurs.');
        }
    };

    // Utilisation d'un effet pour charger les données au montage
    useEffect(() => {
        const storedPlayer = getStoredUserData();
        if (storedPlayer) {
            fetchSessionBySessionId(storedPlayer.sessionId);
            fetchPlayersBySessionId(storedPlayer.sessionId);
        }
    }, []); // Pas de dépendances pour exécuter une seule fois au montage

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-Amatic mb-28">Créer une partie</h1>
            <div className="w-full max-w-md">
                <p className="text-2xl font-Amatic mb-12">
                    Code : <span className="font-bold text-red-500">{sessionCode || 'Chargement...'}</span>
                </p>
                <div>
                    <p className="text-xl font-Amatic mb-4">Utilisateurs :</p>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        {players.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2">
                                {players.map((player, index) => (
                                    <li key={index} className="text-yellow-400 font-bold">
                                        {player.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">Aucun utilisateur pour le moment...</p>
                        )}
                    </div>
                </div>
                {!gameCreated ? (
                    <Button
                        label="Créer la partie"
                        onClick={fetchSessionBySessionId} // Utilise la fonction existante
                        className="py-3 bg-black text-green-500 border-green-500 mt-12"
                    />
                ) : (
                    <p className="text-center text-lg font-Amatic text-green-500 mt-12">
                        La session a été créée. Aucun autre utilisateur ne peut la rejoindre.
                    </p>
                )}
                <div className="mt-2">
                    <Link href="/">
                        <Button
                            label="Annuler"
                            className="py-3 bg-black text-red-500 border-red-500"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
