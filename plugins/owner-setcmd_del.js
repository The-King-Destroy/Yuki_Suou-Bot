const handler = async (m, {conn, usedPrefix, text, command}) => {
  let hash = text;
  if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');
  if (!hash) throw `${emoji} Solo se pueden asignar textos o comandos a stickers o imagenes, para obtener el codigo asignado use el comando: ${usedPrefix}listcmd`;
  const sticker = global.db.data.sticker;
  if (sticker[hash] && sticker[hash].locked) throw `${emoji} Solo el *owner* puede realizar la eliminacion.`;
  delete sticker[hash];
  m.reply(`${emoji} El texto/comando asignado al sticker/imagen fue eliminado de la base de datos correctamente.`);
};
handler.command = ['delcmd'];
handler.rowner = true;

export default handler;