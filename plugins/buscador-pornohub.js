import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
const { proto, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;

let searchHandler = async (m, { conn, args, command, usedPrefix }) => {
    // Verificar si el comando NSFW está habilitado en el grupo
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }

    // Verificar si se recibió un argumento (término de búsqueda)
    if (!args[0]) {
        return m.reply(`*Formato incorrecto*\n\n🌹 *Instrucciones para usar el comando:*\nEjemplo:\n\n*${usedPrefix + command} <término de búsqueda>*`);
    }

    try {
        let searchResults = await searchPornhub(args.join(' ')); // Unir los argumentos en una sola cadena para la búsqueda
        if (searchResults.result.length === 0) {
            return m.reply('*Sin resultados*');
        }

        // Crear datos para el menú interactivo
        const data = {
            title: "Resultados de Búsqueda de Pornhub",
            sections: [{
                title: "Selecciona un video para descargar",
                rows: searchResults.result.map((v, i) => ({
                    title: v.title,
                    description: `▢ ⌚ *Duración:* ${v.duration}\n▢ 👁️ *Vistas:* ${v.views}`,
                    id: `${usedPrefix}download ${i}` // ID para manejo de la descarga
                }))
            }]
        };

        let msgs = generateWAMessageFromContent(m.chat, {
            interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                    text: `🎬 *RESULTADOS DE BÚSQUEDA*\n\nResultados de: *${args.join(' ')}*`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: 'Selecciona un video para descargar'
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                    title: '',
                    subtitle: "Selecciona un video",
                    hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [{
                        "name": "single_select",
                        "buttonParamsJson": JSON.stringify(data)
                    }]
                })
            })
        }, {});

        conn.relayMessage(m.chat, msgs.message, {});
        
        // Manejar la respuesta de selección
        conn.on('interactiveResponse', async (response) => {
            const selectedIndex = parseInt(response.message.interactiveMessage.selectedButtonId.replace(`${usedPrefix}download `, ''));
            const selectedVideo = searchResults.result[selectedIndex];
            await downloadVideo(selectedVideo.url, selectedVideo.title, conn, m);
        });

    } catch (e) {
        console.error('Ocurrió un error al procesar la búsqueda:', e);
        m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al buscar en Pornhub. Por favor, intenta de nuevo más tarde.');
    }
};

handler.command = /^(phsearch|pornhubsearch)$/i; // Comando para buscar
export default handler;

// Función para buscar en Pornhub
async function searchPornhub(search) {
    try {
        const response = await axios.get(`https://www.pornhub.com/video/search?search=${encodeURIComponent(search)}`);
        const html = response.data;
        const $ = cheerio.load(html);
        const result = [];

        $('ul#videoSearchResult > li.pcVideoListItem').each(function(a, b) {
            const _title = $(b).find('a').attr('title');
            const _duration = $(b).find('var.duration').text().trim();
            const _views = $(b).find('var.views').text().trim();
            const _url = 'https://www.pornhub.com' + $(b).find('a').attr('href');
            const videoData = { title: _title, duration: _duration, views: _views, url: _url };
            result.push(videoData);
        });

        return { result };
    } catch (error) {
        console.error('Ocurrió un error al buscar en Pornhub:', error);
        return { result: [] };
    }
}

// Función para descargar el video
async function downloadVideo(videoUrl, title, conn, m) {
    try {
        const response = await axios.get(videoUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        // Obtener el enlace directo del video
        const videoSource = $("video source").attr("src");

        if (!videoSource) {
            return m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nNo se pudo encontrar el enlace del video para descargar.');
        }

        const downloadResponse = await axios({
            url: videoSource,
            method: 'GET',
            responseType: 'stream',
        });

        const downloadPath = path.join(__dirname, `${title}.mp4`);
        const writer = fs.createWriteStream(downloadPath);
        downloadResponse.data.pipe(writer);

        writer.on('finish', () => {
            m.reply(`🌹 *Descarga completada:* ${title}`);
            conn.sendMessage(m.chat, { document: { url: downloadPath }, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
        });

        writer.on('error', () => {
            m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al guardar el video. Por favor, intenta de nuevo más tarde.');
        });
    } catch (error) {
        console.error('Ocurrió un error al intentar descargar el video:', error);
        m.reply('*[❗𝐈𝐍𝐅𝐎❗]*\nOcurrió un error al intentar descargar el video. Por favor, intenta de nuevo más tarde.');
    }
}
