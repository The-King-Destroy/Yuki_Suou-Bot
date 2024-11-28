import axios from 'axios';

let handler = async (m, { conn, command, args }) => {
  const text = args.join(' ');
  if (!text) return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar junto al comando.*', m);

  await m.react('🕓');
  let img = 'https://i.ibb.co/P5kZNFF/file.jpg';

  try {
    const apiResponse = await axios.get(`https://api.dorratz.com/v2/google-search?q=${encodeURIComponent(text)}`);

    if (apiResponse.data && apiResponse.data.results && Array.isArray(apiResponse.data.results) && apiResponse.data.results.length > 0) {
      const results = apiResponse.data.results;

      let teks = ` *乂  S E A R C H  -  G O O G L E*\n\n`;
      for (let g of results) {
        teks += `*${g.title}*\n${g.link}\n\n`;
      }

      conn.sendFile(m.chat, img, 'thumbnail.jpg', teks, m).then(() => m.react('✅'));
    } else {
      conn.reply(m.chat, '🔍 *No se encontraron resultados.*', m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '⚠️ *Ocurrió un error al realizar la búsqueda: ' + error.message + '*', m);
  }
};

handler.help = ['google *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^google?$/i;
handler.register = true;

export default handler;
