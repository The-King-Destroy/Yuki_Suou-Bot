const {downloadContentFromMessage} = (await import('@whiskeysockets/baileys'));

const handler = async (m, {conn}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language

  if (!m.quoted) { conn.reply(m.chat, '🍬 Responde a una imagen ViewOnce.', m, rcanal);
return;
}
  if (m.quoted.mtype !== 'viewOnceMessageV2') { conn.reply(m.chat, '🍭 El mensaje citado no es una imagen ViewOnce.', m, rcanal)
return;
}
  const msg = m.quoted.message;
  const type = Object.keys(msg)[0];
  const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  if (/video/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'error.mp4', msg[type].caption || '', m);
  } else if (/image/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'error.jpg', msg[type].caption || '', m);
  }
};
handler.help = ['readvo'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'revelar', 'readvo'];
handler.register = true;

export default handler;
