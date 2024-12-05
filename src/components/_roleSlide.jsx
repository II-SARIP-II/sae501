import React, { useEffect, useState } from "react";

export default function RoleSlide() {
    const [player, setPlayer] = useState({});
    const [isRoleVisible, setIsRoleVisible] = useState(false);

    const getStoredUserData = () => {
        try {
            const storedPlayer = sessionStorage.getItem("userData");
            if (storedPlayer) {
                return JSON.parse(storedPlayer);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
        }
        return null;
    };

    useEffect(() => {
        setPlayer(getStoredUserData());
    }, []);

    const toggleRoleVisibility = () => {
        setIsRoleVisible(!isRoleVisible);
    };

    return (
        <div className="w-full top-0 absolute">
            {/* Wrapper contenant la flèche, le texte, et le rôle */}
            <div
                className={`absolute top-0 left-0 right-0 transition-transform duration-500 ${
                    isRoleVisible ? "translate-y-20" : "translate-y-0"
                }`}
                style={{ height: "80px", top: "-80px" }}
            >
                {/* Rôle (Enquêteur ou Saboteur) */}
                <div className="flex justify-center items-center h-20 shadow-md border-2 border-gray-800 bg-gray-800">
                    {player.role === 0 ? (
                        <h1 className="text-4xl font-extrabold font-Amatic text-blue-500">Enquêteur</h1>
                    ) : (
                        <h1 className="text-4xl font-extrabold font-Amatic text-red-500">Saboteur</h1>
                    )}
                </div>

                {/* Flèche et texte pour basculer l'affichage */}
                <div
                    className="flex justify-center h-12"
                    onClick={toggleRoleVisibility}
                >
                    <div className="flex justify-center items-center bg-gray-800 w-fit p-3 rounded-b-xl">

                    <h1 className="font-Amatic text-xl text-white mr-2">Voir ton rôle</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                            isRoleVisible ? "rotate-180" : "rotate-0"
                        }`}
                        fill="currentColor"
                        style={{ color: "white" }}
                    >
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
