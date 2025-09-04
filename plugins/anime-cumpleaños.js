//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
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
        str = `\`${name2}\` *le desea un feliz cumpleaños a* \`${name || who}\`.`; 
    } else if (m.quoted) {
        str = `\`${name2}\` *le desea un feliz cumpleaños a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *se desea un feliz a si mismo.*`.trim();
    }

    if (m.isGroup) { 
        let pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1756961382237.mp4';
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1756961403247.mp4';
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1756961414343.mp4';
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1756961433828.mp4';  
        const videos = [pp, pp2, pp3, pp4];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['cumpleaños @tag'];
handler.tags = ['anime'];
handler.command = ['cumpleaños'];
handler.group = true;

export default handler;