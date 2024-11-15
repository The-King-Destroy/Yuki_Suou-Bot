import yts from 'yt-search';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    
    if (!text) {
        throw `🌹 Te Faltó Un Link De Un Video De Youtube.\n_(Puedes hacer una búsqueda utilizando el comando ${usedPrefix}yts)_\n _🌷.- Ejemplo:_ *${usedPrefix + command}* https://youtu.be/sBKR6aUorzA?si=TmC01EGbXUx2DUca`;
    }
    
    await conn.sendMessage(m.chat, { react: { text: '🥀', key: m.key }});
    
    const videoSearch = await yts(text);
    if (!videoSearch.all.length) {
        return global.errori;
    }
    
    const vid = videoSearch.all[0];
    const videoUrl = vid.url;
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}&quality=360p`; // Fijar calidad a 360p
    const apiResponse = await fetch(apiUrl);
    const delius = await apiResponse.json();

    if (!delius.status) {
        return global.errori;
    }
    
    const downloadUrl = delius.data.download.url;

    // Crear el mensaje informativo del video/audio
    let body = `*『 𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭 』*\n\n` +
               ` *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${vid.title || 'Desconocido'}\n` +
               ` *♕.- 𝙰𝚞𝚝𝚘𝚛:* ${vid.author?.name || 'Desconocido'}\n` +
               ` *⛨.- 𝙲𝚊𝚗𝚊𝚕:* ${vid.author?.url || 'Desconocido'}\n` +
               ` *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚊𝚌𝚒𝚘́𝚗:* ${vid.ago || 'Desconocido'}\n` +
               ` *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗:* ${vid.timestamp || 'Desconocido'}\n` +
               ` *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${vid.views || 'Desconocido'}\n` +
               ` *🝤.- 𝙻𝚒𝚗𝚔:* ${videoUrl}\n\n` +
               `*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚊𝚞𝚍𝚒𝚘, 𝚊𝚐𝚞𝚊𝚝𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*\n\n` +
               `> ৎ୭࠭͢𝒴𝓊𝓚𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ `;

    // Enviar el mensaje informativo con la imagen
    await conn.sendMessage(m.chat, { 
        image: { url: vid.thumbnail }, 
        caption: body 
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '🌹', key: m.key }});
    await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
};

handler.command = ['ytmp3', 'yta'];
export default handler;
