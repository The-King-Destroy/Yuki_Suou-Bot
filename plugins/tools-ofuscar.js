import fs from 'fs/promises';
import path from 'path';

const validateInput = (args, usedPrefix, command) => {
    if (args.length < 2) {
        throw new Error(`❗ *Uso incorrecto del comando.*\n\n✨ *Formato correcto:* ${usedPrefix + command} <nombre archivo.js>|<código>`);
    }

    const [fileName, ...codeParts] = args.join(' ').split('|');
    const trimmedFileName = fileName?.trim();
    const trimmedCode = codeParts.join('|').trim();

    if (!trimmedFileName || !trimmedCode) {
        throw new Error(`❗ *Uso incorrecto del comando.*\n\n✨ *Formato correcto:* ${usedPrefix + command} <nombre archivo.js>|<código>`);
    }

    return { trimmedFileName, trimmedCode };
};

const obfuscateCode = (code) => {
    return `eval(String.fromCharCode(${code.split('').map(char => char.charCodeAt(0)).join(',')}))`;
};

const writeFile = async (filePath, data) => {
    await fs.writeFile(filePath, data);
};

const sendFileAndCleanup = async (conn, chatId, filePath, fileName, message) => {
    await conn.sendFile(chatId, filePath, fileName, message, null, { mimetype: 'text/plain' });
    await fs.unlink(filePath);
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        const { trimmedFileName, trimmedCode } = validateInput(args, usedPrefix, command);
        const obfuscatedCode = obfuscateCode(trimmedCode);
        const filePath = path.join('/tmp', trimmedFileName);

        await writeFile(filePath, obfuscatedCode);
        await sendFileAndCleanup(conn, m.chat, filePath, trimmedFileName, '✨ *Código Ofuscado.*');
    } catch (error) {
        console.error('Error:', error);
        m.reply(`⚠️ *Error:* ${error.message}`);
    }
};

handler.help = ['ofuscar <nombre archivo.js>|<código>'];
handler.tags = ['tools'];
handler.command = ['ofuscar', 'obfuscate', 'eval', 'obf'];
handler.register = true;

export default handler;
