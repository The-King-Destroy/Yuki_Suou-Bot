import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
  const text = args.join(' ');

  if (!text) {
    return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar junto al comando*', m);
  }

  const loadingMessage = await conn.reply(m.chat, '🔍 *Buscando...*', m);

  try {
    // Llamada a la API de Ryzendesu
    const apiResponse = await axios.get(`https://api.ryzendesu.vip/api/search/google?query=${encodeURIComponent(text)}`);
    const results = apiResponse.data;

    if (!results || results.length === 0) {
      return conn.reply(m.chat, '🔍 *No se encontraron resultados.*', m);
    }

    const msg = results.map(({ title, link, description }) => {
      return `*${title}*\n_${link}_\n_${description}_`;
    }).join('\n\n');

    await conn.reply(m.chat, msg, m); // Envía los resultados como texto
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '⚠️ *Ocurrió un error al realizar la búsqueda.*', m);
  } finally {
    conn.reply(m.chat, '✅ *Búsqueda finalizada.*', loadingMessage);
  }
};

handler.help = ['google'].map((v) => v + ' <pencarian>');
handler.tags = ['buscador'];
handler.command = /^google?$/i;

export default handler;
