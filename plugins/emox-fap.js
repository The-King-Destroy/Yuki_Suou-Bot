//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('*[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.*\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('🔥');

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
handler.tags = ['nsfws'];
handler.command = ['fap', 'paja'];
handler.group = true;

export default handler;
