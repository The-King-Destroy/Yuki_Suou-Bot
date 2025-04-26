//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`《✦》El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw on*`);
    }
    
    let who;
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *se lo metió sabrosamente a* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *cogió fuertemente a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está cogiendo! >.<*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/6ea4ddf2f9f4176d4a5c0.mp4'; 
        let pp2 = 'https://telegra.ph/file/66535b909845bd2ffbad9.mp4'; 
        let pp3 = 'https://telegra.ph/file/1af11cf4ffeda3386324b.mp4';
        let pp4 = 'https://telegra.ph/file/e2beba258ba83f09a34df.mp4';
        let pp5 = 'https://telegra.ph/file/21543bac2383ce0fc6f51.mp4';
        let pp6 = 'https://telegra.ph/file/1baf2e8577d5118c03438.mp4';
        let pp7 = 'https://telegra.ph/file/80aa0e43656667b07d0b4.mp4';
        let pp8 = 'https://telegra.ph/file/7638618cf43e499007765.mp4';
        let pp9 = 'https://telegra.ph/file/1c7d59e637f8e5915dbbc.mp4';
        let pp10 = 'https://telegra.ph/file/e7078700d16baad953348.mp4';
        let pp11 = 'https://telegra.ph/file/100ba1caee241e5c439de.mp4';
        let pp12 = 'https://telegra.ph/file/3b1d6ef30a5e53518b13b.mp4';
        let pp13 = 'https://telegra.ph/file/249518bf45c1050926d9c.mp4';
        let pp14 = 'https://telegra.ph/file/34e1fb2f847cbb0ce0ea2.mp4';
        let pp15 = 'https://telegra.ph/file/52c82a0269bb69d5c9fc4.mp4';
        let pp16 = 'https://telegra.ph/file/ca64bfe2eb8f7f8c6b12c.mp4';
        let pp17 = 'https://telegra.ph/file/8e94da8d393a6c634f6f9.mp4';
        let pp18 = 'https://telegra.ph/file/216b3ab73e1d98d698843.mp4';
        let pp19 = 'https://telegra.ph/file/1dec277caf371c8473c08.mp4';
        let pp20 = 'https://telegra.ph/file/bbf6323509d48f4a76c13.mp4';
        let pp21 = 'https://telegra.ph/file/f8e4abb6923b95e924724.mp4';
        let pp22 = 'https://telegra.ph/file/bd4d5a957466eee06a208.mp4';
        let pp23 = 'https://telegra.ph/file/a91d94a51dba34dc1bed9.mp4';
        let pp24 = 'https://telegra.ph/file/b08996c47ff1b38e13df0.mp4';
        let pp25 = 'https://telegra.ph/file/58bcc3cd79cecda3acdfa.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15, pp16, pp17, pp18, pp19, pp20, pp21, pp22, pp23, pp24, pp25];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['fuck/coger @tag'];
handler.tags = ['nsfw'];
handler.command = ['fuck','coger'];
handler.group = true;

export default handler;
