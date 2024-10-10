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
    m.react('🥺');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `${name2} le está haciendo pucheros a ${name || who}.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `${name2} le está haciendo pucheros a ${name || who}.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `${name2} está haciendo pucheros.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/e2a25adcb74689a58bcc6.mp4'; 
        let pp2 = 'https://telegra.ph/file/5239f6f8837383fa5bf2d.mp4'; 
        let pp3 = 'https://telegra.ph/file/63564769ec715d3b6379d.mp4';
        let pp4 = 'https://telegra.ph/file/06f7458e3a6a19deb5173.mp4';
        let pp5 = 'https://telegra.ph/file/cdd5e7db98e1d3a46231a.mp4';
        let pp6 = 'https://telegra.ph/file/070e2c38c9569a764cc10.mp4';
        let pp7 = 'https://telegra.ph/file/c1834a34cd0edfd2bdbe1.mp4';
        let pp8 = 'https://telegra.ph/file/4ceafdd813e727548cb2f.mp4';
        let pp9 = 'https://telegra.ph/file/7aa2790c3eba5b27416ce.mp4';
        let pp10 = 'https://telegra.ph/file/ec2d25e70b165a19e7ef7.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['pout/pucheros @tag'];
handler.tags = ['emox'];
handler.command = ['pout', 'pucheros'];
handler.group = true;

export default handler;