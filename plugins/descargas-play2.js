import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require("@hiudyy/ytdl");
const LimitAud = 725 * 1024 * 1024; 
const LimitVid = 425 * 1024 * 1024; 
const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (command == 'play' || command == 'musica') {
        if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);
        const yt_play = await search(args.join(' '));
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*
*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su audio*`, m, null, fake);
        try {
            const audiodlp = await ytmp3(yt_play[0].url);
            conn.sendMessage(m.chat, { audio: audiodlp, mimetype: "audio/mpeg" }, { quoted: m });
        } catch (e1) {
            try {
                const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${yt_play[0].url}`);
                let { data } = await res.json();
                await conn.sendMessage(m.chat, { audio: { url: data.dl }, mimetype: 'audio/mpeg' }, { quoted: m || null });
            } catch (e1) {
                try {
                    const axeelUrl = `https://axeel.my.id/api/download/audio?url=${yt_play[0].url}`;
                    const axeelResponse = await fetch(axeelUrl);
                    const axeelData = await axeelResponse.json();
                    if (!axeelData || !axeelData.downloads?.url) throw new Error();
                    await conn.sendMessage(m.chat, { audio: { url: axeelData.downloads.url }, mimetype: 'audio/mpeg' }, { quoted: m });
                } catch {
                    try {
                        const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`);
                        let { result } = await res.json();
                        await conn.sendMessage(m.chat, { audio: { url: await result.download.url }, mimetype: 'audio/mpeg' }, { quoted: m });
                    } catch (e1) {
                        try {
                            let q = '128kbps';
                            const yt = await youtubedl(yt_play[0].url).catch(async _ => await youtubedlv2(yt_play[0].url));
                            const dl_url = await yt.audio[q].download();
                            const ttl = await yt.title;
                            await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
                        } catch (e2) {
                            await m.react('❌');
                        }
                    }
                }
            }
        }
    }

    if (command == 'play2' || command == 'video') {
        if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);
        const yt_play = await search(args.join(' '));
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*
*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su video*`, m, null, fake);
        try {
            const video = await ytmp4(text);
            if (fileSize > LimitVid) {
                await conn.sendMessage(m.chat, { document: { url: video }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { video: { url: video }, fileName: `video.mp4`, mimetype: 'video/mp4', caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
            }
        } catch (e1) {
            await m.react('❌');
        }
    }

    if (command == 'play3' || command == 'playdoc') {
        if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);
        const yt_play = await search(args.join(' '));
        const texto1 = `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*
*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻 Descargado el audio 🔊 en documentos, aguarden un momento por favor....*`.trim();
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake);
        try {
            const audiodlp = await ytmp3(yt_play[0].url);
            conn.sendMessage(m.chat, { document: audiodlp, mimetype: "audio/mpeg" }, { quoted: m });
        } catch (e1) {
            await m.react('❌');
        }
    }

    if (command == 'play4' || command == 'playdoc2') {
        if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);
        const yt_play = await search(args.join(' '));
        const texto1 = `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*
*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻 Descargado el vídeo 🎥 en documentos, aguarden un momento por favor....*`.trim();
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake);
        try {
            const video = await ytmp4(text);
            await conn.sendMessage(m.chat, { document: { url: video }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
        } catch (e1) {
            await m.react('❌');
        }
    }
}

handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video', 'playdoc', 'playdoc2'];
handler.register = true;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
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

const getBuffer = async (url) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
}

async function getFileSize(url) {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : 0;
}

async function fetchY2mate(url) {
    const baseUrl = 'https://www.y2mate.com/mates/en60';
    const videoInfo = await fetch(`${baseUrl}/analyze/ajax`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url, q_auto: 0 })
    }).then(res => res.json());

    const id = videoInfo.result.id;
    const downloadInfo = await fetch(`${baseUrl}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ type: 'youtube', _id: id, v_id: url, token: '', ftype: 'mp4', fquality: '360p' })
    }).then(res => res.json());

    return downloadInfo.result.url;
}

async function fetchInvidious(url) {
    const apiUrl = `https://invidious.io/api/v1/get_video_info`;
    const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data && data.video) {
        return data.video; 
    } else {
        throw new Error("No se pudo obtener información del video desde Invidious");
    }
}

async function fetch9Convert(url) {
    const apiUrl = `https://9convert.com/en429/api`;
    const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data.status === 'ok') {
        return data.result.mp3;
    } else {
        throw new Error("No se pudo obtener la descarga desde 9Convert");
    }
}
