import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup) who = m.quoted ? m.quoted.sender : false;
    else who = m.chat;

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    m.react('😛');
    let str = `${name} le esta lamiendo el coño a`.trim();
    
    let pp = 'https://qu.ax/Kejmn.mp4' 
    let pp2 = 'https://qu.ax/PSBkz.mp4' 
    let pp3 = 'https://qu.ax/gaZHP.mp4'
    let pp4 = 'https://qu.ax/OvlTU.mp4'
    let pp5 = 'https://qu.ax/LPcsZ.mp4'
    let pp6 = 'https://qu.ax/Smfz.mp4'
    let pp7 = 'https://qu.ax/EDZBg.mp4'
    let pp8 = 'https://qu.ax/SFFq.mp4'
    const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption:str, mentions: [m.sender] },{ quoted: estilo })
    };
   
}

handler.help = ['fap'];
handler.tags = ['fun'];
handler.command = ['fap'];
handler.group = true;

export default handler;
