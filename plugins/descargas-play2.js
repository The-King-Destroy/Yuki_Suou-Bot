import fetch from 'node-fetch';
import yts from 'yt-search';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require("@hiudyy/ytdl");

const LimitAud = 725 * 1024 * 1024; 
const LimitVid = 425 * 1024 * 1024; 

const handler = async (m, { conn, command, args, text }) => {
    if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`);

    const yt_play = await search(args.join(' '));
    await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*
*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su audio*`, m);

    if (command === 'play' || command === 'musica') {
        try {
            const audiodlp = await ytmp3(yt_play[0].url);
            conn.sendMessage(m.chat, { audio: audiodlp, mimetype: "audio/mpeg" }, { quoted: m });
        } catch {
            await handleAudioFallback(yt_play[0].url, m);
        }
    }

    if (command === 'play2' || command === 'video') {
        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', `${yt_play[0].title}
*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su video*`, m);
        try {
            const video = await ytmp4(yt_play[0].url);
            await conn.sendMessage(m.chat, { video: { url: video }, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
        } catch {
            await m.react('❌');
        }
    }
}

async function search(query) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES' });
    return search.videos;
}

function secondString(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d ? d + ' días, ' : ''}${h ? h + ' horas, ' : ''}${m ? m + ' minutos, ' : ''}${s ? s + ' segundos' : ''}`;
}

async function handleAudioFallback(url, m) {
    // Implementar lógica alternativa para obtener el audio
    try {
        const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
        const { data } = await res.json();
        await conn.sendMessage(m.chat, { audio: { url: data.dl }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch {
        await m.react('❌');
    }
}

handler.help = ['play', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'musica', 'video', 'play4'];

export default handler;
