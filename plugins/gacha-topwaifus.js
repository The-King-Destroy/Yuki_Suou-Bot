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

const waifusBoardHandler = async (m, { conn, args }) => {
    const number = args[0] ? parseInt(args[0]) : 10;

    const harem = await loadHarem();
    const allCharacters = Object.values(harem).flatMap(group => Object.values(group)).flat();

    allCharacters.sort((a, b) => (b.value || 0) - (a.value || 0));
    const topCharacters = allCharacters.slice(0, number).map(c => `${c.name} - ${c.value || 0} monedas`).join('\n');

    const message = topCharacters.length > 0 ? `Top ${number} personajes:\n${topCharacters}` : 'No hay personajes en el harem.';
    await conn.reply(m.chat, message, m);
};

waifusBoardHandler.help = ['waifusboard', 'waifustop', 'topwaifus'];
waifusBoardHandler.tags = ['harem'];
waifusBoardHandler.command = /^(waifusboard|waifustop|topwaifus)$/i;

export default waifusBoardHandler;