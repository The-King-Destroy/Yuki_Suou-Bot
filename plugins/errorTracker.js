import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const errorLogFile = path.join(__dirname, 'error_log.txt');
const whatsappNumber = '584128382768';
const whatsappApiUrl = 'https://api.whatsapp.com/send?phone=';

const sendErrorNotification = async (message) => {
    try {
        const url = `${whatsappApiUrl}${whatsappNumber}&text=${encodeURIComponent(message)}`;
        await fetch(url, { method: 'GET' });
    } catch (error) {
        console.error('Error al enviar notificación de error:', error);
    }
};

const handler = async (m, { command }) => {
    console.log("Ejecutando trackErrors..."); // Línea de depuración
    const pluginsDir = path.join(__dirname);
    const files = fs.readdirSync(pluginsDir);

    const plugins = files.filter(file => file.endsWith('.js') && file !== 'errorTracker.js');

    for (const plugin of plugins) {
        try {
            const pluginModule = await import(path.join(pluginsDir, plugin));
            if (pluginModule.handler) {
                await pluginModule.handler(m, { command });
            }
        } catch (error) {
            const timestamp = new Date().toISOString();
            const errorMessage = `[${timestamp}] Error en ${plugin}: ${error.message}\n`;
            console.error(errorMessage);
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
