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
    m.react('🫣');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `${name2} se sonrojo por ${name || who}.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `${name2} se sonrojo por ${name || who}.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `${name2} se sonrojo.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/a4f925aac453cad828ef2.mp4'; 
        let pp2 = 'https://telegra.ph/file/f19318f1e8dad54303055.mp4'; 
        let pp3 = 'https://telegra.ph/file/15605caa86eee4f924c87.mp4';
        let pp4 = 'https://telegra.ph/file/d301ffcc158502e39afa7.mp4';
        let pp5 = 'https://telegra.ph/file/c6105160ddd3ca84f887a.mp4';
        let pp6 = 'https://telegra.ph/file/abd44f64e45c3f30442bd.mp4';
        let pp7 = 'https://telegra.ph/file/9611e5c1d616209bc0315.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['blush/sonrojarse @tag'];
handler.tags = ['emox'];
handler.command = ['blush','sonrojarse'];
handler.group = true;

export default handler;