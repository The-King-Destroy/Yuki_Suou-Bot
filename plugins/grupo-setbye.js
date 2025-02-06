let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply(`${emoji} Por favor, proporciona un mensaje de despedida para el bot.\n> Ejemplo: #setbye adios user`);

  global.welcom2 = text.trim();
  
  m.reply(`${emoji} La despedida del bot ha sido cambiado a: ${global.welcom2}`);
};

handler.help = ['setdespedida'];
handler.tags = ['tools'];
handler.command = ['setbye'];
handler.owner = false;
handler.admin = true;

export default handler;