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
        
        // Verifica si la respuesta es exitosa
        if (!response.ok) throw new Error(`Error en la respuesta: ${response.statusText}`);

        let data = await response.json();

        // Verifica si hay resultados
        if (data && data.peliculas && data.peliculas.length > 0) {
            let results = data.peliculas.map(movie => 
                `🎬 Título: ${movie.titulo || 'Título no disponible'}\n` +
                `📅 Publicado: ${movie.fechaPublicacion || 'Fecha no disponible'}\n` +
                `🖋️ Autor: ${movie.autor || 'Autor no disponible'}\n` +
                `📖 Sinopsis: ${movie.descripcion || 'Sinopsis no disponible'}\n` +
                `🖼️ Imagen: ${movie.imagen || 'Imagen no disponible'}\n` +
                `🔗 Enlace: ${movie.enlace || 'Enlace no disponible'}\n` +
                `🎞️ Idioma: ${movie.idioma || 'Idioma no disponible'}\n` +
                `📺 Calidad: ${movie.calidad || 'Calidad no disponible'}\n` +
                `⬇️ Descargar: ${movie.enlaceDescarga || 'Descarga no disponible'}`
            ).join('\n\n');

            // Envía los resultados al chat
            conn.sendMessage(m.chat, { text: results }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { text: 'No se encontraron resultados para esa película.' }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, { text: 'Ocurrió un error al buscar: ' + error.message }, { quoted: m });
    }
};

// Configuración del handler
handler.help = ['gnula']
handler.tags = ['buscador']
handler.command = /^(gnula)$/i
handler.premium = false
handler.register = true

export default handler;
