const handler = async (m, {conn}) => {
  const audioUrl = 'https://files.catbox.moe/ozmhxx.m4a'; // URL del audio
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  // Si el mensaje es una respuesta, obtener el remitente del mensaje citado
  const mentionedUser = m.quoted && m.quoted.sender ? m.quoted.sender : null;

  await conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/gay', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'error.png', '🏳️‍🌈 𝑴𝒊𝒓𝒆𝒏 𝒂 𝒆𝒔𝒕𝒆 𝑮𝒂𝒚 🏳️‍🌈', m);

  const mentionOptions = {
    audio: {url: audioUrl},
    fileName: `error.mp3`,
    mimetype: 'audio/mpeg',
    ptt: true,
  };

  // Si hay un usuario mencionado al que se está respondiendo, incluir su mención y su imagen de perfil
  if (mentionedUser) {
    const avatar = await conn.profilePictureUrl(mentionedUser, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    mentionOptions.mentions = [mentionedUser]; // Menciona al usuario del mensaje citado
    mentionOptions.caption = `🏳️‍🌈 @${mentionedUser.split('@')[0]} 𝑴𝒊𝒓𝒆𝒏 𝒂 𝒆𝒔𝒕𝒆 𝑮𝒂𝒚 🏳️‍🌈`; // Mensaje con mención
    mentionOptions.image = avatar; // Agrega su imagen de perfil
  }

  await conn.sendMessage(m.chat, mentionOptions, {quoted: m});
};

handler.help = ['marica'];
handler.tags = ['fun'];
handler.command = /^(marica)$/i;
export default handler;