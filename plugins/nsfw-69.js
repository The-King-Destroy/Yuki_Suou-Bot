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
        str = `\`${name2}\` *está haciendo un 69 con* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *hizo un 69 con* \`${name || who}\`.`; 
    } else {
        str = `\`${name2}\` *está haciendo un 69! >.<.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/bb4341187c893748f912b.mp4'; 
        let pp2 = 'https://telegra.ph/file/c7f154b0ce694449a53cc.mp4'; 
        let pp3 = 'https://telegra.ph/file/1101c595689f638881327.mp4';
        let pp4 = 'https://telegra.ph/file/f7f2a23e9c45a5d6bf2a1.mp4';
        let pp5 = 'https://telegra.ph/file/a2098292896fb05675250.mp4';
        let pp6 = 'https://telegra.ph/file/16f43effd7357e82c94d3.mp4';
        let pp7 = 'https://telegra.ph/file/55cb31314b168edd732f8.mp4';
        let pp8 = 'https://telegra.ph/file/1cbaa4a7a61f1ad18af01.mp4';
        let pp9 = 'https://telegra.ph/file/1083c19087f6997ec8095.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9];
        const video = videos[Math.floor(Math.random() * videos.length)];
     
        let mentions = [who]; 
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['sixnine/69 @tag'];
handler.tags = ['nsfw'];
handler.command = ['sixnine','69'];
handler.group = true;

export default handler;
