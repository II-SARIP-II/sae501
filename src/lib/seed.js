const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function generateFakePlayer(sessionId) {
    return {
        sessionId,
        name: faker.person.firstName(), // Mise à jour ici
        role: faker.number.int({ min: 0, max: 1 }), // 0 = innocent, 1 = saboteur
        score: faker.number.int({ min: 0, max: 100 }),
        gameData: faker.lorem.sentence(),
    };
}

async function generateFakeSession() {
    return {
        name: faker.string.alphanumeric(10),
        code: faker.string.alphanumeric(10),
        spaceLeft: faker.number.int({ min: 1, max: 10 }),
        status: faker.number.int({ min: 0, max: 3 }), // Exemple de statut
        totalQuestions: faker.number.int({ min: 5, max: 50 }),
        killerId: null, // Vous pouvez générer un ID valide si nécessaire
        saboteurId: null, // Idem pour saboteurId
    };
}

async function generateFakeSuspect(sessionId) {
    const fullName = faker.person.fullName(); // Générez le nom complet
    const truncatedName = fullName.length > 25 ? fullName.slice(0, 25) : fullName; // Truncate if it's longer than 25 characters

    return {
        sessionId,
        name: truncatedName,
        description: faker.lorem.sentence(),
        hints: faker.lorem.sentence(),
    };
}


async function seed() {
    for (let i = 0; i < 10; i++) {
        const fakeSession = await generateFakeSession();
        const session = await prisma.sessions.create({
            data: fakeSession,
        });

        console.log(`Session ${session.name} créée avec succès.`);

        for (let j = 0; j < 5; j++) {
            const fakePlayer = await generateFakePlayer(session.id);
            const player = await prisma.players.create({
                data: fakePlayer,
            });
            console.log(`Joueur ${player.name} créé dans la session ${session.name}.`);
        }

        // Générer des suspects pour cette session
        for (let k = 0; k < 3; k++) {
            const fakeSuspect = await generateFakeSuspect(session.id);
            const suspect = await prisma.suspects.create({
                data: fakeSuspect,
            });
            console.log(`Suspect ${suspect.name} créé dans la session ${session.name}.`);
        }
    }
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
