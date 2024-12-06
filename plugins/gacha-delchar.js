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

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('Error al guardar el archivo harem.json');
    }
}

const delcharHandler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, 'Debes especificar el nombre del personaje a eliminar.', m);
        return;
    }

    const characterName = args.join(' ').trim();
    const harem = await loadHarem();
    const groupId = m.chat;

    if (!harem[groupId]) {
        await conn.reply(m.chat, 'No tienes personajes reclamados en tu harem.', m);
        return;
    }

    const userHarem = harem[groupId][m.sender] || [];
    const characterIndex = userHarem.findIndex(c => c.name.toLowerCase() === characterName.toLowerCase());

    if (characterIndex === -1) {
        await conn.reply(m.chat, `El personaje *${characterName}* no se encuentra en tu harem.`, m);
        return;
    }

    const removedCharacter = userHarem.splice(characterIndex, 1)[0];
    if (userHarem.length === 0) {
        delete harem[groupId][m.sender];
    } else {
        harem[groupId][m.sender] = userHarem;
    }

    await saveHarem(harem);
    await conn.reply(m.chat, `✦ *${removedCharacter.name}* ha sido eliminado de tu lista de reclamados.`, m);
};

delcharHandler.help = ['delchar', 'delwaifu'];
delcharHandler.tags = ['gacha'];
delcharHandler.command = /^(delchar|delwaifu)$/i;

export default delcharHandler;