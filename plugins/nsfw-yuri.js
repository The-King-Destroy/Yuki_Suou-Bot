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
        str = `\`${name2}\` *hizo tijeras con* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está haciendo tijeras con* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *está haciendo tijeras! >.<*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/d11af77009e15383a5f3e.mp4'; 
        let pp2 = 'https://telegra.ph/file/b24f36949398986232952.mp4'; 
        let pp3 = 'https://telegra.ph/file/aae61f727baf48c0a25f8.mp4';
        let pp4 = 'https://telegra.ph/file/8baea377988065dd28520.mp4';
        let pp5 = 'https://telegra.ph/file/553649d8f95f7ff86b9f2.mp4';
        let pp6 = 'https://telegra.ph/file/c3b386d99c84e7c914a6e.mp4';
        let pp7 = 'https://telegra.ph/file/a438a1aec11241b8a63eb.mp4';
        let pp8 = 'https://telegra.ph/file/0c5a22faacbc91d4e93a5.mp4';
        let pp9 = 'https://telegra.ph/file/d999becfa325549d1c976.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['lesbianas/tijeras @tag'];
handler.tags = ['nsfw'];
handler.command = ['yuri','lesbianas','tijeras'];
handler.group = true;

export default handler;