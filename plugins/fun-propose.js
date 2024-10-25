import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let target = m.mentionedJid[0] || m.quoted?.sender;
  if (!target) throw 'Por favor, etiqueta o menciona a alguien a quien proponer matrimonio.';

  let proposerName = conn.getName(m.sender);
  let targetName = conn.getName(target);

  // Comprobaciones de estado
  if (global.db.data.users[m.sender].casado || global.db.data.users[target].casado) {
    throw 'Uno de ustedes ya está casado, no se puede realizar la propuesta.';
  }

  // Verifica si hay una propuesta pendiente
  if (global.db.data.users[target].proposedBy) {
    throw `${targetName} ya tiene una propuesta pendiente.`;
  }

  let proposalMessage = `${proposerName} ha propuesto matrimonio a ${targetName}. ¿Aceptas? Responde con "sí" o "no".`;
  conn.sendMessage(m.chat, { text: proposalMessage, mentions: [target] }, { quoted: m });

  // Guardar la propuesta
  global.db.data.users[target].proposedBy = m.sender;
};

handler.help = ['proponer @tag'];
handler.tags = ['fun'];
handler.command = ['proponer', 'propose'];
handler.group = true;

export default handler;