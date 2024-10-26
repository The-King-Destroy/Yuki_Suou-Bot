import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!args[0]) return m.reply(`𝙻𝚘 𝚊𝚗𝚊𝚜 𝚑𝚊𝚌𝚒𝚎𝚗𝚍𝚘 𝚖𝚊𝚕 𝚝𝚎 𝚐𝚞𝚒𝚊𝚛𝚎 ${usedPrefix + command} <ᴀɴɪᴍᴇɪᴅ, ᴘᴀʀᴀ ᴄᴏɴꜱᴜʟᴛᴀʀ ᴇʟ ɪᴅ ᴅᴇʟ ᴀɴɪᴍᴇ ᴜꜱᴀ .ᴀɴɪᴍᴇꜰʟᴠꜱᴇᴀʀᴄʜ> <ᴄᴀᴘɪᴛᴜʟᴏ>\n .animedl to-love-ru-ova 1`);

        const animeId = args[0];
        const episode = args[1] || 1;
        const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episode}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('Error al obtener datos de la API');
        
        const { servers } = await response.json();
        const megaLink = servers[0].find(server => server.server === 'mega')?.url;
        
        if (!megaLink) throw new Error('No se encontró el enlace de MEGA');

        const fileResponse = await fetch(megaLink);
        if (!fileResponse.ok) throw new Error('Error al descargar el archivo');

        const buffer = await fileResponse.buffer();
        const filePath = path.join(__dirname, `${animeId}_${episode}.mp4`); // Cambia la extensión según el tipo de archivo

        fs.writeFileSync(filePath, buffer);

        await conn.sendMessage(m.chat, { 
            text: `*_𝘼𝙉𝙄𝙈𝙀 𝙁𝙇𝙑 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎..._*\nTu archivo ha sido descargado y guardado.`, 
            document: { url: filePath } 
        }, { quoted: m });

    } catch (error) {
        return m.reply(`Error: ${error.message}`);
    }
}

handler.help = ['animedl <anime-id> <episode-number>'];
handler.tags = ['descargas'];
handler.command = ['animedl', 'animeflvdl', 'anidl'];
handler.register = true;

export default handler;
