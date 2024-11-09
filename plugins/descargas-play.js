import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `\`\`\`[ 🌹 ] Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did I tell you that I miss you\`\`\``;

    let search = await yts(text);
    if (!search.all.length) throw `\`\`\`[ 🌹 ] No se encontraron resultados para "${text}".\`\`\``;

    let isVideo = /vid$/.test(command);
    let urls = search.all[0].url;

    let body = `\`\`\`⊜─⌈ 📻 ◜YouTube Play◞ 📻 ⌋─⊜

    ≡ Título : » ${search.all[0].title}
    ≡ Views : » ${search.all[0].views}
    ≡ Duration : » ${search.all[0].timestamp}
    ≡ Uploaded : » ${search.all[0].ago}
    ≡ URL : » ${urls}

# 🌹 Su ${isVideo ? 'Video' : 'Audio'} se está enviando, espere un momento...\`\`\``;

    await conn.sendMessage(m.chat, { 
        image: { url: search.all[0].thumbnail }, 
        caption: body + `\n\n> ♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝓸𝓊-𝐵𝑜𝓉ᚐ҉ᚐ`
    }, { quoted: m });

    try {
        let res = await dl_vid(urls);
        let type = isVideo ? 'video' : 'audio';
        let mediaUrl = isVideo ? res.data.mp4 : res.data.mp3;

        await conn.sendMessage(m.chat, { 
            [type]: { url: mediaUrl }, 
            gifPlayback: false, 
            mimetype: isVideo ? "video/mp4" : "audio/mpeg" 
        }, { quoted: m });
    } catch (error) {
        console.error('Error al descargar el video/audio:', error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al intentar descargar el video/audio. Intente más tarde.' }, { quoted: m });
    }
}

handler.command = ['play1', 'playvid']; 
handler.help = ['play1', 'playvid']; 
handler.tags = ['descargas'];
export default handler;

async function dl_vid(url) {
    const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'api_key': 'free',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: url })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
