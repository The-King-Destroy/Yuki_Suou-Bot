import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let proposer = global.db.data.users[m.sender].proposedBy;
  if (!proposer) throw 'No tienes una propuesta de matrimonio pendiente.';

  let response = m.text.toLowerCase().trim();

  if (response === 'sí') {
    await acceptProposal(m, proposer, conn);
  } else if (response === 'no') {
    await rejectProposal(m, proposer, conn);
  } else {
    throw 'Por favor, responde con "sí" o "no".';
  }

  // Limpiar el estado de propuesta
  delete global.db.data.users[m.sender].proposedBy;
  delete global.db.data.users[proposer].proposedBy; // Limpia el estado del proponente
};

async function acceptProposal(m, proposer, conn) {
  let accepterName = conn.getName(m.sender);
  let proposerName = conn.getName(proposer);
  let message = `${accepterName} ha aceptado la proposición de matrimonio de ${proposerName}! ¡Felicidades!`;

  // Actualiza el estado de casados
  global.db.data.users[m.sender].casado = true;
  global.db.data.users[proposer].casado = true;
  global.db.data.users[m.sender].pareja = proposer;
  global.db.data.users[proposer].pareja = m.sender;

  conn.sendMessage(m.chat, { text: message }, { quoted: m });
}

async function rejectProposal(m, proposer, conn) {
  let accepterName = conn.getName(m.sender);
  let proposerName = conn.getName(proposer);
  let message = `${accepterName} ha rechazado la proposición de matrimonio de ${proposerName}.`;

  conn.sendMessage(m.chat, { text: message }, { quoted: m });
}

handler.help = ['responder "sí" o "no"'];
handler.tags = ['fun'];
handler.command = ['responder', 'respond'];
handler.group = true;

export default handler;