import fetch from 'node-fetch';

const handler = async (m, { conn, command, text }) => {
    if (command === 'ip') {
        // Mensaje de "buscando..."
        const searchingMessage = '🧑🏻‍💻 Buscando...';
        conn.reply(m.chat, searchingMessage, m);

        // Verificación de texto (IP)
        if (!text) return m.reply("🚩 Por favor proporciona una IP. Ejemplo: .ip 8.8.8.8");

        // Validación de IP
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipRegex.test(text)) return m.reply("🚩 La IP proporcionada no es válida. Asegúrate de que sea una IP pública.");

        // URL de la API
        const apiURL = `https://api.ryzendesu.vip/api/tool/iplocation?ip=${encodeURIComponent(text)}`;

        try {
            // Actualiza la presencia del bot a 'composing'
            conn.sendPresenceUpdate('composing', m.chat);

            // Realiza la solicitud a la API
            const response = await fetch(apiURL);
            
            // Verifica si la respuesta es OK
            if (!response.ok) {
                return m.reply("🚫 Error al obtener información de la IP. Código de estado: " + response.status);
            }

            const result = await response.json();

            // Verifica si la respuesta contiene información de IP
            if (result.ipInfo) {
                const ipInfo = result.ipInfo;

                // Mensaje estructurado
                const message = `
🌐 *Información de la IP*: ${ipInfo.ip || 'No disponible'}

📍 Ubicación: ${ipInfo.city || 'No disponible'}, ${ipInfo.region || 'No disponible'}, ${ipInfo.country_name || 'No disponible'}
🗺️ Coordenadas: Latitud ${ipInfo.latitude || 'No disponible'}, Longitud ${ipInfo.longitude || 'No disponible'}
🌐 Continente: ${ipInfo.continent_code || 'No disponible'}
🕓 Zona Horaria: ${ipInfo.timezone || 'No disponible'} (UTC${ipInfo.utc_offset || 'No disponible'})
📞 Código de País: ${ipInfo.country_calling_code || 'No disponible'}
💵 Moneda: ${ipInfo.currency || 'No disponible'} (${ipInfo.currency_name || 'No disponible'})
📡 Red: ASN ${ipInfo.asn || 'No disponible'}, Organización: ${ipInfo.org || 'No disponible'}, Rango de Red: ${ipInfo.network || 'No disponible'}
`.trim();

                // Envía el mensaje con la información de la IP
                m.reply(message.trim());

                // Reacción al mensaje
                await conn.sendReaction('✅', m.chat, m.key);
            } else {
                m.reply("🚫 No se encontró información válida para la IP proporcionada.");
            }
        } catch (error) {
            console.error(error); // Registra el error en la consola para depuración
            m.reply("🚫 Ocurrió un error al procesar la solicitud. Por favor, verifica la IP ingresada y vuelve a intentarlo.");
        }
    }
};

// Definiciones de ayuda y etiquetas
handler.help = ['ip <direccion_ip>'];
handler.tags = ['info'];
handler.command = /^ip$/i; // Comando para activar el plugin

export default handler;
