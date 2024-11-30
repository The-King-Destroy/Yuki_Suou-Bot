import yts from 'yt-search';
import ytdl from 'ytdl-core';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `\`\`\`🌸 *Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Enemy Tommoee Profitt*\`\`\``;

    const isVideo = /vid|5|mp4|v$/.test(command);
    const search = await yts(text);

    if (!search.all || search.all.length === 0) {
        throw "🍒 *No se encontraron resultados para tu búsqueda.*";
    }

    const videoInfo = search.all[0];
    const body = `\`\`\`⊜─⌈ 🌸 YouTube Play 🌸 ⌋─⊜

    📚 Título : » ${videoInfo.title}
    👀 Vistas : » ${videoInfo.views}
    🕧 Duración : » ${videoInfo.timestamp}
    📆 Publicado : » ${videoInfo.ago}
    🔗 Link : » ${videoInfo.url}

🌸 Su ${isVideo ? 'Video' : 'Audio'} se está enviando, espere un momento...\`\`\``;

    await conn.sendMessage(m.chat, {
        image: { url: videoInfo.thumbnail },
        caption: body,
    }, { quoted: m });

    try {
        let stream;
        if (command === 'play1' || command === 'yta' || command === 'ytmp3') {
            stream = ytdl(videoInfo.url, { filter: 'audioonly' });
            await conn.sendMessage(m.chat, {
                audio: { url: stream },
                mimetype: 'audio/mpeg',
                caption: `Título: ${videoInfo.title}`,
            }, { quoted: m });
        } else if (command === 'playvid' || command === 'ytv' || command === 'play5' || command === 'ytmp4') {
            stream = ytdl(videoInfo.url, { quality: 'highestvideo' });
            await conn.sendMessage(m.chat, {
                video: { url: stream },
                mimetype: 'video/mp4',
                caption: `Título: ${videoInfo.title}`,
            }, { quoted: m });
        } else {
            throw "🌷 *Comando no reconocido.*";
        }
    } catch (error) {
        console.error(error);
        throw "🥀 *Ocurrió un error al procesar tu solicitud.*";
    }
};

handler.command = handler.help = ['play1', 'playvid', 'ytv', 'ytmp4', 'yta', 'play5', 'ytmp3'];
handler.tags = ['descargas'];

export default handler;
