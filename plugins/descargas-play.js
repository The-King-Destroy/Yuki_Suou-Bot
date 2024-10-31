const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*[ 💠 ] Complementa tu peticion con alguna canción o video (Se recomienda especificar al autor)*.\n\n ⚕️.- Ejemplo *${usedPrefix + command} Next Semester - Twenty One Pilots.*`

    const randomReduction = Math.floor(Math.random() * 5) + 1;
    let search = await yts(text);
    let isVideo = /vid$/.test(command);
    let urls = search.all[0].url;
    let body = `	*『  𝙰 𝙱 𝚂 𝚃 𝚁 𝙰 𝙲 𝚃 - 𝙰 𝙻 𝙻  ł  𝙳 . 𝙻  』*

*☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘: ${search.all[0].title}*
*🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${search.all[0].views}
*🜵.- 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗: ${search.all[0].timestamp}*
*🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚌𝚒𝚘́𝚗: ${search.all[0].ago}*
*🝤.- 𝙻𝚒𝚗𝚔* ${urls}

*🝩.- 𝚂𝚞 ${isVideo ? '𝚟𝚒𝚍𝚎𝚘' : '𝚊𝚞𝚍𝚒𝚘'} s𝚎𝚛𝚊́ 𝚎𝚗𝚟𝚒𝚊𝚍𝚘 𝚎𝚗 𝚞𝚗𝚘𝚜 𝚒𝚗𝚜𝚝𝚊𝚗𝚝𝚎𝚜...*`;
    conn.sendMessage(m.chat, { 
        image: { url: search.all[0].thumbnail }, 
        caption: body 
    });

    let res = await dl_vid(urls)
    let type = isVideo ? 'video' : 'audio';
    let video = res.data.mp4;
    let audio = res.data.mp3;
    conn.sendMessage(m.chat, { 
        [type]: { url: isVideo ? video : audio }, 
        gifPlayback: false, 
        mimetype: isVideo ? "video/mp4" : "audio/mpeg" 
    }, { quoted: m });
}

handler.command = ['p', 'pvid'];
handler.limit = 5;
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
        body: JSON.stringify({
            text: url
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
