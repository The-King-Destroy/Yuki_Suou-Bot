import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
    if (!text) {
        return conn.reply(m.chat, '❌ Por favor proporciona un enlace válido de YouTube.', m);
    }

    try {
        const apiUrl = `https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.status !== 200 || !result.result || !result.result.audio) {
            return conn.reply(m.chat, '❌ No se pudo descargar el audio. Verifica el enlace e intenta nuevamente.', m);
        }

        const { title, thumb, duration, description, audio } = result.result;

        const caption = `
🎶 *Descarga completada:*
*🔤 Título:* ${title}
*🕒 Duración:* ${duration}
*📝 Descripción:* ${description}
`;
        
        await conn.sendMessage(
            m.chat,
            {
                audio: { url: audio },
                mimetype: 'audio/mp4',
                ptt: false,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Ocurrió un error al intentar descargar el audio.', m);
    }
};

handler.command = /^(yta|ytmp3)$/i;

export default handler;
