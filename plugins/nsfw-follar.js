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
        str = `\`${name2}\` *follo fuertemente a la perra de* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *se la metió durísimo a la perrita de* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está follando ricamente.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/7ito13.mp4'; 
        let pp2 = 'https://files.catbox.moe/6to3zj.mp4'; 
        let pp3 = 'https://files.catbox.moe/8j94sh.mp4';
        let pp4 = 'https://files.catbox.moe/ylfpb7.mp4';
        let pp5 = 'https://files.catbox.moe/kccjc7.mp4';
        let pp6 = 'https://files.catbox.moe/lt9e1u.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['follar @tag'];
handler.tags = ['nsfw'];
handler.command = ['follar'];
handler.group = true;

export default handler;
