import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

const cooldowns = {};

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json.');
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2));
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo harem.json.');
    }
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return await conn.reply(m.chat, `《✧》Debes esperar *${minutes} minutos y ${seconds} segundos* para usar *#c* de nuevo.`, m);
    }

    if (m.quoted && m.quoted.sender === conn.user.jid) {
        const quotedMessageId = m.quoted.id;

        try {
            const characters = await loadCharacters();
            const characterId = m.quoted.text.match(/ID: \*(.+?)\*/)[1]; 
            const character = characters.find(c => c.id === characterId);

            if (!character) {
                await conn.reply(m.chat, '《✧》El mensaje citado no es un personaje válido.', m);
                return;
            }

            const harem = await loadHarem();
            const existingEntry = harem.find(entry => entry.characterId === character.id);

            if (existingEntry) {
                await conn.reply(m.chat, `《✧》El personaje ya ha sido reclamado por @${existingEntry.userId.split('@')[0]}, intenta con otro personaje.`, m);
                return;
            }

            character.user = userId;
            character.status = "Reclamado";

            const userEntry = {
                userId: userId,
                characterId: character.id,
                lastClaimTime: now,
                rollWaitTime: 30 * 60 * 1000 
            };
            harem.push(userEntry);
            await saveHarem(harem);
            await saveCharacters(characters);
            await conn.reply(m.chat, `✦ Has reclamado a *${character.name}* con éxito.`, m);
            cooldowns[userId] = now + 30 * 60 * 1000;

        } catch (error) {
            await conn.reply(m.chat, `✘ Error al reclamar el personaje: ${error.message}`, m);
        }

    } else {
        await conn.reply(m.chat, '《✧》Debes citar un personaje válido para reclamar.', m);
    }
};

handler.help = ['reclamar'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim', 'reclamar'];

export default handler;
