import fetch from 'node-fetch';
import db from '../lib/database.js';

const cooldown = 1500000; // 25 minutos

let handler = async (m, { usedPrefix, conn }) => {
    try {
        let user = global.db.data.users[m.sender];

        if (!user) {
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

        // Generar un código de país aleatorio
        let ct = ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'XK', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RS', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'CS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'XT', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW'];

        let randomCountryCode = ct[Math.floor(Math.random() * ct.length)];
        let response = await fetch(`https://api.worldbank.org/v2/country/${randomCountryCode}?format=json`);
        let kt = await response.json();

        if (!kt || !kt[1] || !kt[1][0]) {
            return conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙾𝙱𝚃𝙴𝙽𝙴𝚁 𝙳𝙰𝚃𝙾𝚂 𝙳𝙴 𝙻𝙰 𝙰𝙿𝙸!*', m);
        }

        let city = {
            id: kt[1][0].id,
            name: kt[1][0].name,
            capitalCity: kt[1][0].capitalCity || 'Sin Capital',
            longitude: kt[1][0].longitude || '0',
            latitude: kt[1][0].latitude || '0'
        };

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
        await db.data.users[m.sender] = user;

        let mapImageUrl = `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${city.longitude},${city.latitude}&z=12&l=map&size=600,300`;

        let text = `🛫 𝙴𝚂𝚃𝙰𝚜 𝙰𝚅𝙴𝙽𝚃𝚄𝚁𝙰𝙽𝙳𝙾 𝙴𝙽  *» ${city.name}*\n\n` +
                   `🏞️ *Aventura Finalizada* 🏞️\n` +
                   `┋ 💴 *Yenes Ganados:* ${rewards.yenes}\n` +
                   `┋ ✨ *Experiencia Ganada:* ${rewards.exp}\n` +
                   `┋ ♦️ *Esmeraldas Encontradas:* ${rewards.emerald}\n` +
                   `┋ 💎 *Diamantes Encontrados:* ${rewards.diamonds}\n` +
                   `┋ 🥤 *Pociones Ganadas:* ${rewards.potions}\n` +
                   `┋ ❤️ *Salud Perdida:* ${rewards.healthLost}\n` +
                   `┋ ❤️ *Salud Actual:* ${user.health}`;

        await conn.sendMessage(m.chat, { text, image: { url: mapImageUrl } }, { quoted: m });
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
