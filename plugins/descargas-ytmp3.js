
import yts from 'yt-search';

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
    
    if (!text) throw `*[🌹] Complementa tu petición con algún enlace de YouTube.*\n_(Puedes hacer una búsqueda utilizando el comando ${usedPrefix}yts)_\n _🌷.- Ejemplo:_ *${usedPrefix + command}* https://www.youtube.com/watch?v=a5i-KdUQ47o`;
    
    await conn.sendMessage(m.chat, { react: { text: '🥀', key: m.key }});
    
    const videoSearch = await yts(text);
    if (!videoSearch.all.length) {
        return global.errori;
    }
    
    const vid = videoSearch.all[0];
    const videoUrl = vid.url;
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
    const apiResponse = await fetch(apiUrl);
    const delius = await apiResponse.json();

    if (!delius.status) {
        return global.errori;
    }
    
    const downloadUrl = delius.data.download.url;

    // Crear el mensaje informativo del video/audio
    let body = `*『  𝙰 𝙱 𝚂 𝚃 𝚁 𝙰 𝙲 𝚃 - 𝙰 𝙻 𝙻  ł  𝙳 . 𝙻  』*

 *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${vid.title}
 *♕.- 𝙰𝚞𝚝𝚘𝚛:* ${vid.author}
 *⛨.- 𝙲𝚊𝚗𝚊𝚕* ${vid.channel}
 *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚌𝚒𝚘́𝚗:* ${vid.ago}
 *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗:* ${vid.timestamp}
 *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${vid.views}
 *🝤.- 𝙻𝚒𝚗𝚔:* ${videoUrl}

🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚊𝚞𝚍𝚒𝚘, 𝚊𝚐𝚞𝚊𝚛𝚍𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*`;

    // Enviar el mensaje informativo con la imagen
    await conn.sendMessage(m.chat, { 
        image: { url: vid.thumbnail }, 
        caption: body 
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '🌹', key: m.key }});
    await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
};

handler.command = ['ytmp3', 'yta'];
handler.limit = 5;
export default handler;
