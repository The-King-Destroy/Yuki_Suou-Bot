//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }
    
    // Verificamos si se menciona a alguien o se cita un mensaje
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; // Si hay mención, usamos esa
    } else if (m.quoted) {
        who = m.quoted.sender; // Si se cita un mensaje, usamos el emisor de ese mensaje
    } else {
        who = m.sender; // En caso contrario, usamos el emisor
    }

    let name = conn.getName(who); // Nombre de la persona mencionada o del emisor
    let name2 = conn.getName(m.sender); // Nombre del usuario que envía el comando
    m.react('🥵');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` está haciendo un 69 con \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` hizo un 69 con \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` está haciendo un 69! >.<.`.trim();
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
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['sixnine/69 @tag'];
handler.tags = ['nsfws'];
handler.command = ['sixnine','69'];
handler.group = true;

export default handler;
