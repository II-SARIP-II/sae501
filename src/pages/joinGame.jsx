import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/_button';
import Link from "next/link";
import TextInput from "../components/_textInput";
import axios from "axios";
import {el} from "@faker-js/faker";

export default function JoinGame({ setSessionData, sessionData }) {
    const [sessionCodeInput, setSessionCodeInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cannotJoin, setCannotJoin] = useState('');
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

    // Vérification du pseudo au chargement de la page
    useEffect(() => {
        const storedPlayer = sessionStorage.getItem('userData');
        if (!storedPlayer) {
            router.push('/profile');
        }
    }, [router]);

    const handleJoinGame = async () => {
        if (!sessionCodeInput) {
            setErrorMessage('Veuillez entrer un code de session valide.');
            return;
        }
        try {
            const sessionData = await fetchSessions(sessionCodeInput);
            console.log("Fetched session: ", sessionData);
            isJoinable(sessionData);
        } catch (error) {
            console.error('Erreur lors de la récupération de la session :', error);
        }
    };


    const isJoinable = (session) => {
        console.log("status : " , session.status)
        if (session.status === 0) {
            console.log("you can join")
            joinGame(session)
        } else {
            if (session.playersNumber >= 6) {
                setCannotJoin("Plus de place dans la partie")
            } else {
                setCannotJoin("La partie à déjà commencée")
            }
            console.log("Non non non")
        }
    }
    const joinGame = async (session) => {
        const storedPlayer = getStoredUserData()
        console.log(storedPlayer)
        //update player sessionId----------------------------//
        const playerResponse = await axios.put('/api/player', {
            id: storedPlayer.id,
            sessionId: session.id,
        });

        //update session playersNumber----------------------------//
        if (session.playersNumber === 5){ //Si le nombre est de 5, mettre status a 1 car ils seront 6 avec la nouveau player et 6 est le maximum, donc 1 bloque l'entrée
            const sessionResponse = await axios.put('/api/session', {
                id: session.id,
                playersNumber: session.playersNumber + 1,
                status: 1,
            });
        } else {
            const sessionResponse = await axios.put('/api/session', {
                id: session.id,
                playersNumber: session.playersNumber + 1,
            });
        }
        const updatedUserData = { ...playerResponse.data, sessionId: session.id };
        sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
        router.push('/salon');
    }
    const fetchSessions = async (code) => {
        try {
            const response = await axios.get('/api/session', {
                params: { code },
            });
            const sessionData = response.data;
            console.log(sessionData)
            return sessionData; // Retourne les données récupérées
        } catch (error) {
            console.error('Erreur lors de la récupération de la session :', error);
            throw error; // Permet de gérer l'erreur dans handleJoinGame
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
                {cannotJoin && (
                    <p className="text-red-500 text-center mb-4">{cannotJoin}</p>
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
