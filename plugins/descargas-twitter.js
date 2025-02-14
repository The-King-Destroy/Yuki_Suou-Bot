import axios from 'axios';
let enviando = false;

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
    if (!args || !args[0]) return conn.reply(m.chat, `${emoji} Te faltó el link de una imagen/video de twitter.`, m);
    if (enviando) return; 
    enviando = true;

    try {
        const apiResponse = await axios.get(`https://delirius-apiofc.vercel.app/download/twitterdl?url=${args[0]}`);
        const res = apiResponse.data;

        const caption = res.caption ? res.caption : `${emoji} Aqui tienes ฅ^•ﻌ•^ฅ.`;

        if (res?.type === 'video') {
            await conn.sendMessage(m.chat, { video: { url: res.media[0].url }, caption: caption }, { quoted: m });
        } else if (res?.type === 'image') {
            await conn.sendMessage(m.chat, { image: { url: res.media[0].url }, caption: caption }, { quoted: m });
        }

        enviando = false;
        return;

    } catch (error) {
        enviando = false;
        console.error(error);         
        conn.reply(m.chat, `${msm} Error al descargar su archivo`, m);
    }
};

handler.help = ['twitter <url>'];
handler.tags = ['dl'];
handler.command = ['x', 'xdl', 'dlx', 'twdl', 'tw', 'twt', 'twitter'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
