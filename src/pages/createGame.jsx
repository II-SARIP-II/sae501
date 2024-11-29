import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from '../components/_button';
import Link from 'next/link';
import axios from "axios";

export default function CreateGame() {
    const [sessionCode, setSessionCode] = useState('');
    const [users, setUsers] = useState([]);
    const [sessionCreated, setSessionCreated] = useState(false);
    const router = useRouter();

    // Vérification de la présence du pseudo
    useEffect(() => {
        const pseudo = sessionStorage.getItem('userPseudo');
        if (!pseudo) {
            router.push('/profile'); // redirige vers le profil si y a pas de pseudo
        }
    }, [router]);



    useEffect(() => {
        const initialCode = generateCode();
        setSessionCode(initialCode);
    }, []);

    const handleCreateSession = () => {
        if (!sessionCreated) {
            setSessionCreated(true);
        }
    };

        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-Amatic mb-28">Créer une partie</h1>
                <div className="w-full max-w-md">
                    <p className="text-2xl font-Amatic mb-12">
                        Code : <span className="font-bold text-red-500">{sessionCode || '...'}</span>
                    </p>
                    <div>
                        <p className="text-xl font-Amatic mb-4">Utilisateurs :</p>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            {users.length > 0 ? (
                                <ul className="list-disc list-inside space-y-2">
                                    {users.map((user, index) => (
                                        <li key={index} className="text-yellow-400 font-bold">
                                            {user}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">Aucun utilisateur pour le moment...</p>
                            )}
                        </div>
                    </div>
                    {!sessionCreated ? (
                        <Button
                            label="Créer la partie"
                            onClick={handleCreateSession}
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
