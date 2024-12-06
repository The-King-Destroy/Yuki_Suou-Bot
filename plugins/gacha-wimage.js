import { promises as fs } from 'fs';
import path from 'path';

const charactersFilePath = path.resolve('src/database/harem.json');

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error al cargar el archivo harem.json');
    }
}

const wimageHandler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, 'Debes especificar el nombre del personaje.', m);
        return;
    }

    const characterName = args.join(' ').trim();
    const characters = await loadCharacters();

    const character = characters.find(c => c.name.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        await conn.reply(m.chat, `El personaje *${characterName}* no se encuentra en el harem.`, m);
        return;
    }

    const randomImage = character.img[Math.floor(Math.random() * character.img.length)];

    const message = `
❀ Nombre » *${character.name}*
⚥ Género » *${character.genre || 'Desconocido'}*
❖ Fuente » *${character.source || 'Desconocido'}*
    `.trim();

    await conn.sendFile(m.chat, randomImage, `${character.name}.jpg`, message, m);
};

wimageHandler.help = ['wimage'];
wimageHandler.tags = ['gacha'];
wimageHandler.command = /^(cimage)$/i;

export default wimageHandler;
