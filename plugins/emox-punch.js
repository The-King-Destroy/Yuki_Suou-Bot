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
    m.react('👊');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` golpeó a \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` golpeó a \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se golpeó a sí mismo.`.trim();
    }
    
    if (m.isGroup) { 
        let pp = 'https://telegra.ph/file/8e60a6379c1b72e4fbe0f.mp4';
        let pp2 = 'https://telegra.ph/file/8ac9ca359cac4c8786194.mp4';
        let pp3 = 'https://telegra.ph/file/cc20935de6993dd391af1.mp4';
        let pp4 = 'https://telegra.ph/file/9c0bba4c6b71979e56f55.mp4';
        let pp5 = 'https://telegra.ph/file/5d22649b472e539f27df9.mp4'; 
        let pp6 = 'https://telegra.ph/file/804eada656f96a04ebae8.mp4';
        let pp7 = 'https://telegra.ph/file/3a2ef7a12eecbb6d6df53.mp4';
        let pp8 = 'https://telegra.ph/file/c4c27701496fec28d6f8a.mp4';
        let pp9 = 'https://telegra.ph/file/c8e5a210a3a34e23391ee.mp4';
        let pp10 = 'https://telegra.ph/file/70bac5a760539efad5aad.mp4';
   
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['punch/golpear @tag'];
handler.tags = ['emox'];
handler.command = ['punch','pegar','golpear'];
handler.group = true;

export default handler;