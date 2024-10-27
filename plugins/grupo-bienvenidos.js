import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    // Obtener los participantes del grupo
    let groupMetadata = await conn.groupMetadata(m.chat);
    let participants = groupMetadata.participants.map(v => v.id);
    
    // Filtrar los nuevos miembros
    let newMembers = m.mentionedJid || []; // Asumiendo que se mencionan los nuevos miembros en el mensaje
    
    if (newMembers.length > 0) {
        let fakegif = {
            key: { 
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? { remoteJid: m.chat } : {}) 
            },
            message: {
                videoMessage: { 
                    title: 'Yuki', 
                    h: `Hmm`,
                    seconds: '99999', 
                    gifPlayback: true, 
                    caption: '⚘݄𖠵⃕⁖𖥔.𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨❞ ꔷ──᜔◇⃟̣̣⃕✨', 
                    jpegThumbnail: logo5 // Asegúrate de definir logo5 en el contexto correcto
                }
            }
        };

        // Mensaje de bienvenida
        let str = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨𝐬 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨 ${groupMetadata.subject}\n𝐄𝐬𝐩𝐞𝐫𝐚𝐦𝐨𝐬 𝐪𝐮𝐞 𝐥𝐨 𝐩𝐚𝐬𝐞𝐬 𝐛𝐢𝐞𝐧 𝐲 𝐪𝐮𝐞 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐥𝐞𝐚𝐬 𝐥𝐚𝐬 𝐫𝐞𝐠𝐥𝐚𝐬.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ `.trim();

        // Enviar mensaje de bienvenida
        await conn.sendMessage(m.chat, {
            video: { url: 'https://telegra.ph/file/c62071be335ec9e97a0cf.mp4' },
            caption: str,
            gifPlayback: true,
            mentions: newMembers
        }, { quoted: fakegif });
    }
};

handler.help = ['bienvenidos'];
handler.group = true;
handler.admin = true;
handler.tags = ['grupo'];
handler.command = ['bienvenidos', 'nuevos'];

export default handler;
