import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Ingresa una consulta\n*✧ Ejemplo:* ${usedPrefix}${command} Joji Ew`);
    
    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
    
    let ouh = await fetch(`https://api.nyxs.pw/dl/spotify-direct?title=${text}`);
    let gyh = await ouh.json();
    
    if (!gyh.result) throw m.reply(`*No se encontró la canción*`);
    
    const info = `✨ *TITULO:*\n_${gyh.result.title} - ${gyh.result.version || 'Versión original'}_\n\n👤 *ARTISTA:*\n» ${gyh.result.artists}\n\n🔗 *LINK:*\n» ${gyh.result.urlSpotify}\n\n✨️ *Enviando Canción....*\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ⷭ𓆪͟͞ `;

    m.reply(info);

    const doc = {
        audio: { url: gyh.result.url },
        mimetype: 'audio/mp4',
        fileName: `${gyh.result.title}.mp3`,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 2,
                mediaUrl: gyh.result.urlSpotify,
                title: gyh.result.title,
                sourceUrl: gyh.result.urlSpotify,
                thumbnail: await (await conn.getFile(gyh.result.thumbnail)).data
            }
        }
    };
    
    await conn.sendMessage(m.chat, doc, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

handler.help = ['spotify'];
handler.tags = ['descargas'];
handler.command = /^(spotify|sp)$/i;
handler.premium = false;
handler.register = true;

export default handler;
