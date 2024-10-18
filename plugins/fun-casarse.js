import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  if (!who) throw 'Por favor, etiqueta o menciona a alguien para casarte.';

  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);

  if (global.db.data.users[m.sender].casado || global.db.data.users[who].casado) {
    throw 'Uno de ustedes ya está casado.';
  }

  let str = `${name2} se ha casado con ${name}! ¡Felicidades! 🎉`;
  
  // Array de videos para elegir aleatoriamente
  let imgs = [
    'https://qu.ax/OpVX.mp4', 
    'https://qu.ax/ChmG.mp4', 
    'https://qu.ax/yUBa.mp4'
  ];
  let img = imgs[Math.floor(Math.random() * imgs.length)];

  await conn.sendMessage(m.chat, { 
    video: { url: img }, 
    gifPlayback: true, 
    caption: str, 
    mentions: [m.sender, who] 
  }, { quoted: m });

  // Actualiza estado de casado
  global.db.data.users[m.sender].casado = true;
  global.db.data.users[who].casado = true;
  global.db.data.users[m.sender].pareja = who;
  global.db.data.users[who].pareja = m.sender;
};

handler.help = ['casarse @tag'];
handler.tags = ['fun'];
handler.command = ['casarse', 'marry'];
handler.group = true;

export default handler; 
