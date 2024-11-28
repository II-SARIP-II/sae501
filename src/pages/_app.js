import '../styles/App.css';
import '../styles/index.css';
import Head from 'next/head';
import React from "react";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Parmi Nous</title>
                {/*<link rel="icon" href="/flavicon.ico"/>*/}
            </Head>

            {/* Fond étoilé */}
            <div className="wrapper fixed inset-0 -z-10">
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

            {/* Le composant de la page courante */}
            <div className="px-12 md:px-8">
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
