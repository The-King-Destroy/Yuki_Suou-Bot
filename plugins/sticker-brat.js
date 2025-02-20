import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
    tmpdir
} from 'os';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: {
                q: text
            },
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

const handler = async (m, {
    text,
    conn
}) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `${emoji} Por favor ingresa el texto para hacer un sticker.`,
        }, {
            quoted: m
        });
    }

    try {
        const buffer = await fetchSticker(text);
        let stiker = await sticker(buffer, false, global.botname, global.nombre);
        
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'error.webp', '', m);
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `${msm} Ocurrio un error.`,
        }, {
            quoted: m
        });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;
