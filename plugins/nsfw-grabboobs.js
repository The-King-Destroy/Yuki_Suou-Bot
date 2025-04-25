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
        str = `\`${name2}\` *le está agarrando las tetas a* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *esta agarrando las tetas de* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está agarrando unas ricas tetas >.<*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/e6bf14b93dfe22c4972d0.mp4'; 
        let pp2 = 'https://telegra.ph/file/075db3ebba7126d2f0d95.mp4'; 
        let pp3 = 'https://telegra.ph/file/37c21753892b5d843b9ce.mp4';
        let pp4 = 'https://telegra.ph/file/04bbf490e29158f03e348.mp4';
        let pp5 = 'https://telegra.ph/file/82d32821f3b57b62359f2.mp4';
        let pp6 = 'https://telegra.ph/file/36149496affe5d02c8965.mp4';
        let pp7 = 'https://telegra.ph/file/61d85d10baf2e3b9a4cde.mp4';
        let pp8 = 'https://telegra.ph/file/538c95e4f1c481bcc3cce.mp4';
        let pp9 = 'https://telegra.ph/file/e999ef6e67a1a75a515d6.mp4';
        let pp10 = 'https://telegra.ph/file/05c1bd3a2ec54428ac2fc.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['grabboobs/agarrartetas @tag'];
handler.tags = ['nsfw'];
handler.command = ['grabboobs','agarrartetas'];
handler.group = true;

export default handler;
