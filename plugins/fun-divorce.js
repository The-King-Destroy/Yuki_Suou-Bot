import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who = m.mentionedJid[0] || m.quoted?.sender;
  if (!who) throw 'Etiqueta o menciona a alguien';

  if (global.db.data.users[m.sender].pareja !== who || global.db.data.users[who].pareja !== m.sender) {
    throw 'No están casados.';
  }

  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);
  let str = `${name2} y ${name} se han divorciado.`;
  let img = getRandomImage(['https://qu.ax/ChmG.mp4', 'https://qu.ax/yUBa.mp4', 'https://qu.ax/OpVX.mp4']);
  
  conn.sendMessage(m.chat, { video: { url: img }, gifPlayback: true, caption: str, mentions: [m.sender] }, { quoted: m });

  // Actualiza estado casado
  global.db.data.users[m.sender].casado = false;
  global.db.data.users[who].casado = false;
  global.db.data.users[m.sender].pareja = null;
  global.db.data.users[who].pareja = null;
};

function getRandomImage(imgs) {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

handler.help = ['divorciarse @tag'];
handler.tags = ['fun'];
handler.command = ['divorciarse', 'divorce'];
handler.group = true;

export default handler;