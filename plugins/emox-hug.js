//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    
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
    m.react('🫂');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` le dió un fuerte abrazo a \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` abrazo a \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se abrazó a sí mismo`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/6a3aa01fabb95e3558eec.mp4'; 
        let pp2 = 'https://telegra.ph/file/0e5b24907be34da0cbe84.mp4'; 
        let pp3 = 'https://telegra.ph/file/6bc3cd10684f036e541ed.mp4';
        let pp4 = 'https://telegra.ph/file/3e443a3363a90906220d8.mp4';
        let pp5 = 'https://telegra.ph/file/56d886660696365f9696b.mp4';
        let pp6 = 'https://telegra.ph/file/3eeadd9d69653803b33c6.mp4';
        let pp7 = 'https://telegra.ph/file/436624e53c5f041bfd597.mp4';
        let pp8 = 'https://telegra.ph/file/5866f0929bf0c8fe6a909.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['hug/abrazar @tag'];
handler.tags = ['emox'];
handler.command = ['hug','abrazar'];
handler.group = true;

export default handler;