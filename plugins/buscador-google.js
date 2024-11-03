import axios from 'axios';

let handler = async (m, { conn, command, args }) => {
  const text = args.join(' ');
  if (!text) return conn.reply(m.chat, '🌹 Ingresa lo que deseas buscar junto al comando.', m);
  
  await m.react('🕓');
  let img = 'https://i.ibb.co/P5kZNFF/file.jpg';
  const url = `https://widipe.com/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await axios.get(url, { headers: { accept: 'application/json' } });
    const results = response.data.result;

    if (results.length > 0) {
      let teks = ` *ゲ◜៹ Google Search ៹◞ゲ*\n\n`;
      for (let g of results) {
        teks += `*${g.title}*\n${g.link}\n${g.description}\n\n`;
      }
      conn.sendFile(m.chat, img, 'thumbnail.jpg', teks, m).then(() => m.react('✅'));
    } else {
      conn.reply(m.chat, '❌ No se encontraron resultados.', m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '❌ Error al realizar la búsqueda.', m);
  }
}

handler.help = ['googlesearch *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^googlesearch|google$/i;
handler.register = true;

export default handler;
