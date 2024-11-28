import React, { useState, useEffect } from 'react';
import Button from '../components/_button';

export default function CreateGame() {
    const [sessionCode, setSessionCode] = useState('');
    const [users, setUsers] = useState([]);
    const [sessionCreated, setSessionCreated] = useState(false);

    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

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
                        className="w-full py-3 bg-black text-green-500 border-green-500 rounded-lg mt-24"
                    />
                ) : (
                    <p className="text-center text-lg font-Amatic text-green-500 mt-24">
                        La session a été créée. Aucun autre utilisateur ne peut la rejoindre.
                    </p>
                )}
            </div>
        </div>
    );
}
