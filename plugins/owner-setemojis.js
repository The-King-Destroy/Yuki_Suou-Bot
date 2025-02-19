let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`🍬 Por favor, proporciona los nuevos emojis para el bot, separados por "/".\n> Ejemplo: #setemoji 🍬/🍭/🍫/🍩/🍪`);

  const emojis = text.split('/').map(msg => msg.trim()).slice(0, 5);
  
  if (emojis.length < 1) {
    return m.reply(`⚠️ Debes proporcionar al menos un emoji. Usa el formato: #setemoji 🍬/🍭/🍫/🍩/🍪`);
  }

  global.emoji = emojis[0] || '';
  global.emoji2 = emojis[1] || '';
  global.emoji3 = emojis[2] || '';
  global.emoji4 = emojis[3] || '';
  global.emoji5 = emojis[4] || '';

  m.reply(`✎ Los emojis del bot han sido cambiados a:\n1. ${global.emoji}\n2. ${global.emoji2}\n3. ${global.emoji3}\n4. ${global.emoji4}\n5. ${global.emoji5}`);
};

handler.help = ['setemojis'];
handler.tags = ['tools'];
handler.command = ['setemojis'];
handler.rowner = true;

export default handler;
