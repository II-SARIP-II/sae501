// src/pages/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/index.css';
import Button from '../components/_button';
import axios from "axios";

export default function Index() {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [userPseudo, setUserPseudo] = useState('');
    const router = useRouter();

    const checkDevice = () => {
        setIsMobileDevice(window.innerWidth <= 768);
    };

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
        checkDevice();
        window.addEventListener('resize', checkDevice);

        const fetchPlayerData = async () => {
            const playerData = getStoredUserData();
            if (playerData) {
                setUserPseudo(playerData.name);
            }
        };

        fetchPlayerData();

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const timestamp = Date.now().toString(36);
        code += timestamp.slice(-4);
        return code;
    };

    // Création de la session + update Player -> SessionId + mise à jour du session storage
    const createGame = async () => {
        const storedPlayer = getStoredUserData();

        if (!storedPlayer) {
            alert("Veuillez d'abord créer un profil.");
            router.push('/profile');
            return;
        }

        try {
            // CRÉATION DE SESSION
            const sessionResponse = await axios.post('/api/session', {
                code: generateCode(),
                playersNumber: 1,
                status: 0,
                hostId: storedPlayer.id
            });

            // Vérification des données reçues
            console.log('Session créée:', sessionResponse.data);

            // MISE À JOUR DU JOUEUR
            const updatedPlayer = await axios.put('/api/player', {
                id: storedPlayer.id,
                sessionId: sessionResponse.data.id,
                role: null,
                score: null,
                gameData: null
            });

            console.log('Données mises à jour :', updatedPlayer.data);  // Log des données pour vérifier

            // Mise à jour du sessionStorage
            const updatedUserData = { ...updatedPlayer.data, sessionId: sessionResponse.data.id };
            sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
            router.push('/salon');

        } catch (error) {
            console.error('Erreur lors de la création de la session ou de la mise à jour du joueur :', error);
            alert('Une erreur est survenue lors de la création de la partie. Veuillez réessayer.');
        }
    };

    return (
        <div>
            {!isMobileDevice && (
                <div className="non-mobile-message">
                    Ce site est accessible uniquement sur mobile. 𐐘
                </div>
            )}

            {isMobileDevice && (
                <div className="box-area flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-Amatic text-white mb-24">Parmi Nous</h1>

                    {userPseudo && (
                        <p className="text-2xl text-yellow-400 font-Amatic mb-8">
                            Bienvenue, <span className="font-bold">{userPseudo}</span> !
                        </p>
                    )}

                    <div className="w-4/5 max-w-md">
                        <Link href="/profile" passHref>
                            <Button
                                label="Profil"
                                className="mb-4 bg-black text-white border-white"
                            />
                        </Link>
                        <Button
                            label="Créer partie"
                            className="mb-4 bg-black text-white border-white"
                            onClick={createGame}
                        />
                        <Link href="/joinGame" passHref>
                            <Button
                                label="Rejoindre partie"
                                className="mb-4 bg-black text-white border-white"
                            />
                        </Link>
                        <Link href="/rules" passHref>
                            <Button
                                label="Règles"
                                className="bg-black text-red-500 border-red-500"
                            />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
