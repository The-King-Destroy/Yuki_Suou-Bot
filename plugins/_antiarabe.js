
export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;

  // Lista de prefijos prohibidos
  let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"];
  
  // Verificar si el mensaje contiene uno de los prefijos prohibidos
  const senderPrefix = m.sender.split('@')[0];
  const hasForbiddenPrefix = forbidPrefixes.some(prefix => senderPrefix.startsWith(prefix));

  if (hasForbiddenPrefix) {
    await m.reply(`> "🥵 puta @${m.sender.split`@`[0]}, Lo Siento No Esta 🌹Permitido Escribirme Al Privado 🌷Por Lo Cual Seras Bloqueado/A\n\n> *🍒Puedes Unirte Al Grupo Oficial De La Bot🪷* 👇\n\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
    return !1;
  }

  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiarabe && !isOwner && !isROwner) {
    await m.reply(`> "🥵 puta @${m.sender.split`@`[0]}, Lo Siento No Esta 🌹Permitido Escribirme Al Privado 🌷Por Lo Cual Seras Bloqueado/A\n\n> *🍒Puedes Unirte Al Grupo Oficial De La Bot🪷* 👇\n\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
