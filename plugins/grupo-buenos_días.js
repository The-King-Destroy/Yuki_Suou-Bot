//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

// Definición del manejador
let handler = async (m, { conn }) => {
    // Reacción inicial al mensaje
    try {
        await m.react('🌞');

        // Mensajes personalizados para los buenos días
        const messages = [
            "¡Buenos días! 🌸 Espero que tu día esté lleno de alegría y oportunidades brillantes. Recuerda que cada amanecer es una nueva página en tu historia.",
            "¡Buenos días! ☀️ Que este nuevo día te traiga sonrisas y momentos inolvidables. No olvides compartir tu luz con quienes te rodean.",
            "¡Buenos días! 🌼 Espero que hoy encuentres belleza en cada pequeño detalle y que tu corazón se llene de felicidad.",
            "¡Buenos días! ✨ Que este día esté lleno de inspiración y que cada paso que des te acerque a tus sueños. ¡Disfruta cada momento!",
            "¡Buenos días! 🌷 Espero que hoy sea un día lleno de luz y amor. Recuerda que cada nuevo día es una nueva oportunidad para brillar.",
            "¡Buenos días! 🌺 Que el día de hoy esté lleno de alegría y oportunidades para crecer. No olvides sonreír y disfrutar del viaje."
        ];

        // URLs de los videos disponibles
        const videos = [
            'https://qu.ax/ZVcM.mp4',
            'https://qu.ax/tCblW.mp4',
            'https://qu.ax/kGzZr.mp4',
            'https://qu.ax/iioMV.mp4',
            'https://qu.ax/JgSvx.mp4',
            'https://qu.ax/dvrKi.mp4',
            'https://qu.ax/TZuhK.mp4'
        ];

        // Comprobación de si es un grupo
        if (!m.isGroup) {
            console.error("Este comando solo se puede usar en grupos.");
            return;
        }

        // Selección aleatoria de un video y un mensaje
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // Obtener la lista de participantes del grupo
        let participants = conn.chats[m.chat].participants || [];
        let mentions = participants.map(participant => participant.jid);

        // Verificamos que el video, el mensaje y las menciones sean válidos
        if (randomVideo && randomMessage && mentions.length > 0) {
            // Enviamos el video con el mensaje y menciones
            await conn.sendMessage(m.chat, { 
                video: { url: randomVideo }, 
                gifPlayback: true, 
                caption: randomMessage, 
                mentions 
            }, { quoted: m });
        } else {
            console.error("Error: Video, mensaje o menciones no válidos.");
            await conn.sendMessage(m.chat, { text: "Lo siento, no se pudo enviar el video o el mensaje." }, { quoted: m });
        }
    } catch (error) {
        console.error("Ha ocurrido un error al enviar el mensaje:", error);
        await conn.sendMessage(m.chat, { text: "Lo siento, ha ocurrido un error al enviar el mensaje." }, { quoted: m });
    }
}

// Definición de ayuda, etiquetas y comandos
handler.help = ['dias/days'];
handler.tags = ['grupo'];
handler.command = ['dias', 'días', 'dia', 'día', 'days'];
handler.group = true;

// Exportación del manejador
export default handler;
