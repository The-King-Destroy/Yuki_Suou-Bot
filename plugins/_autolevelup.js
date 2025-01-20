import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

let handler = m => m;
handler.before = async function (m, { conn, usedPrefix }) {
    if (!db.data.chats[m.chat].autolevelup) return;

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');
    let userName = m.pushName || 'Anónimo';

    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];
    if (!chat.autolevelup) return;

    let before = user.level;
    while (canLevelUp(user.level, user.exp, global.multiplier)) {
        user.level++;
    }

    if (before !== user.level) {
        let currentRole = getRole(user.level);
        if (user.level >= 1) {
            user.role = currentRole;
            let text22 = `✨ ¡Felicidades *${userName}*, por tu nuevo rango!\n\n\`Nuevo Rango:\`\n${currentRole}`;
            let nextRole = getRole(user.level + 1);
            if (nextRole) {
                text22 += `\n\n> Próximo rango ${nextRole}, en el *nivel ${roles[nextRole]}*. ¡Sigue así!`;
            }
            await conn.sendMessage(global.channelid, { text: text22, contextInfo: {
                externalAdReply: {
                    title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
                    body: '🥳 ¡Alguien obtuvo un nuevo Rango!',
                    thumbnailUrl: perfil,
                    sourceUrl: redes,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false
                }
            }}, { quoted: null });
        }

        m.reply(`*🎉 ¡ F E L I C I D A D E S ! 🎉*\n\n🌟 Nivel Actual » *${user.level}*\n⚜️ Rango » ${user.role}\n📆 Fecha » *${moment.tz('America/Bogota').format('DD/MM/YY')}*\n\n> *\`¡Has alcanzado un Nuevo Nivel!\`*`);

        let rewards = getRewards(user.level);
        if (rewards) {
            conn.reply(m.chat, `*✎ RECOMPENSA POR SU NUEVO NIVEL ${user.level}!!* ✦\n${rewards}`, m);
            user[rewards.especial] += rewards.cantEspecial;
            user[rewards.especial2] += rewards.cantEspecial2;
            user[rewards.especial3] += rewards.cantEspecial3;
        }
    }
};

function getRole(level) {
    return Object.entries(global.roles).find(([, minLevel]) => level >= minLevel)?.[0] || 'Sin rol';
}

function getRewards(level) {
    const baseRewards = {
        'coin': Math.floor(Math.random() * (9 - 6 + 1)) + 6,
        'exp': Math.floor(Math.random() * (10 - 6 + 1)) + 6,
        'joincount': Math.floor(Math.random() * (3 - 2 + 1)) + 2
    };

    const levelRewards = {
        5: { cant: 1 },
        10: { cant: 1 },
        15: { cant: 2 },
        20: { cant: 2 },
        25: { cant: 3 },
        30: { cant: 3 },
        35: { cant: 4 },
        40: { cant: 4 },
        45: { cant: 5 },
        50: { cant: 5 },
        55: { cant: 6 },
        60: { cant: 6 },
        65: { cant: 7 },
        70: { cant: 7 },
        75: { cant: 8 },
        80: { cant: 8 },
        85: { cant: 9 },
        90: { cant: 9 },
        95: { cant: 10 },
        100: { cant: 10 },
    };

    if (levelRewards[level]) {
        return {
            especial: 'coin',
            especial2: 'exp',
            especial3: 'joincount',
            cantEspecial: baseRewards.coin * levelRewards[level].cant,
            cantEspecial2: baseRewards.exp * levelRewards[level].cant,
            cantEspecial3: baseRewards.joincount * levelRewards[level].cant,
        };
    }
    return null;
}

export default handler;

