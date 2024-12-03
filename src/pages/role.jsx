import {useState, useEffect} from 'react';

export default function Role() {
    const [role, setRole] = useState(null);
    useEffect(() => {

    }, []);

    return (
        <div>
            <h2>TON ROLE EST :</h2>
            {role === 0 ? (
                <h1>
                    ENQUÊTEUR
                </h1>
            ) : (
                <h1>
                    SABOTEUR
                </h1>
            )}

        </div>
    );
}
