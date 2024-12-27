import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.');
    }
}

let wimageHandler = async (m, { conn, args }) => {
    const characterName = args.join(' ').toLowerCase().trim();

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        if (!character) {
            await conn.reply(m.chat, `《✧》No se ha encontrado el personaje *${characterName}*. Asegúrate de que el nombre esté correcto.`, m);
            return;
        }

        const message = `❀ Nombre » *${character.name}*
⚥ Género » *${character.gender}*
❖ Fuente » *${character.source}*`;

        await conn.sendFile(m.chat, character.img, `${character.name}.jpg`, message, m);
    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar la imagen del personaje: ${error.message}`, m);
    }
};

wimageHandler.help = ['wimage <nombre del personaje>'];
wimageHandler.tags = ['anime'];
wimageHandler.command = ['charimage', 'cimage', 'wimage', 'waifuimage'];

export default wimageHandler;
