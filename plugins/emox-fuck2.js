//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }
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
    m.react('🏳️‍🌈');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` se la metió ricamente a \`${name || who}\`.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` Cojio Ricamente a \`${name || who}\`.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` esta cojiendo salvajemente`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/bhUEf.mp4'; 
        let pp2 = 'https://qu.ax/wVHWY.mp4'; 
        let pp3 = 'https://qu.ax/iQHXq.mp4';
        let pp4 = 'https://qu.ax/nfhKg.mp4';
        let pp5 = 'https://qu.ax/PlPj.mp4';
        let pp6 = 'https://qu.ax/Dtwk.mp4';
        let pp7 = 'https://qu.ax/DEE.mp4';
        let pp8 = 'https://qu.ax/ADrNd.mp4';
        let pp9 = 'https://qu.ax/qDZdo.mp4';
        let pp10 = 'https://qu.ax/nRgKj.mp4';
        let pp11 = 'https://qu.ax/TAYRA.mp4';
        let pp12 = 'https://qu.ax/UdtlE.mp4';
        let pp13 = 'https://qu.ax/UUCPt.mp4';
        let pp14 = 'https://qu.ax/AvVl.mp4';
        let pp15 = 'https://qu.ax/BbNEM.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviamos el mensaje con el video y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['fuck2/coger2 @tag'];
handler.tags = ['nsfws'];
handler.command = ['fuck2','coger2'];
handler.group = true;

export default handler;