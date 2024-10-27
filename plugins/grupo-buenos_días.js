//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🌞');

    // Mensajes personalizados para los buenos días
    const messages = [
        "¡Buenos días! 🌸 Espero que tu día esté lleno de alegría y oportunidades brillantes. Recuerda que cada amanecer es una nueva página en tu historia.",
        "¡Buenos días! ☀️ Que este nuevo día te traiga sonrisas y momentos inolvidables. No olvides compartir tu luz con quienes te rodean.",
        "¡Buenos días! 🌼 Espero que hoy encuentres belleza en cada pequeño detalle y que tu corazón se llene de felicidad.",
        "¡Buenos días! ✨ Que este día esté lleno de inspiración y que cada paso que des te acerque a tus sueños. ¡Disfruta cada momento!",
        "¡Buenos días! 🌷 Espero que hoy sea un día lleno de luz y amor. Recuerda que cada nuevo día es una nueva oportunidad para brillar.",
        "¡Buenos días! 🌺 Que el día de hoy esté lleno de alegría y oportunidades para crecer. No olvides sonreír y disfrutar del viaje."
    ];

    // Seleccionamos un mensaje aleatorio
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
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
        
        // Seleccionamos un video aleatorio
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        
        // Mencionamos a todos en el grupo
        let mentions = conn.chats[m.chat].participants.map(participant => participant.jid);
        
        // Enviamos el mensaje con el video y la mención
        await conn.sendMessage(m.chat, { video: { url: randomVideo }, gifPlayback: true, caption: randomMessage, mentions }, { quoted: m });
    }
}

handler.help = ['dias/days'];
handler.tags = ['grupo'];
handler.command = ['dias','días','dia','día','days'];
handler.group = true;

export default handler;
