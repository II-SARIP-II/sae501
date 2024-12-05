import React from "react";
import axios from "axios";

function fillSuspectHints() {

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/suspect_hints', {
                suspectId: parseInt("1"),
                hintText: "cacaca"
            });
            console.log(`Succès : Indice ajouté (ID: ${response.data.id})`);

        } catch (error) {
            console.error("Erreur CACA lors de l'ajout :", error);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Ajouter un Indice pour un Suspect</h1>

                <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}
                >
                    Ajouter
                </button>
        </div>
    );
}

export default fillSuspectHints;
