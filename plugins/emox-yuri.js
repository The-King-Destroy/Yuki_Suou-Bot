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
    m.react('✂️');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` hizo tijeras con \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` está haciendo tijeras con \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` está haciendo tijeras! >.<`.trim();
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
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['lesbianas/tijeras @tag'];
handler.tags = ['nsfws'];
handler.command = ['lesbianas','tijeras'];
handler.group = true;

export default handler;