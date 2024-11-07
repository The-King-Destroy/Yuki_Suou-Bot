
import yts from 'yt-search';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    try {
        const yt_play = await search(args.join(' '));
        if (!yt_play.length) throw `Error: Vídeo no encontrado`;

        const video = yt_play[0];
        const texto1 = `
╭ׅׄ̇─͓̗̗─ׅ̻ׄ╮۪̇߭⊹߭̇︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇߭︹ׅ۪ׄ̇߭̇⊹
┟─⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪╮
╭┄─🍂⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝕐𝕦𝕜𝕚 𝕊𝕦𝕠𝕦໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪╯
│
├ ⚘݄𖠵⃕⁖𖥔. _*𝕋í𝕥𝕦𝕝𝕠*_
├» ${video.title}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*ℙ𝕦𝕓𝕝𝕚𝕔𝕒𝕕𝕠*_
├» ${video.ago}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌┈
├ ⚘݄𖠵⃕⁖𖥔. _*𝔻𝕦𝕣𝕒𝕔𝕚ó𝕟*_
├» ${video.timestamp}
├╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*𝕍𝕚𝕤𝕥𝕒𝕤*_
├» ${MilesNumber(video.views)}
├╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*𝔸𝕦𝕥𝕠𝕣(𝕒)*_
├» ${video.author.name}
├╌╌╌╌╌╌╌╌┈
├ ⚘݄𖠵⃕⁖𖥔. _*𝔼𝕟𝕝𝕒𝕔𝕖*_
├» ${video.url}
╰ׁ̻۫─۪۬─۟─۪─۫─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪`.trim();

        const buttons = [
            { buttonId: `${usedPrefix}ytmp3 ${video.url}`, buttonText: { displayText: '🎵 MP3' }, type: 1 },
            { buttonId: `${usedPrefix}ytmp4 ${video.url}`, buttonText: { displayText: '📹 MP4' }, type: 1 },
            { buttonId: `${usedPrefix}ytmp4doc ${video.url}`, buttonText: { displayText: '📄 MP4DOC' }, type: 1 },
            { buttonId: `${usedPrefix}ytsearch ${video.url}`, buttonText: { displayText: '🔍 MÁS VÍDEOS' }, type: 1 }
        ];

        await conn.sendButton(m.chat, texto1, video.thumbnail, buttons);

    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `*[ ! ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴇɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ғᴀᴠᴏʀ ɪɴᴛᴇɴᴛᴀ ᴍᴀs ᴛᴀʀᴅᴇ..*`, m);
    }
};

handler.command = ['play', 'play2', 'play3', 'play4'];
handler.group = true;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}
