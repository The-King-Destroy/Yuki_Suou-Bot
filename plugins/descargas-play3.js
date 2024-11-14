import yts from 'yt-search';
import fetch from 'node-fetch';
import axios from 'axios';

// Definici贸n del objeto de lenguaje
const lenguaje = {
    descargar: {
        text4: 'Aqu铆 tienes tu audio descargado:',
        title: 'T铆tulo de la canci贸n:'
    }
};

// Funci贸n para formatear segundos a un formato legible
const secondString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${secs}s`;
}

// Funci贸n para formatear n煤meros grandes
const MilesNumber = (number) => {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'; // Millones
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // Miles
    }
    return number; // Menos de mil
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (command === 'play' || command === 'musica') {
        if (!text) return m.reply(`*驴Qu茅 est谩 buscando? 馃幎*\nEjemplo: *${usedPrefix + command}* ozuna`);

        const startTime = Date.now();

        conn.fakeReply(
            m.chat,
            `*岽噑岽樶磭蕗岽� 岽溕? 岽嶀磸岽嶀磭纱岽涐磸 馃攬.*\n\n> No hagas spam de comandos`,
            '0@s.whatsapp.net',
            '饾悇饾惂饾惎饾悽饾悮饾惂饾悵饾惃 饾悮饾惍饾悵饾悽饾惃 饾悶饾惉饾惄饾悶饾惈饾悮'
        );

        m.react('鈴?'); // Reacci贸n de espera

        const yt_play = await yts(text);
        if (!yt_play || yt_play.all.length === 0) {
            return m.reply("鈿狅笍 No se encontr贸 ninguna canci贸n.");
        }

        const videoInfo = yt_play.all[0];
        const texto1 = `*馃幍 Canci贸n Encontrada 鉁?*\n馃搶 *T铆tulo:* ${videoInfo.title}\n馃晵 *Publicado:* ${videoInfo.ago}\n鈴憋笍 *Duraci贸n:* ${secondString(videoInfo.duration.seconds)}\n馃憖 *Vistas:* ${MilesNumber(videoInfo.views)}\n鉁嶏笍 *Autor:* ${videoInfo.author.name}\n馃敆 *Link:* ${videoInfo.url}\n\n鉁? *Recuerda seguir mi canal, me apoyar铆as mucho* 馃檹: https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T`;

        await conn.sendMessage(m.chat, {
            image: { url: videoInfo.thumbnail },
            caption: texto1
        }, { quoted: m });

        const apiUrl = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(videoInfo.url)}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.status) {
                const audioUrl = response.data.result.urlAudio;
                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    mimetype: 'audio/mpeg'
                }, { quoted: m });

                const endTime = Date.now();
                const totalTime = ((endTime - startTime) / 1000).toFixed(2);
                m.react('鉁?'); // Reacci贸n de 茅xito
                m.reply(`鉁? 隆Audio enviado! Tiempo total de env铆o: ${totalTime} segundos.`);
            } else {
                throw new Error('No se pudo obtener el audio');
            }
        } catch (e) {
            const fallbackAudioUrl = `https://api.dorratz.com/v2/yt-mp3?url=${encodeURIComponent(videoInfo.url)}`;
            try {
                await conn.sendMessage(m.chat, {
                    audio: { url: fallbackAudioUrl },
                    mimetype: 'audio/mpeg'
                }, { quoted: m });

                const endTime = Date.now();
                const totalTime = ((endTime - startTime) / 1000).toFixed(2);
                m.react('鉁?'); // Reacci贸n de 茅xito
                m.reply(`鉁? 隆Audio enviado! Tiempo total de env铆o: ${totalTime} segundos.`);
            } catch (error) {
                m.react('鉂?'); // Reacci贸n de error
                m.reply(`Ocurri贸 un error inesperado - ${error.message}`);
            }
        }
    }
}

// Configuraci贸n del comando
handler.command = ['play3', 'musica'];
handler.help = ['play3', 'musica'];
handler.tags = ['descargas'];
export default handler;
