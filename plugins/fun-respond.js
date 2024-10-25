import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let name2 = conn.getName(m.sender);
  let proposedTo = global.db.data.users[m.sender].proposedTo;

  if (!proposedTo) throw 'No tienes una propuesta de matrimonio pendiente.';

  if (m.text.toLowerCase() === 'sí') {
    let name = conn.getName(proposedTo);
    let str = `${name2} ha aceptado la proposición de matrimonio de ${name}! Felicidades!`;
    let img = getRandomImage(['https://qu.ax/OpVX.mp4', 'https://qu.ax/yUBa.mp4', 'https://qu.ax/ChmG.mp4']);
    
    conn.sendMessage(m.chat, { video: { url: img }, gifPlayback: true, caption: str, mentions: [m.sender] }, { quoted: m });

    // Actualiza estado casado
    global.db.data.users[m.sender].casado = true;
    global.db.data.users[proposedTo].casado = true;
    global.db.data.users[m.sender].pareja = proposedTo;
    global.db.data.users[proposedTo].pareja = m.sender;

  } else if (m.text.toLowerCase() === 'no') {
    let name = conn.getName(proposedTo);
    let str = `${name2} ha rechazado la proposición de matrimonio de ${name}.`;
    conn.sendMessage(m.chat, { text: str, mentions: [proposedTo] }, { quoted: m });
  } else {
    throw 'Por favor, responde con "sí" o "no".';
  }

  // Limpiar estado de propuesta
  delete global.db.data.users[m.sender].proposedTo;
};

function getRandomImage(imgs) {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

handler.help = ['responder "sí" o "no"'];
handler.tags = ['fun'];
handler.command = ['responder', 'respond'];
handler.group = true;

export default handler;