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
        str = `\`${name2}\` *tiene sexo fuertemente con* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *tiene sexo con* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *tiene sexo apasionadamente.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/a2ad1dd463a935d5dfd17.mp4'; 
        let pp2 = 'https://telegra.ph/file/e3abb2e79cd1ccf709e91.mp4'; 
        let pp3 = 'https://telegra.ph/file/c5be4a906531c6731cd41.mp4';
        let pp4 = 'https://telegra.ph/file/9c4b894e034c290df75e4.mp4';
        let pp5 = 'https://telegra.ph/file/3246f62c61a0ebebcb5c8.mp4';
        let pp6 = 'https://telegra.ph/file/820460f05d76bb2329bbc.mp4';
        let pp7 = 'https://telegra.ph/file/2072f260302c6bb97682a.mp4';
        let pp8 = 'https://telegra.ph/file/22d0ef801c93c1b2ac074.mp4';
        let pp9 = 'https://telegra.ph/file/6f66fd1974e8df1496768.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['sexo/sex @tag'];
handler.tags = ['nsfw'];
handler.command = ['sexo','sex'];
handler.group = true;

export default handler
