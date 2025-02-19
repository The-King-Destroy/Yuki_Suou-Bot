let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply(`${emoji} Por favor, proporciona los nuevos emojis para el bot, separados por "/".\n> Ejemplo: #setemoji 🍬/🍭/🍫/🍩/🍪`);

  const welcomes = text.split('/').map(msg => msg.trim()).slice(0, 5); 
  global.emoji = emojis[0];
  global.emoji2 = emojis[1];
  global.emoji3 = emojis[2];
  global.emoji4 = emojis[3];
  global.emoji5 = emojis[4];

  m.reply(`✎ Los emojis del bot han sido cambiadas a:\n1. ${emoji}\n2. ${emoji2}\n3. ${emoji3}\n4. ${emoji4}\n5. ${emoji5}`);
};

handler.help = ['setwelcome'];
handler.tags = ['tools'];
handler.command = ['setwelcome'];
handler.rowner = true;

export default handler;
