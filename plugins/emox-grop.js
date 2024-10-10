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
    let str = `${name2} está manoseando a ${name}`.trim();
    if (m.isGroup){
    
    let pp = 'https://qu.ax/BRmBk.mp4' 
    let pp2 = 'https://qu.ax/CDrZm.mp4' 
    let pp3 = 'https://qu.ax/OydCh.mp4'
    let pp4 = 'https://qu.ax/DolnW.mp4'
    let pp5 = 'https://qu.ax/RdBAy.mp4'
    let pp6 = 'https://qu.ax/AFzqg.mp4'
    const videos = [pp, pp2, pp3, pp4, pp5, pp6];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
}

handler.help = ['grop/manosear @tag'];
handler.tags = ['emox'];
handler.command = ['grop', 'manosear'];
handler.group = true;

export default handler;
