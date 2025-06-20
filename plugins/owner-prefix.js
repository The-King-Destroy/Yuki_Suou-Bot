let handler = async function (m, { conn, text, usedPrefix, command }) {
  if (!text) throw `❌ No se encontró ningún prefijo. Por favor escribe un prefijo.\n> *Ejemplo: ${usedPrefix + command} !*`;

  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

  await conn.sendMessage(m.chat, {
    text: `✅ Prefijo actualizado a: *${text}*`,
    mentions: [m.sender]
  }, { quoted: m });
};

handler.help = ['prefix [nuevo prefijo]'];
handler.tags = ['owner'];
handler.command = ['prefix'];
handler.rowner = true;

export default handler;