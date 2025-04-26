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
        str = `\`${name2}\` *se pajea pensando en* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *esta pajeando a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *se pajea pensando en tía turbina.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/TFGZu.mp4'; 
        let pp2 = 'https://qu.ax/DFYTU.mp4'; 
        let pp3 = 'https://qu.ax/ugAfu.mp4';
        let pp4 = 'https://qu.ax/pbpcw.mp4';
        let pp5 = 'https://qu.ax/UrzOi.mp4';
        let pp6 = 'https://qu.ax/KaQp.mp4';
        let pp7 = 'https://qu.ax/fsWkl.mp4';
        let pp8 = 'https://qu.ax/nZMnv.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['fap/paja @tag'];
handler.tags = ['nsfw'];
handler.command = ['fap', 'paja'];
handler.group = true;

export default handler;
