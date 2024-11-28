import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/index.css';
import Button from '../components/_button';
import TextInput from "../components/_textInput";

export default function Index() {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [pseudo, setPseudo] = useState('');

    useEffect(() => {
        const checkDevice = () => {
            setIsMobileDevice(window.innerWidth <= 768);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    if (!isMobileDevice) {
        return <div className="non-mobile-message">Ce site est accessible uniquement sur mobile. 𐐘💥ඞා </div>;
    }

    return (
        <div className="All">
            <div className="wrapper">
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
                <span><i className="fa fa-star"></i></span>
            </div>

            <div className="box-area flex flex-col items-center justify-center">
                <h1 className="text-6xl font-Amatic text-white mb-8">Parmi Nous</h1>
                <div className="w-4/5 max-w-md">
                    <div className="mb-6">
                        <TextInput
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            placeholder="Entrez votre pseudo"
                            className="w-full text-white bg-black border-white rounded-lg"
                        />
                    </div>
                    <Link href="/createGame" passHref>
                        <Button
                            label="Créer partie"
                            onClick={() => console.log("Créer une partie")}
                            className="w-full mb-4 bg-black text-white border-white"
                        />
                    </Link>
                    <Link href="/joinGame" passHref>
                        <Button
                            label="Rejoindre partie"
                            className="w-full mb-4 bg-black text-white border-white"
                        />
                    </Link>
                    <Link href="/" passHref>
                        <Button
                            label="Règles"
                            className="w-full bg-black text-red-500 border-red-500"
                        />
                    </Link>
                </div>
            </div>

        </div>
    );
}
