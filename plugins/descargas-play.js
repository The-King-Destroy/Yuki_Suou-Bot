
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const botName = 'ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ '; // Nombre del bot

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    const responseMessage = (msg) => conn.reply(m.chat, msg, m);

    if (command === 'play' || command === 'musica') {
        if (!text) return responseMessage(`*🤔¿Qué estás buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);

        try {
            const yt_play = await search(args.join(' '));
            if (!yt_play.length) {
                return responseMessage(`*❌ No se encontraron resultados para: ${text}*`);
            }

            const video = yt_play[0]; // Obtener el primer resultado
            const texto1 = `📌 *Título* : ${video.title}\n📆 *Publicado:* ${video.ago}\n⌚ *Duración:* ${secondString(video.duration.seconds)}`.trim();

            await conn.sendFile(m.chat, video.thumbnail, 'error.jpg', texto1, m, null, fake);

            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(video.url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();

            if (!delius.status) {
                return m.react("❌");
            }
            const downloadUrl = delius.data.download.url;
            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
        } catch (e) {
            await m.react('❌');
            console.error(e);
        }
    }

    if (command === 'play2' || command === 'video') {
        if (!text) return responseMessage(`*🤔¿Qué estás buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);

        try {
            const yt_play = await search(args.join(' '));
            if (!yt_play.length) {
                return responseMessage(`*❌ No se encontraron resultados para: ${text}*`);
            }

            const video = yt_play[0]; // Obtener el primer resultado
            const texto1 = `📌 *Título* : ${video.title}\n📆 *Publicado:* ${video.ago}\n⌚ *Duración:* ${secondString(video.duration.seconds)}`.trim();
            m.react("⌛");
            await conn.sendFile(m.chat, video.thumbnail, 'error.jpg', texto1, m, null, fake);

            const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(video.url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();

            if (!delius.status) {
                return m.react("❌");
            }
            const downloadUrl = delius.data.download.url;
            await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `video.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${video.title}`, thumbnail: video.thumbnail, mimetype: 'video/mp4' }, { quoted: m });
            m.react("✅");
        } catch (e) {
            await m.react('❌');
            console.error(e);
        }
    }

    // Código para otros comandos...
};

handler.help = ['play', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video'];
handler.register = true;
export default handler;

async function search(query, options = {}) {
    const searchResult = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return searchResult.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
