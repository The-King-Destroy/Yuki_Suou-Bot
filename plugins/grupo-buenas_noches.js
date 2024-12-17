//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    // React con un emoji al mensaje
    m.react('🌜'); // Cambié el emoji a uno de noche

    // Lista de mensajes de buenas noches
    const messages = [
        "¡Buenas noches! 🌜 Espero que tengas un descanso reparador y sueñes con cosas hermosas.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 🌟 Que la tranquilidad de la noche te envuelva y te prepare para un nuevo día.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 🌌 Recuerda que cada estrella en el cielo es un sueño esperando a hacerse realidad.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 🌙 Deja atrás las preocupaciones de hoy y abraza la paz de la noche.",
        "¡Buenas noches! 🌠 Espero que tus sueños sean tan brillantes como las estrellas que iluminan el cielo.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 💤 Que encuentres serenidad en el silencio de la noche y te despiertes renovado.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣𝐭ⷭ𓆪͟͞ "
    ];

    // Seleccionar un mensaje aleatorio
    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        // Lista de videos para buenas noches
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
        
        // Seleccionar un video aleatorio
        const video = videos[Math.floor(Math.random() * videos.length)];

        // Envía el video y el mensaje correspondiente
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    }
}

handler.help = ['nights/noches'];
handler.tags = ['grupo'];
handler.command = ['nights', 'noche', 'noches', 'Noches'];
handler.group = true;

export default handler;
