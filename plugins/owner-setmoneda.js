let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply(`${emoji} Por favor, proporciona un nombre para el bot.\n> Ejemplo: #setmoneda Coins`);

  global.moneda = text.trim();
  
  m.reply(`${emoji} La moneda del bot ha sido cambiado a: ${global.moneda}`);
};

handler.help = ['setmoneda'];
handler.tags = ['tools'];
handler.command = ['setmoneda'];
handler.rowner = true;

export default handler;