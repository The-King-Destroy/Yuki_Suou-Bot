
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix }) => {
    const mentionedUser = m.mentionedJid[0] || (m.reply ? m.reply.sender : null);

    if (!mentionedUser) {
        return conn.reply(m.chat, `*🌹 Uso Correcto: ${usedPrefix}pfp @usuario*`, m);
    }

    try {
        // Obtener la imagen de perfil del usuario mencionado
        const profilePicUrl = `https://api.example.com/getProfilePic?user=${mentionedUser}`; // Reemplaza con la API adecuada
        const response = await axios.get(profilePicUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Subir la imagen a Catbox
        let link = await catbox(imageBuffer);
        
        // Enviar la imagen al chat
        await conn.sendFile(m.chat, link, 'perfil.jpg', '', m);
        await m.react('✅');

    } catch (error) {
        console.error('Error en el proceso:', error);
        return conn.reply(m.chat, '❌ Ocurrió un error al procesar la imagen. ' + error.message, m);
    }
};

handler.command = handler.help = ['pfp'];
handler.tags = ['perfil'];
handler.group = true; // Si deseas que el comando funcione solo en grupos
handler.register = true;

export default handler;

async function catbox(content) {
    const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
    const blob = new Blob([content.toArrayBuffer()], { type: mime });
    const formData = new FormData();
    const randomBytes = crypto.randomBytes(5).toString("hex");
    formData.append("reqtype", "fileupload");
    formData.append("fileToUpload", blob, randomBytes + "." + ext);

    const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
        },
    });

    return await response.text();
}
