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
    m.react('💆‍♂️');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` acarició a \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` acarició a \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se acarició a sí mismo.`.trim();
    }
    
    if (m.isGroup) { 
        let pp = 'https://telegra.ph/file/f75aed769492814d68016.mp4';
        let pp2 = 'https://telegra.ph/file/4f24bb58fe580a5e97b0a.mp4';
        let pp3 = 'https://telegra.ph/file/30206abdcb7b8a4638510.mp4';
        let pp4 = 'https://telegra.ph/file/ecd7aeae5b2242c660d41.mp4';
        let pp5 = 'https://telegra.ph/file/6d3ba201bcdd1fd2c1408.mp4';
        let pp6 = 'https://telegra.ph/file/d5dbdcf845d2739dbe45e.mp4';
        let pp7 = 'https://telegra.ph/file/c9a529908d4e0b71d7c5a.mp4';
        let pp8 = 'https://telegra.ph/file/b7bc277ddef1af913827c.mp4';
        let pp9 = 'https://telegra.ph/file/8b01e180dfb7e98d5a4f8.mp4';
        let pp10 = 'https://telegra.ph/file/901f13852aa65f9628d96.mp4';
           
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['patt/acariciar @tag'];
handler.tags = ['emox'];
handler.command = ['patt','acariciar'];
handler.group = true;

export default handler;
