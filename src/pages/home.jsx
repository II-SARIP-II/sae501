import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/_button';
import TextInput from '../components/_textInput';

function HomePage() {
    const [text, setText] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleClick = () => {
        router.push('/');
    };

    return (
        <div>
            <h1>PARMI NOUS</h1>
            <Button label="Cliquez ici" onClick={handleClick} />
            <TextInput
                label="Entrez votre texte :"
                value={text}
                onChange={handleChange}
                placeholder="Tapez ici..."
            />
            <p>Vous avez entré : {text}</p>
        </div>
    );
}

export default HomePage;
