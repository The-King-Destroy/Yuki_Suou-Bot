async function handler(m, { conn, text, usedPrefix, command }) {
  if (!text) throw `❌ No se encontró ningún prefijo. Por favor escribe un prefijo.\n> *Ejemplo: ${usedPrefix + command} !*`;

  global.prefix = new RegExp('^[' + text.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

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