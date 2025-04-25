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
        str = `\`${name2}\` *está enamorad﹫ de* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está enamorad﹫ de* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está enamorad﹫.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/5fbd60c40ab190ecc8e1c.mp4'; 
        let pp2 = 'https://telegra.ph/file/ca30d358d292674698b40.mp4'; 
        let pp3 = 'https://telegra.ph/file/25f88386dd7d4d6df36fa.mp4';
        let pp4 = 'https://telegra.ph/file/eb63131df0de6b47c7ab7.mp4';
        let pp5 = 'https://telegra.ph/file/209990ee46c645506a5fc.mp4';
        let pp6 = 'https://telegra.ph/file/440f276fcbb2d04cbf1d1.mp4';
        let pp7 = 'https://telegra.ph/file/42cea67d9b013ed9a9cd0.mp4';
        let pp8 = 'https://telegra.ph/file/bc0f47b8f3fb9470bc918.mp4';
        let pp9 = 'https://telegra.ph/file/79ae875090b64ab247b7a.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['love2/enamorada @tag'];
handler.tags = ['anime'];
handler.command = ['love','amor','enamorada'];
handler.group = true;

export default handler;