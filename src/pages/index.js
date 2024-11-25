import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/index.css';

function useMobileOverride() {
    const [isMobileOverride, setIsMobileOverride] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setIsMobileOverride(params.get('mobile') === 'true');
    }, []);

    return isMobileOverride;
}

export default function Index() {
    const isMobileOverride = useMobileOverride();
    const [isClientSide, setIsClientSide] = useState(false);

    useEffect(() => {
        setIsClientSide(true);
    }, []);

    if (!isClientSide) {
        return null;
    }

    if (!isMobile && !isMobileOverride) {
        return <div>Ce site est accessible uniquement sur mobile.</div>;
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
                        <Link href="/notFound">Page Introuvable</Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
