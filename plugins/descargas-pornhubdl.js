import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn, args, command, usedPrefix }) => {
    // Verificar si se recibió un argumento (enlace del video)
    if (!args[0] || !args[0].startsWith('https://www.pornhub.com/')) {
        return m.reply(`*Formato incorrecto*\n\n🌹 *Instrucciones para usar el comando:*\nEjemplo:\n\n*${usedPrefix + command} <enlace del video>*\n\n*Ejemplo específico:*\n*${usedPrefix + command} https://www.pornhub.com/view_video.php?viewkey=xxxxxxxx*`);
    }

    try {
        const videoUrl = args[0];
        const videoData = await downloadPornhubVideo(videoUrl);
        
        if (!videoData) {
            return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nNo se pudo encontrar el video o no está disponible para descarga.');
        }

        conn.sendMessage(m.chat, { document: { url: videoData.url }, mimetype: 'video/mp4', fileName: videoData.title }, { quoted: m });
    } catch (e) {
        console.error('Ocurrió un error al procesar la descarga:', e);
        m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al intentar descargar el video. Por favor, intenta de nuevo más tarde.');
    }
};

handler.command = /^(phdl|pornhubdl)$/i; // Comandos actualizados
handler.tags = ['descargas']; // Etiqueta añadida
export default handler;

// Función para descargar video de Pornhub
async function downloadPornhubVideo(videoUrl) {
    try {
        const response = await axios.get(videoUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        // Obtener el título del video
        const title = $("meta[property='og:title']").attr("content");

        // Obtener el enlace del video
        const videoSource = $("video source").attr("src");

        return { title, url: videoSource };
    } catch (error) {
        console.error('Ocurrió un error al buscar el video:', error);
        return null;
    }
}
