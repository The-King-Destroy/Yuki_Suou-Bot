import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw m.reply(`*🌸 Ejemplo: ${usedPrefix + command}* https://vm.tiktok.com/ZMhAk8tLx/`);
    }

    try {
        await conn.reply(m.chat, "🌷 *Espere un momento, estoy descargando su video...*", m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData) {
            throw m.reply("Error api!");
        }

        const videoURL = tiktokData.data.play;
        const videoURLWatermark = tiktokData.data.wmplay;
        const infonya_gan = `*📖 Descripción:* ${tiktokData.data.title}\n*🚀 Publicado:* ${tiktokData.data.create_time}\n\n*⚜️ Estado:*\n=====================\nLikes = ${tiktokData.data.digg_count}\nComentarios = ${tiktokData.data.comment_count}\nCompartidas = ${tiktokData.data.share_count}\nVistas = ${tiktokData.data.play_count}\nDescargas = ${tiktokData.data.download_count}\n=====================\n\nUploader: ${tiktokData.data.author.nickname || "No info"}\n(${tiktokData.data.author.unique_id} - https://www.tiktok.com/@${tiktokData.data.author.unique_id})\n*🔊 Sonido:* ${tiktokData.data.music}\n`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "`DESCARGA DE TIKTOK`" + `\n\n${infonya_gan}`, m);
            setTimeout(async () => {
                // Aquí se eliminó la línea que enviaba el audio
                // await conn.sendFile(m.chat, `${tiktokData.data.music}`, "lagutt.mp3", "", m);
            }, 1500);
        } else {
            throw m.reply("No se pudo descargar.");
        }
    } catch (error1) {
        conn.reply(m.chat, `Error: ${error1}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*')
handler.tags = ['descargas']
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i

handler.disable = false
handler.register = true
handler.limit = true

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}
