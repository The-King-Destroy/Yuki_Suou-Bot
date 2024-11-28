import { googleIt } from '@bochilteam/scraper';
import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
  const fetch = (await import('node-fetch')).default;
  const text = args.join(' ');

  if (!text) {
    return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar junto al comando.*', m);
  }

  const loadingMessage = await conn.reply(m.chat, '🔍 *Buscando...*', m);

  try {
    const url = 'https://google.com/search?q=' + encodeURIComponent(text);
    const search = await googleIt(text);

    if (search.articles.length === 0) {
      return conn.reply(m.chat, '🔍 *No se encontraron resultados.*', m);
    }

    const msg = search.articles.map(({ title, url, description }) => {
      return `*${title}*\n_${url}_\n_${description}_`;
    }).join('\n\n');

    const ss = `https://image.thum.io/get/fullpage/${url}`;
    await conn.sendFile(m.chat, ss, 'error.png', url + '\n\n' + msg, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '⚠️ *Ocurrió un error al realizar la búsqueda.*', m);
  } finally {
    conn.reply(m.chat, '✅ *Búsqueda completada.*', loadingMessage);
  }
};

handler.help = ['google'].map((v) => v + ' <pencarian>');
handler.tags = ['buscador'];
handler.command = /^google?$/i;

export default handler;
