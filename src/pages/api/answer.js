import questions from '../../data/questions.json'; // Charge les questions depuis le fichier JSON

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { id, answer } = req.body; // Récupère l'ID et la réponse
        const question = questions.find(q => q.id === parseInt(id)); // Trouve la question correspondante

        if (!question) {
            return res.status(404).json({ message: "Question non trouvée." });
        }

        if (answer.toLowerCase() === question.answer.toLowerCase()) {
            return res.status(200).json({ correct: true, message: "Bonne réponse !" });
        } else {
            return res.status(200).json({ correct: false, message: "Mauvaise réponse, essayez encore." });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end('Méthode non autorisée.');
}
