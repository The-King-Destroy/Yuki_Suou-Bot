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
    await conn.sendMessage(m.chat, { react: { text: '😏', key: m.key } })
    let str = `${name2} esta seduciendo a ${name}`.trim();
    if (m.isGroup){
    
    // Directorio que contiene las imágenes
let pp = 'https://qu.ax/lcXFM.mp4'
let pp2 = 'https://qu.ax/jjo.mp4'
let pp3 = 'https://qu.ax/GLhdl.mp4'
let pp4 = 'https://qu.ax/cmYSY.mp4'
let pp5 = 'https://qu.ax/fYPjB.mp4'
let pp6 = 'https://qu.ax/QyVWf.mp4'
let pp7 = 'https://qu.ax/HzEnD.mp4'
let pp8 = 'https://qu.ax/bFbTk.mp4'

    const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
   // m.react('😏');
}

handler.help = ['seduce/seducir @tag'];
handler.tags = ['emox'];
handler.command = ['seduce','seducir'];
handler.register = true;
handler.group = true;

export default handler;