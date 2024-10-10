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
    m.react('😥');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `${name2} está triste por ${name || who}.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `${name2} está triste por ${name || who}.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `${name2} está muy triste.`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/9c69837650993b40113dc.mp4'; 
        let pp2 = 'https://telegra.ph/file/071f2b8d26bca81578dd0.mp4'; 
        let pp3 = 'https://telegra.ph/file/0af82e78c57f7178a333b.mp4';
        let pp4 = 'https://telegra.ph/file/8fb8739072537a63f8aee.mp4';
        let pp5 = 'https://telegra.ph/file/4f81cb97f31ce497c3a81.mp4';
        let pp6 = 'https://telegra.ph/file/6d626e72747e0c71eb920.mp4';
        let pp7 = 'https://telegra.ph/file/8fd1816d52cf402694435.mp4';
        let pp8 = 'https://telegra.ph/file/3e940fb5e2b2277dc754b.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['sad/triste @tag'];
handler.tags = ['emox'];
handler.command = ['sad', 'triste'];
handler.group = true;

export default handler;