import axios from 'axios';
import fs from 'fs';
import path from 'path';

let downloadHandler = async (m, { conn, args }) => {
    // Verificar que se haya proporcionado un índice
    if (!args[0]) {
        return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nPor favor, proporciona el índice del video para descargar.');
    }

    const videoIndex = parseInt(args[0]);
    
    if (isNaN(videoIndex)) {
        return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nEl índice debe ser un número válido.');
    }

    // Obtener los resultados de búsqueda almacenados
    const searchResults = searchResultsCache[m.chat];
    
    if (!searchResults || !searchResults[videoIndex]) {
        return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nNo se encontró el video para descargar. Asegúrate de haber realizado una búsqueda antes.');
    }

    const selectedVideo = searchResults[videoIndex];

    await downloadVideo(selectedVideo.url, selectedVideo.title, conn, m);
};

handler.command = /^download$/i; // Comando para descargar
export default downloadHandler;

// Función para descargar el video
async function downloadVideo(videoUrl, title, conn, m) {
    try {
        const response = await axios.get(videoUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        // Obtener el enlace directo del video
        const videoSource = $("video source").attr("src");

        if (!videoSource) {
            return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nNo se pudo encontrar el enlace del video para descargar.');
        }

        // Obtener el tamaño del video
        const headResponse = await axios.head(videoSource);
        const contentLength = parseInt(headResponse.headers['content-length']); // Tamaño en bytes

        // Verificar si el tamaño del video es mayor a 150 MB
        if (contentLength > 150 * 1024 * 1024) { // 150 MB en bytes
            return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nEl tamaño del video excede el límite de 150 MB.');
        }

        const downloadResponse = await axios({
            url: videoSource,
            method: 'GET',
            responseType: 'stream',
        });

        const downloadPath = path.join(__dirname, `${title}.mp4`);
        const writer = fs.createWriteStream(downloadPath);
        downloadResponse.data.pipe(writer);

        writer.on('finish', () => {
            m.reply(`🌹 *Descarga completada:* ${title}`);
            conn.sendMessage(m.chat, { document: { url: downloadPath }, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
        });

        writer.on('error', () => {
            m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al guardar el video. Por favor, intenta de nuevo más tarde.');
        });
    } catch (error) {
        console.error('Ocurrió un error al intentar descargar el video:', error);
        m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al intentar descargar el video. Por favor, intenta de nuevo más tarde.');
    }
}
