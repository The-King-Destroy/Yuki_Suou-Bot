//Codígo creado por Destroy wa.me/584120346669

let handler = async (m, { conn, text }) => {
  let userId;

  // Verifica si hay un mensaje al que se está respondiendo
  if (m.quoted && m.quoted.sender) {
      userId = m.quoted.sender; // Obtiene el remitente del mensaje citado
  } else if (text) {
      userId = conn.parseMention(text)[0]; // Obtiene el usuario mencionado en el texto
  } else {
      return conn.reply(m.chat, 'Por favor, menciona a alguien o responde a su mensaje.', m); // Mensaje de error
  }

  let pp = './src/avatar_contact.png';
  try {
    pp = await conn.getProfilePicture(userId);
  } catch (e) {
    // Si no se puede obtener la imagen, se mantendrá el valor predeterminado
  } finally {
    let pp = await conn.profilePictureUrl(userId, 'image').catch(_ => './src/avatar_contact.png');
    let username = conn.getName(userId);
    let str = `Est@ es mi novi@, ¿verdad que es precios@? 😍🤤 @${userId.replace(/@.+/, '')}`;
    let mentionedJid = [userId];

    conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid } });
  }
}

handler.help = ['minovia @user'];
handler.tags = ['fun'];
handler.command = /^minovio|minovia$/i;

handler.group = true;

export default handler;