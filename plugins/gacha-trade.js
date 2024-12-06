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

const tradeHandler = async (m, { conn, args, mentionedJid }) => {
    const groupId = m.chat;
    const userId = m.sender;
    const harem = await loadHarem();

    if (!args[0] || !mentionedJid[0]) {
        await conn.reply(m.chat, 'Debes mencionar a un usuario y el nombre del personaje que deseas intercambiar.', m);
        return;
    }

    const targetUserId = mentionedJid[0];
    const characterName = args.slice(1).join(' ').trim();

    if (!harem[groupId] || !harem[groupId][userId]) {
        await conn.reply(m.chat, 'No tienes personajes para intercambiar.', m);
        return;
    }

    const userCharacters = harem[groupId][userId];
    const characterIndex = userCharacters.findIndex(c => c.name.toLowerCase() === characterName.toLowerCase());

    if (characterIndex === -1) {
        await conn.reply(m.chat, `El personaje *${characterName}* no se encuentra en tu harem.`, m);
        return;
    }

    const character = userCharacters[characterIndex];

    if (!harem[groupId][targetUserId]) {
        harem[groupId][targetUserId] = [];
    }

    harem[groupId][targetUserId].push(character);
    userCharacters.splice(characterIndex, 1);

    await saveHarem(harem);
    await conn.reply(m.chat, `✦ Has intercambiado con éxito *${character.name}* a *@${targetUserId.split('@')[0]}*!`, m);
};

tradeHandler.help = ['trade'];
tradeHandler.tags = ['gacha'];
tradeHandler.command = /^(trade)$/i;

export default tradeHandler;