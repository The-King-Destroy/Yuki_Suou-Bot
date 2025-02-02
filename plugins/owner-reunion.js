let handler = async (m, { conn, command, text }) => {
  if (!text) return m.reply(`🍬 Por favor, ingresa el motivo de la reunión.`);
  if (text.length < 11) return m.reply(`🍭 Por favor, ingresa al menos 11 caracteres.`);

  let texto = `🍨 El Owner @${m.sender.split`@`[0]} ha comenzado una reunión. \n*➪ Motivo: ${text}*`;

  m.reply('🍭 Enviando mensaje de reunión a todos los owners y mods.');

  const sendMessageToGlobal = async (group) => {
    for (let [jid] of global[group]) {
      let data = (await conn.onWhatsApp(jid))[0] || {};
      if (data.exists) {
        conn.sendMessage(data.jid, texto, { quoted: m });
      }
    }
  };

  await sendMessageToGlobal('owner');
  await sendMessageToGlobal('mods');
};

handler.tags = ['owner'];
handler.command = handler.help = ['reunion', 'reunionstaff'];
handler.rowner = true;

export default handler;
