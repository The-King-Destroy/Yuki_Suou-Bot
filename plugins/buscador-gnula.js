import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    // Verifica si el mensaje es el comando .gnula
    let movieName = m.text.split('.gnula ')[1]; // Extrae el nombre de la película
    if (!movieName) {
        return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre de la película.' }, { quoted: m });
    }

    let url = `https://gnula.vercel.app/api/search/gnula?nombre=${encodeURIComponent(movieName)}`; // Codifica el nombre de la película

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data && data.length > 0) {
            let results = data.map(movie => 
                `🎬 Título: ${movie.title}\n` +
                `📅 Publicado: ${movie.release_date || 'Fecha no disponible'}\n` +
                `🖋️ Autor: ${movie.author || 'Autor no disponible'}\n` +
                `📖 Sinopsis: ${movie.synopsis || 'Sinopsis no disponible'}\n` +
                `🖼️ Imagen: ${movie.image || 'Imagen no disponible'}\n` +
                `🔗 Enlace: ${movie.link || 'Enlace no disponible'}\n` +
                `🎞️ Idioma: ${movie.language || 'Idioma no disponible'}\n` +
                `📺 Calidad: ${movie.quality || 'Calidad no disponible'}\n` +
                `⬇️ Descargar: ${movie.download_link || 'Descarga no disponible'}`
            ).join('\n\n');

            // Envía los resultados al chat
            conn.sendMessage(m.chat, { text: results }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { text: 'No se encontraron resultados para esa película.' }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, { text: 'Ocurrió un error al buscar.' }, { quoted: m });
    }
};

// Configuración del handler
handler.help = ['gnula']
handler.tags = ['buscador']
handler.command = /^(gnula)$/i
handler.premium = false
handler.register = true

export default handler;
