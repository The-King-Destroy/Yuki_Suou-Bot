import { join } from 'path';
import { promises } from 'fs';

let handler = async (m, { conn, args, usedPrefix, __dirname }) => {
    let imgr = flaaa.getRandom();
    let user = global.db.data.users[m.sender];

    if (user.health >= 100) {
        return conn.sendMessage(m.chat, `❤️ 𝚃𝚄 𝚂𝙰𝙻𝚄𝙳 𝙴𝚂𝚃𝙰 𝙻𝙻𝙴𝙽𝙰 ❤️\nSALUD: ${user.health}`, m);
    }

    const heal = 40 + (user.cat * 4);
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1;

    if (user.potion < count) {
        return conn.sendMessage(m.chat, `💔 𝙽𝙴𝙲𝙴𝚂𝙸𝚃𝙰𝚂 ${count - user.potion} 🥤 𝙿𝙾𝙲𝙸𝙾𝙽 𝙿𝙰𝚁𝙰 𝙲𝚄𝚁𝙰𝚁𝚃𝙴\nSALUD: ${user.health} ❤️\nPOCION: ${user.potion} 🥤`, m);
    }

    // Restar las pociones y aumentar la salud
    user.potion -= count * 1; // 1 potion = count (1)
    user.health += heal * count; 

    // Asegurarse de que la salud no supere el máximo
    if (user.health > 100) {
        user.health = 100;
    }

    conn.sendMessage(m.chat, `*━┈━《 ✅ 𝚂𝙰𝙻𝚄𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰 》━┈━*\n✨ 𝙴𝙻 𝙴𝚇𝙸𝚃𝙾 𝚄𝙻𝚃𝙸𝙼𝙰𝙼𝙴𝙽𝚃𝙴 𝚄𝚂𝙾 ${count} 🥤 𝙿𝙾𝙲𝙸𝙾𝙽 𝙿𝙰𝚁𝙰 𝚁𝙴𝙲𝚄𝙿𝙴𝚁𝙰𝚁 𝚂𝚄 𝚂𝙰𝙻𝚄𝙳\nSALUD: ${user.health} ❤️`, m);
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = /^(heal|curar)$/i;

export default handler;

function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}