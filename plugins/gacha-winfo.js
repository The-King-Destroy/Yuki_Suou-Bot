import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('No se pudo cargar el archivo characters.json.');
    }
}

let charinfoHandler = async (m, { conn, args }) => {
    if (args.length === 0) {
        await conn.reply(m.chat, '《✧》Debes especificar un personaje para ver su información.\n> Ejemplo » *#winfo Aika Sano*', m);
        return;
    }

    const characterName = args.join(' ').toLowerCase().trim();

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        if (!character) {
            await conn.reply(m.chat, `《✧》No se encontró el personaje *${characterName}*.`, m);
            return;
        }

        const statusMessage = character.user ? `Reclamado por *${character.user}*` : 'Libre';
        const message = `❀ Nombre » *${character.name}*\n⚥ Género » *${character.gender}*\n✰ Valor » *${character.value}*\n♡ Estado » ${statusMessage}\n❖ Fuente » *${character.source}*\nID: *${character.id}*`;

        await conn.reply(m.chat, message, m);
    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar la información del personaje: ${error.message}`, m);
    }
};

charinfoHandler.help = ['charinfo <nombre del personaje>', 'winfo <nombre del personaje>', 'waifuinfo <nombre del personaje>'];
charinfoHandler.tags = ['anime'];
charinfoHandler.command = ['charinfo', 'winfo', 'waifuinfo'];

export default charinfoHandler;
