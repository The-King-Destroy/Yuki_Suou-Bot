let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Inicializar recursos si no existen
    if (!user.resources) {
        user.resources = {
            bueyes: 0,
            tigres: 0,
            elefantes: 0,
            cabras: 0,
            pandas: 0,
            cocodrilos: 0,
            bufalos: 0,
            vacas: 0,
            monos: 0,
            jabalies: 0,
            cerdos: 0,
            gallinas: 0,
        };
    }

    // Definir el tiempo de espera (45 minutos)
    const cooldownTime = 2700000; // 45 minutos en milisegundos
    if (user.lastHunt && new Date - user.lastHunt < cooldownTime) {
        let remainingTime = cooldownTime - (new Date - user.lastHunt);
        return conn.sendMessage(m.chat, {
            text: `⏳ Por favor espera un momento antes de volver a cazar. Tiempo restante: ${clockString(remainingTime)}`,
            quoted: m
        });
    }

    // Definir los tipos de animales y sus cantidades
    const animals = [
        { name: 'Buey', emoji: '🐂' },
        { name: 'Tigre', emoji: '🐅' },
        { name: 'Elefante', emoji: '🐘' },
        { name: 'Cabra', emoji: '🐐' },
        { name: 'Panda', emoji: '🐼' },
        { name: 'Cocodrilo', emoji: '🐊' },
        { name: 'Búfalo', emoji: '🐃' },
        { name: 'Vaca', emoji: '🐮' },
        { name: 'Mono', emoji: '🐒' },
        { name: 'Jabalí', emoji: '🐗' },
        { name: 'Cerdo', emoji: '🐖' },
        { name: 'Gallina', emoji: '🐓' }
    ];

    // Definir las armas disponibles
    const weapons = [
        { name: 'Arco', emoji: '🏹' },
        { name: 'Rifle', emoji: '🔫' },
        { name: 'Cuchillo', emoji: '🔪' },
        { name: 'Trampa', emoji: '🪤' },
        { name: 'Red', emoji: '🕸️' }
    ];

    // Seleccionar un arma aleatoria
    let chosenWeapon = weapons[Math.floor(Math.random() * weapons.length)];

    // Generar resultados aleatorios
    let results = animals.map(animal => {
        let count = Math.floor(Math.random() * 3); // Cazar de 0 a 2 animales
        return { ...animal, count }; // Agregar el conteo a cada animal
    });

    // Crear el mensaje inicial con los resultados
    let message = `*✧ Resultados de la caza para ${conn.getName(m.sender)} ✧*\n`;
    message += `*Arma utilizada:* ${chosenWeapon.emoji} ${chosenWeapon.name}\n\n`;

    results.forEach(({ emoji, name, count }) => {
        if (count > 0) {
            message += `${emoji} ${name}: ${count}\n`;
            user.resources[name.toLowerCase() + 's'] += count; // Actualizar los recursos
        }
    });

    if (message === `*✧ Resultados de la caza para ${conn.getName(m.sender)} ✧*\n*Arma utilizada:* ${chosenWeapon.emoji} ${chosenWeapon.name}\n\n`) {
        message = `No cazaste nada esta vez. Intenta de nuevo.`;
    }

    // Enviar el mensaje de resultados de la caza
    await conn.sendMessage(m.chat, { text: message, quoted: m });

    // Actualizar la última hora de caza
    user.lastHunt = new Date();
};

handler.help = ['caza'];
handler.tags = ['rpg'];
handler.command = /^(hunt|caza|berburu)$/i;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export default handler;
