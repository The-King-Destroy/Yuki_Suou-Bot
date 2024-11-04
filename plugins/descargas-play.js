import yts from 'yt-search'; 

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `\`\`\`[ 🌹 ] Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did i tell u that i miss you\`\`\``;

    let search = await yts(text);
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
        caption: body + `\n\n> ♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ`
    }, { quoted: m });

    let res = await dl_vid(urls);
    let type = isVideo ? 'video' : 'audio';
    let mediaUrl = isVideo ? res.data.mp4 : res.data.mp3;

    await conn.sendMessage(m.chat, { 
        [type]: { url: mediaUrl }, 
        gifPlayback: false, 
        mimetype: isVideo ? "video/mp4" : "audio/mpeg" 
    }, { quoted: m });
}

handler.command = ['play1', 'playvid']; // Cambiado 'playvid' a 'play2'
handler.help = ['play1', 'playvid']; // Cambiado 'playvid' a 'play2'
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
