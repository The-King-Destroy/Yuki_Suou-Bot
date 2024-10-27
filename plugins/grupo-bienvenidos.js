//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🎉');

    if (m.isGroup) {
        const groupMetadata = await conn.groupMetadata(m.chat);
        const currentTime = new Date().getTime();
        const newcomers = groupMetadata.participants.filter(participant => {
            return participant.jid !== m.sender && (currentTime - participant.joinedTimestamp < 10 * 60 * 1000);
        }).map(participant => participant.jid);

        let str = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨𝐬 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨\n${groupMetadata.subject}\n𝐄𝐬𝐩𝐞𝐫𝐚𝐦𝐨𝐬 𝐪𝐮𝐞 𝐥𝐨 𝐩𝐚𝐬𝐞𝐬 𝐛𝐢𝐞𝐧 𝐲 𝐪𝐮𝐞 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐥𝐞𝐚𝐬 𝐥𝐚𝐬 𝐫𝐞𝐠𝐥𝐚𝐬.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ `.trim();
        const pp = 'https://telegra.ph/file/c62071be335ec9e97a0cf.mp4';
        const videos = [pp];
        const video = videos[Math.floor(Math.random() * videos.length)];

        // Enviamos el mensaje con el video y el mensaje correspondiente, mencionando a los recién llegados
        if (newcomers.length > 0) {
            conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: newcomers }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str }, { quoted: m });
        }
    }
}

handler.help = ['bienvenidos/nuevos'];
handler.tags = ['grupo'];
handler.command = ['bienvenidos','nuevos'];
handler.group = true;

export default handler;
