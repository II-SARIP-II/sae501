import '../styles/App.css'; // Importer les styles globaux (y compris Tailwind)
import Head from 'next/head';
import React from "react";
import Header from "../components/_header";
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>PARMI NOUS</title>
                {/*<link rel="icon" href="/flavicon.ico"/>*/}
            </Head>
            <Header />
            {/* Le composant de la page courante */}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
