import yts from 'yt-search';
import fetch from 'node-fetch';

// Definición del objeto de lenguaje
const lenguaje = {
    descargar: {
        text4: 'Aquí tienes tu video descargado:',
        title: 'Título del video:'
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
    if (!text) {
        return m.reply(`*¿Qué video está buscando? 🎥*\nEjemplo: *${usedPrefix + command}* ozuna`);
    }

    const startTime = Date.now();

    conn.fakeReply(
        m.chat,
        `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🎥.*\n\n> No hagas spam de comandos`,
        '0@s.whatsapp.net',
        '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬𝐩𝐞𝐫𝐚'
    );

    m.react('⏳'); // Reacción de espera

    try {
        const yt_play = await yts(text);
        
        // Verifica si hay resultados
        if (!yt_play || yt_play.all.length === 0) {
            return m.reply("⚠️ No se encontró ningún video.");
        }

        const video = yt_play.all[0]; // Obtén el primer video
        const texto1 = `*🎬 Video Encontrado ✅*\n📌 *Título:* ${video.title}\n🕒 *Publicado:* ${video.ago}\n⏱️ *Duración:* ${secondString(video.duration.seconds)}\n👀 *Vistas:* ${MilesNumber(video.views)}\n✍️ *Autor:* ${video.author.name}\n🔗 *Link:* ${video.url}\n\n✨ *Recuerda seguir mi canal, me apoyarías mucho* 🙏: https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T`;

        await conn.sendMessage(m.chat, {
            image: { url: video.thumbnail },
            caption: texto1
        }, { quoted: m });

        const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(video.url)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        const videoInfo = data.resultUrl.video.find(v => v.quality === '360p');

        if (!videoInfo) throw new Error('No se encontró video en 360p');

        await conn.sendMessage(m.chat, {
            video: { url: videoInfo.download },
            fileName: `${data.result.title}.mp4`,
            mimetype: 'video/mp4',
            caption: `${lenguaje.descargar.text4}\n🔰 ${lenguaje.descargar.title} ${data.result.title}`
        }, { quoted: m });

        const endTime = Date.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        m.react('✅'); // Reacción de éxito
        m.reply(`✅ ¡Video enviado! Tiempo total de envío: ${totalTime} segundos.`);
    } catch (e) {
        m.react('❌'); // Reacción de error
        return m.reply(`Ocurrió un error inesperado - ${e.message}`);
    }
}

// Configuración del comando
handler.command = ['video', 'play2'];
handler.help = ['video', 'play2'];
handler.tags = ['descargas'];
export default handler;
