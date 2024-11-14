import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const handler = async (m, { conn, command, args, text }) => {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese un nombre de una canción de YouTube*\n\nEjemplo: !${command} falling - Daniel Trevor`, m);
    m.react('⏳');

    try {
        conn.reply(m.chat, '🔄 Procesando su solicitud...', m);

        // Buscar el video en YouTube
        const yt_play = await search(args.join(' '));
        if (!yt_play || yt_play.length === 0) {
            return conn.reply(m.chat, '⚠️ *No se encontró ningún video.*', m);
        }

        const video = yt_play[0];
        let additionalText = '';
        if (command === 'play7' || command === 'playdoc') {
            additionalText = 'audio 🎵';
        } else if (command === 'play8' || command === 'playdoc2') {
            additionalText = 'video 📹';
        }

        const texto1 = `
🎶 Título:
• ${video.title}
📅 Publicado el:
• ${video.ago}
🔗 Enlace:
• ${video.url}
👤 Autor:
• ${video.author.name}
📺 Canal:
• ${video.author.url}
⏳ Duración:
• ${secondString(video.duration.seconds)}
🍬 Descargando ${additionalText}...
        `.trim();

        await conn.sendMessage(m.chat, { text: texto1 }, { quoted: m });

        // Comando para audio
        if (command === 'play7' || command === 'playdoc') {
            try {
                const audioUrl = video.url;
                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    mimetype: 'audio/mpeg',
                    fileName: `${video.title}.mp3`
                }, { quoted: m });
            } catch (error) {
                console.error("Error al descargar el audio:", error);
                await conn.reply(m.chat, '❌ *Ocurrió un error al descargar el audio.*', m);
            }
        }

        // Comando para video
        if (command === 'play8' || command === 'playdoc2') {
            try {
                const videoUrl = video.url;
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    mimetype: 'video/mp4',
                    fileName: `${video.title}.mp4`
                }, { quoted: m });
            } catch (error) {
                console.error("Error al descargar el video:", error);
                await conn.reply(m.chat, '❌ *Ocurrió un error al descargar el video.*', m);
            }
        }
    } catch (error) {
        console.error("Error en el proceso:", error);
        return conn.reply(m.chat, '❌ *Ocurrió un error, intente de nuevo.*', m);
    }
};

handler.help = ['play7', 'play8', 'playdoc', 'playdoc2'];
handler.tags = ['descargas'];
handler.command = ['playdoc', 'playdoc2', 'play7', 'play8'];
//handler.group = true; // Si deseas que funcione solo en grupos
handler.register = true;

export default handler;

// Funciones auxiliares
async function search(query) {
    const result = await yts.search({ query, hl: 'es', gl: 'ES' });
    return result.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? `${h}h ` : ''}${m}m ${s}s`;
}
