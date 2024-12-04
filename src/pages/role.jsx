import {useState, useEffect} from 'react';
import axios from "axios";
import {pl} from "@faker-js/faker";

export default function Role() {
    const [role, setRole] = useState(null);
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
    useEffect(async () => {
        const storedPlayer = getStoredUserData();
        try {
            console.log(storedPlayer.id)

            const playerResponse = await axios.get('/api/player', {
                params:{id: storedPlayer.id}
            });
            console.log(playerResponse.data)
            const updatedUserData = { ...playerResponse.data, role: playerResponse.data.role };            //mettre a null la session du joueur en front
            sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
            setRole(playerResponse.data.role);
        } catch (error) {
            console.error('Erreur lors de la récupération des joueurs :', error);
        }

    }, []);

    return (
        <div>
            <h2>TON ROLE EST :</h2>
            {role === 0 ? (
                <h1>
                    ENQUÊTEUR
                </h1>
            ) : role === 1 ? (
                <h1>
                    SABOTEUR
                </h1>
            ) : (
                <h1>
                    Problème de role
                </h1>
            )}

        </div>
    );
}
