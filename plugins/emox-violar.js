//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('*[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.*\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('🥵');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *acabás de violar a la putita de* \`${name || who}\` *mientras te decía "metemela durooo más durooo que rico pitote"...
Tenemos que volver a sudar juntos!!.*`;
    } else if (m.quoted) {
        str = `\`${name2}\` *violaste a la zorra mal parida de* \`${name || who}\` *mientras te decía "metemela durooo más durooo que rico pitote"...
Tenemos que volver a sudar juntos!!.*`;
    } else {
        str = `\`${name2}\` *violo a alguien random del grupo por puta.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/cnmn0x.jpg'; 
        let pp2 = 'https://files.catbox.moe/xph5x5.mp4'; 
        let pp3 = 'https://files.catbox.moe/4ffxj8.mp4';
        let pp4 = 'https://files.catbox.moe/f6ovgb.mp4';
        let pp5 = 'https://qu.ax/XmLe.mp4';
        let pp6 = 'https://qu.ax/yiMt.mp4';
        let pp7 = 'https://qu.ax/cdKQ.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['violar/perra @tag'];
handler.tags = ['nsfws'];
handler.command = ['violar', 'perra'];
handler.group = true;

export default handler;