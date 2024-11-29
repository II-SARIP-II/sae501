import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/index.css';
import Button from '../components/_button';
import axios from "axios";

export default function Index() {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [userPseudo, setUserPseudo] = useState('');

    useEffect(() => {
        // Vérifier si l'utilisateur est sur un mobile
        const checkDevice = () => {
            setIsMobileDevice(window.innerWidth <= 768);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    useEffect(() => {
        // Récupérer le pseudo stocké dans le sessionStorage
        const storedPseudo = sessionStorage.getItem('userPseudo');
        if (storedPseudo) {
            setUserPseudo(storedPseudo);
        }
    }, []);
    //-------------------------------------------------------CRÉER UNE SESSION-------------------------------------------------------//
    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    const createGame = async () => {
        try {
            //CRÉATION DE SESSION + garder ID de la session
            const sessionResponse = await axios.post('/api/session', {
                code: generateCode(),
                playersNumber: 1,
                status: 0,
            });
            console.log('Session créée avec succès :', sessionResponse.data.id);


            //MIS A JOUR DE PLAYER LOCAL (ici fictif) SESSIONID PREND LA VALEUR DE L'ID DE LA SESSION CRÉÉE
            const playerResponse = await axios.put(`/api/player`, {
                id: 252,
                sessionId: sessionResponse.data.id,
            });
            console.log('Player mis à jour :', playerResponse.data);

            return {
                session: sessionResponse.data,
                player: playerResponse.data,
            };
        } catch (error) {
            console.error(
                'Erreur lors de la création de la session ou de la mise à jour du joueur :',
                error.response?.data || error.message
            );
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

                    {/* Affichage du pseudo si disponible */}
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
                        {/*<Link href="/createGame" passHref>*/}
                            <Button
                                label="Créer partie"
                                className="mb-4 bg-black text-white border-white"
                                onClick={createGame}
                            />
                        {/*</Link>*/}
                        <Link href="/joinGame" passHref>
                            <Button
                                label="Rejoindre partie"
                                className="mb-4 bg-black text-white border-white"
                            />
                        </Link>
                        <Link href="/" passHref>
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
