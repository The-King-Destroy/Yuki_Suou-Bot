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

const giveAllHaremHandler = async (m, { conn, mentionedJid }) => {
    const groupId = m.chat;
    const userId = m.sender;
    const harem = await loadHarem();

    if (!harem[groupId] || !harem[groupId][userId] || harem[groupId][userId].length === 0) {
        await conn.reply(m.chat, 'No tienes personajes para regalar.', m);
        return;
    }

    const userCharacters = harem[groupId][userId];
    const totalCharacters = userCharacters.length;
    const totalValue = userCharacters.reduce((sum, character) => sum + character.value, 0);

    if (!mentionedJid[0]) {
        await conn.reply(m.chat, 'Debes mencionar a un usuario para regalar tus personajes.', m);
        return;
    }

    const targetUserId = mentionedJid[0];

    const confirmationMessage = `
「✐」 @${m.pushName}, Estás seguro que deseas regalar todos tus personajes a *@${targetUserId.split('@')[0]}*?
❏ Personajes a regalar: *${totalCharacters}*
❏ Valor total: *${totalValue}*

✐ Para confirmar responde a este mensaje con "Aceptar".
> Esta acción no se puede deshacer, revisa bien los datos antes de confirmar.

《✧》 Solo *@${targetUserId.split('@')[0]}* puede aceptar la solicitud de intercambio.
    `.trim();

    const confirmation = await conn.reply(m.chat, confirmationMessage, m, { mentions: [userId, targetUserId] });

    const filter = response => response.sender === userId && response.body.toLowerCase() === 'aceptar';
    const collector = conn.createMessageCollector({ filter, time: 60000 });

    collector.on('collect', async () => {
        for (const character of userCharacters) {
            if (!harem[groupId][targetUserId]) {
                harem[groupId][targetUserId] = [];
            }
            harem[groupId][targetUserId].push(character);
        }

        delete harem[groupId][userId];
        await saveHarem(harem);
        await conn.reply(m.chat, `✦ Has regalado con éxito todos tus personajes a *@${targetUserId.split('@')[0]}*!`, m);
        await conn.reply(m.chat, `> ❏ Personajes regalados: *${totalCharacters}*\n> ⴵ Valor total: *${totalValue}*`, m);
        collector.stop();
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            conn.reply(m.chat, 'Tiempo de espera agotado, no se realizó la transferencia.', m);
        }
    });
};

giveAllHaremHandler.help = ['giveallharem', 'regalarharem'];
giveAllHaremHandler.tags = ['harem'];
giveAllHaremHandler.command = /^(giveallharem|regalarharem)$/i;

export default giveAllHaremHandler