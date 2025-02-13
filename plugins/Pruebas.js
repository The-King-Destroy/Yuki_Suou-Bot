import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const API_URL = 'https://dark-core-api.vercel.app/api/search/youtube?key=Darkito&text=';

const handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) return conn.reply(m.chat, '*`Por favor ingresa un término de búsqueda`*', m);

    await m.react('🕓');
    try {
        let searchResults = await searchVideos(args.join(" "));
        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults[0];
        let thumbnail = await (await fetch(video.miniatura)).buffer();

        let messageText = `> *YouTube Play 🍧.*\n\n`;
        messageText += `• *Título:* ${video.titulo}\n`;
        messageText += `• *Duración:* ${formatDuration(video.duracion)}\n`;
        messageText += `• *Autor:* ${video.canal || 'Desconocido'}\n`;
        messageText += `• *Publicado:* ${convertTimeToSpanish(video.publicado)}\n`;
        messageText += `• *Enlace:* ${video.url}\n`;

        let sections = searchResults.slice(1, 11).map((v, index) => ({
            title: `${index + 1}┃ ${v.titulo}`,
            rows: [
                {
                    title: `🎶 Descargar MP3`,
                    description: `Duración: ${formatDuration(v.duracion)}`, 
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    title: `🎥 Descargar MP4`,
                    description: `Duración: ${formatDuration(v.duracion)}`, 
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        }));

        await conn.sendMessage(m.chat, {
            image: thumbnail,
            caption: messageText,
            footer: 'Presiona el botón para el tipo de descarga.',
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            },
            buttons: [
                {
                    buttonId: `${usedPrefix}ytmp3 ${video.url}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆' },
                    type: 1,
                },
                {
                    buttonId: `${usedPrefix}ytmp4 ${video.url}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆' },
                    type: 1,
                },
                {
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'Más resultados',
                            sections: sections,
                        }),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*`Error al buscar el video.`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];
export default handler;

async function searchVideos(query) {
    try {
        let response = await fetch(`${API_URL}${encodeURIComponent(query)}`);
        let json = await response.json();
        return json.success ? json.results : [];
    } catch (e) {
        console.error('Error al obtener videos:', e);
        return [];
    }
}

function formatDuration(duration) {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    let hours = match[1] ? match[1].replace('H', 'h ') : '';
    let minutes = match[2] ? match[2].replace('M', 'm ') : '';
    let seconds = match[3] ? match[3].replace('S', 's') : '';
    return `${hours}${minutes}${seconds}`.trim();
}

function convertTimeToSpanish(timeText) {
    return timeText
        .replace(/year/, 'año').replace(/years/, 'años')
        .replace(/month/, 'mes').replace(/months/, 'meses')
        .replace(/day/, 'día').replace(/days/, 'días')
        .replace(/hour/, 'hora').replace(/hours/, 'horas')
        .replace(/minute/, 'minuto').replace(/minutes/, 'minutos');
}
