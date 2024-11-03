
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const whatsappNumber = '584128382768';
const whatsappApiUrl = 'https://api.whatsapp.com/send?phone=';

const sendErrorNotification = async (plugin, error) => {
    const timestamp = new Date().toISOString();
    const lineNumber = error.stack.split('\n')[1].match(/:(\d+):/)[1]; // Obtener número de línea
    const errorMessage = `[${timestamp}] Error en el plugin "${plugin}": ${error.message} (Línea: ${lineNumber})\nPosible solución: Revisa la lógica de tu plugin y asegúrate de que todos los módulos estén correctamente importados.`;
    
    const url = `${whatsappApiUrl}${whatsappNumber}&text=${encodeURIComponent(errorMessage)}`;
    try {
        await fetch(url, { method: 'GET' });
    } catch (fetchError) {
        console.error('Error al enviar notificación de error:', fetchError);
    }
};

const handler = async (m, { command }) => {
    console.log("Ejecutando trackErrors..."); // Línea de depuración
    const pluginsDir = path.join(__dirname); // Directorio actual
    const files = fs.readdirSync(pluginsDir);

    const plugins = files.filter(file => file.endsWith('.js') && file !== 'errorTracker.js');

    for (const plugin of plugins) {
        try {
            const pluginModule = require(path.join(pluginsDir, plugin));
            if (pluginModule.handler) {
                await pluginModule.handler(m, { command });
            }
        } catch (error) {
            await sendErrorNotification(plugin, error);
        }
    }
};

handler.command = ['trackErrors'];
handler.help = ['trackErrors'];
handler.tags = ['admin'];
handler.premium = false;

module.exports = handler;
