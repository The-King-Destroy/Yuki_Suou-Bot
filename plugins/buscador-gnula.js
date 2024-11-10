//Codígo creado por Destroy wa.me/584120346669
//Créditos a EliasarYt por brindar la API

import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    // Extrae el nombre de la película del mensaje
    let movieName = m.text.split('.gnula ')[1];
    if (!movieName) {
        return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre de la película.' }, { quoted: m });
    }

    let searchUrl = `https://gnulahd.nu/?s=${encodeURIComponent(movieName)}`;

    try {
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);
        const results = [];

        $('.post').each((i, element) => {
            const titulo = $(element).find('h2 a').attr('title')?.replace('Permanent Link to ', '') || 'Título no disponible';
            const fechaPublicacion = $(element).find('.time span').text().trim() || 'Fecha no disponible';
            const autor = $(element).find('.date span').text().replace('posted by ', '').trim() || 'Autor no disponible';
            const sinopsis = $(element).find('p').eq(1).text().trim() || 'Sinopsis no disponible';
            const imagen = $(element).find('.entry img').attr('src') || 'Imagen no disponible';
            const enlace = $(element).find('h2 a').attr('href') || 'Enlace no disponible';

            results.push(`🎬 Título: ${titulo}\n📅 Publicado: ${fechaPublicacion}\n🖋️ Autor: ${autor}\n📖 Sinopsis: ${sinopsis}\n🖼️ Imagen: ${imagen}\n🔗 Enlace: ${enlace}`);
        });

        // Verifica si hay resultados
        if (results.length > 0) {
            // Agrega la firma al final del mensaje
            const output = results.join('\n\n') + `\n\n> ৎ୭࠭͢𝒴𝑢𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝑡𝐭ⷭ𓆪͟͞ `;
            conn.sendMessage(m.chat, { text: output }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { text: 'No se encontraron resultados para esa película.' }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, { text: 'Ocurrió un error al buscar: ' + error.message }, { quoted: m });
    }
};

// Configuración del handler
handler.help = ['gnula'];
handler.tags = ['buscador'];
handler.command = /^(gnula)$/i;
handler.premium = false;
handler.register = true;

export default handler;
