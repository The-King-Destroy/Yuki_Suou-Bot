import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🌸 Ingresa lo que deseas buscar junto al comando.', m);
    
    await m.react('🕓');
    const img = 'https://i.ibb.co/P5kZNFF/file.jpg';
    const url = `https://eliasar-yt-api.vercel.app/api/google?query=${encodeURIComponent(text)}`;

    try {
        const response = await axios.get(url);
        const results = response.data;

        let responseText = `*乂  S E A R C H  -  G O O G L E*\n\n`;
        for (let result of results) {
            responseText += `*${result.titulo}*\n${result.url}\n${result.descripcion}\n\n`;
        }

        conn.sendFile(m.chat, img, 'thumbnail.jpg', responseText, m).then(_ => m.react('✅'));
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '🚫 Ocurrió un error al realizar la búsqueda. Intenta de nuevo.', m);
    }
};

handler.help = ['google *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^google?$/i;
handler.register = true;

export default handler;
