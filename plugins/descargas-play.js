import yts from 'yt-search';
import fetch from 'node-fetch';
import axios from 'axios';

// Definición del objeto de lenguaje
const lenguaje = {
    descargar: {
        text4: 'Aquí tienes tu audio descargado:',
        title: 'Título de la canción:'
    }
};

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

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (command === 'play' || command === 'musica') {
        if (!text) return m.reply(`*¿Qué está buscando? 🎶*\nEjemplo: *${usedPrefix + command}* ozuna`);

        const startTime = Date.now();

        conn.fakeReply(
            m.chat,
            `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🔈.*\n\n> No hagas spam de comandos`,
            '0@s.whatsapp.net',
            '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐚𝐮𝐝𝐢𝐨 𝐞𝐬𝐩𝐞𝐫𝐚'
        );

        m.react('⏳'); // Reacción de espera

        const yt_play = await yts(text);
        if (!yt_play || yt_play.all.length === 0) {
            return m.reply("⚠️ No se encontró ninguna canción.");
        }

        const videoInfo = yt_play.all[0];
        const texto1 = `*🎵 Canción Encontrada ✅*\n📌 *Título:* ${videoInfo.title}\n🕒 *Publicado:* ${videoInfo.ago}\n⏱️ *Duración:* ${secondString(videoInfo.duration.seconds)}\n👀 *Vistas:* ${MilesNumber(videoInfo.views)}\n✍️ *Autor:* ${videoInfo.author.name}\n🔗 *Link:* ${videoInfo.url}\n\n✨ *Recuerda seguir mi canal, me apoyarías mucho* 🙏: https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T`;

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

                const endTime = Date.now();
                const totalTime = ((endTime - startTime) / 1000).toFixed(2);
                m.react('✅'); // Reacción de éxito
                m.reply(`✅ ¡Audio enviado! Tiempo total de envío: ${totalTime} segundos.`);
            } else {
                throw new Error('No se pudo obtener el audio');
            }
        } catch (e) {
            const fallbackAudioUrl = `https://api.dorratz.com/v2/yt-mp3?url=${encodeURIComponent(videoInfo.url)}`;
            try {
                await conn.sendMessage(m.chat, {
                    audio: { url: fallbackAudioUrl },
                    mimetype: 'audio/mpeg'
                }, { quoted: m });

                const endTime = Date.now();
                const totalTime = ((endTime - startTime) / 1000).toFixed(2);
                m.react('✅'); // Reacción de éxito
                m.reply(`✅ ¡Audio enviado! Tiempo total de envío: ${totalTime} segundos.`);
            } catch (error) {
                m.react('❌'); // Reacción de error
                m.reply(`Ocurrió un error inesperado - ${error.message}`);
            }
        }
    }
}

// Configuración del comando
handler.command = ['play', 'musica'];
handler.help = ['play', 'musica'];
handler.tags = ['descargas'];
export default handler;
