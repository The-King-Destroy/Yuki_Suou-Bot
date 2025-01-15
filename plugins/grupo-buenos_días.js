//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('☀️');

    const messages = [
        "¡Buenos días! 🌞 Espero que tu día esté lleno de alegría y oportunidades brillantes.",
        "¡Buenos días! 🔆 Que este nuevo día te traiga sonrisas y momentos inolvidables.",
        "¡Buenos días! 🌤️ Espero que hoy encuentres belleza en cada pequeño detalle.",
        "¡Buenos días! ✨ Que este día esté lleno de inspiración y que cada paso te acerque a tus sueños.",
        "¡Buenos días! 🌅 Espero que hoy sea un día lleno de luz y amor.",
        "¡Buenos días! 🌄 Que el día de hoy esté lleno de alegría y oportunidades para crecer."
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        let videos = [
            'https://qu.ax/ZVcM.mp4', 
            'https://qu.ax/tCblW.mp4', 
            'https://qu.ax/kGzZr.mp4',
            'https://qu.ax/iioMV.mp4',
            'https://qu.ax/JgSvx.mp4',
            'https://qu.ax/dvrKi.mp4',
            'https://qu.ax/TZuhK.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    }
}

handler.help = ['dias/days'];
handler.tags = ['grupo'];
handler.command = ['dias', 'dia', 'days'];
handler.group = true;

export default handler;
