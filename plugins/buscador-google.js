import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
  const query = args.join(' ');

  if (!query) {
    return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar junto al comando*', m);
  }

  await conn.reply(m.chat, '🔍 *Buscando...*', m);

  try {
    // Realiza la solicitud a la nueva API
    const apiResponse = await axios.get(`https://api.dorratz.com/v2/google-search?q=${encodeURIComponent(query)}`);
    
    // Verifica que la respuesta sea válida
    if (apiResponse.data && apiResponse.data.results && Array.isArray(apiResponse.data.results) && apiResponse.data.results.length > 0) {
      const results = apiResponse.data.results;

      const msg = results.map(({ title, link }) => {
        return `*${title}*\n_${link}_`;
      }).join('\n\n');

      await conn.reply(m.chat, msg, m); // Envía los resultados como texto
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
