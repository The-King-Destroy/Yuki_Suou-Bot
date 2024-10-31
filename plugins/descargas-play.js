
import { ytmp3, ytmp4 } from 'ruhend-scraper';
import yts from 'yt-search'; // Importar la librería yts correctamente

const handler = async (m, { conn, text, usedPrefix, command }) => {
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

    if (!text) {
        throw `*[ 💠 ] Por favor proporciona el nombre de una canción o video.*\n\n _⚕️.- Ejemplo_ *${usedPrefix + command} Faint - Linkin Park.*`;
    }

    let search = await yts(text);
    if (!search.all.length) {
        throw `*[ ❌ ] No se encontraron resultados para "${text}".*`;
    }

    let isVideo = /vid$/.test(command);
    let { title, views, ago, timestamp, url, thumbnail } = search.all[0];

    let body = `*Información del Video/Audío:*

 *Título:* ${title}
 *Vistas:* ${views}
 *Fecha de Publicación:* ${ago}
 *Duración:* ${timestamp}
 *Link:* ${url}

*🝩.- Enviando ${isVideo ? 'video' : 'audio'}, aguarda un momento...*`;

    // Enviar mensaje inicial
    await conn.sendMessage(m.chat, { 
        image: { url: thumbnail }, 
        caption: body 
    }, { quoted: fkontak });

    // Descargar el contenido
    let res = await DOWNLOAD_YT(url);
    let type = isVideo ? 'video' : 'audio';
    let downloadLink = isVideo ? res.video.dl_link : res.audio.dl_link;

    // Verificar si se obtuvo el enlace de descarga
    if (downloadLink) {
        const mimetype = isVideo ? "video/mp4" : "audio/mpeg";
        await conn.sendMessage(m.chat, { 
            [type]: { url: downloadLink }, 
            gifPlayback: false, 
            mimetype: mimetype 
        }, { quoted: m });
    } else {
        throw `*[ ❌ ] No se pudo obtener el enlace de ${isVideo ? 'video' : 'audio'}. Inténtalo de nuevo.*`;
    }
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
