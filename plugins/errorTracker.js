
// errorTracker.js

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // Asegúrate de tener 'node-fetch' instalado

const errorLogFile = path.join(__dirname, 'error_log.txt'); // Ruta para el archivo de log
const whatsappNumber = '584128382768'; // Número de WhatsApp para enviar errores
const whatsappApiUrl = 'https://api.whatsapp.com/send?phone='; // URL base para enviar mensajes

const sendErrorNotification = async (message) => {
    try {
        const url = `${whatsappApiUrl}${whatsappNumber}&text=${encodeURIComponent(message)}`;
        await fetch(url, { method: 'GET' });
    } catch (error) {
        console.error('Error al enviar notificación de error:', error);
    }
};

const handler = async (m, { command }) => {
    const pluginsDir = path.join(__dirname); // Directorio actual donde están los plugins
    const files = fs.readdirSync(pluginsDir); // Lee todos los archivos en el directorio

    const plugins = files.filter(file => file.endsWith('.js') && file !== 'errorTracker.js'); // Excluye este archivo

    for (const plugin of plugins) {
        try {
            const pluginModule = await import(path.join(pluginsDir, plugin));
            if (pluginModule.handler) {
                await pluginModule.handler(m, { command });
            }
        } catch (error) {
            const timestamp = new Date().toISOString(); // Fecha y hora
            const errorMessage = `[${timestamp}] Error en ${plugin}: ${error.message}\n`;
            console.error(errorMessage); // Muestra el error en la consola
            
            fs.appendFileSync(errorLogFile, errorMessage, 'utf8');

            await sendErrorNotification(errorMessage);
        }
    }
};

handler.command = ['trackErrors'];
handler.help = ['trackErrors'];
handler.tags = ['admin'];
handler.premium = false;

export default handler;
