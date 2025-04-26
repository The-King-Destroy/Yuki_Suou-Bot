import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix, text }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`${emoji} El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw on*`);
    }

    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Por favor, envia un link de Xvideos para descargar el video.`, m);
    }

    try {
        conn.reply(m.chat, `${emoji2} El vídeo está siendo procesado, espere un momento...\n\n- El tiempo de envio depende del peso y duración del video.`, m);
        
        const res = await xvideosdl(args[0]);
        conn.sendMessage(m.chat, { document: { url: res.result.url }, mimetype: 'video/mp4', fileName: res.result.title }, { quoted: m });
    } catch (e) {
        throw `${msm} Ocurrio un error.\n\n- El enlace debe ser similar a:\n◉ https://www.xvideos.com/video70389849/pequena_zorra_follada_duro`;
    }
};

handler.command = ['xvideosdl'];
handler.register = true;
handler.group = false;
handler.coin = 10;

export default handler;

async function xvideosdl(url) {
    return new Promise((resolve, reject) => {
        fetch(`${url}`, { method: 'get' })
            .then(res => res.text())
            .then(res => {
                let $ = cheerio.load(res, { xmlMode: false });
                const title = $("meta[property='og:title']").attr("content");
                const keyword = $("meta[name='keywords']").attr("content");
                const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views";
                const vote = $("div.rate-infos > span.rating-total-txt").text();
                const likes = $("span.rating-good-nbr").text();
                const deslikes = $("span.rating-bad-nbr").text();
                const thumb = $("meta[property='og:image']").attr("content");
                const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");
                resolve({ status: 200, result: { title, url: videoUrl, keyword, views, vote, likes, deslikes, thumb } });
            })
            .catch(err => reject(err));
    });
}
