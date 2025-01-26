import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
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
        return conn.sendMessage(m.chat, { text: '☁️ Te Faltó El Texto!' }, { quoted: m });
    }

    try {
        const buffer = await fetchSticker(text);
        const outputFilePath = path.join(tmpdir(), `sticker-${Date.now()}.png`);

        const image = await loadImage(buffer);
        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(image, 0, 0, 512, 512);
        const out = fs.createWriteStream(outputFilePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', async () => {
            await conn.sendMessage(m.chat, { sticker: { url: outputFilePath } }, { quoted: m });
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        return conn.sendMessage(m.chat, { text: `Hubo un error 😪` }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;
