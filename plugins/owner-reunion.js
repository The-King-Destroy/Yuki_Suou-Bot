let handler = async (m, { conn, command, text }) => {
  if (!text) return m.reply(`🍬 Por favor, ingresa el motivo de la reunión.`);
  if (text.length < 11) return m.reply(`🍭 Por favor, ingresa al menos 11 caracteres.`);

  let texto = `🍨 El Owner @${m.sender.split`@`[0]} ha comenzado una reunión. \n*➪ Motivo: ${text}*`;
  const groupLink = 'https://chat.whatsapp.com/JCYO6M60ojS0IPcmUf5VNC';

  const buttons = [
    {
      buttonId: 'accept',
      buttonText: { displayText: 'Aceptar' },
      type: 1
    },
    {
      buttonId: 'reject',
      buttonText: { displayText: 'Rechazar' },
      type: 1
    }
  ];

  const buttonMessage = {
    text: texto,
    footer: 'Por favor, elige una opción:',
    buttons: buttons,
    headerType: 1,
  };

  m.reply('🍭 Enviando mensaje de reunión a todos los owners y mods.');

  const sendMessageToGlobal = async (group) => {
    for (let [jid] of global[group]) {
      let data = (await conn.onWhatsApp(jid))[0] || {};
      if (data.exists) {
        conn.sendMessage(data.jid, buttonMessage, { quoted: m });
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
