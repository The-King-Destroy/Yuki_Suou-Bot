import yts from 'yt-search';
import fetch from 'node-fetch';
import axios from 'axios';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🌸 *Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did I tell you that I miss you*`, m);

    const isVideo = /vid|5|mp4|v$/.test(command);
    const searchResults = await yts(text);

    if (!searchResults.all || searchResults.all.length === 0) {
        return conn.reply(m.chat, "🍒 *No se encontraron resultados para tu búsqueda.*", m);
    }

    const videoInfo = searchResults.all[0];
    if (!videoInfo) return conn.reply(m.chat, "🥀 *No se pudo obtener información del video.*", m);

    const body = `\`\`\`⊜─⌈🌸 YouTube Play. 🌸⌋─⊜
    
    📚 Título : » ${videoInfo.title}
    👀 Vistas : » ${videoInfo.views}
    🕧 Duración : » ${videoInfo.timestamp}
    📆 Publicado : » ${videoInfo.ago}
    🔗 Link : » ${videoInfo.url}
    
🌸 Su ${isVideo ? 'Video' : 'Audio'} se está enviando, espere un momento...\`\`\``;

    await conn.sendFile(m.chat, videoInfo.thumbnail, 'thumbnail.jpg', body, m);

    let result;
    try {
        if (command === 'play1' || command === 'yta' || command === 'ytmp3') {
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(videoInfo.url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) throw "🥀 *Error al obtener el audio.*";
            result = delius.data.download.url;
        } else if (command === 'play5' || command === 'ytv' || command === 'playvid' || command === 'ytmp4') {
            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoInfo.url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            if (!delius.status) throw "🥀 *Error al obtener el video.*";
            result = delius.data.download.url;
        } else {
            throw "🌷 *Comando no reconocido.*";
        }

        await conn.sendMessage(m.chat, {
            [isVideo ? 'video' : 'audio']: { url: result },
            mimetype: isVideo ? "video/mp4" : "audio/mpeg",
            caption: `Título: ${videoInfo.title}`,
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, "🥀 *Ocurrió un error al procesar tu solicitud.*", m);
    }
};

handler.command = handler.help = ['play', 'play2', 'yta', 'ytmp3', 'ytv', 'ytmp4'];
handler.tags = ['descargas'];

export default handler;

// Función para buscar videos
async function search(query) {
    const result = await yts(query);
    return result.videos;
}
