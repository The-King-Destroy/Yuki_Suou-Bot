import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let proposedBy = global.db.data.users[m.sender].proposedBy;

  if (!proposedBy) throw 'No tienes una propuesta de matrimonio pendiente.';

  let response = m.text.toLowerCase().trim();

  if (response === 'sí') {
    let name = conn.getName(proposedBy);
    let name2 = conn.getName(m.sender);
    let str = `${name2} ha aceptado la proposición de matrimonio de ${name}! Felicidades!`;
    let img = getRandomImage(['https://qu.ax/OpVX.mp4', 'https://qu.ax/yUBa.mp4', 'https://qu.ax/ChmG.mp4']);
    
    conn.sendMessage(m.chat, { video: { url: img }, gifPlayback: true, caption: str, mentions: [m.sender] }, { quoted: m });

    // Actualiza estado casado
    global.db.data.users[m.sender].casado = true;
    global.db.data.users[proposedBy].casado = true;
    global.db.data.users[m.sender].pareja = proposedBy;
    global.db.data.users[proposedBy].pareja = m.sender;

  } else if (response === 'no') {
    let name = conn.getName(proposedBy);
    let name2 = conn.getName(m.sender);
    let str = `${name2} ha rechazado la proposición de matrimonio de ${name}.`;
    conn.sendMessage(m.chat, { text: str, mentions: [proposedBy] }, { quoted: m });
  } else {
    throw 'Por favor, responde con "sí" o "no".';
  }

  // Limpiar estado de propuesta
  delete global.db.data.users[m.sender].proposedBy;
  delete global.db.data.users[proposedBy].proposedBy; // Limpia el estado del proponente
};

function getRandomImage(imgs) {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

handler.help = ['responder "sí" o "no"'];
handler.tags = ['fun'];
handler.command = ['responder', 'respond'];
handler.group = true;

export default handler;