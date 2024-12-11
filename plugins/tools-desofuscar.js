import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        const input = args.join(' ').split('|');
        const fileName = input[0]?.trim();
        const obfuscatedCode = input[1]?.trim();

        if (!fileName || !obfuscatedCode) {
            return m.reply(`❗ *Uso incorrecto del comando.*\n\n🍂 *Formato correcto:* ${usedPrefix + command} <nombre archivo.js>|<código ofuscado>`);
        }

        const deobfuscateCode = (code) => {
            try {
                return new Function(`'use strict'; return (${code})`)();
            } catch (error) {
                console.error('Error al desofuscar el código:', error);
                throw new Error('Error al desofuscar el código');
            }
        };

        const deobfuscatedCode = deobfuscateCode(obfuscatedCode);

        const filePath = path.join('/tmp', fileName);
        fs.writeFileSync(filePath, deobfuscatedCode);

        await conn.sendMessage(m.chat, {
            document: fs.createReadStream(filePath),
            mimetype: 'text/plain',
            fileName: fileName,
            caption: `🌸 *Código Desofuscado.*`
        });

        fs.unlink(filePath, (err) => {
            if (err) console.error('Error al eliminar el archivo:', err);
        });
    } catch (error) {
        console.error('Error:', error);
        m.reply(`🌷 *Error:* ${error.message}`);
    }
};

handler.help = ['desofuscar <nombre archivo.js>|<código ofuscado>'];
handler.tags = ['tools'];
handler.command = ['desofuscar', 'deobfuscate', 'deobf'];
handler.register = true;

export default handler;
