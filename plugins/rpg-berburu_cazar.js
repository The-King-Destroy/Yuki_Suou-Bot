
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let randomAnimals = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5));
    let animalNames = ['🐂', '🐅', '🐘', '🐐', '🐼', '🐊', '🐃', '🐮', '🐒', '🐗', '🐖', '🐓'];
    let weapons = ['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'];

    let results = animalNames.map((animal, index) => {
        let count = randomAnimals[index];
        return `${animal} ${weapons[index]} ${count}`;
    }).join("\n");

    // Mensaje inicial de resultados
    let initialMessage = `
*✧ Resultados de la caza para ${conn.getName(m.sender)} ✧*
${results}
`.trim();

    // Actualizar los registros del usuario
    randomAnimals.forEach((count, index) => {
        user[`${animalNames[index].charCodeAt(0)}`] = (user[`${animalNames[index].charCodeAt(0)}`] || 0) + count;
    });

    let cooldownTime = 2700000; // 45 minutos
    if (new Date - user.lastberburu < cooldownTime) {
        return conn.sendMessage(m.chat, {
            text: `⏳ Por favor espera un momento antes de volver a cazar. Tiempo restante: ${clockString(cooldownTime - (new Date - user.lastberburu))}`,
            quoted: m
        });
    }

    // Enviar el mensaje inicial
    let message = await conn.sendMessage(m.chat, {
        text: initialMessage,
        quoted: m
    });

    // Resumen de caza
    setTimeout(() => {
        let summaryMessage = `
*✧ Resumen de animales cazados ✧*
${results}
        `.trim();
        conn.sendMessage(m.chat, {
            text: summaryMessage,
            quoted: message
        });
    }, 5000); // Resumen tras 5 segundos

    // Actualizar la última hora de caza
    user.lastberburu = new Date * 1;
};

handler.help = ['caza'];
handler.tags = ['rpg'];
handler.command = /^(hunt|berburu|caza(r)?)$/i;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
