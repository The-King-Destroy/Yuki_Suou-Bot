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
    m.react('🎉');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `${name2} Bienvenid@ al grupo ${name || who} esperemos la pases bien y que porfavor leas las reglas.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `${name2} hola ${name || who} bienvenid@ grupo espero lo pasés muy bien y que lo disfrutes.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `${name2} Hola le doy la bienvenida a todos los nuevos y espero que lean las reglas sin más que decir pueden disfrutar del grupo y diviértanse.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/c62071be335ec9e97a0cf.mp4'; 
        
        const videos = [pp];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['bienvenidos/nuevos @tag'];
handler.tags = ['grupo'];
handler.command = ['bienvenidos','nuevos'];
handler.group = true;

export default handler;
