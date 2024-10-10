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
    m.react('💦');
    let str = `${name2} se la metio a ${name}`.trim();
    if (m.isGroup){
    
    let pp = 'https://files.catbox.moe/7ito13.mp4' 
    let pp2 = 'https://files.catbox.moe/6to3zj.mp4' 
    let pp3 = 'https://files.catbox.moe/8j94sh.mp4'
    let pp4 = 'https://files.catbox.moe/ylfpb7.mp4'
    let pp5 = 'https://files.catbox.moe/kccjc7.mp4'
    let pp6 = 'https://files.catbox.moe/lt9e1u.mp4'
    const videos = [pp, pp2, pp3, pp4, pp5, pp6];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
}

handler.help = ['follar @tag'];
handler.tags = ['emox'];
handler.command = ['follar'];
handler.group = true;

export default handler;
