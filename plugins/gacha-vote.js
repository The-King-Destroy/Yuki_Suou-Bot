import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('《✧》No se pudo cargar el archivo characters.json.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2));
    } catch (error) {
        throw new Error('《✧》No se pudo guardar el archivo characters.json.');
    }
}

let cooldowns = new Map();

let handler = async (m, { conn, args }) => {
    try {
        const userId = m.sender;
        const cooldownTime = 1 * 60 * 60 * 1000 + 59 * 60 * 1000 + 32 * 1000;

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + cooldownTime;
            const now = Date.now();
            if (now < expirationTime) {
                const timeLeft = expirationTime - now;
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const seconds = Math.floor((timeLeft / 1000) % 60);
                await conn.reply(m.chat, `《✧》Debes esperar *${Math.floor(minutes)} minutos ${seconds} segundos* para usar *#vote* de nuevo.`, m);
                return;
            }
        }

        const characters = await loadCharacters();
        const newValue = parseInt(args[args.length - 1]);

        const characterName = args.slice(0, -1).join(' ');

        if (!characterName || isNaN(newValue)) {
            await conn.reply(m.chat, '《✧》Debes especificar un personaje para votarlo.', m);
            return;
        }

        const character = characters.find(c => c.name.toLowerCase() === characterName.toLowerCase());

        if (!character) {
            await conn.reply(m.chat, '《✧》Personaje no encontrado.', m);
            return;
        }

        character.value = newValue;
        await saveCharacters(characters);

        cooldowns.set(userId, Date.now());
        await conn.reply(m.chat, `✰ Votaste por el personaje *${character.name}*\n> Su nuevo valor es *${newValue}*`, m);
    } catch (e) {
        await conn.reply(m.chat, `✘ Error al actualizar el valor: ${e.message}`, m);
    }
};

handler.help = ['vote <nombre> <nuevo valor>'];
handler.tags = ['anime'];
handler.command = ['vote', 'value'];

export default handler;