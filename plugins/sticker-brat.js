import axios from 'axios';
import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';
import { tmpdir } from 'os';

const fetchSticker = async (text) => {
    const response = await axios.get('https://kepolu-brat.hf.space/brat', {
        params: { q: text },
        responseType: 'arraybuffer',
    });
    return response.data;
};

const handler = async (m, { text, conn }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: '🍬 Por favor ingresa el texto para hacer un sticker.',
        }, { quoted: m });
    }

    try {
        const buffer = await fetchSticker(text);
        const outputFilePath = path.join(tmpdir(), `sticker-${Date.now()}.png`);

        const image = await Jimp.read(buffer);
        const background = new Jimp(512, 512, 0xFFFFFFFF); // Fondo blanco
        image.resize(512, 512);
        background.composite(image, 0, 0);
        await background.writeAsync(outputFilePath);

        await conn.sendMessage(m.chat, {
            sticker: { url: outputFilePath },
        }, { quoted: m });

        fs.unlinkSync(outputFilePath);
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `⚠️ Ocurrió un error: ${error.message}`,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;
