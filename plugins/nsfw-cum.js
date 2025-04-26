//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`《✦》El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw on*`);
    }

    let who;
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *se vino dentro de* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *se vino dentro de* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *se vino dentro de...  Omitiremos eso*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/9243544e7ab350ce747d7.mp4'; 
        let pp2 = 'https://telegra.ph/file/fadc180ae9c212e2bd3e1.mp4'; 
        let pp3 = 'https://telegra.ph/file/79a5a0042dd8c44754942.mp4';
        let pp4 = 'https://telegra.ph/file/035e84b8767a9f1ac070b.mp4';
        let pp5 = 'https://telegra.ph/file/0103144b636efcbdc069b.mp4';
        let pp6 = 'https://telegra.ph/file/4d97457142dff96a3f382.mp4';
        let pp7 = 'https://telegra.ph/file/b1b4c9f48eaae4a79ae0e.mp4';
        let pp8 = 'https://telegra.ph/file/5094ac53709aa11683a54.mp4';
        let pp9 = 'https://telegra.ph/file/5094ac53709aa11683a54.mp4';
        let pp10 = 'https://telegra.ph/file/dc279553e1ccfec6783f3.mp4';
        let pp11 = 'https://telegra.ph/file/acdb5c2703ee8390aaf33.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions }, { quoted: m });
    }
}

handler.help = ['cum/leche @tag'];
handler.tags = ['nsfw'];
handler.command = ['cum','leche'];
handler.group = true;

export default handler;
