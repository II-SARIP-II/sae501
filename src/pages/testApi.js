import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestApi() {
    const [players, setPlayers] = useState([]); // État pour stocker les joueurs
    const [error, setError] = useState(null); // État pour gérer les erreurs
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    useEffect(() => {
        // Fonction pour récupérer les joueurs
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/player');
                setPlayers(response.data);
            } catch (err) {
                console.error('Error fetching players:', err);
                setError('Une erreur est survenue lors de la récupération des joueurs.');
            } finally {
                setLoading(false); // Terminer l'état de chargement
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#4CAF50' }}>Test API - Liste des joueurs</h1>

            {loading && <p>Chargement des joueurs...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && players.length === 0 && (
                <p>Aucun joueur trouvé.</p>
            )}

            {!loading && players.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {players.map((player) => (
                        <li
                            key={player.id}
                            style={{
                                background: '#f9f9f9',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            <strong>{player.name}</strong> - Rôle : {player.role}, Score : {player.score}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
