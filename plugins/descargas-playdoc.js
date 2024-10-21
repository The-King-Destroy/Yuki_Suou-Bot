import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const MAX_FILE_SIZE_MB = 200;

const handler = async (m, { conn, command, args }) => {
    if (!args.length) return conn.reply(m.chat, '🧿 *Ingrese un nombre de una canción de YouTube*', m);
    m.react('⏳');

    try {
        conn.reply(m.chat, '🔄 Procesando su solicitud...', m);

        const yt_play = await search(args.join(' '));
        if (!yt_play.length) return conn.reply(m.chat, '❌ No se encontró ningún video.', m);

        const video = yt_play[0];
        let additionalText = command.includes('7') ? 'audio' : 'video';

        let responseText = `
┏◚◚◚◚🅓🅞🅒🅢◚◚◚◚┓
🍁 𝚃𝚒𝚝𝚞𝚕𝚘: ${video.title}
🎀 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚍𝚘: ${video.ago}
🧿 𝚄𝚁𝙻: ${video.url}
🖋️ 𝙰𝚞𝚝𝚘𝚛: ${video.author.name}
📌 𝙲𝚊𝚗𝚊𝚕: ${video.author.url}
⏰ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗: ${secondString(video.duration.seconds)}
┗◛◛◛𝙔𝙪𝙠𝙞_𝙎𝙪𝙤𝙪-𝘽𝙤𝙩◛◛◛┛
𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚜𝚞 ${additionalText}, 𝙿𝚘𝚛 𝙵𝚊𝚟𝚘𝚛 𝙴𝚜𝚙𝚎𝚛𝚎
`.trim();

        await conn.sendMessage(m.chat, { text: responseText }, { quoted: m });

        const downloadUrl = await getDownloadUrl(video.url, command);
        if (!downloadUrl) return conn.reply(m.chat, '❌ Ocurrió un error al obtener el enlace de descarga.', m);

        const size = parseFloat(downloadUrl.fileSizeH.split(' ')[0]);
        if (size > MAX_FILE_SIZE_MB) {
            return conn.reply(m.chat, `❌ El archivo es demasiado pesado (${size} MB). El límite es de ${MAX_FILE_SIZE_MB} MB.`, m);
        }

        await conn.sendMessage(m.chat, {
            document: { url: downloadUrl.url },
            mimetype: command.includes('7') ? 'audio/mpeg' : 'video/mp4',
            fileName: `${downloadUrl.title}.${command.includes('7') ? 'mp3' : 'mp4'}`
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, '❌ Ocurrió un error, intente de nuevo.', m);
    }
};

async function search(query) {
    const searchResults = await yts.search({ query, hl: 'es', gl: 'ES' });
    return searchResults.videos;
}

async function getDownloadUrl(url, command) {
    try {
        const yt = await youtubedl(url).catch(async (_) => await youtubedlv2(url));
        return command.includes('7') ? await yt.audio['128kbps'].download() : await yt.video['360p'].download();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function secondString(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h} horas, ${m} minutos, ${s} segundos`;
}

export default handler;
