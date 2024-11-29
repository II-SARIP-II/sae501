import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/_button';

export default function Profile() {
    const [pseudo, setPseudo] = useState('');
    const router = useRouter();

    const handleSavePseudo = () => {
        localStorage.setItem('userPseudo', pseudo);
        router.push('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-Amatic mb-8">Profil</h1>
            <div className="w-full max-w-md">
                <label htmlFor="pseudo" className="block text-lg mb-4">
                    Entrez votre pseudo :
                </label>
                <input
                    type="text"
                    id="pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full p-3 bg-black text-white border border-gray-500 rounded-lg mb-6"
                />
                <Button
                    label="Enregistrer"
                    onClick={handleSavePseudo}
                    className="w-full bg-black text-green-500 border-green-500"
                />
            </div>
        </div>
    );
}
