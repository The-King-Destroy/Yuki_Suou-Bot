
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
    let body = `*Información del Video/Audío:*

 *Título:* ${vid.title}
 *Vistas:* ${vid.views}
 *Fecha de Publicación:* ${vid.ago}
 *Duración:* ${vid.timestamp}
 *Link:* ${videoUrl}

*🝩.- Enviando audio, aguarda un momento...*`;

    // Enviar el mensaje informativo
    await conn.sendMessage(m.chat, { text: body }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '🌹', key: m.key }});
    await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
};

handler.command = ['ytmp3', 'yta'];
handler.limit = 5;
export default handler;
