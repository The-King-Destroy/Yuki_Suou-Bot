/* 
- Setemoji By Angel-OFC 
- edita el tagall con tu emoji favorito 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
let handler = async (m, { conn, text, isRowner }) => {

  if (!text) {
    return m.reply(`${emoji} Debes proporcionar un emoji válido después del comando. Ejemplo: .setemoji ${emoji2}`);
  }

  const emoji = text.trim();

  if (!isEmoji(emoji)) {
    return m.reply(`${emoji} El texto proporcionado no es un emoji válido. Asegúrate de que sea un emoji real.`);
  }

  try {
    global.db.data.chats[m.chat].customEmoji = emoji;

    m.reply(`${emoji2} El emoji del grupo ha sido actualizado correctamente a: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply(`${msm} Hubo un error al intentar cambiar el emoji.`);
  }
};

const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2;
};

handler.help = ['setemoji *<emoji>*'];
handler.tags = ['group'];
handler.command = ['setemoji', 'setemo'];
handler.admin = true;
handler.group = true;

export default handler;