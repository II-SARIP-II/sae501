import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Hint() {
    const router = useRouter();
    const [hint, setHint] = useState(null);

    const getStoredUserData = () => {
        try {
            const storedPlayer = sessionStorage.getItem("userData");
            if (storedPlayer) {
                return JSON.parse(storedPlayer);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
        return null;
    };

    const fetchSessionBySessionId = async (sessionId) => {
        try {
            const response = await axios.get("/api/session", {
                params: { id: sessionId },
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération de la session :", error);
            throw error;
        }
    };

    const fetchSuspectById = async (suspectId) => {
        try {
            const response = await axios.get("/api/suspect", {
                params: { id: suspectId },
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération du suspect :", error);
            throw error;
        }
    };

    const fetchHintsBySuspectId = async (suspectId) => {
        try {
            const response = await axios.get("/api/suspect_hints", {
                params: { suspectId: suspectId }, // suspectId envoyé ici
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des indices :", error);
            throw error;
        }
    };

    const pickingHint = (hints, usedHints) => {
        const availableHints = hints.filter((hint) => !usedHints.includes(hint.id));

        if (availableHints.length === 0) {
            console.log("Pas d'indice disponible")
            return null;
        }

        // Sélectionne un indice aléatoire parmi les indices disponibles
        const randomIndex = Math.floor(Math.random() * availableHints.length);
        return availableHints[randomIndex];
    };


    useEffect(() => {
        const loadHints = async () => {
            const storedPlayer = getStoredUserData();

            if (!storedPlayer) {
                router.push("/profile");
                return;
            }

            try {
                console.log("Données utilisateur récupérées :", storedPlayer);

                const session = await fetchSessionBySessionId(storedPlayer.sessionId);
                console.log("Session récupérée :", session);

                const suspect = await fetchSuspectById(session.killerId);
                console.log("Suspect récupéré :", suspect);

                const hints = await fetchHintsBySuspectId(suspect.id);
                console.log("Indices récupérés :", hints);

                const selectedHint = pickingHint(hints, session.hints);
                console.log("Indice sélectionné :", selectedHint);

                setHint(selectedHint);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };

        loadHints();
    }, []);

    return (
        <div>
            <h1>Hint</h1>
            {hint ? <p>{hint.hintText}</p> : <p>Chargement de l'indice...</p>}
        </div>
    );
}
