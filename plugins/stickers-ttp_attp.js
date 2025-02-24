import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import axios from 'axios';

let handler = async(m, { conn, text, args, usedPrefix, command }) => {
    if (!text) return m.reply(`${emoji} Por favor, ingresa un texto para crear un sticker.`);
    let teks = encodeURI(text);
    let userId = m.sender;
    let packstickers = global.db.data.users[userId] || {};
    let texto1 = packstickers.text1 || global.packsticker;
    let texto2 = packstickers.text2 || global.packsticker2;

    if (command == 'attp') {
        const data = {
            text: `${text}`
        };
        const response = await axios.post('https://salism3api.pythonanywhere.com/text2gif', data);
        const x = response.data.image;
        let stiker = await sticker(null, x, texto1, texto2);
        conn.sendFile(m.chat, stiker, null, { asSticker: true });
    }
    if (command == 'ttp') {
        const data = {
            text: `${text}`,
            "outlineColor": "255,0,0,255",
            "textColor": "0,0,0,255"
        };
        const response = await axios.post('https://salism3api.pythonanywhere.com/text2img', data);
        const x = response.data.image;
        let stiker = await sticker(null, x, texto1, texto2);
        conn.sendFile(m.chat, stiker, null, { asSticker: true });
    }
}

handler.tags = ['sticker']
handler.help = ['ttp', 'attp']
handler.command = ['ttp', 'attp']

export default handler;
