//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🌕');
    
    const messages = [
        "¡Buenas noches! 🌜 Espero que tengas un descanso reparador y sueñes con cosas hermosas.",
        "¡Buenas noches! 🌟 Que la tranquilidad de la noche te envuelva y te prepare para un nuevo día.",
        "¡Buenas noches! 🌌 Recuerda que cada estrella en el cielo es un sueño esperando a hacerse realidad.",
        "¡Buenas noches! 🌙 Deja atrás las preocupaciones de hoy y abraza la paz de la noche.",
        "¡Buenas noches! 🌠 Espero que tus sueños sean tan brillantes como las estrellas que iluminan el cielo.",
        "¡Buenas noches! 💤 Que encuentres serenidad en el silencio de la noche y te despiertes renovado."
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/0n2bf5.mp4',
            'https://files.catbox.moe/zua131.mp4',
            'https://files.catbox.moe/0im4vk.mp4',
            'https://files.catbox.moe/9cm0x9.mp4',
            'https://files.catbox.moe/7kxjhv.mp4',
            'https://files.catbox.moe/id09sr.mp4',
            'https://files.catbox.moe/3kyhf0.mp4',
            'https://files.catbox.moe/4qokmi.mp4'
        ];
     
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    }
}

handler.help = ['nights/noches'];
handler.tags = ['grupo'];
handler.command = ['nights', 'noche', 'noches'];
handler.group = true;

export default handler;
