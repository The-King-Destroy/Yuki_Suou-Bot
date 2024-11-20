
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const mentionedUser = m.mentionedJid[0] || (m.reply ? m.reply.sender : null);

    // Comprobar si hay un usuario válido
    if (!mentionedUser) {
        return conn.reply(m.chat, `*🌹 Uso Correcto: ${usedPrefix + command} @usuario*`, m);
    }

    try {
        // Obtener la foto de perfil del usuario mencionado
        const profilePicUrl = `https://api.example.com/getProfilePic?user=${mentionedUser}`; // Reemplaza con la API adecuada
        console.log(`Obteniendo imagen de: ${profilePicUrl}`);
        
        const response = await axios.get(profilePicUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Subir la imagen a IMGBB
        const formData = new FormData();
        formData.append('image', imageBuffer.toString('base64'));  // Convertir a base64

        console.log('Subiendo imagen a IMGBB...');
        let apiResponse = await axios.post('https://api.imgbb.com/1/upload?key=1f55ea75f24df783643940f3eacbbc96', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Obtener la URL de la imagen subida
        const uploadedImageUrl = apiResponse.data.data.url;
        console.log(`Imagen subida a: ${uploadedImageUrl}`);

        // Descargar la imagen desde IMGBB
        const imageToSend = await fetch(uploadedImageUrl);
        if (!imageToSend.ok) throw new Error('Error al descargar la imagen desde IMGBB');

        const imageBufferToSend = await imageToSend.buffer();

        // Enviar la imagen directamente al chat
        await conn.sendFile(m.chat, imageBufferToSend, 'perfil.jpg', `🌷 Foto de perfil de @${mentionedUser.split('@')[0]}`, m, false, { contextInfo: { mentionedJid: [mentionedUser] } });

    } catch (error) {
        console.error('Error en el proceso:', error);
        return conn.reply(m.chat, '❌ Ocurrió un error al procesar la imagen. ' + error.message, m);
    }
};

handler.help = ['pfp @usuario'];
handler.tags = ['perfil'];
handler.command = ['pfp', 'perfil'];
handler.group = true;
handler.register = true;

export default handler;
