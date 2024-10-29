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
        str = `\`${name2}\` follo fuertemente a la perra de \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` se la metió durísimo a la perrita de \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` está follando ricamente`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/7ito13.mp4'; 
        let pp2 = 'https://files.catbox.moe/6to3zj.mp4'; 
        let pp3 = 'https://files.catbox.moe/8j94sh.mp4';
        let pp4 = 'https://files.catbox.moe/ylfpb7.mp4';
        let pp5 = 'https://files.catbox.moe/kccjc7.mp4';
        let pp6 = 'https://files.catbox.moe/lt9e1u.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['follar @tag'];
handler.tags = ['nsfws'];
handler.command = ['follar'];
handler.group = true;

export default handler;