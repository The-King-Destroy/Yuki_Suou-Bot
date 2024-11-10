import fetch from 'node-fetch'; // Asegúrate de tener fetch importado
import { Configuration, OpenAIApi } from 'openai'; // Importa OpenAI

// Definición del objeto de lenguaje
const lenguaje = {
    lengua: {
        ia: 'Por favor, utiliza el comando de esta forma:'
    }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (command === 'gpt4o' || command === 'gpt') {
        const configuration = new Configuration({
            organization: global.openai_org_id,
            apiKey: global.openai_key
        });
        const openai = new OpenAIApi(configuration);

        // Verifica el prefijo
        if (prefix === 'a' || prefix === 'A') return;

        // Verifica que se haya proporcionado texto
        if (!text) {
            return m.reply(`${lenguaje.lengua.ia} ${usedPrefix + command} Recomienda un top 10 de películas de acción`);
        }

        try {
            conn.sendPresenceUpdate('composing', m.chat);

            const apiURL = `https://api.agatz.xyz/api/gpt4o?message=${encodeURIComponent(text)}`;
            const response = await fetch(apiURL);
            const result = await response.json();

            // Reacción de mensaje en espera
            try {
                m.react('💬');
            } catch (error) {
                console.error("Ocurrió un error al reaccionar:", error);
            }

            // Verifica la respuesta de la API
            if (result.status === 200 && result.data && result.data.result) {
                const gptResponse = result.data.result.trim();
                await m.reply(gptResponse); // Responde con el resultado
            } else {
                throw new Error(`Error en la respuesta de la API: ${JSON.stringify(result)}`);
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
            await m.reply(`Ocurrió un error al procesar la solicitud: ${error.message}`);
        }
    }
}

// Configuración del comando
handler.command = ['gpt4o', 'gpt'];
handler.help = ['gpt4o', 'gpt'];
handler.tags = ['ai'];
export default handler;