global.roles = {
    '*Aventurero(a) - Novato(a) V*': 0,
    '*Aventurero(a) - Novato(a) IV*': 2,
    '*Aventurero(a) - Novato(a) III*': 4,
    '*Aventurero(a) - Novato(a) II*': 6,
    '*Aventurero(a) - Novato(a) I*': 8,
    '*Aprendiz del Camino V*': 10,
    '*Aprendiz del Camino IV*': 12,
    '*Aprendiz del Camino III*': 14,
    '*Aprendiz del Camino II*': 16,
    '*Aprendiz del Camino I*': 18,
    '*Explorador(a) del Valle V*': 20,
    '*Explorador(a) del Valle IV*': 22,
    '*Explorador(a) del Valle III*': 24,
    '*Explorador(a) del Valle II*': 26,
    '*Explorador(a) del Valle I*': 28,
    '*Guerrero(a) del Alba V*': 30,
    '*Guerrero(a) del Alba IV*': 32,
    '*Guerrero(a) del Alba III*': 34,
    '*Guerrero(a) del Alba II*': 36,
    '*Guerrero(a) del Alba I*': 38,
    '*Guardián(a) de los Bosques V*': 40,
    '*Guardián(a) de los Bosques IV*': 42,
    '*Guardián(a) de los Bosques III*': 44,
    '*Guardián(a) de los Bosques II*': 46,
    '*Guardián(a) de los Bosques I*': 48,
    '*Mago(a) del Crepúsculo V*': 50,
    '*Mago(a) del Crepúsculo IV*': 52,
    '*Mago(a) del Crepúsculo III*': 54,
    '*Mago(a) del Crepúsculo II*': 56,
    '*Mago(a) del Crepúsculo I*': 58,
    '*Héroe(a) de la Corona V*': 60,
    '*Héroe(a) de la Corona IV*': 62,
    '*Héroe(a) de la Corona III*': 64,
    '*Héroe(a) de la Corona II*': 66,
    '*Héroe(a) de la Corona I*': 68,
    '*Paladín(a) de Diamante V*': 70,
    '*Paladín(a) de Diamante IV*': 72,
    '*Paladín(a) de Diamante III*': 74,
    '*Paladín(a) de Diamante II*': 76,
    '*Paladín(a) de Diamante I*': 78,
    '*Maestro(a) de las Estrellas V*': 80,
    '*Maestro(a) de las Estrellas IV*': 85,
    '*Maestro(a) de las Estrellas III*': 90,
    '*Maestro(a) de las Estrellas II*': 95,
    '*Maestro(a) de las Estrellas I*': 99,
    '*Leyenda del Valle V*': 100,
    '*Leyenda del Valle IV*': 110,
    '*Leyenda del Valle III*': 120,
    '*Leyenda del Valle II*': 130,
    '*Leyenda del Valle I*': 140,
    '*Soberano(a) del Reino V*': 150,
    '*Soberano(a) del Reino IV*': 160,
    '*Soberano(a) del Reino III*': 170,
    '*Soberano(a) del Reino II*': 180,
    '*Soberano(a) del Reino I*': 199,
    '*Titán(a) del Norte V*': 200,
    '*Titán(a) del Norte IV*': 225,
    '*Titán(a) del Norte III*': 250,
    '*Titán(a) del Norte II*': 275,
    '*Titán(a) del Norte I*': 299,
    '*Guardían(a) de la Luz V*': 300,
    '*Guardían(a) de la Luz IV*': 325,
    '*Guardían(a) de la Luz III*': 350,
    '*Guardían(a) de la Luz II*': 375,
    '*Guardían(a) de la Luz I*': 399,
    '*Maestro(a) de la Magia V*': 400,
    '*Maestro(a) de la Magia IV*': 425,
    '*Maestro(a) de la Magia III*': 450,
    '*Maestro(a) de la Magia II*': 475,
    '*Maestro(a) de la Magia I*': 499,
    '*Señor(a) de la Guerra V*': 500,
    '*Señor(a) de la Guerra IV*': 525,
    '*Señor(a) de la Guerra III*': 550,
    '*Señor(a) de la Guerra II*': 575,
    '*Señor(a) de la Guerra I*': 599,
    '*Héroe(a) Inmortal V*': 600,
    '*Héroe(a) Inmortal IV*': 625,
    '*Héroe(a) Inmortal III*': 650,
    '*Héroe(a) Inmortal II*': 675,
    '*Héroe(a) Inmortal I*': 699,
    '*Maestro(a) de la Realidad V*': 700,
    '*Maestro(a) de la Realidad IV*': 725,
    '*Maestro(a) de la Realidad III*': 750,
    '*Maestro(a) de la Realidad II*': 775,
    '*Maestro(a) de la Realidad I*': 799,
    '*Sabio(a) Eterno(a) V*': 800,
    '*Sabio(a) Eterno(a) IV*': 825,
    '*Sabio(a) Eterno(a) III*': 850,
    '*Sabio(a) Eterno(a) II*': 875,
    '*Sabio(a) Eterno(a) I*': 899,
    '*Viajero(a) del Multiverso V*': 900,
    '*Viajero(a) del Multiverso IV*': 925,
    '*Viajero(a) del Multiverso III*': 950,
    '*Viajero(a) del Multiverso II*': 975,
    '*Viajero(a) del Multiverso I*': 999,
    '*Deidad de la Eternidad V*': 1000,
    '*Deidad de la Eternidad IV*': 2000,
    '*Deidad de la Eternidad III*': 3000,
    '*Deidad de la Eternidad II*': 4000,
    '*Deidad de la Eternidad I*': 5000,
    '*Apocalipsis*': 10000,
};
