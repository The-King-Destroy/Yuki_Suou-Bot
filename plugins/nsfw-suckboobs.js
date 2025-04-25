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
        str = `\`${name2}\` *le chupó las tetas a* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *le está chupando las tetas a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está chupando tetas! >.<*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/01143878beb3d0430c33e.mp4'; 
        let pp2 = 'https://telegra.ph/file/7b181cbaa54eee6c048fc.mp4'; 
        let pp3 = 'https://telegra.ph/file/f8cf75586670483fadc1d.mp4';
        let pp4 = 'https://telegra.ph/file/f8969e557ad07e7e53f1a.mp4';
        let pp5 = 'https://telegra.ph/file/1104aa065e51d29a5fb4f.mp4';
        let pp6 = 'https://telegra.ph/file/9e1240c29f3a6a9867aaa.mp4';
        let pp7 = 'https://telegra.ph/file/949dff632250307033b2e.mp4';
        let pp8 = 'https://telegra.ph/file/b178b294a963d562bb449.mp4';
        let pp9 = 'https://telegra.ph/file/95efbd8837aa18f3e2bde.mp4';
        let pp10 = 'https://telegra.ph/file/9827c7270c9ceddb8d074.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['suckboobs/chupartetas @tag'];
handler.tags = ['nsfw'];
handler.command = ['suckboobs','chupartetas'];
handler.group = true;

export default handler;
