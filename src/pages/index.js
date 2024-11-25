import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/index.css';

export default function Index() {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

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
        return <div className="non-mobile-message">Ce site est accessible uniquement sur mobile.</div>;
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
            <div className="box-area">
                <div className="text-area">
                    <nav>
                        <Link href="/home">Accueil</Link> |{' '}
                        <Link href="/joinGame">Rejoindre le Jeu</Link> |{' '}
                    </nav>
                </div>
            </div>
        </div>
    );
}
