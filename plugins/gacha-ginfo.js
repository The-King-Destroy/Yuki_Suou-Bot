import { promises as fs } from 'fs';
import path from 'path';

const haremFilePath = path.resolve('src/database/harem.json');

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error al cargar el archivo harem.json');
    }
}

const ginfoHandler = async (m, { conn }) => {
    const groupId = m.chat;
    const userId = m.sender;
    const harem = await loadHarem();
    const userHarem = harem[groupId] && harem[groupId][userId] ? harem[groupId][userId] : [];

    const totalCharacters = userHarem.length;
    const totalValue = userHarem.reduce((sum, character) => sum + (character.value || 0), 0);
    const totalCharactersAll = Object.values(harem).flat().length;

    const message = `
*❀ Usuario* \`${m.pushName || userId}\`

♡ Personajes reclamados » *${totalCharacters}*
✰ Valor total » *${totalValue}*
❏ Personajes totales » *${totalCharactersAll}*
    `.trim();

    await conn.reply(m.chat, message, m);
};

ginfoHandler.help = ['ginfo'];
ginfoHandler.tags = ['gacha'];
ginfoHandler.command = /^(ginfo)$/i;

export default ginfoHandler;