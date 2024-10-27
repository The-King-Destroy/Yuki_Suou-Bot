//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let newcomers = []; // Array para almacenar los nuevos miembros

let handler = async (m, { conn }) => {
    m.react('🎉');

    if (m.isGroup) {
        // Filtramos los nuevos miembros que se han registrado en los últimos 30 minutos
        const currentTime = new Date().getTime();
        const recentNewcomers = newcomers.filter(member => (currentTime - member.timestamp < 30 * 60 * 1000)).map(member => member.jid);

        let str = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨𝐬 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨\n${groupMetadata.subject}\n𝐄𝐬𝐩𝐞𝐫𝐚𝐦𝐨𝐬 𝐪𝐮𝐞 𝐥𝐨 𝐩𝐚𝐬𝐞𝐬 𝐛𝐢𝐞𝐧 𝐲 𝐪𝐮𝐞 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐥𝐞𝐚𝐬 𝐥𝐚𝐬 𝐫𝐞𝐠𝐥𝐚𝐬.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ `.trim();
        const pp = 'https://telegra.ph/file/c62071be335ec9e97a0cf.mp4';
        const videos = [pp];
        const video = videos[Math.floor(Math.random() * videos.length)];

        // Enviamos el mensaje con el video y el mensaje correspondiente, mencionando a los recién llegados
        if (recentNewcomers.length > 0) {
            conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: recentNewcomers }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str }, { quoted: m });
        }
    }
}

// Este evento se activará cuando un miembro se una al grupo
handler.on('group-participants-update', async (update) => {
    if (update.action === 'add') {
        const participant = update.participants[0];
        newcomers.push({ jid: participant, timestamp: new Date().getTime() }); // Agregamos el nuevo miembro con la marca de tiempo
    }
});

handler.help = ['bienvenidos/nuevos'];
handler.tags = ['grupo'];
handler.command = ['bienvenidos', 'nuevos'];
handler.group = true;

export default handler;
