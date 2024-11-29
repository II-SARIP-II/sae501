import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '../components/_button';

export default function Profile() {
    const [pseudo, setPseudo] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSavePseudo = async () => {
        if (!pseudo.trim()) {
            setError('Le pseudo ne peut pas être vide.');
            return;
        }

        try {
            const response = await axios.post('/api/player', { name: pseudo });
            if (response.status === 201) {
                sessionStorage.setItem('userData', JSON.stringify(response.data));
                router.push('/');
            }
        } catch (err) {
            console.error('Erreur lors de la création du profil :', err);
            setError('Une erreur est survenue. Veuillez réessayer.');
        }
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
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Button
                    label="Enregistrer"
                    onClick={handleSavePseudo}
                    className="w-full bg-black text-green-500 border-green-500"
                />
            </div>
        </div>
    );
}
