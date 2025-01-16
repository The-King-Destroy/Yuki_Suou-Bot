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
    m.react('🍺');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *esta bebiendo con* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *se emborrachó junto com* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *esta muy ebrio.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/VPXAF.mp4'; 
        let pp2 = 'https://qu.ax/JJwdG.mp4'; 
        let pp3 = 'https://qu.ax/BHgcX.mp4';
        let pp4 = 'https://qu.ax/SmJNk.mp4';
        let pp5 = 'https://qu.ax/bLUOB.mp4';
        let pp6 = 'https://qu.ax/mDURZ.mp4';
        let pp7 = 'https://qu.ax/KTFrC.mp4';
        let pp8 = 'https://qu.ax/blVqp.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['drunk/borracho @tag'];
handler.tags = ['anime'];
handler.command = ['drunk', 'borracho'];
handler.group = true;

export default handler;