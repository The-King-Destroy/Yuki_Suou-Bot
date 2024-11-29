import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('🌸 *Ingresa el link de Facebook*');
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(url)}`);

        if (!data.status || !data.data || data.data.length === 0) throw m.reply('Error');

        // Prioritize 720p (HD) and fallback to 360p (SD)
        let video = data.data.find(v => v.resolution === '720p (HD)') || data.data.find(v => v.resolution === '360p (SD)');
        
        if (video && video.url) {
            const videoBuffer = await axios.get(video.url, { responseType: 'arraybuffer' }).then(res => res.data);
            const caption = `🌷 *Para:* @${sender}`;

            await conn.sendMessage(
                m.chat, {
                video: videoBuffer,
                mimetype: "video/mp4",
                fileName: `video.mp4`,
                caption: caption,
                mentions: [m.sender],
            }, {
                quoted: m
            }
            );
        } else {
            throw m.reply('Error');
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `Error: ${error}`, m);
    }
}

handler.help = ['fb *<link>*']
handler.tags = ['descargas']
handler.command = /^(fbdownload|facebook|fb(dl)?)$/i

handler.limit = true
handler.register = true

export default handler
