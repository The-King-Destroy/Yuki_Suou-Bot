let handler = async (message, { conn, text }) => {
  if (!text) {
    return conn.reply(message.chat, ' *¿Qué anime estás buscando?*', message);
  }

  try {
    const { data: response } = await axios.get(`https://animeflvapi.vercel.app/search?text=${encodeURIComponent(text)}`);

    if (!response.results || response.results.length === 0) {
      return conn.reply(message.chat, ' *No se encontraron animes.*', message);
    }

    const animes = response.results;
    const messages = [];

    for (const anime of animes) {
      messages.push([
        `info del anime`,
        `Título: ${anime.title}\n\n${anime.synopsis}\n\n🔖 ID: ${anime.id}\n*Usa este ID para descargar el anime*\n\nRating: ${anime.rating}`,
        anime.poster,
        [],
        [[`${anime.id}`]],
        [],
        []
      ]);
    }

    await conn.sendCarousel(message.chat, '', `\`\`\`¡Hola! A continuación te muestro la lista de animes encontrados\`\`\``, "", messages, message);
  } catch (error) {
    await conn.reply(message.chat, error.toString(), message);
  }
};

handler.help = ['animesearch'];
handler.tags = ['buscador'];
handler.command = ['animeflvsearch', 'animeflv', 'animesearch'];
handler.register = true;
handler.premium = true
export default handler;