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
    m.react('🙌');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` se da una palmada en la cara por \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` se da una palmada en la cara por las estupideces de \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se da una palmada en la cara.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/fgxlB.mp4'; 
        let pp2 = 'https://qu.ax/JxeF.mp4'; 
        let pp3 = 'https://qu.ax/oGqwt.mp4';
        let pp4 = 'https://qu.ax/RwBkd.mp4';
        let pp5 = 'https://qu.ax/lkznA.mp4';
        let pp6 = 'https://qu.ax/iJpYq.mp4';
        let pp7 = 'https://qu.ax/wfWzD.mp4';
        let pp8 = 'https://qu.ax/QTOPs.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['facepalm/palmada @tag'];
handler.tags = ['emox'];
handler.command = ['facepalm', 'palmada'];
handler.group = true;

export default handler;
