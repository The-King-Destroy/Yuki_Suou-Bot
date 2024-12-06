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

const winfoHandler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, 'Debes especificar el nombre del personaje.', m);
        return;
    }

    const characterName = args.join(' ').trim();
    const harem = await loadHarem();
    const allCharacters = Object.values(harem).flat();

    const character = allCharacters.find(c => c.name.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        await conn.reply(m.chat, `El personaje *${characterName}* no se encuentra en el harem.`, m);
        return;
    }

    const groupId = m.chat;
    const userHarem = harem[groupId] && harem[groupId][m.sender] ? harem[groupId][m.sender] : [];
    const owner = userHarem.find(c => c.name === character.name) ? m.sender : 'Disponible';
    const ownerDisplay = owner === 'Disponible' ? owner : `Reclamado por *${owner}*`;

    const message = `
❀ Nombre » *${character.name}*
⚥ Género » *${character.genre || 'Desconocido'}*
✰ Valor » *${character.value || 'Desconocido'}*
♡ Estado » ${ownerDisplay}
❖ Fuente » *${character.source || 'Desconocido'}*
    `.trim();

    await conn.reply(m.chat, message, m);
};

winfoHandler.help = ['winfo'];
winfoHandler.tags = ['gacha'];
winfoHandler.command = /^(winfo)$/i;

export default winfoHandler;