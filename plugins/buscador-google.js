import axios from 'axios';

const handler = async (m, { conn, command, args }) => {
    const text = args.join(' ');

    // Validar que se haya ingresado un texto de búsqueda
    if (!text) {
        return conn.reply(m.chat, '🌸 Ingresa lo que deseas buscar junto al comando.', m);
    }

    await m.react('🕓'); // Reacción de espera

    const img = 'https://i.ibb.co/P5kZNFF/file.jpg'; // Imagen para enviar
    const url = `https://eliasar-yt-api.vercel.app/api/google?query=${encodeURIComponent(text)}`;

    try {
        // Realizar la solicitud a la API de búsqueda
        const response = await axios.get(url);
        const results = response.data;

        // Verificar si hay resultados
        if (!results || results.length === 0) {
            return conn.reply(m.chat, '🚫 No se encontraron resultados para tu búsqueda.', m);
        }

        // Construir el texto de respuesta
        let responseText = `*乂  S E A R C H  -  G O O G L E*\n\n`;
        results.forEach(result => {
            responseText += `*${result.titulo}*\n${result.url}\n${result.descripcion}\n\n`;
        });

        // Enviar la respuesta al chat
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', responseText, m);
        await m.react('✅'); // Reacción de éxito
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        conn.reply(m.chat, '🚫 Ocurrió un error al realizar la búsqueda. Intenta de nuevo.', m);
    }
};

// Configuración del comando
handler.help = ['google *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^google?$/i;
handler.register = true;

export default handler;
