import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import { promises } from 'fs';
import { join, dirname } from 'path'; // Asegúrate de importar dirname

let handler = async (m, { conn, usedPrefix, text, command }) => {
    try {
        let _package = JSON.parse(await promises.readFile(join(dirname(__filename), '../package.json')).catch(_ => ({}))) || {};
        let { exp, yenes, level, role } = global.db.data.users[m.sender];
        let { min, xp, max } = xpRange(level, global.multiplier);
        let name = await conn.getName(m.sender);
        let _uptime = process.uptime() * 1000;
        let _muptime;
        if (process.send) {
            process.send('uptime');
            _muptime = await new Promise(resolve => {
                process.once('message', resolve);
                setTimeout(resolve, 1000);
            }) * 1000;
        }
        let user = global.db.data.users[m.sender];
        let muptime = clockString(_muptime);
        let uptime = clockString(_uptime);
        let totalreg = Object.keys(global.db.data.users).length;
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let mentionedJid = [who];
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');
        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

        const vid = [
            global.videoBanner1 || 'https://files.catbox.moe/1dtvv7.mp4',
            global.videoBanner2 || 'https://files.catbox.moe/yxpqgu.mp4',
            global.videoBanner3 || 'https://files.catbox.moe/0iw0dc.mp4'
        ];

        let menu = `𔓕꯭  ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝑀𝑒𝓃ú 𝒹𝑒 𝒴𝓊𝓀𝒾꯭⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭𔓕 

🌸 ¡𝓗𝓸𝓵𝓪! 𝓒ó𝓶𝓸 𝓔𝓼𝓽á𝓼 𝓮𝓵 𝓓í𝓪 𝓭𝓮 𝓗𝓸𝔶 *${taguser}* 𝓢𝓸𝔂 *𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾*, ${saludo}. 

┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔 𝖉𝖊 𝖑𝖎𝖓𝖆 𝕭𝖔𝖙ᚐ҉ᚐ 」⪨
┃❥ ⧼👑⧽ *Creador:* ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜
┃❥ ⧼🔱⧽ *Modo:* Publico
┃❥ ⧼🌠⧽ *Baileys:* Multi Device
┃❥ ⧼🤖⧽ *Bot:* ${(conn.user.jid === global.conn.user.jid ? 'Oficial' : 'Sub-Bot')}
┃❥ ⧼⏱️⧽ *Activada:* ${uptime}
┃❥ ⧼👥⧽ *Usuarios:* ${totalreg}
┗━━━━━━━━━━━━━━━━━⪩‎‎
‎┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔 𝖉𝖊 𝖀𝖘𝖚𝖆𝖗𝖎𝖔 」⪨
┃❥ ⧼👤⧽ *Cliente:* ${name}
┃❥ ⧼🌐⧽ *País:* ${global.userNationality}
┃❥ ⧼✨⧽ *Exp:* ${exp}
┃❥ ⧼💴⧽ *Yenes:* ${yenes}
┃❥ ⧼🌟⧽ *Nivel:* ${level}
┃❥ ⧼⚜️⧽ *Rango:* ${role}
┗━━━━━━━━━━━━━━━━━⪩
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ──ׄ*
 *【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】* 
> © 𝒫𝑜𝓀𝑒𝓇𝑒𝒹 𝐵𝓎 ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜`.trim();

        await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣ᚐ҉ᚐ', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false, }, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null });
        await m.react(emojis);

    } catch (e) {
        await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`);
        await m.react(error);
    }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
