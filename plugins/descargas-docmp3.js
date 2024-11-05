import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Ingresa un link de YouTube\n*✧ Ejemplo:* ${usedPrefix}${command} https://youtu.be/oGmW2CF001I`);
    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${text}`)
    let dp = await d2.json()

    const getBuffer = async (url) => {
        try {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            return Buffer.from(buffer);
        } catch (error) {
            console.error("Error al obtener el buffer", error);
            throw new Error("Error al obtener el buffer");
        }
    }

    // Obtener información del video
    const vid = {
        title: dp.result.title || 'Desconocido',
        author: dp.result.author?.name || 'Desconocido',
        authorUrl: dp.result.author?.url || 'Desconocido',
        ago: dp.result.ago || 'Desconocido',
        timestamp: dp.result.timestamp || 'Desconocido',
        views: dp.result.views || 'Desconocido',
        thumbnail: dp.result.thumbnail || '',
        audioUrl: dp.result.media.mp3,
    };

    // Enviar el mensaje con la información y la imagen del audio solicitado
    let messageCaption = `*『 𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭 』*\n\n *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${vid.title}\n *♕.- 𝙰𝚞𝚝𝚘𝚛:* ${vid.author}\n *⛨.- 𝙲𝚊𝚗𝚊𝚕:* ${vid.authorUrl}\n *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚌𝚒𝚘́𝚗:* ${vid.ago}\n *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚘́𝚗:* ${vid.timestamp}\n *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${vid.views}\n *🝤.- 𝙻𝚒𝚗𝚔:* ${text}\n\n*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚊𝚞𝚍𝚒𝚘, 𝚊𝚐𝚞𝚊𝚝𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*\n\n> ♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝓸𝓊-𝐵𝑜𝓉ᚐ҉ᚐ`;

    if (vid.thumbnail) {
        const imgBuffer = await getBuffer(vid.thumbnail);
        await conn.sendMessage(m.chat, { image: imgBuffer, caption: messageCaption }, { quoted: m });
    }

    // Enviar el audio por separado
    let audiop = await getBuffer(vid.audioUrl);
    await conn.sendMessage(m.chat, { document: audiop, caption: `\`✦ Pedido terminado\``, mimetype: 'audio/mpeg', fileName: `${vid.title}.mp3` }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

handler.help = ['ytmp3doc']
handler.tags = ['descargas']
handler.command = /^(ytmp3doc|ytadoc)$/i
handler.premium = false
handler.register = true

export default handler
