import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Verificar si se recibió un argumento (término de búsqueda)
    if (!args[0]) {
        return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗]*\n\n🌼 *Instrucciones:* \nPara buscar videos en Xvideos, por favor ingresa un término de búsqueda.\nEjemplo: \n*${usedPrefix + command} perro*`, m);
    }

    try {
        const results = await xvideosSearch(args.join(' ')); // Unir los argumentos en una sola cadena para la búsqueda
        if (results.length === 0) {
            return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗]*\nNo se encontraron resultados para: *${args.join(' ')}*`, m);
        }

        // Formatear y enviar los resultados
        let responseMessage = `🌸 *Resultados de búsqueda para:* *${args.join(' ')}*\n\n`;
        results.forEach((video, index) => {
            responseMessage += `🌻 *Título:* ${video.title}\n`;
            responseMessage += `🌺 *Duración:* ${video.duration}\n`;
            responseMessage += `🌷 *Calidad:* ${video.quality || 'No disponible'}\n`;
            responseMessage += `🌼 *Enlace:* ${video.url}\n\n`;
        });

        conn.reply(m.chat, responseMessage, m);
    } catch (e) {
        console.error(e);
        return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al buscar videos. Por favor, intenta de nuevo más tarde.`, m);
    }
};

handler.command = ['xvideossearch', 'xvsearch'];
handler.register = true;
handler.group = true;

export default handler;

// Función para buscar videos en Xvideos
async function xvideosSearch(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `https://www.xvideos.com/?k=${encodeURIComponent(query)}`;
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const results = [];
            $("div.mozaique > div").each((index, element) => {
                const title = $(element).find("p.title a").attr("title");
                const videoUrl = "https://www.xvideos.com" + $(element).find("p.title a").attr("href");
                const duration = $(element).find("span.duration").text().trim();
                const quality = $(element).find("span.video-hd-mark").text().trim();

                results.push({ title, url: videoUrl, duration, quality });
            });

            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
}
