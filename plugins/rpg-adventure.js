import db from '../lib/database.js';

const cooldown = 1500000; // 25 minutos

let handler = async (m, { usedPrefix, conn }) => {
    try {
        let user = global.db.data.users[m.sender];

        // Verificar si el usuario está en la base de datos
        if (!user || typeof user !== 'object') {
            return conn.reply(m.chat, '👤 El usuario no se encuentra en la base de Datos.', m);
        }

        // Verificar la salud del usuario
        if (user.health < 80) {
            return conn.reply(m.chat, '💔 No tienes suficiente salud para aventurarte. Usa el comando .heal para curarte.', m);
        }

        // Verificar cooldown
        if (user.lastAdventure && new Date() - user.lastAdventure <= cooldown) {
            let timeLeft = cooldown - (new Date() - user.lastAdventure);
            return conn.reply(m.chat, `⏳ Estás en cooldown. Espera ${Math.ceil(timeLeft / 60000)} minutos antes de aventurarte de nuevo.`, m);
        }

        // Lista de reinos inventados
        let kingdoms = [
            'Reino de Eldoria',
            'Reino de Drakonia',
            'Reino de Arkenland',
            'Reino de Valoria',
            'Reino de Mystara',
            'Reino de Ferelith',
            'Reino de Thaloria',
            'Reino de Nimboria',
            'Reino de Galadorn',
            'Reino de Elenaria'
        ];

        // Seleccionar un reino aleatorio
        let randomKingdom = kingdoms[Math.floor(Math.random() * kingdoms.length)];

        const rewards = {
            yenes: Math.floor(Math.random() * 16) + 5,
            exp: Math.floor(Math.random() * 16) + 5,
            emerald: Math.floor(Math.random() * 16) + 5,
            diamonds: Math.floor(Math.random() * 16) + 5,
            potions: Math.floor(Math.random() * 16) + 5,
            healthLost: Math.floor(Math.random() * 20)
        };

        // Actualizar recursos del usuario
        user.yenes += rewards.yenes;
        user.exp += rewards.exp;
        user.emerald += rewards.emerald;
        user.diamond += rewards.diamonds;
        user.potion += rewards.potions;
        user.health -= rewards.healthLost;
        user.lastAdventure = new Date();

        // Asegurarse de que la salud no sea negativa
        if (user.health < 0) {
            user.health = 0;
        }

        // Guardar el usuario en la base de datos
        db.data.users[m.sender] = user;

        let text = `🛫 𝙴𝚂𝚃𝙰 𝙰𝚅𝙴𝙽𝚃𝚄𝚁𝙰 𝙴𝙽  *» ${randomKingdom}*\n\n` +
                   `🏞️ *Aventura Finalizada* 🏞️\n` +
                   `┋ 💴 *Yenes Ganados:* ${rewards.yenes}\n` +
                   `┋ ✨ *Experiencia Ganada:* ${rewards.exp}\n` +
                   `┋ ♦️ *Esmeraldas Encontradas:* ${rewards.emerald}\n` +
                   `┋ 💎 *Diamantes Encontrados:* ${rewards.diamonds}\n` +
                   `┋ 🥤 *Pociones Ganadas:* ${rewards.potions}\n` +
                   `┋ ❤️ *Salud Perdida:* ${rewards.healthLost}\n` +
                   `┋ ❤️ *Salud Actual:* ${user.health}`;

        await conn.sendMessage(m.chat, { text }, { quoted: m });
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁, 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝙻𝙾 𝙳𝙴 𝙽𝚄𝙴𝚅𝙾, 𝚂𝙴𝙶𝚄𝚁𝙾 𝙻𝙰 𝙰𝙿𝙸 𝙽𝙾 𝙶𝙴𝙽𝙴𝚁𝙾 𝙻𝙰 𝙸𝙼𝙰𝙶𝙴𝙽*', m);
    }
};

handler.help = ['aventura', 'adventure'];
handler.tags = ['rpg'];
handler.command = /^(aventura|adventure)$/i;
handler.cooldown = cooldown;

export default handler;
