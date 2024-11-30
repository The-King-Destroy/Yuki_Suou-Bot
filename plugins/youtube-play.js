import fg from 'api-dylux';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import yts from 'yt-search';
import fetch from 'node-fetch'; 

let handlerAudio = async (m, { conn, args, usedPrefix, text, command }) => {
    let lister = ["mp3", "yta", "audio", "mp3doc", "ytadoc", "audiodoc"];

    let [feature, inputs] = text.split(" ");
    if (!lister.includes(feature)) return conn.reply(m.chat, `🌸 Ingresa el formato en que deseas descargar más el título de un video o música de YouTube.\n\nEjemplo : ${usedPrefix + command} *mp3* SUICIDAL-IDOL - ecstacy`, m, rcanal);
    
    if (feature == "mp3" || feature == "yta" || feature == "audio") {
        if (!inputs) return conn.reply(m.chat, `🌸 Ingresa el título de un video o canción de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* YOUR NAME - Sparkle Sub español  english`, m, rcanal);
        await m.react('🕓');
        let res = await yts(text);
        let vid = res.videos[0];
        let q = '128kbps';
        let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`;
        txt += `	✩   *Título* : ${vid.title}\n`;
        txt += `	✩   *Duración* : ${vid.timestamp}\n`;
        txt += `	✩   *Visitas* : ${vid.views}\n`;
        txt += `	✩   *Autor* : ${vid.author.name}\n`;
        txt += `	✩   *Publicado* : ${eYear(vid.ago)}\n`;
        txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`;
        txt += `*- ↻ El audio se está enviando, espera un momento .*`;
        await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal);
        try {
            let yt = await fg.yta(vid.url, q);
            let { title, dl_url, size } = yt;
            let limit = 300;

            if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'));

            await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
            await m.react('✅');
        } catch {
            try {
                let yt = await fg.ytmp3(vid.url, q);
                let { title, dl_url, size } = yt;
                let limit = 100;

                if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'));

                await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
                await m.react('✅');
            } catch {
                await m.react('✖️');
            }
        }
    }

    if (feature == "mp3doc" || feature == "ytadoc" || feature == "audiodoc") {
        if (!inputs) return conn.reply(m.chat, `🌸 Ingresa el título de un video o canción de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* Alan Walker - Sing Me To Sleep`, m, rcanal);
        await m.react('🕓');
        let res = await yts(text);
        let vid = res.videos[0];
        let q = '128kbps';
        let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`;
        txt += `	✩   *Título* : ${vid.title}\n`;
        txt += `	✩   *Duración* : ${vid.timestamp}\n`;
        txt += `	✩   *Visitas* : ${vid.views}\n`;
        txt += `	✩   *Autor* : ${vid.author.name}\n`;
        txt += `	✩   *Publicado* : ${eYear(vid.ago)}\n`;
        txt += `	✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`;
        txt += `*- ↻ El audio se está enviando, espera un momento, soy lenta. . .*`;
        await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal);
        try {
            let yt = await fg.yta(vid.url, q);
            let { title, dl_url, size } = yt;
            let limit = 300;
            
            if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'));
            
            await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'audio/mpeg', fileName: `${vid.title}.mp3` }, { quoted: m });
            await m.react('✅');
        } catch {
            try {
                let yt = await fg.ytmp3(vid.url, q);
                let { title, dl_url, size } = yt;
                let limit = 100;

                if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'));

                await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'audio/mpeg', fileName: `${vid.title}.mp3` }, { quoted: m });
                await m.react('✅');
            } catch {
                await m.react('✖️');
            }
        }
    }
}

handler.help = ['play'].map(v => v + " *<formato> <búsqueda>*")
handler.tags = ['downloader']
handler.command = ['mp3', 'yta', 'audio', 'mp3doc', 'ytadoc', 'audiodoc','];
handler.register = true 
//handler.limit = 1
export default handler

function eYear(txt) {
    if (!txt) {
        return '×';
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim();
        var L = 'hace ' + T + ' mes';
        return L;
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim();
        var L = 'hace ' + T + ' meses';
        return L;
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim();
        var L = 'hace ' + T + ' año';
        return L;
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim();
        var L = 'hace ' + T + ' años';
        return L;
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim();
        var L = 'hace ' + T + ' hora';
        return L;
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim();
        var L = 'hace ' + T + ' horas';
        return L;
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim();
        var L = 'hace ' + T + ' minuto';
        return L;
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim();
        var L = 'hace ' + T + ' minutos';
        return L;
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim();
        var L = 'hace ' + T + ' dia';
        return L;
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim();
        var L = 'hace ' + T + ' dias';
        return L;
    }
    return txt;
}