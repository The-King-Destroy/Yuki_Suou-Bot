import { before } from './plugins/_welcome.js';
import { WAMessageStubType } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let chat = global.db.data.chats[m.chat];
    if (!chat.welcome) throw `⚠️ Para usar este comando debe activar las Bienvenidas con *${usedPrefix}on* welcome`;

    let mentions = text.trim();
    let who = mentions ? conn.parseMention(mentions) : [];
    if (!who.length) throw `📌 Menciona al usuario con @ para simular la bienvenida.`;

    let welcomeMessage = {
        messageStubType: WAMessageStubType.GROUP_PARTICIPANT_ADD,
        messageStubParameters: [who[0]],
        chat: m.chat,
        isGroup: true
    };

    await before(welcomeMessage, { conn, participants: who, groupMetadata: await conn.groupMetadata(m.chat) });
};

handler.help = ['testwelcome @user'];
handler.tags = ['group'];
handler.command = ['testwelcome'];
handler.admin = true;
handler.group = true;

export default handler;
