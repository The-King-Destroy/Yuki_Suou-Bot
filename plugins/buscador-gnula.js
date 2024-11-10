//Codígo creado por Destroy wa.me/584120346669
//Créditos a EliasarYt por brindar la API
//Por favor dején los créditos tal cual están 

import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    // Verifica si el mensaje es el comando .gnula
    let movieName = m.text.split('.gnula ')[1]; // Extrae el nombre de la película
    if (!movieName) {
        return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre de la película.' }, { quoted: m });
    }

    // Prepara la URL de búsqueda
    let searchUrl = `https://gnulahd.nu/?s=${encodeURIComponent(movieName)}`;

    try {
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);
        const results = [];

        // Verifica si hay resultados en la búsqueda
        if ($('.post').length === 0) {
            return conn.sendMessage(m.chat, { text: 'No se encontraron resultados para esa película.' }, { quoted: m });
        }

        $('.post').each((i, element) => {
            const titulo = $(element).find('h2 a').attr('title')?.replace('Permanent Link to ', '') || 'Título no disponible';
            const fechaPublicacion = $(element).find('.time span').text().trim() || 'Fecha no disponible';
            const autor = $(element).find('.date span').text().replace('posted by ', '').trim() || 'Autor no disponible';
            const imagen = $(element).find('.entry img').attr('src') || 'Imagen no disponible';
            const enlace = $(element).find('h2 a').attr('href') || 'Enlace no disponible';
            const sinopsis = $(element).find('p').eq(1).text().trim() || 'Sinopsis no disponible';
            const iframeSrc = $(element).find('iframe').attr('src');

            // Agregamos el resultado en un objeto
            results.push({
                titulo,
                fechaPublicacion,
                autor,
                imagen,
                enlace,
                sinopsis,
                iframeSrc
            });
        });

        // Asegúrate de obtener detalles adicionales del iframe
        for (const movie of results) {
            if (movie.iframeSrc) {
                const iframeData = await getIframeDetails(movie.iframeSrc);
                movie.idioma = iframeData.idioma;
                movie.calidad = iframeData.calidad;
                movie.enlaceDescarga = iframeData.enlaceDescarga;
            } else {
                movie.idioma = 'No disponible';
                movie.calidad = 'No disponible';
                movie.enlaceDescarga = 'No disponible';
            }
        }

        // Formatea los resultados para enviar al chat
        const formattedResults = results.map(movie => 
            `🎬 Título: ${movie.titulo}\n` +
            `📅 Publicado: ${movie.fechaPublicacion}\n` +
            `🖋️ Autor: ${movie.autor}\n` +
            `📖 Sinopsis: ${movie.sinopsis}\n` +
            `🖼️ Imagen: ${movie.imagen}\n` +
            `🔗 Enlace: ${movie.enlace}\n` +
            `🎞️ Idioma: ${movie.idioma}\n` +
            `📺 Calidad: ${movie.calidad}\n` +
            `⬇️ Descargar: ${movie.enlaceDescarga}`
        ).join('\n\n');

        // Agrega la firma al final del mensaje
        const output = `${formattedResults}\n\n> ৎ୭࠭͢𝒴𝑢𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝑡𝐭ⷭ𓆪͟͞ `;

        // Envía los resultados al chat
        conn.sendMessage(m.chat, { text: output }, { quoted: m });
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, { text: 'Ocurrió un error al buscar: ' + error.message }, { quoted: m });
    }
};

// Función para obtener detalles del iframe
const getIframeDetails = async (iframeUrl) => {
    try {
        const { data } = await axios.get(iframeUrl);
        const $ = cheerio.load(data);
        const idioma = $('td:contains("subtitulado")').text().trim() || 'No disponible';
        const calidad = $('td span').text().trim() || 'No disponible';
        const enlaceDescarga = $('a.btn-download2').attr('href') || 'No disponible';

        return {
            idioma,
            calidad,
            enlaceDescarga
        };
    } catch (error) {
        console.error(`Error al obtener detalles del iframe: ${error.message}`);
        return {};
    }
};

// Configuración del handler
handler.help = ['gnula'];
handler.tags = ['buscador'];
handler.command = /^(gnula)$/i;
handler.premium = false;
handler.register = true;

export default handler;
