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
    m.react('🤣');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *se esta riendo de* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *se esta riendo de* \`${name || who}\` *(≧▽≦).*`;
    } else {
        str = `\`${name2}\` *se ríe (≧▽≦).*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/5fa4fd7f4306aa7b2e17a.mp4'; 
        let pp2 = 'https://telegra.ph/file/b299115a77fadb7594ca0.mp4'; 
        let pp3 = 'https://telegra.ph/file/9938a8c2e54317d6b8250.mp4';
        let pp4 = 'https://telegra.ph/file/e6c7b3f7d482ae42db9a7.mp4';
        let pp5 = 'https://telegra.ph/file/a61b52737df7459580129.mp4';
        let pp6 = 'https://telegra.ph/file/f34e1d5c8f17bd2739a51.mp4';
        let pp7 = 'https://telegra.ph/file/c345ed1ca18a53655f857.mp4';
        let pp8 = 'https://telegra.ph/file/4eec929f54bc4d83293a3.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['laugh/reirse @tag'];
handler.tags = ['anime'];
handler.command = ['laugh', 'reirse'];
handler.group = true;

export default handler;