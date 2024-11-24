/*- `PLUGIN BRAT STICKER`- By Kenisawa*/

import fs from 'fs';
import WSF from "wa-sticker-formatter";

var handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let ps = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : '';
    if (!ps) throw m.reply(`*• Ejemplo :* ${usedPrefix + command} *[texto]*`);

    let res = `https://mxmxk-helper.hf.space/brat?text=${ps}`;
    console.log('URL generada:', res); // Verifica la URL generada

    try {
        async function sticker(img, url, packname, author, categories = [""]) {
            console.log('Creando sticker con:', { img, url, packname, author }); // Imprime los parámetros
            const stickerMetadata = {
                type: "full",
                pack: packname,
                author,
                categories,
            };
            return await new WSF.Sticker(img ? img : url, stickerMetadata).build();
        }

        var stikerp = await sticker(null, res, 'ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ', 'Autor'); // Cambia 'Autor' por el nombre del autor que desees
        console.log('Sticker generado:', stikerp); // Verifica el archivo generado
        await conn.sendFile(m.chat, stikerp, 'atmin.webp', '', m);
    } catch (error) {
        console.error('Detalles del error:', error); // Imprime el error completo en la consola
        await m.reply('Ocurrió un error al procesar tu solicitud.');
    }
}

handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = /^(brat)$/i;

export default handler;
