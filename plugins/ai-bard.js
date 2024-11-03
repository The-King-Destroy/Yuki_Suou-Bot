import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `🌹 *Ingresé una petición*\n\nEjemplo, ${usedPrefix + command} Conoces a Yuki Suou?`, m, rcanal);
    
    try {
        await m.react('🕒');
        var apii = await fetch(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);

        // Verifica si la respuesta es OK
        if (!apii.ok) {
            const errorText = await apii.text(); // Captura el texto de error
            throw new Error(`Error en la respuesta de la API: ${apii.status} - ${errorText}`);
        }

        var res = await apii.json();

        // Verifica si res.result existe
        if (!res.result) {
            throw new Error('La respuesta no contiene un resultado válido.');
        }

        await conn.reply(m.chat, res.result, m, rcanal);
        await m.react('✅️');
    } catch (error) {
        await m.react('✖️');
        console.error(error);
        return conn.reply(m.chat, '⚙️ *Ocurrió un fallo: ' + error.message + '*', m, rcanal);
    }
};

handler.command = ['bard'];
handler.help = ['bard'];
handler.tags = ['ai'];
handler.premium = false;

export default handler;
