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
    m.react('😝');
    let str = `${name2} Le sacó la lengua a ${name}`.trim();
    if (m.isGroup){
    
    let pp = 'https://files.catbox.moe/fox9sl.mp4' 
    let pp2 = 'https://files.catbox.moe/lh4c2n.mp4' 
    let pp3 = 'https://files.catbox.moe/tnsdlr.mp4'
    let pp4 = 'https://files.catbox.moe/qhcqag.mp4'
    let pp5 = 'https://files.catbox.moe/y2zg7b.mp4'
    const videos = [pp, pp2, pp3, pp4, pp5];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
}

handler.help = ['bleh @tag'];
handler.tags = ['fun'];
handler.command = ['bleh'];
handler.group = true;

export default handler;
