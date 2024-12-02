import React, { useState, useEffect } from 'react';
import Button from '../components/_button';
import Link from 'next/link';
import axios from 'axios';
import io from 'socket.io-client';
import {emit} from "next/dist/client/components/react-dev-overlay/pages/bus";
import {router} from "next/client";

export default function Salon() {
    const [session, setSession] = useState(null);
    const [players, setPlayers] = useState([]);
    const [gameCreated, setGameCreated] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [socket, setSocket] = useState(null);

    // Récupérer les données utilisateur depuis le session storage
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

    // Charger les données de session
    const fetchSessionBySessionId = async (sessionId) => {
        try {
            const response = await axios.get('/api/session', {
                params: { id: sessionId },
            });
            console.log("session",response.data)
            setSession(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de la session :', error);
            alert('Une erreur est survenue lors de la récupération de la session.');
        }
    };

    const fetchPlayersBySessionId = async (sessionId) => {
        try {
            const response = await axios.get('/api/player', {
                params: { sessionId },
            });
            setPlayers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des joueurs :', error);
        }
    };

    const updateSessionStatus = async () => {
        try {
            await axios.put('/api/session', {
                id: session.id,
                status: 1,
            });
            setGameCreated(true);
            socket.emit('startGame', session.id); // Informer tous les utilisateurs que la partie démarre
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la session :', error);
        }
    };

    useEffect(() => {
        const storedPlayer = getStoredUserData();
        if (storedPlayer) {
            fetchSessionBySessionId(storedPlayer.sessionId);
            fetchPlayersBySessionId(storedPlayer.sessionId);

            // Initialisation de la connexion Socket.IO
            const socketConnection = io('http://localhost:3000', {
                path: '/api/socket',
            });
            setSocket(socketConnection);

            // Vérifier si la connexion est prête avant d'émettre l'événement
            socketConnection.on('connect', () => {
                socketConnection.emit('joinSession', storedPlayer.sessionId, storedPlayer, () => {
                    console.log('Événement joinSession émis.');
                });
            });

            socketConnection.on('updatePlayers', (updatedPlayers) => {
                setPlayers(updatedPlayers);
            });

            socketConnection.on('gameStarted', (sessionId) => {
                if (session.id === sessionId) {
                    setGameCreated(true);
                }
            });

            // Nettoyer la connexion Socket.IO à la fin
            return () => {
                socketConnection.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        if (players.length > 0 && session) {
            const storedPlayer = getStoredUserData();
            if (storedPlayer) {
                setIsHost(storedPlayer.id === session.hostId);
            }
        }
    }, [players, session]);

    const quitGame = async () =>{
        const storedPlayer = getStoredUserData();
        console.log("players" ,players[1])
        if(isHost === true){
            console.log("sessionId", session.id)
            if (players[1]) {
                const sessionResponse = await axios.put('/api/session', {
                    id: session.id,
                    hostId: players[1],
                    playersNumber: session.playersNumber - 1,
                    status: session.playersNumber === 6 ? 0 : undefined,
                });
                const playerResponse = await axios.put('/api/player', {
                    id: storedPlayer.id,
                    sessionId: null,
                });
            } else {
                const sessionResponse = await axios.delete('/api/session', {
                    params: {id: session.id}
                })
            }
            router.push("/");
        } else {
            //router.push("/");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            {session ? (
                <>
                    <h1 className="text-5xl font-Amatic mb-28">Créer une partie</h1>
                    <div className="w-full max-w-md">
                        <p className="text-2xl font-Amatic mb-12">
                            Code : <span className="font-bold text-red-500">{session.code || 'Chargement...'}</span>
                        </p>
                        {players.length > 0 ? (
                            <div>
                                <p className="text-xl font-Amatic mb-4">Utilisateurs :</p>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <ul className="list-disc list-inside space-y-2">
                                        {players.map((player, index) => (
                                            <li key={index} className="text-yellow-400 font-bold">
                                                {player.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400">Aucun utilisateur pour le moment...</p>
                        )}

                        {!gameCreated ? (
                            isHost && players.length >= 3 ? (
                                <Button
                                    label="Créer la partie"
                                    onClick={updateSessionStatus}
                                    className="py-3 bg-black text-green-500 border-green-500 mt-12"
                                />
                            ) : (
                                <p className="text-center text-lg font-Amatic text-green-500 mt-12">
                                    {isHost
                                        ? 'Vous n\'êtes pas assez pour débuter une partie.'
                                        : 'Attendez que l\'hôte lance la partie.'}
                                </p>
                            )
                        ) : (
                            <p className="text-center text-lg font-Amatic text-green-500 mt-12">
                                La session a été créée. Aucun autre utilisateur ne peut la rejoindre.
                            </p>
                        )}

                        <div className="mt-2">
                                <Button
                                    label="Annuler"
                                    onClick={quitGame}
                                    className="py-3 bg-black text-red-500 border-red-500"
                                />
                        </div>
                    </div>
                </>
            ) : (
                <p>Chargement de la session...</p>
            )}
        </div>
    );
}
