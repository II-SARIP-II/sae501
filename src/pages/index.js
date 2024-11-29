import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/index.css';
import Button from '../components/_button';

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
                        <Link href="/createGame" passHref>
                            <Button
                                label="Créer partie"
                                className="mb-4 bg-black text-white border-white"
                            />
                        </Link>
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
