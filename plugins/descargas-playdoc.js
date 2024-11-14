import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

const lolkeysapi = '8fdb6bf3e9d527f7a6476f4b'; // Aquí defines tu clave API
const MAX_FILE_SIZE_MB = 500; // Límite de tamaño de archivo en MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese un nombre de una canción de YouTube*\n\nEjemplo, !${command} falling - Daniel Trevor`, m);
    m.react('⏳');

    try {
        conn.reply(m.chat, '🔄 Procesando su solicitud...', m, {
            contextInfo: {
                externalAdReply: {
                    mediaUrl: null,
                    mediaType: 1,
                    showAdAttribution: true,
                    title: 'ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ',
                    body: 'Espere un momento por favor...',
                    previewType: 0,
                    sourceUrl: channel
                }
            }
        });

        const yt_play = await search(args.join(' '));
        let additionalText = '';
        if (command === 'play7' || command == 'playdoc') {
            additionalText = 'audio';
        } else if (command === 'play8' || command == 'playdoc2') {
            additionalText = 'video';
        }

        let texto1 = `
・₊✧★。..・✫・🎸🎧°⋆♡₊˚ 🔮
> 🌩 τιτυℓο:
> • ${yt_play[0].title}
> ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪───ׅ──ׅ─ׅ─ׅ┈ ─๋︩︪─◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸
> 🌦 ρυϐℓιϲα∂ο єи: 
> • ${yt_play[0].ago}
> ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎─ׅ─ׅ┈ ─๋︩︪───ׅ──ׅ─ׅ─ׅ┈ ─๋︩︪─⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸
> 🍭 єиℓαϲє:
> • ${yt_play[0].url}
> ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪───ׅ──ׅ─ׅ─ׅ┈ ─๋︩︪─⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸
> 🍒 αմԵօɾ:
> • ${yt_play[0].author.name}
> ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪──ׅ──ׅ──ׅ─ׅ┈ ─๋︩︪─◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸
> 🧃 cαɳαℓ:
> • ${yt_play[0].author.url}
> ◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪───ׅ──ׅ─ׅ─ׅ┈ ─๋︩︪─◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸
> 🍇 ժմɾαcíօ́ղ:
> • ${secondString(yt_play[0].duration.seconds)}
・₊✧。..・★🎸🎧°⋆♡₊˚ 🔮

> _*🍬 εɳѵเαɳ∂σ รµ ${additionalText}, αɠµαɾ∂ε µɳ ɱσɱεɳƭσ 🍓...*_
`.trim();

        await conn.sendMessage(m.chat, { text: texto1 }, { quoted: m });

        // Comando para audio
        if (command == 'play7' || command == 'playdoc') {
            try {
                let q = '128kbps';
                let v = yt_play[0].url;
                let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
                let dl_url = await yt.audio[q].download();
                let ttl = await yt.title;
                let size = parseFloat(yt.audio[q].fileSizeH.split(' ')[0]);

                // Comprobación del tamaño del archivo
                if (size > MAX_FILE_SIZE_MB) {
                    return conn.reply(m.chat, `❌ El archivo es demasiado pesado (${size} MB). El límite es de ${MAX_FILE_SIZE_MB} MB.`, m, rcanal);
                }

                await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m });
            } catch (error) {
                await conn.reply(m.chat, '*❌ Ocurrió un error al descargar el audio.*', m);
            }
        }

        // Comando para video
        if (command == 'play8' || command == 'playdoc2') {
            try {
                const q = '360p';
                const v = yt_play[0].url;
                const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
                const dl_url = await yt.video[q].download();
                const ttl = await yt.title;
                const size = parseFloat(yt.video[q].fileSizeH.split(' ')[0]);

                // Comprobación del tamaño del archivo
                if (size > MAX_FILE_SIZE_MB) {
                    return conn.reply(m.chat, `❌ El archivo es demasiado pesado (${size} MB). El límite es de ${MAX_FILE_SIZE_MB} MB.`, m);
                }

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
handler.group = true;
handler.register = true;

export default handler;

// Funciones auxiliares como search(), secondString(), etc.

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