import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
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

        const image = await loadImage(buffer);
        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(image, 0, 0, 512, 512);

        const bufferOutput = canvas.toBuffer('image/png');
        fs.writeFileSync(outputFilePath, bufferOutput);

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
