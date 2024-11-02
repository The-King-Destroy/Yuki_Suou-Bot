import axios from 'axios';
import yts from 'yt-search';

var handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) return m.reply(`🌹 Ejemplo: ${usedPrefix + command} Joji`);

    try {
        // Obtener resultados de la búsqueda en Deezer
        let searchMusicDeezerFind = (await axios.get(`https://api.deezer.com/search?q=${encodeURIComponent(text)}`)).data;
        if (!searchMusicDeezerFind.data || searchMusicDeezerFind.data.length == 0) {
            return m.reply(`No hay resultados de la API.`);
        }

        // Extraer información de la primera canción
        const songData = searchMusicDeezerFind.data[0];
        const artistName = songData.artist.name;
        const songTitle = songData.title;
        const albumTitle = songData.album.title;
        const duration = songData.duration; // Duración en segundos
        const explicitLyrics = songData.explicit_lyrics ? 'Sí' : 'No';
        const artistLink = songData.artist.link;
        const albumLink = songData.album.tracklist.replace('api.', '');
        const deezerLink = songData.link;
        const previewUrl = songData.preview;

        // Obtener información de YouTube
        let ABC = await yts(`${artistName} ${songTitle}`);
        let informationVideoYT = ABC.videos[0];

        // Construir el mensaje de respuesta
        let body = `*『 𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭 』*\n\n` +
                   `*☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${informationVideoYT.title || 'Desconocido'}\n` +
                   `*♕.- 𝙰𝚞𝚝𝚘𝚛:* ${informationVideoYT.author?.name || 'Desconocido'}\n` +
                   `*⛨.- 𝙲𝚊𝚗𝚊𝚕:* ${informationVideoYT.author?.url || 'Desconocido'}\n` +
                   `*🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚜𝚒𝚘́𝚗:* ${informationVideoYT.ago || 'Desconocido'}\n` +
                   `*🜵.- 𝙳𝚞𝚛𝚊𝚌𝚘́𝚗:* ${informationVideoYT.timestamp || 'Desconocido'}\n` +
                   `*🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${`${informationVideoYT.views || 'Desconocido'}`}\n` +
                   `*🝤.- 𝙻𝚒𝚗𝚔:* ${informationVideoYT.url}\n\n` +
                   `*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚊𝚞𝚍𝚒𝚘, 𝚊𝚐𝚞𝚊𝚝𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*\n\n` +
                   `> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ `;

        // Enviar imagen y mensaje de Deezer
        await conn.sendMessage(m.chat, {
            image: {
                url: informationVideoYT.thumbnail // Usar la miniatura del video de YouTube
            },
            caption: body
        });

        // Enviar el audio en formato de vista previa
        await conn.sendMessage(m.chat, {
            audio: {
                url: previewUrl // URL de vista previa de la canción en Deezer
            },
            mimetype: 'audio/mpeg'
        }, { quoted: m }).catch(e => { console.log(e); });

    } catch (e) {
        console.log(e);
        m.reply("Error / API Down");
    }
};

handler.help = ["deezer"];
handler.tags = ["descargas"];
handler.command = ["deezer", "deezermusic", "dzr"];

export default handler;