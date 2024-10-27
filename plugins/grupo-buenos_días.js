//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

const goodMorningMessages = [
    "¡Buenos días! 🌸 Espero que tu día esté lleno de alegría y oportunidades brillantes. Recuerda que cada amanecer es una nueva página en tu historia.",
    "¡Buenos días! ☀️ Que este nuevo día te traiga sonrisas y momentos inolvidables. No olvides compartir tu luz con quienes te rodean.",
    "¡Buenos días! 🌼 Espero que hoy encuentres belleza en cada pequeño detalle y que tu corazón se llene de felicidad.",
    "¡Buenos días! ✨ Que este día esté lleno de inspiración y que cada paso que des te acerque a tus sueños. ¡Disfruta cada momento!",
    "¡Buenos días! 🌷 Espero que hoy sea un día lleno de luz y amor. Recuerda que cada nuevo día es una nueva oportunidad para brillar.",
    "¡Buenos días! 🌺 Que el día de hoy esté lleno de alegría y oportunidades para crecer. No olvides sonreír y disfrutar del viaje.",
];

let handler = async (m, { conn, participants }) => {
    m.react('🎉');

    if (m.isGroup) {
        // Seleccionar un mensaje y un video aleatorio
        const randomMessage = goodMorningMessages[Math.floor(Math.random() * goodMorningMessages.length)];
        const pp = 'https://telegra.ph/file/c62071be335ec9e97a0cf.mp4';
        const videos = [pp];
        const video = videos[Math.floor(Math.random() * videos.length)];

        // Mensaje de buenos días
        let str = `${randomMessage}\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ `.trim();

        // Obtener los JIDs de todos los participantes para mencionarlos
        const allMembers = participants.map(participant => participant.jid);

        // Enviar el mensaje con el video y el mensaje correspondiente, mencionando a todos
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: allMembers }, { quoted: m });
    }
}

// Este evento se activará cuando un miembro se una al grupo
handler.on('group-participants-update', async (update) => {
    // No es necesario agregar lógica aquí, ya que no se requiere el medidor de tiempo
});

handler.help = ['buenosdías'];
handler.tags = ['grupo'];
handler.command = ['buenosdías'];
handler.group = true;

export default handler;
