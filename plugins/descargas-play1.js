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

    let result;
    try {
        if (command === 'play1' || command === 'yta' || command === 'ytmp3') {
            result = await new Promise((resolve, reject) => {
                const stream = ytdl(videoInfo.url, { filter: 'audioonly' });
                resolve(stream);
            });
        } else if (command === 'playvid' || command === 'ytv' || command === 'play5' || command === 'ytmp4') {
            result = await new Promise((resolve, reject) => {
                const stream = ytdl(videoInfo.url, { quality: 'highestvideo' });
                resolve(stream);
            });
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
        throw "🥀 *Ocurrió un error al procesar tu solicitud.*";
    }
};

handler.command = handler.help = ['play1', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];

export default handler;
