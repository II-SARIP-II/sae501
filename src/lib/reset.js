const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
    try {
        await prisma.players.deleteMany();
        await prisma.sessions.deleteMany();
        console.log('Base de données réinitialisée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la réinitialisation de la base de données :', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetDatabase();
