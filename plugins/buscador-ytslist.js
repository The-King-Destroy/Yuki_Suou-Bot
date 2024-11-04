import yts from 'yt-search';
const { proto, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;

// Handler para búsqueda de YouTube con ViewOnce Messages
let handler = async (m, { conn, text, usedPrefix }) => {
    // Mensaje de uso del comando
    if (!text) {
        return conn.reply(m.chat, `🌹 *Uso:* ${usedPrefix}ytslist <palabra clave>\nEjemplo: ${usedPrefix}ytslist Daylight`, m);
    }
    
    let results = await yts(text);
    let videos = results.videos;
    
    if (videos.length === 0) {
        return conn.reply(m.chat, `🔍 No se encontraron resultados para "${text}"`, m);
    }

    const data = {
        title: "Resultados de Búsqueda de YouTube",
        sections: videos.slice(0, 10).map((v) => ({
            title: v.title,
            rows: [
                {
                    header: "🎶 MP3",
                    title: "",
                    description: `▢ 📌 *Título:* ${v.title}\n▢ ⌚ *Duración:* ${v.timestamp}\n`,
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    header: "🎥 MP4",
                    title: "",
                    description: `▢ 📌 *Título:* ${v.title}\n▢ ⌚ *Duración:* ${v.timestamp}\n`,
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        }))
    };

    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `🎬 *YUKI SUOU SEARCH*\n\nResultados de: *${text}*`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: 'ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ '
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: '',
                        subtitle: "Selecciona un audio o vídeo para descargar",
                        hasMediaAttachment: false
                    }),
                    contextInfo: {
                        forwardingScore: 9999,
                        isForwarded: false,
                        mentionedJid: conn.parseMention(m.sender)
                    },
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": JSON.stringify(data)
                        }]
                    })
                })
            }
        }
    }, {});

    conn.relayMessage(m.chat, msgs.message, {});
};

handler.help = ['ytslist'];
handler.tags = ['buscador'];
handler.command = ['ytslist'];

export default handler;
