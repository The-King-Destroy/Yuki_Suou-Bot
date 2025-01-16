const handler = async (m, {conn, participants, groupMetadata, args}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/Grupo.jpg';
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const pesan = args.join` `;
  const oi = `» ${pesan}`;
  const text = `『✦』Admins del grupo:  
  
${listAdmin}

🍬 Mensaje: ${oi}

『✦』Este comando solo se puede ejecutar si tienes algún problema o duda con el *Bot*, si lo usas con otras intenciones se te *baneara* o *eliminara* del grupo.`.trim();
  conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['admins <texto>'];
handler.tags = ['grupo'];
// regex detect A word without case sensitive
handler.customPrefix = /a|@/i;
handler.command = /^(admins|@admins|dmins)$/i;
handler.group = true;
export default handler;
