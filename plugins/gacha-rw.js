import { promises as fs } from 'fs';
import path from 'path';

const charactersFilePath = path.resolve('src/database/harem.json');
const cooldowns = {};
const characterExpiry = {};

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        const characters = JSON.parse(data);
        if (!Array.isArray(characters) || characters.length === 0) {
            throw new Error('El archivo harem.json no contiene personajes válidos.');
        }
        return characters;
    } catch (error) {
        throw new Error(`Error al cargar personajes: ${error.message}`);
    }
}

const rollWaifuHandler = async (m, { conn }) => {
    const groupId = m.chat;
    const currentTime = Date.now();

    if (cooldowns[groupId] && currentTime < cooldowns[groupId]) {
        const timeLeft = Math.ceil((cooldowns[groupId] - currentTime) / 1000);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        await conn.reply(m.chat, `《✧》Debes esperar *${minutes} minutos ${seconds} segundos* para usar *#rw* de nuevo.`, m);
        return;
    }

    try {
        const characters = await loadCharacters();
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        const randomImage = randomCharacter.img[Math.floor(Math.random() * randomCharacter.img.length)];

        const ownerDisplay = randomCharacter.owner ? `Reclamado por *${randomCharacter.owner}*` : '*Disponible*';
        const message = `
❀ Nombre » *${randomCharacter.name}*
⚥ Género » *${randomCharacter.genre || 'Desconocido'}*
✰ Valor » *${randomCharacter.value || 'Desconocido'}*
♡ Estado » ${ownerDisplay}
❖ Fuente » *${randomCharacter.source || 'Desconocido'}*
        `.trim();

        await conn.sendFile(m.chat, randomImage, `${randomCharacter.name}.jpg`, message, m);
        global.lastCharacter = { ...global.lastCharacter, [m.sender]: randomCharacter };

        cooldowns[groupId] = currentTime + 15 * 60 * 1000; 
        characterExpiry[randomCharacter.name] = currentTime + 2 * 60 * 1000;
    } catch (error) {
        await conn.reply(m.chat, `Error al cargar el personaje: ${error.message}`, m);
    }
};

rollWaifuHandler.help = ['rw', 'rollwaifu'];
rollWaifuHandler.tags = ['gacha'];
rollWaifuHandler.command = /^(rw|rollwaifu)$/i;

export default rollWaifuHandler;