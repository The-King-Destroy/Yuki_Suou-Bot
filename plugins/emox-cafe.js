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
    m.react('');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `${name2} está tomando un café con ${name || who}.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `${name2} está tomando un café con ${name || who}.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `${name2} está tomando un café.`.trim();
    }

    if (m.isGroup) {
        let pp = 'https://c.tenor.com/EzHJ6yxWY9oAAAAM/coffee.gif'; 
        let pp2 = 'https://c.tenor.com/2l5MvIhM-o4AAAAM/coffee.gif'; 
        let pp3 = 'https://c.tenor.com/Wi4UzQjzZwYAAAAM/coffee.gif';
        let pp4 = 'https://c.tenor.com/hXo1Pyz3lSwAAAAM/coffee.gif';
        let pp5 = 'https://c.tenor.com/C3TgEzQaJlIAAAAM/coffee.gif';
        let pp6 = 'https://c.tenor.com/CwTm7YgRkKAAAAAM/coffee.gif';

        const imgs = [pp, pp2, pp3, pp4, pp5, pp6];
        const img = imgs[Math.floor(Math.random() * imgs.length)];

        // Enviamos el mensaje con la imagen y el mensaje correspondiente
        let mentions = [who]; // Mencionamos al usuario que se ha citado o mencionado
        conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['.cafe @tag'];
handler.tags = ['emox'];
handler.command = ['cafe'];
handler.group = true;

export default handler;
```