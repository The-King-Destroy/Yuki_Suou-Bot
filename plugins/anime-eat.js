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
    m.react('😋');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *está comiendo con* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está comiendo con* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *come algo delicioso*.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/a67a4g.mp4'; 
        let pp2 = 'https://files.catbox.moe/rzms6b.mp4'; 
        let pp3 = 'https://files.catbox.moe/j6akt5.mp4';
        let pp4 = 'https://files.catbox.moe/oew6da.mp4';
        let pp5 = 'https://files.catbox.moe/mappcr.mp4';
        let pp6 = 'https://files.catbox.moe/v6b8cq.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['eat/comer @tag'];
handler.tags = ['emox'];
handler.command = ['eat','comer'];
handler.group = true;

export default handler;