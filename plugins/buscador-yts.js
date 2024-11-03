import yts from 'yt-search';

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🌸 *Escriba el título de algún vídeo de Youtube*\n\nEjemplo, !${command} Yuki Suou`, m);

    // Mensaje de espera
    const waitMessage = '🕒 *Buscando...*'; // Mensaje que se mostrará mientras se busca
    conn.reply(m.chat, waitMessage, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,
                body: wm,
                previewType: 0,
                thumbnail: icons,
                sourceUrl: channel
            }
        }
    });

    try {
        let results = await yts(text);
        let tes = results.all;
        let teks = results.all.map(v => {
            switch (v.type) {
                case 'video':
                    return `🌹 *Título:* 
» ${v.title}

🔗 *Enlace:* 
» ${v.url}

🕝 *Duración:*
» ${v.timestamp}

🚀 *Subido:* 
» ${v.ago}

👀 *Vistas:* 
» ${v.views}`;
            }
        }).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n');

        if (tes.length > 0) {
            conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m);
        } else {
            conn.reply(m.chat, 'No se encontraron resultados.', m);
        }
    } catch (error) {
        console.error('Error al buscar videos:', error);
        conn.reply(m.chat, 'Hubo un problema al buscar el video. Por favor, intenta de nuevo más tarde.', m);
    }
}

handler.help = ['ytsearch'];
handler.tags = ['buscador'];
handler.command = /^ytbuscar|yts(earch)?$/i;

handler.register = true;
handler.cookies = 1;

export default handler;
