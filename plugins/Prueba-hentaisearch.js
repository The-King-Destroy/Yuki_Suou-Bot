import fetch from 'node-fetch';

let previousResults = new Set();

const handler = async (m, { command, text }) => {
  if (command === 'hsearch') {
    const query = text || 'lisa';
    const apiUrl = `https://delirius-apiofc.vercel.app/anime/nhentaisearch?query=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.status && result.data.length > 0) {
        const newResults = result.data.filter(item => !previousResults.has(item.id));

        if (newResults.length > 0) {
          const hentai = newResults[0];
          previousResults.add(hentai.id);

          const message = `*TITULO:*\n> *${hentai.title}*\n\n*URL:*\n\n> *${hentai.url}*\n\n*IMAGEN:*\n> *${hentai.image}*`;
          m.reply(message);
        } else {
          m.reply('*No hay resultados nuevos*');
        }
      } else {
        m.reply('*No se encontraron resultados*');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      m.reply('*Ocurrió un error vuelve a intentarlo mas tarde*');
    }
  }
};

handler.command = ['hsearch'];
handler.register = true

export default handler;
