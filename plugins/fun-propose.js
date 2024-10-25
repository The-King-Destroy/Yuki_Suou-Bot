import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who = m.mentionedJid[0] || m.quoted?.sender;
  if (!who) throw 'Etiqueta o menciona a alguien';

  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);

  if (global.db.data.users[m.sender].casado || global.db.data.users[who].casado) {
    throw 'Uno de ustedes ya está casado.';
  }

  let str = `${name2} ha propuesto matrimonio a ${name}. ¿Aceptas? Responde con "sí" o "no".`;
  conn.sendMessage(m.chat, { text: str, mentions: [who] }, { quoted: m });

  // Guardar estado de propuesta
  global.db.data.users[m.sender].proposedTo = who;
};

handler.help = ['proponer @tag'];
handler.tags = ['fun'];
handler.command = ['proponer', 'propose'];
handler.group = true;

export default handler;