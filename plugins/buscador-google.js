import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
  const query = args.join(' ');

  if (!query) {
    return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar junto al comando*', m);
  }

  await conn.reply(m.chat, '🔍 *Buscando...*', m);

  try {
    const apiResponse = await axios.get(`https://api.ryzendesu.vip/api/search/google?query=venezuela${encodeURIComponent(query)}`);
    
    if (apiResponse.data && Array.isArray(apiResponse.data) && apiResponse.data.length > 0) {
      const results = apiResponse.data;

      const msg = results.map(({ title, link, description }) => {
        return `*${title}*\n_${link}_\n_${description}_`;
      }).join('\n\n');

      await conn.reply(m.chat, msg, m);
    } else {
      conn.reply(m.chat, '🔍 *No se encontraron resultados.*', m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '⚠️ *Ocurrió un error al realizar la búsqueda: ' + error.message + '*', m);
  }
};

handler.help = ['google'].map((v) => v + ' <pencarian>');
handler.tags = ['buscador'];
handler.command = /^google?$/i;

export default handler;
