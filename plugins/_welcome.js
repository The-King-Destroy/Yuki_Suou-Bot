import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');
    let img = await (await fetch(`${pp}`)).buffer();
    let chat = global.db.data.chats[m.chat];

    let who = m.messageStubParameters[0] + '@s.whatsapp.net';
    let user = global.db.data.users[who];

    let userName = user ? user.name : await conn.getName(who);

    // Mensaje de bienvenida
    if (chat.welcome && m.messageStubType == 27) {
        let wel = `┌─⪩ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 🌹 \n│「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 😁 」\n└┬⪩ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🌸  𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀\n   │🌷  ${groupMetadata.subject}\n   └───────────────┈ ⳹`;
        await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, estilo);
    }

    // Mensaje de despedida
    if (chat.welcome && m.messageStubType == 28) {
        let bye = `┌─⪩ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 🌹 \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬⪩ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │😒  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`;
        await conn.sendMini(m.chat, packname, dev, bye, img, img, channel, estilo);
    }

    // Mensaje de expulsión
    if (chat.welcome && m.messageStubType == 32) {
        let kick = `┌─⪩ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 🌹 \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬⪩ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │😒  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`;
        await conn.sendMini(m.chat, packname, dev, kick, img, img, channel, estilo);
    }
}
