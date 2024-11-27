
import axios from 'axios';

let handler = async (m, { conn, command, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar en Google.*', m);

    conn.reply(m.chat, `🌸 *Buscando Su Información...*`, m);

    const url = `https://api.ryzendesu.vip/api/search/google?query=${encodeURIComponent(text)}`;

    try {
        const response = await axios.get(url);

        // Verifica que la respuesta contenga los datos esperados
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
            return conn.reply(m.chat, '🌸 *No se encontraron resultados.*', m);
        }

        let teks = `🌷 *Resultado de* : ${text}\n\n`;
        response.data.forEach(result => {
            teks += `⚜️ *Título ∙* ${result.title}\n📚 *Info ∙* ${result.description}\n🔗 *Url ∙* ${result.link}\n\n`;
        });

        conn.reply(m.chat, teks, m);
    } catch (error) {
        console.error('Error al obtener resultados de Google:', error);
        conn.reply(m.chat, '🌸 *Ocurrió un error al buscar la información.*', m);
    }
}

handler.help = ['google <búsqueda>'];
handler.tags = ['buscador'];
handler.command = ['google'];
handler.register = true;

export default handler;
