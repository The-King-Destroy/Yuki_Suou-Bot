const handler = async (m, {conn, text, command, usedPrefix}) => {
  const pp = './src/logo6.png';
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const warntext = `🍬 Etiqueta a un usuario para quitarle las advertencias.\n🍭 Ejemplo: *${usedPrefix + command} @${global.suittag}*`;
  if (!who) throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warn == 0) throw '🍭 El usuario tiene 0 advertencias.';
  user.warn -= 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`} Se le quito una advertencia.\n*ADVERTENCIAS ${user.warn}/3*`, null, {mentions: [who]});
};
handler.command = ['delwarn', 'unwarn']
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
