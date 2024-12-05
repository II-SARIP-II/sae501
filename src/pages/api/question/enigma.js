import questions from '/src/data/questions.json';

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        if (id) {
            const question = questions.find(q => q.id === parseInt(id));
            if (question) {
                return res.status(200).json(question);
            } else {
                return res.status(404).json({ message: "Question non trouvée." });
            }
        }

        return res.status(200).json(questions);
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end('Méthode non autorisée.');
}
