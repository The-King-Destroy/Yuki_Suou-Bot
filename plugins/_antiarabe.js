export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;

  let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "91", "254", "213"];
  
  const senderNumber = m.sender.split('@')[0];
  const hasForbiddenPrefix = forbidPrefixes.some(prefix => senderNumber.startsWith(prefix));

  if (hasForbiddenPrefix) {
    await m.reply(`> "🥵 puta @${senderNumber}, Lo Siento No Esta 🌹Permitido Escribirme Al Privado 🌷Por Lo Cual Seras Bloqueado/A\n\n> *🍒Puedes Unirte Al Grupo Oficial De La Bot🪷* 👇\n\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
    return !1;
  }

  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiarabe && !isOwner && !isROwner) {
    return !1;
  }
  
  return !0; // Permitir otros números
}
