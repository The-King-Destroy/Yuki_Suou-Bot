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
    m.react('😅');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *mordió a* \`${name || who}\`.`; 
    } else if (m.quoted) {
        str = `\`${name2}\` *mordió a* \`${name || who}\`.`; 
    } else {
        str = `\`${name2}\` *se mordió a sí mismo*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/nssx5g.mp4'; 
        let pp2 = 'https://files.catbox.moe/c23bw3.mp4'; 
        let pp3 = 'https://files.catbox.moe/nxr7vx.mp4';
        let pp4 = 'https://files.catbox.moe/j5yobc.mp4';
        let pp5 = 'https://files.catbox.moe/o31g5x.mp4';
        let pp6 = 'https://files.catbox.moe/c43d18.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];
        

        let mentions = [who]; 
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['bite/morder @tag'];
handler.tags = ['anime'];
handler.command = ['bite','morder'];
handler.group = true;

export default handler;