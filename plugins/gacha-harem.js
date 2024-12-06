import { promises as fs } from 'fs';
import path from 'path';

const haremFilePath = path.resolve('src/database/harem.json');

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        const harem = JSON.parse(data);
        if (typeof harem !== 'object' || harem === null) {
            throw new Error('El archivo harem.json no tiene un formato válido.');
        }
        return harem;
    } catch (error) {
        throw new Error(`Error al cargar el harem: ${error.message}`);
    }
}

const haremHandler = async (m, { conn, args }) => {
    try {
        const harem = await loadHarem();
        const userId = m.sender;
        const userHarem = harem[userId] || [];
        const pageSize = 50;
        const totalCharacters = userHarem.length;
        const totalPages = Math.ceil(totalCharacters / pageSize);

        let currentPage = 1;
        if (args[1]) {
            const requestedPage = parseInt(args[1].replace('Page', '').trim());
            if (!isNaN(requestedPage) && requestedPage > 0 && requestedPage <= totalPages) {
                currentPage = requestedPage;
            } else {
                await conn.reply(m.chat, `Página inválida. Hay un total de ${totalPages} páginas.`, m);
                return;
            }
        }

        if (totalCharacters === 0) {
            await conn.reply(m.chat, 'No tienes personajes reclamados en tu harem.', m);
            return;
        }

        let message = `❀ Personajes reclamados ❀\n`;
        message += `⌦ Usuario: *${m.pushName || userId}*\n`;
        message += `♡ Personajes: *(${totalCharacters}):*\n\n`;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalCharacters);
        
        for (let i = startIndex; i < endIndex; i++) {
            const character = userHarem[i];
            message += `» *${character.name}* (${character.value})\n`;
        }

        message += `\n> ⌦ _Página *${currentPage}* de *${totalPages}*_`;
        await conn.reply(m.chat, message.trim(), m);
    } catch (error) {
        await conn.reply(m.chat, `Error al cargar el harem: ${error.message}`, m);
    }
};

haremHandler.help = ['harem'];
haremHandler.tags = ['gacha'];
haremHandler.command = /^(harem)$/i;

export default haremHandler;