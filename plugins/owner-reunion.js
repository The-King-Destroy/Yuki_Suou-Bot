let handler = async (m, { conn, command, text }) => {
  if (!text) return m.reply(`🍬 Por favor, ingresa el motivo de la reunión.`);
  if (text.length < 11) return m.reply(`🍭 Por favor, ingresa al menos 11 caracteres.`);

  let texto = `🍨 El Owner @${m.sender.split`@`[0]} ha empezado una reunión. \n*➪ Motivo: ${text}*`;

  for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (data.exists) {
      conn.sendMessage(data.jid, texto, { quoted: m });
    }
  }
};

handler.tags = ['owner'];
handler.command = handler.help = ['reunion', 'reunionstaff'];
handler.rowner = true;

export default handler;
