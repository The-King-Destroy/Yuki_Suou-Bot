import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`

    await m.react('⏳');
    let res = await yts(text);
    let play = res.videos[0];

    if (!play) {
        throw `Error: Vídeo no encontrado`;
    }

    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    let txt =   '⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪\n';
    txt += '🍂⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝕐𝕦𝕜𝕚 𝕊𝕦𝕠𝕦໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪̇ \n';
    txt += `> *𝕋í𝕥𝕦𝕝𝕠* : _${title}_\n`;
    txt += `> *𝔸𝕦𝕥𝕠𝕣(𝕒)* : _${ago}_\n`;
    txt += `> *𝔻𝕦𝕣𝕒𝕔𝕚ó𝕟* : _${timestamp}_\n`;
    txt += `> *𝕍𝕚𝕤𝕥𝕒𝕤* : _${views.toLocaleString()}_\n`;
    txt += `> *𝔼𝕟𝕝𝕒𝕔𝕖* : _https://www.youtube.com/watch?v=${videoId}_\n`;
    txt += '\n\n> ♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ \n';

    await conn.sendButton2(m.chat, txt, '. ', thumbnail, [
        ['MP3🎵', `${usedPrefix}ytmp3 ${url}`],      
        ['MP4📹', `${usedPrefix}ytmp4 ${url}`], 
        ['MP4DOC📹📄', `${usedPrefix}ytmp4doc ${url}`], 
        ['MÁS VÍDEOS', `${usedPrefix}ytsearch ${url}`]
        ], null, [['ℂ𝕒𝕟𝕒𝕝', 'https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T']], m);

    await m.react('✅');
};

handler.help = ['play6'];
handler.tags = ['descargas'] 
handler.group = false
//handler.limit = 2
handler.command = ['play6',];

export default handler;