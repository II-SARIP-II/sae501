import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/_button';
import Link from "next/link";
import TextInput from "../components/_textInput";

export default function JoinGame({ setSessionData, sessionData }) {
    const [sessionCodeInput, setSessionCodeInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleJoinGame = () => {
        const pseudo = localStorage.getItem('userPseudo'); // Récupère le pseudo depuis localStorage
        if (!pseudo) {
            setErrorMessage('Veuillez configurer votre pseudo sur la page Profil.');
            return;
        }

        if (sessionData?.code === sessionCodeInput) {
            // Ajoute l'utilisateur à la session
            const updatedUsers = [...(sessionData.users || []), pseudo];
            setSessionData({
                ...sessionData,
                users: updatedUsers,
            });

            router.push('/createGame');
        } else {
            setErrorMessage('Code de session invalide.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-Amatic mb-16">Rejoindre une partie</h1>
            <div className="w-full max-w-md">
                <div className="mb-6">
                    <TextInput
                        type="text"
                        placeholder="Entrez le code de session"
                        value={sessionCodeInput}
                        onChange={(e) => setSessionCodeInput(e.target.value)}
                        className="w-full text-white bg-black border-white rounded-lg mt-16 mb-16"
                    />
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                <Button
                    label="Rejoindre la partie"
                    onClick={handleJoinGame}
                    className="py-3 bg-black text-green-500 border-green-500"
                />
                <Link href="/">
                    <Button
                        label="Annuler"
                        className="py-3 bg-black text-red-500 border-red-500 mt-2"
                    />
                </Link>
            </div>
        </div>
    );
}
