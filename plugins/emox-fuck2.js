//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    if (!who) throw 'Etiqueta o menciona a alguien';

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
   // m.react('⏳');
    await conn.sendMessage(m.chat, { react: { text: '🥵', key: m.key } })
    let str = `${name2} Cojio Ricamente a ${name}`.trim();
    if (m.isGroup){
    
    let pp = 'https://qu.ax/PlPj.mp4'
    let pp2 = 'https://qu.ax/nfhKg.mp4'
    let pp3 = 'https://qu.ax/iQHXq.mp4'
    let pp4 = 'https://qu.ax/wVHWY.mp4'
    let pp5 = 'https://qu.ax/bhUEf.mp4'
    let pp6 = 'https://qu.ax/nRgKj.mp4'
    let pp7 = 'https://qu.ax/ADrNd.mp4'
    let pp8 = 'https://qu.ax/qDZdo.mp4'
    let pp9 = 'https://qu.ax/DEE.mp4'
    let pp10 = 'https://qu.ax/Dtwk.mp4'
    let pp11 = 'https://qu.ax/AvVl.mp4'
    let pp12 = 'https://qu.ax/BbNEM.mp4'
    let pp13 = 'https://qu.ax/UUCPt.mp4'
    let pp14 = 'https://qu.ax/UdtlE.mp4'
    let pp15 = 'https://qu.ax/TAYRA.mp4'
   
    const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
  //  m.react('🔥');
}

handler.help = ['fuck2/coger2 @tag'];
handler.tags = ['emox'];
handler.command = ['fuck2','coger2']
handler.group = true;

export default handler;