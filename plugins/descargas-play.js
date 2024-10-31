
import { ytmp3, ytmp4 } from 'ruhend-scraper';
import yts from 'yt-search'; // Importar la librería yts correctamente

const handler = async (m, { conn, text, usedPrefix, command }) => {
    // Mensaje de contacto (para el mensaje inicial)
    const fkontak = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    // Verificar si se proporciona texto
    if (!text) {
        throw `*[ 💠 ] Por favor proporciona el nombre de una canción o video.*\n\n _⚕️.- Ejemplo_ *${usedPrefix + command} Faint - Linkin Park.*`;
    }

    // Buscar el video o audio
    let search = await yts(text);
    if (!search.all.length) {
        throw `*[ ❌ ] No se encontraron resultados para "${text}".*`;
    }

    let isVideo = /vid$/.test(command);
    let { title, views, ago, timestamp, url, thumbnail } = search.all[0];

    // Mensaje de respuesta
    let body = `*『  𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 』*

 *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${title}
 *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${views}
 *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚌𝚒𝚘́𝚗:* ${ago}
 *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗:* ${timestamp}
 *🝤.- 𝙻𝚒𝚗𝚔:* ${url}

*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 ${isVideo ? '𝚟𝚒𝚍𝚎𝚘' : '𝚊𝚞𝚍𝚒𝚘'}, 𝚊𝚐𝚞𝚊𝚛𝚍𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*`;

    // Enviar mensaje inicial
    conn.sendMessage(m.chat, { 
        image: { url: thumbnail }, 
        caption: body 
    }, { quoted: fkontak });

    // Descargar el contenido
    let res = await DOWNLOAD_YT(url);
    let type = isVideo ? 'video' : 'audio';
    let downloadLink = isVideo ? res.video.dl_link : res.audio.dl_link;

    // Enviar el archivo descargado
    conn.sendMessage(m.chat, { 
        [type]: { url: downloadLink }, 
        gifPlayback: false, 
        mimetype: isVideo ? "video/mp4" : "audio/mpeg" 
    }, { quoted: m });
}

handler.command = ['play1', 'playvid'];
export default handler;

async function DOWNLOAD_YT(input) {
    let ytSearch = await yts(input);
    let { title, url } = ytSearch.videos[0];

    let { video, quality, size } = await ytmp4(url);
    let { audio } = await ytmp3(url);

    return {
        Status: true,
        title: title,
        url: url,
        video: {
            dl_link: video,
            size: size,
            quality: quality
        },
        audio: {
            dl_link: audio
        }
    };
}
