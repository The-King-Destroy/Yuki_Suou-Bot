import axios from 'axios';
const baileys = (await import("@whiskeysockets/baileys")).default;
const { proto } = baileys;
const { generateWAMessageFromContent } = baileys;
const { generateWAMessageContent } = baileys;

let handler = async (message, { conn, text }) => {
    if (!text) {
        return conn.reply(message.chat, ' *¿Qué anime estás buscando?*', message);
    }

    async function createImageMessage(url) {
        const { imageMessage } = await generateWAMessageContent(
            { image: { url } },
            { upload: conn.waUploadToServer }
        );
        return imageMessage;
    }

    try {
        const { data: response } = await axios.get(`https://animeflvapi.vercel.app/search?text=${encodeURIComponent(text)}`);

        if (!response.results || response.results.length === 0) {
            return conn.reply(message.chat, ' *No se encontraron animes.*', message);
        }

        const animes = response.results;

        const responseMessages = await Promise.all(animes.map(async (anime) => {
            const imageMessage = await createImageMessage(anime.poster);
            return {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `𝙏𝙞𝙩𝙪𝙡𝙤: ${anime.title}\n\n${anime.synopsis}\n\n🔖 𝙄𝘿: ${anime.id}\n*Usa este ID para descargar el anime*`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: `Rating: ${anime.rating}`
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    hasMediaAttachment: true,
                    imageMessage
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: []
                })
            };
        }));

        const carouselMessage = proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: responseMessages
        });

        const responseMessage = generateWAMessageFromContent(
            message.chat,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: null
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: ' `𝘼𝙣𝙞𝙢𝙚 𝙎𝙚𝙖𝙧𝙘𝙝`'
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: null,
                                hasMediaAttachment: false
                            }),
                            carouselMessage
                        })
                    }
                }
            },
            { quoted: message }
        );

        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

    } catch (error) {
        await conn.reply(message.chat, error.toString(), message);
    }
};

handler.help = ['animesearch <nombre>'];
handler.tags = ['buscador'];
handler.command = ['animeflvsearch', 'animeflv', 'animesearch'];
handler.register = true;

export default handler;