import Link from 'next/link';
import Button from '../components/_button';

export default function Rules() {
    return (
        <div className="box-area flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-6xl font-Amatic text-yellow-400 mb-8">Règles du Jeu</h1>

            <div className="w-4/5 max-w-lg text-center text-lg font-Amatic space-y-6">
                <p>
                    <strong className="text-red-500">Bienvenue dans "Parmi Nous"</strong>, un escape game en ligne.
                    Vous jouerez en équipe avec des rôles attribués dès le début. Préparez-vous à résoudre des énigmes et à identifier le tueur... ou à semer la confusion !
                </p>

                <h2 className="text-3xl text-yellow-400">Les Rôles</h2>
                <ul className="list-disc list-inside text-left space-y-2">
                    <li>
                        <strong className="text-red-500">Joueurs :</strong> Résolvez les énigmes et découvrez le tueur.
                    </li>
                    <li>
                        <strong className="text-yellow-300">Saboteurs :</strong> Détournez l'attention pour induire l'équipe en erreur.
                    </li>
                    <li>
                        <strong className="text-red-500">Imposteur :</strong> Un des saboteurs est le tueur. Il appartient à cette liste&nbsp;:
                        <span className="block mt-2 italic text-white">
                            Hitler, Staline, Mussolini, Kim Jong-il, Pétain.
                        </span>
                    </li>
                </ul>

                <h2 className="text-3xl text-yellow-400">Comment Jouer</h2>
                <ol className="list-decimal list-inside text-left space-y-2">
                    <li>Les joueurs doivent résoudre des énigmes dans un temps imparti.</li>
                    <li>
                        À chaque énigme résolue, un indice est donné pour identifier le tueur.
                        Attention, ces indices sont souvent ambigus&nbsp;!
                    </li>
                    <li>
                        Les saboteurs doivent manipuler l’équipe pour interpréter les indices de travers.
                    </li>
                </ol>

                <h2 className="text-3xl text-yellow-400">Victoire</h2>
                <ul className="list-disc list-inside text-left space-y-2">
                    <li>
                        <strong className="text-green-500">Équipe gagne :</strong> Si le tueur est identifié correctement après avoir résolu toutes les énigmes.
                    </li>
                    <li>
                        <strong className="text-red-500">Imposteur et saboteurs gagnent :</strong> Si les joueurs échouent à identifier le tueur.
                    </li>
                </ul>

                <p className="mt-6">
                    <strong className="text-yellow-300">Bonne chance&nbsp;!</strong> Et méfiez-vous des intentions des autres...
                </p>
            </div>

            <div className="mt-12">
                <Link href="/" passHref>
                    <Button label="Retour à l'accueil" className="bg-black text-yellow-400 border-yellow-400" />
                </Link>
            </div>
        </div>
    );
}
