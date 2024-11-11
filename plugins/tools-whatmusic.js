import yts from 'yt-search';
import axios from 'axios';

// Función para formatear segundos a un formato legible
const secondString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${secs}s`;
}

// Función para formatear números grandes
const MilesNumber = (number) => {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'; // Millones
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // Miles
    }
    return number; // Menos de mil
}

const handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m; // Obtiene el mensaje citado o el mensaje actual
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/video|audio/.test(mime)) {
        await m.react('🕓');
        
        // Aquí debes implementar una lógica de reconocimiento de música
        // Por ejemplo, podrías integrar una API de reconocimiento de música aquí

        // Simulación de búsqueda de canción (esto es solo para ilustrar)
        const text = "Canción simulada"; // Esto debería ser el resultado del reconocimiento
        const yt_play = await yts(text);

        if (!yt_play || yt_play.all.length === 0) {
            return m.reply("🔍 No se encontró ninguna canción.");
        }

        const videoInfo = yt_play.all[0];
        const texto1 = `*Canción Encontrada*\n🏷️ *Título:* ${videoInfo.title}\n📅 *Publicado:* ${videoInfo.ago}\n⏳ *Duración:* ${secondString(videoInfo.duration.seconds)}\n👀 *Vistas:* ${MilesNumber(videoInfo.views)}\n🎤 *Autor:* ${videoInfo.author.name}\n🔗 *Link:* ${videoInfo.url}`;

        await conn.sendMessage(m.chat, {
            image: { url: videoInfo.thumbnail },
            caption: texto1
        }, { quoted: m });

        const apiUrl = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(videoInfo.url)}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.status) {
                const audioUrl = response.data.result.urlAudio;
                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    mimetype: 'audio/mpeg'
                }, { quoted: m });

                await m.react('✅'); // Reacción de éxito
            } else {
                throw new Error('No se pudo obtener el audio');
            }
        } catch (error) {
            await m.react('❌'); // Reacción de error
            m.reply(`Ocurrió un error inesperado - ${error.message}`);
        }
    } else {
        return conn.reply(m.chat, `🌹 Etiqueta un audio o video de poca duración con el comando *${usedPrefix + command}* para ver qué música contiene.`, m);
    }
}

// Configuración del comando
handler.help = ['whatmusic *<audio/video>*'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;
