import { promises as fs } from 'fs';
import path from 'path';

const haremFilePath = path.resolve('src/database/harem.json');
const voteCooldowns = {};

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            const emptyHarem = {};
            await saveHarem(emptyHarem);
            return emptyHarem;
        } else {
            throw new Error('Error al cargar el archivo harem.json');
        }
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('Error al guardar el archivo harem.json');
    }
}

const voteHandler = async (m, { conn, args }) => {
    const userId = m.sender;
    const currentTime = Date.now();

    if (voteCooldowns[userId] && currentTime < voteCooldowns[userId]) {
        const timeLeft = Math.ceil((voteCooldowns[userId] - currentTime) / 1000);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        await conn.reply(m.chat, `《✧》Debes esperar *${Math.floor(minutes / 60)} horas ${minutes % 60} minutos ${seconds} segundos* para usar *#vote* de nuevo.`, m);
        return;
    }

    if (!args[0]) {
        await conn.reply(m.chat, '《✧》Debes especificar un personaje para votarlo.', m);
        return;
    }

    const characterName = args.join(' ').trim();
    const harem = await loadHarem();
    const userHarem = harem[userId] || [];
    const character = userHarem.find(c => c.name.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        await conn.reply(m.chat, `El personaje *${characterName}* no se encuentra en tu harem.`, m);
        return;
    }

    const increaseValue = Math.floor(Math.random() * 20) + 1; 
    character.value += increaseValue;
    
    await saveHarem(harem);
    const successMessage = `✰ Votaste por el personaje *${character.name}*!\n> Su nuevo valor es *${character.value}* (aumento de *${increaseValue}*)`;
    await conn.reply(m.chat, successMessage, m);

    voteCooldowns[userId] = currentTime + 2 * 60 * 60 * 1000;
};

voteHandler.help = ['vote'];
voteHandler.tags = ['gacha'];
voteHandler.command = /^(vote|votar)$/i;

export default voteHandler;