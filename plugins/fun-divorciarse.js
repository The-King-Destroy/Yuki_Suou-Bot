import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who;
  who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  if (!who) throw 'Etiqueta o menciona a alguien';

  let user = global.db.data.users[who];
  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);
  

  if (global.db.data.users[m.sender].pareja !== who || global.db.data.users[who].pareja !== m.sender) {
    throw 'No estás casado con esta persona';
  }

  let str = `${name2} y ${name} se han divorciado.`.trim();

  let imgs = [
    'https://qu.ax/ChmG.mp4', 
    'https://qu.ax/yUBa.mp4', 
    'https://qu.ax/OpVX.mp4'
  ];
  let img = imgs[Math.floor(Math.random() * imgs.length)];
  conn.sendMessage(m.chat, { 
    video: { url: img }, 
    gifPlayback: true, 
    caption: str, 
    mentions: [m.sender] 
  }, { quoted: m });

  // Actualiza estado casado
  global.db.data.users[m.sender].casado = false;
  global.db.data.users[who].casado = false;
  global.db.data.users[m.sender].pareja = null;
  global.db.data.users[who].pareja = null;
};

handler.help = ['divorciarse @tag'];
handler.tags = ['fun'];
handler.command = ['divorciarse', 'divorce'];
handler.group = true;

export default handler;