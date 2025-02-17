let handler = async (m, { conn, usedPrefix, command }) => {
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, `《✦》¡Este chat no está registrado!.`, m);
  }

  let chat = global.db.data.chats[m.chat];

  if (command === 'off') {
    if (chat.isBanned) {
      return conn.reply(m.chat, `《✧》*${botname}* ya estaba desactivado.`, m);
    }
    chat.isBanned = true;
    await conn.reply(m.chat, `✐ Has *desactivado* a *${botname}*!`, m);
  } else if (command === 'on') {
    if (!chat.isBanned) {
      return conn.reply(m.chat, `《✧》*${botname}* ya estaba activado.`, m);
    }
    chat.isBanned = false;
    await conn.reply(m.chat, `✐ Has *activado* a *${botname}*!`, m);
  } else {
    const estado = chat.isBanned ? '✗ Desactivado' : '✓ Activado';
    const instrucciones = `
「✦」Un administrador puede activar o desactivar a *${botname}* utilizando:

> ✐ *${usedPrefix}bot on* para activar
> ✐ *${usedPrefix}bot off* para desactivar

✧ Estado actual » *${estado}*
`;
    return conn.reply(m.chat, instrucciones, m);
  }
};

handler.help = ['bot'];
handler.tags = ['grupo'];
handler.command = ['bot'];
handler.admin = true;

export default handler;
