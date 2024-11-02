/*import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, args, command, usedPrefix }) => {
    // Verificar si se recibió un argumento (enlace del video)
    if (!args[0] || !args[0].startsWith('https://www.pornhub.com/')) {
        return m.reply(`*Formato incorrecto*\n\n🌹 *Instrucciones para usar el comando:*\nEjemplo:\n\n*${usedPrefix + command} <enlace del video>*`);
    }

    const videoUrl = args[0];

    try {
        const videoData = await getVideoLink(videoUrl); // Obtener el enlace del video

        if (!videoData) {
            return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nNo se pudo encontrar el video o no está disponible para descarga.');
        }

        // Descargar el video
        const downloadPath = path.join(__dirname, `${videoData.title}.mp4`);
        const response = await axios({
            url: videoData.url,
            method: 'GET',
            responseType: 'stream',
        });

        // Guardar el video en el sistema de archivos
        const writer = fs.createWriteStream(downloadPath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            m.reply(`🌹 *Descarga completada:* ${videoData.title}`);
            conn.sendMessage(m.chat, { document: { url: downloadPath }, mimetype: 'video/mp4', fileName: `${videoData.title}.mp4` }, { quoted: m });
        });

        writer.on('error', () => {
            m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al guardar el video. Por favor, intenta de nuevo más tarde.');
        });
    } catch (e) {
        console.error('Ocurrió un error al procesar la descarga:', e);
        m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al intentar descargar el video. Por favor, intenta de nuevo más tarde.');
    }
};

handler.command = /^(phdl|pornhubdl)$/i; // Comandos actualizados
handler.tags = ['descargas']; // Etiqueta añadida
export default handler;

// Función para obtener el enlace del video de Pornhub
async function getVideoLink(videoUrl) {
    try {
        const response = await axios.get(videoUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        // Obtener el título del video
        const title = $("meta[property='og:title']").attr("content");

        // Obtener el enlace del video
        const videoSource = $("video source").attr("src");

        if (videoSource) {
            return { title, url: videoSource }; // Retornar el título y el enlace
        } else {
            return null; // No se encontró el enlace del video
        }
    } catch (error) {
        console.error('Ocurrió un error al buscar el video:', error);
        return null;
    }
}*/
