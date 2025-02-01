import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix, text }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('🍬 El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw*');
    }

    if (!args[0]) {
        return conn.reply(m.chat, `🍬 Por favor, envía un enlace de Pornhub para descargar el video.`, m);
    }

    try {
        conn.reply(m.chat, `🍭 El vídeo está siendo procesado, espere un momento...\n\n- El tiempo de envío depende del peso y duración del video.`, m);
        
        const res = await phubdl(args[0]);
        conn.sendMessage(m.chat, { document: { url: res.result.url }, mimetype: 'video/mp4', fileName: res.result.title }, { quoted: m });
    } catch (e) {
        throw `⚠️ Ocurrió un error.\n\n- El enlace debe ser similar a:\n◉ https://www.pornhub.com/view_video.php?viewkey=6699e4c8b79d7`;
    }
};

handler.command = ['phubdl'];
handler.register = true;
handler.group = false;

export default handler;

async function phubdl(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res);
                const title = $("meta[property='og:title']").attr("content");
                const videoUrl = $("video").attr("src");
                if (videoUrl) {
                    resolve({ status: 200, result: { title, url: videoUrl } });
                } else {
                    reject('No se encontró el video.');
                }
            })
            .catch(err => reject(err));
    });
}
