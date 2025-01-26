import axios from 'axios';
import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';
import { tmpdir } from 'os';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: { q: text },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
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
        const background = new Jimp(512, 512, 0xFFFFFFFF);
        image.resize(512, 512);
        background.composite(image, 0, 0);

        await background.writeAsync(outputFilePath);

        await conn.sendMessage(m.chat, {
            sticker: { url: outputFilePath },
        }, { quoted: m });

        fs.unlinkSync(outputFilePath);
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `⚠️ Ocurrió un error.`,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;
