/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

import axios from 'axios';
import cheerio from 'cheerio';

async function acc(longUrl) {
    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        return response.data;
    } catch (error) {
        console.error('Error al acortar el enlace:', error.message);
        return longUrl;
    }
}

const getDownloadLinks = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const downloads = {};
        $('table.table-downloads tbody tr').each((_, element) => {
            const server = $(element).find('td:nth-child(2)').text().trim();
            const link = $(element).find('td:nth-child(4) a').attr('href');
            if (server && link) {
                downloads[server] = link;
            }
        });
        return downloads;
    } catch (error) {
        console.error('Error al procesar la URL:', url, error.message);
        return { error: 'No se pudieron obtener los enlaces' };
    }
};

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Por favor, ingresa el link del anime para obtener información.\n\n> Nota: En el comando #animes no da los links completos porque son muy largos y por éso usé un acortador, pero igualmente sirven.`, m);
    }
    const links = await getDownloadLinks(args[0]);
    if (links.error) {
        return conn.reply(m.chat, links.error, m);
    }
    let messageText = `• Lista de opciones para descargar:\n\n`;
    for (const [server, link] of Object.entries(links)) {
        messageText += `💻 *Servidor:* ${server}\n  🔗 *\`Enlace:\`* ${link}\n─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ─\n`;
    }
    messageText += `\n> Para descargar, usa el comando respectivo al servidor.\n\n> Nota: Los links no siempre pueden funcionar si son muy viejos.`;
    await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
}

handler.help = ['animedl', 'animelinks'];
handler.command = ['animedl', 'animelinks'];
handler.tags = ['descargas'];
handler.premium = true;
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;