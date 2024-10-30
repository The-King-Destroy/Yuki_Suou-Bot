import { ytmp3, ytmp4 } from 'ruhend-scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const fkontak = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
    if (!text) throw `*[🌹] Complementa tu peticion con alguna canción o video (Se recomienda especificar al autor)*.\n\n _🥀.- Ejemplo_ *${usedPrefix + command} Enemy tommoee profitt.*`;
    const randomReduction = Math.floor(Math.random() * 5) + 1;
    let search = await yts(text);
    let isVideo = /vid$/.test(command);
    let urls = search.all[0].url;
    let body = `*『  𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭  』*

 *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${search.all[0].title}
 *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${search.all[0].views}
 *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚌𝚒𝚘́𝚗:* ${search.all[0].ago}
 *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗:* ${search.all[0].timestamp}
 *🝤.- 𝙻𝚒𝚗𝚔* ${urls}

*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 ${isVideo ? '𝚟𝚒𝚍𝚎𝚘' : '𝚊𝚞𝚍𝚒𝚘'}, 𝚊𝚐𝚞𝚊𝚛𝚍𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*`;
    
    conn.sendMessage(m.chat, { 
        image: { url: search.all[0].thumbnail }, 
        caption: body 
    }, { quoted: fkontak });
    let res = await DOWNLOAD_YT(urls)
    let type = isVideo ? 'video' : 'audio';
    let video = res.video.dl_link;
    let audio = res.audio.dl_link;
    conn.sendMessage(m.chat, { 
        [type]: { url: isVideo ? video : audio }, 
        gifPlayback: false, 
        mimetype: isVideo ? "video/mp4" : "audio/mpeg" 
    }, { quoted: m });
    
    if (type = video) {
        handler.limit = 10;
    }
    if (type = audio) {
        handler.limit = 5;
    }
}

handler.command = ['play', 'play2'];
export default handler;

async function DOWNLOAD_YT(input) {
    let ytSearch = await yts(input)
    let { title, url, thumbnail, description, views, ago, duration } = ytSearch.videos[0]

    let { video, quality, size } = await ytmp4(url)

    let { audio } = await ytmp3(url)

    let resultados = {
        Status: true,
        Creator: "Lan",
        title: title,
        description: description,
        views: views,
        ago: ago,
        duration: duration,
        url: url,
        video: {
            dl_link: video,
            size: size,
            quality: quality
        },
        audio: {
            dl_link: audio
        }

    }

    return resultados

}
