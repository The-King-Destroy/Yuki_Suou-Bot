const handler = async (m, {command, usedPrefix, text}) => {
  const which = command.replace(/eliminar/i, '');
  if (!text) throw `*🛑 𝚄𝚂𝙰𝚁 ${usedPrefix}list${which} 𝙿𝙰𝚁𝙰 𝚅𝙴𝚁 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰*`;
  const msgs = global.db.data.msgs;
  if (!text in msgs) throw `*🛑 '${text}' 𝙽𝙾 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾 𝙴𝙽 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴𝚂*`;
  delete msgs[text];
  m.reply(`*🛑 𝙴𝙻𝙸𝙼𝙸𝙽𝙾 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾 𝙴𝙽 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴𝚂 𝙴𝙻 𝙼𝙴𝙽𝚂𝙰𝙹𝙴 𝙲𝙾𝙽 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 '${text}'*`);
};
handler.help = ['vn', 'msg', 'img', 'sticker'].map((v) => 'del' + v + ' <text>');
handler.tags = ['owner'];
handler.command = ['eliminarvn', 'vn', 'msg', 'img', 'sticker'];
handler.rowner = true;
export default handler;