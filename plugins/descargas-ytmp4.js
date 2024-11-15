import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    if (!text) {
        const usageMessage = `*[🌹] Complementa tu petición con algún enlace de YouTube.*\n` +
                             `_(Puedes hacer una búsqueda utilizando el comando ${usedPrefix}yts)_\n` +
                             `🌷 Ejemplo: *${usedPrefix + command}* https://youtu.be/sBKR6aUorzA?si=TmC01EGbXUx2DUca`;
        await conn.sendMessage(m.chat, { text: usageMessage });
        return; // Termina la ejecución si no hay texto
    }
    
    await conn.sendMessage(m.chat, { react: { text: '🥀', key: m.key }});

    try {
        const videoSearch = await yts(text);
        if (!videoSearch.all.length) {
            return global.errori;
        }

        const vid = videoSearch.all[0];
        const videoUrl = vid.url;
        const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}&quality=360p`;
        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
            throw new Error('Error en la respuesta del servidor. Intenta nuevamente más tarde.');
        }

        const delius = await apiResponse.json();

        if (!delius.status) {
            throw new Error('No se pudo obtener el enlace de descarga.');
        }

        const downloadUrl = delius.data.download.url;

        // Crear el mensaje informativo del video/audio
        let body = `*『 𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭 』*\n\n` +
                   ` *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${vid.title || 'Desconocido'}\n` + // Cambiado a "𝚃𝚒́𝚝𝚞𝚗𝚍𝚘"
                   ` *♕.- 𝙰𝚞𝚝𝚘𝚛:* ${vid.author?.name || 'Desconocido'}\n` +
                   ` *⛨.- 𝙲𝚊𝚗𝚊𝚕:* ${vid.author.url || 'Desconocido'}\n` +
                   ` *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚊𝚌𝚒𝚘́𝚗:* ${vid.ago || 'Desconocido'}\n` +
                   ` *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗:* ${vid.timestamp || 'Desconocido'}\n` +
                   ` *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${vid.views || 'Desconocido'}\n` +
                   ` *🝤.- 𝙻𝚒𝚗𝚔:* ${videoUrl}\n\n` +
                   `*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚝𝚘 𝚟𝚒𝚍𝚎𝚘, 𝚊𝚐𝚞𝚊𝚝𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*\n\n` +
                   `> ৎ୭࠭͢𝒴𝓊𝓚𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ `;

        // Enviar el mensaje informativo con la imagen
        await conn.sendMessage(m.chat, { 
            image: { url: vid.thumbnail }, 
            caption: body 
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🌹', key: m.key }});
        await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: 'Aquí está tu video descargado.' }, { quoted: m });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { text: `*[❌] Ocurrió un error: ${error.message}*` });
    }
};

handler.command = ['ytv', 'ytmp4'];
export default handler;
