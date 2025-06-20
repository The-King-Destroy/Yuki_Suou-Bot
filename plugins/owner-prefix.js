async function handler(m, { conn, text, usedPrefix, command }) {
  if (!text) throw `❌ Escribe un prefijo.\n> *Ejemplo:* ${usedPrefix + command} !`;

  if (text.length !== 1) throw `❌ El prefijo debe ser un solo carácter.`;

  // Escapar cualquier carácter especial para el RegExp
  const escapedPrefix = text.replace(/[|\\{}()[\]^$+*?.\-]/g, '\\$&');

  try {
    global.prefix = new RegExp('^' + escapedPrefix);
  } catch (e) {
    throw '❌ Prefijo inválido.';
  }

  await conn.sendMessage(m.chat, {
    text: `✅ Prefijo actualizado a: *${text}*`,
    mentions: [m.sender]
  }, { quoted: m });
}

handler.help = ['prefix [nuevo prefijo]'];
handler.tags = ['owner'];
handler.command = ['prefix'];
handler.rowner = true;

export default handler;