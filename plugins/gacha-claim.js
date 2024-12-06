import { promises as fs } from 'fs';
import path from 'path';

const haremFilePath = path.resolve('src/database/harem.json');

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

const claimHandler = async (m, { conn }) => {
    try {
        if (!m.quoted || !m.quoted.fromMe) {
            await conn.reply(m.chat, '《✧》Debes citar un personaje válido para reclamar.', m);
            return;
        }

        const quotedMessageId = m.quoted.id;

        if (!global.lastCharacter || !global.lastCharacter[quotedMessageId]) {
            await conn.reply(m.chat, '《✧》Debes citar un personaje válido para reclamar.', m);
            return;
        }

        const character = global.lastCharacter[quotedMessageId];
        const harem = await loadHarem();
        const userId = m.sender;

        if (!harem[userId]) {
            harem[userId] = [];
        }

        if (character.owner) {
            await conn.reply(m.chat, `El personaje *${character.name}* ya ha sido reclamado por *${character.owner}*.`, m);
            return;
        }

        character.owner = userId;
        harem[userId].push({
            name: character.name,
            genre: character.genre,
            value: character.value,
            source: character.source,
            img: character.img
        });

        await saveHarem(harem);
        const successMessage = `✦ Felicidades ×͜× *${m.pushName}* has reclamado con éxito a *${character.name}*`;
        await conn.reply(m.chat, successMessage, m);
    } catch (error) {
        await conn.reply(m.chat, `Error al reclamar el personaje: ${error.message}`, m);
    }
};

claimHandler.help = ['claim'];
claimHandler.tags = ['gacha'];
claimHandler.command = /^(claim|c|reclamar)$/i;

export default claimHandler;
