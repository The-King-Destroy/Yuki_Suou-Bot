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
        str = `\`${name2}\` *le dio una nalgada a* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *Nalgueo a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está repartiendo nalgadas! >.<*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/yjulgu.mp4'; 
        let pp2 = 'https://telegra.ph/file/07fe0023525be2b2579f9.mp4'; 
        let pp3 = 'https://telegra.ph/file/f830f235f844e30d22e8e.mp4';
        let pp4 = 'https://telegra.ph/file/e278ca6dc7d26a2cfda46.mp4';
        let pp5 = 'https://files.catbox.moe/mf3tve.mp4';
        let pp6 = 'https://files.catbox.moe/hobfrw.mp4';
        let pp7 = 'https://files.catbox.moe/rzijb5.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['spank/nalgada @tag'];
handler.tags = ['nsfw'];
handler.command = ['spank', 'nalgada'];
handler.group = true;

export default handler;
