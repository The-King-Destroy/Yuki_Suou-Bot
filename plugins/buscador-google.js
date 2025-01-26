import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply('*Proporciona una consulta de búsqueda*');
    return;
  }

  const apiKey = 'xenzpedo';
  const apiUrl = `https://api.botcahx.eu.org/api/search/google?text1=${encodeURIComponent(text)}&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status && result.message === 'Result Not Found') {
      m.reply('*No se encontraron resultados para tu búsqueda.*');
      return;
    }

    if (!result.status) {
      m.reply(`*Error al realizar la búsqueda:* ${result.message}`);
      return;
    }

    let replyMessage = '*Resultados de búsqueda:*\n\n';
    result.data.slice(0, 1).forEach((item, index) => {
      replyMessage += `${index + 1}. ${item.title}\n`;
      replyMessage += `> *${item.description}*\n\n`;
      replyMessage += `   URL: ${item.url}\n\n`;
    });

    m.react('✅');
    m.reply(replyMessage);
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
    m.reply('Ocurrió un error al obtener los resultados.');
  }
};

handler.help = ['google *<texto>*'];
handler.tags = ['internet'];
handler.command = ['google'];

export default handler;
