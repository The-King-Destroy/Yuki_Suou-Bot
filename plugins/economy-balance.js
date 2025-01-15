const handler = async (m, {usedPrefix}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  const name = conn.getName(who);
  m.reply(`╭━〔  ${packname}  〕⬣
┋👤 *Usuario:* ${name}
┋💸 *${moneda}*: ${global.db.data.users[who].coin}
┋✨ *Experiencia:* ${global.db.data.users[who].exp}
╰━━━━━━━━━━━━⬣

╭━〔  ${packname}  〕⬣
┃ _Puedes Comprar Mas 🪙_
┃ _Usando Los Siguentes Comandos_
┃ *${usedPrefix}buy <cantidad>*
┃ *${usedPrefix}buyall*
╰━━━━━━━━━━━━⬣`)
};
handler.help = ['bal'];
handler.tags = ['economy'];
handler.command = ['bal', 'diamantes', 'diamond', 'balance'];
export default handler;