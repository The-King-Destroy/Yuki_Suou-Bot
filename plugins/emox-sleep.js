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
    m.react('😴');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` esta durmiendo con \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` esta durmiendo con \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` está tomando una siesta.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/0684477ff198a678d4821.mp4'; 
        let pp2 = 'https://telegra.ph/file/583b7a7322fd6722751b5.mp4'; 
        let pp3 = 'https://telegra.ph/file/e6ff46f4796c57f2235bd.mp4';
        let pp4 = 'https://telegra.ph/file/06b4469cd5974cf4e28ff.mp4';
        let pp5 = 'https://telegra.ph/file/9213f74b91f8a96c43922.mp4';
        let pp6 = 'https://telegra.ph/file/b93da0c01981f17c05858.mp4';
        let pp7 = 'https://telegra.ph/file/8e0b0fe1d653d6956608a.mp4';
        let pp8 = 'https://telegra.ph/file/3b091f28e5f52bc774449.mp4';
        let pp9 = 'https://telegra.ph/file/7c795529b38d1a93395f6.mp4';
        let pp10 = 'https://telegra.ph/file/6b8e6cc26de052d4018ba.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['sleep/dormir @tag'];
handler.tags = ['emox'];
handler.command = ['sleep','dormir'];
handler.group = true;

export default handler;