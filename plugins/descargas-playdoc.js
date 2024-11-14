import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese un nombre de una canción de YouTube*\n\nEjemplo, !${command} falling - Daniel Trevor`, m);
    m.react('⏳');

    try {
        conn.reply(m.chat, '🔄 Procesando su solicitud...', m);

        // Buscar el video en YouTube
        const yt_play = await search(args.join(' '));
        let additionalText = '';
        if (command === 'play7' || command === 'playdoc') {
            additionalText = 'audio';
        } else if (command === 'play8' || command === 'playdoc2') {
            additionalText = 'video';
        }

        let texto1 = `
        > 🌩 Título:
        > • ${yt_play[0].title}
        > 🌦 Publicado el: 
        > • ${yt_play[0].ago}
        > 🍭 Enlace:
        > • ${yt_play[0].url}
        > 🍒 Autor:
        > • ${yt_play[0].author.name}
        > 🧃 Canal:
        > • ${yt_play[0].author.url}
        > 🍇 Duración:
        > • ${secondString(yt_play[0].duration.seconds)}
        > _🍬 Descargando ${additionalText}..._
        `.trim();

        await conn.sendMessage(m.chat, { text: texto1 }, { quoted: m });

        // Comando para audio
        if (command === 'play7' || command === 'playdoc') {
            try {
                const v = yt_play[0].url;
                const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
                const dl_url = await yt.audio['128kbps'].download(); // Calidad de audio estándar
                const ttl = await yt.title;

                await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m });
            } catch (error) {
                await conn.reply(m.chat, '*❌ Ocurrió un error al descargar el audio.*', m);
            }
        }

        // Comando para video
        if (command === 'play8' || command === 'playdoc2') {
            try {
                const v = yt_play[0].url;
                const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
                const dl_url = await yt.video['360p'].download(); // Descargar en 360p
                const ttl = await yt.title;

                await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4' }, { quoted: m });
            } catch (error) {
                await conn.reply(m.chat, '*❌ Ocurrió un error al descargar el video.*', m);
            }
        }
    } catch (error) {
        return conn.reply(m.chat, '*❌ Ocurrió un error, intente de nuevo.*', m);
    }
};

handler.help = ['play7', 'play8', 'playdoc', 'playdoc2'];
handler.tags = ['descargas'];
handler.command = ['playdoc', 'playdoc2', 'play7', 'play8'];
handler.group = true; // Si deseas que funcione solo en grupos
handler.register = true;

export default handler;

// Funciones auxiliares
async function search(query, options = {}) {
    var search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
