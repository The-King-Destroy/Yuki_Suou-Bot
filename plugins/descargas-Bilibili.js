import fetch from 'node-fetch';

// Definición del objeto de lenguaje
const lenguaje = {
    bilibili: {
        error: 'Ocurrió un error inesperado al obtener el video.',
        noUrl: (prefix, command) => `Por favor proporciona un enlace de Bilibili usando el comando de esta forma: *${prefix + command} <URL del video>*`
    }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (command === 'bilibili') {
        if (!text) return m.reply(lenguaje.bilibili.noUrl(usedPrefix, command));

        conn.fakeReply(m.chat, `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🎥.*\n\n> No hagas spam de comandos`, '0@s.whatsapp.net', '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬𝐩𝐞𝐫𝐚');

        m.react('⏳'); // Reacción de espera

        try {
            const apiUrl = `https://api.ryzendesu.vip/api/downloader/bilibili?url=${encodeURIComponent(text)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.status) throw new Error('Error al obtener el video de la API');

            const { title, views, like: likes, cover, mediaList } = data.data;
            const infoMessage = `🎬 *Título:* ${title}\n👀 *Vistas:* ${views}\n❤️ *Likes:* ${likes}\n📸 *Portada:* ${cover}`;

            await conn.sendMessage(m.chat, {
                image: { url: cover },
                caption: infoMessage
            }, { quoted: m });

            if (mediaList.videoList.length === 0) throw new Error('No se encontró ningún video en la lista');

            const videoUrl = mediaList.videoList[0].url;
            const fileName = mediaList.videoList[0].filename;

            await conn.sendMessage(m.chat, {
                video: { url: videoUrl },
                fileName: `${fileName}`,
                mimetype: 'video/mp4',
                caption: `🔰 Aquí tienes el video: ${title}`
            }, { quoted: m });

            m.react('✅'); // Reacción de éxito
        } catch (error) {
            m.react('❌'); // Reacción de error
            return m.reply(`${lenguaje.bilibili.error} - ${error.message}`);
        }
    }
}

// Configuración del comando
handler.command = ['bilibili'];
handler.help = ['bilibili'];
handler.tags = ['descargas'];
export default handler;