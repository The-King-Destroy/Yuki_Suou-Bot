import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Ingresa una consulta\n*🌸 Ejemplo:* ${usedPrefix}${command} Joji Ew`);

    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    try {
        let ouh = await fetch(`https://api.nyxs.pw/dl/spotify-direct?title=${text}`);

        // Verifica que la respuesta sea correcta
        if (!ouh.ok) {
            throw new Error(`Error al acceder a la API: ${ouh.status} ${ouh.statusText}`);
        }

        let gyh = await ouh.json();

        if (!gyh.result) throw m.reply(`*No se encontró la canción*`);

        // Usar un acortador para el enlace de Spotify
        let shortURL = await getTinyURL(gyh.result.urlSpotify);

        const info = `☁️ *TITULO:*\n_${gyh.result.title} - Versión original_\n\n👤 *ARTISTA:*\n» ${gyh.result.artists}\n\n🔗 *LINK:*\n» ${shortURL}\n\n🥀 *Enviando Canción....*`;

        // Obtener la imagen en formato buffer de la URL original
        const thumbnailBuffer = await (await fetch(gyh.result.thumbnail)).buffer();

        // Enviar la información y la imagen como un enlace
        await conn.sendMessage(m.chat, {
            text: info,
            contextInfo: {
                externalAdReply: {
                    title: gyh.result.title,
                    body: `Artista: ${gyh.result.artists}`,
                    mediaType: 1,
                    thumbnail: thumbnailBuffer,
                    mediaUrl: shortURL, // URL de la canción
                    sourceUrl: shortURL, // URL de la canción
                    showAdAttribution: true,
                }
            }
        }, { quoted: m });

        const doc = {
            audio: { url: gyh.result.url },
            mimetype: 'audio/mp4',
            fileName: `${gyh.result.title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: gyh.result.urlSpotify,
                    title: gyh.result.title,
                    sourceUrl: gyh.result.urlSpotify,
                    thumbnail: thumbnailBuffer
                }
            }
        };

        // Enviar el archivo de audio
        await conn.sendMessage(m.chat, doc, { quoted: m });
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (error) {
        console.error(error);
        m.reply(`Error: ${error.message}`);
    }
};

async function getTinyURL(text) {
    try {
        let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
        return response.data;
    } catch (error) {
        return text;
    }
}
handler.tags = ['downloader']
handler.help = ['spotify']
handler.command = ['spotify']
handler.limit = 7
handler.group = true
//handler.register = true
export default handler