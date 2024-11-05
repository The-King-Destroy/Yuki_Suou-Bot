import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`;
    
    try {
        const yt_play = await search(args.join(' '));
        const videoInfo = yt_play[0];
        
        const texto1 = generateResponseText(videoInfo);

        await conn.sendButton(m.chat, wm, texto1, videoInfo.thumbnail, 
            [['', `${usedPrefix}menu`], [' ', `${usedPrefix}supermusic ${videoInfo.url}`], ['', `${usedPrefix}supervideo ${videoInfo.url}`]], null, null, fgif2);
    } catch (e) {
        await conn.reply(m.chat, `*[ ! ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴇɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ. ᴘᴏʀ ғᴀᴠᴏʀ ɪɴᴛᴇɴᴛᴀ ᴍᴀs ᴛᴀʀᴅᴇ..*`, fkontak, m, rcanal);
        console.error(`❗❗ᴇʀʀᴏʀ ${usedPrefix + command} ❗❗`, e);
    }
};

handler.command = ['play3', 'play4'];

async function search(query, options = {}) {
    const searchResult = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return searchResult.videos;
}

function generateResponseText(videoInfo) {
    return `
╭ׅׄ̇─͓̗̗─ׅ̻ׄ╮۪̇߭⊹߭̇︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇߭︹ׅ۪ׄ̇߭̇⊹
┟─⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪╮
╭┄─🍂⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝕐𝕦𝕜𝕚 𝕊𝕦𝕠𝕦໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪╯
│
├ ⚘݄𖠵⃕⁖𖥔. _*𝕋í𝕥𝕦𝕝𝕠*_
├» ${videoInfo.title}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*ℙ𝕦𝕓𝕝𝕚𝕔𝕒𝕕𝕠*_
├» ${videoInfo.ago}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌┈
├ ⚘݄𖠵⃕⁖𖥔. _*𝔻𝕦𝕣𝕒𝕔𝕚ó𝕟*_
├» ${secondString(videoInfo.duration.seconds)}
├╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*𝕍𝕚𝕤𝕥𝕒𝕤*_
├» ${MilesNumber(videoInfo.views)}
├╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*𝔸𝕦𝕥𝕠𝕣(𝕒)*_
├» ${videoInfo.author.name}
├╌╌╌╌╌╌╌╌┈
├ ⚘݄𖠵⃕⁖𖥔. _*𝔼𝕟𝕝𝕒𝕔𝕖*_
├» ${videoInfo.url}
╰ׁ̻۫─۪۬─۟─۪─۫─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪`.trim();
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export default handler;
