const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
    try {
        // Supprimer les données dans l'ordre des dépendances
        await prisma.suspects.deleteMany(); // Suppression des suspects
        await prisma.players.deleteMany(); // Suppression des joueurs
        await prisma.sessions.deleteMany(); // Suppression des sessions
        console.log('Base de données réinitialisée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la réinitialisation de la base de données :', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetDatabase();
