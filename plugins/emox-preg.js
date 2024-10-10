//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    if (!who) throw 'Etiqueta o menciona a alguien';

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('😏');
    let str = `${name2} embarazo a ${name}`.trim();
    if (m.isGroup){
    
    let pp = 'https://files.catbox.moe/054z2h.mp4' 
    let pp2 = 'https://files.catbox.moe/3ucfc0.mp4' 
    let pp3 = 'https://files.catbox.moe/brnwzh.mp4'
    const videos = [pp, pp2, pp3];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
}

handler.help = ['preg/embarazar @tag'];
handler.tags = ['emox'];
handler.command = ['preg','embarazar','preñar'];
handler.group = true;

export default handler;
