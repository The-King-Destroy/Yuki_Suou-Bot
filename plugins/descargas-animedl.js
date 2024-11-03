import { File } from 'megajs';
import path from 'path';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {

        if (!args[0]) return m.reply(`\`\`\`[🌹] Uso correcto del comando: ${usedPrefix + command} <ID del anime> <capitulo>\n\nEjemplo: ${usedPrefix+command} dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-darou-ka-movie-orion-no-ya 1\`\`\``);
        const animeId = args[0];
        const episode = args[1] || 1;
        const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episode}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener datos de la API');
        const { servers } = await response.json();
        const megaLink = servers[0].find(server => server.server === 'mega').url;
        if (!megaLink) throw new Error('No se encontró el enlace de MEGA ');
        const file = File.fromURL(megaLink);
        await file.loadAttributes();
         m.reply(`_*Nota: Ten en cuenta que los animes en emisión solo duran 3 días en la nube por lo que no se descargará después de ése lapso de tiempo. gracias por usar a 𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉 🌹*_`)
        const caption = `🥀 *Nombre:* ${file.name}\n⚜️ *Tamaño:* ${formatBytes(file.size)}\n\n${wm}`;
        const dataBuffer = await file.downloadBuffer();
        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };
        const mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        await conn.sendFile(m.chat, dataBuffer, file.name, caption, m, null, { mimetype, asDocument: true });
}
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

handler.help = ['animedl'];
handler.tags = ['descargas'];
handler.command = ['animedl', 'animedoc', 'anidl'];
handler.register = true
handler.premium = true
export default handler;
