import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let target = m.mentionedJid[0] || m.quoted?.sender;
  if (!target) throw 'Por favor, etiqueta o menciona a tu pareja para divorciarte.';

  if (global.db.data.users[m.sender].pareja !== target || global.db.data.users[target].pareja !== m.sender) {
    throw 'No estás casado con esta persona.';
  }

  let userName = conn.getName(m.sender);
  let partnerName = conn.getName(target);
  let message = `${userName} y ${partnerName} se han divorciado.`;

  // Actualiza el estado de casados
  global.db.data.users[m.sender].casado = false;
  global.db.data.users[target].casado = false;
  global.db.data.users[m.sender].pareja = null;
  global.db.data.users[target].pareja = null;

  conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['divorciarse @tag'];
handler.tags = ['fun'];
handler.command = ['divorciarse', 'divorce'];
handler.group = true;

export default handler;