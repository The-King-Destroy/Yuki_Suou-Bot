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
    m.react('🗡️');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` mato a \`${name || who}\` ( ⚆ _ ⚆ ).`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` mato a \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se mató a sí mismo ( ⚆ _ ⚆ ).`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/GQLO.mp4';
        let pp2 = 'https://qu.ax/bzFY.mp4';
        let pp3 = 'https://qu.ax/OQFE.mp4';
        let pp4 = 'https://qu.ax/GQLO.mp4';
        let pp5 = 'https://qu.ax/GssX.mp4';
        let pp6 = 'https://qu.ax/NeQYU.mp4';
        let pp7 = 'https://qu.ax/ypqXb.mp4';
        let pp8 = 'https://qu.ax/rxME.mp4';
        let pp9 = 'https://qu.ax/mNLhE.mp4';
        let pp10 = 'https://qu.ax/WVjPF.mp4;
                
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['kill/matar @tag'];
handler.tags = ['emox'];
handler.command = ['kill','matar'];
handler.group = true;

export default handler;