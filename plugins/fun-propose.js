import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who = m.mentionedJid[0] || m.quoted?.sender;
  if (!who) throw 'Etiqueta o menciona a alguien';

  let name2 = conn.getName(m.sender);
  let name = conn.getName(who);

  if (global.db.data.users[m.sender].casado || global.db.data.users[who].casado) {
    throw 'Uno de ustedes ya está casado.';
  }

  // Verifica si ya hay una propuesta pendiente
  if (global.db.data.users[who].proposedBy) {
    throw `${name} ya tiene una propuesta pendiente.`;
  }

  let message = `${name2} ha propuesto matrimonio a ${name}. ¿Aceptas? Responde con "sí" o "no".`;
  conn.sendMessage(m.chat, { text: message, mentions: [who] }, { quoted: m });

  // Guardar el estado de la propuesta
  global.db.data.users[who].proposedBy = m.sender;
};

handler.help = ['proponer @tag'];
handler.tags = ['fun'];
handler.command = ['proponer', 'propose'];
handler.group = true;

export default handler;