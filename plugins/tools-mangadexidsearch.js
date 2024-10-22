import fetch from 'node-fetch';

import { createWriteStream, promises as fsPromises } from 'fs';

import PDFDocument from 'pdfkit';

import path from 'path';

const downloadImage = async (url) => {

    const response = await fetch(url);

    if (!response.ok) throw new Error(`No se pudo descargar la imagen: ${url}`);

    const buffer = await response.buffer();

    const filename = path.basename(url); 

    const filepath = `./images/${filename}`; 
    await fsPromises.mkdir(path.dirname(filepath), { recursive: true });

    await fsPromises.writeFile(filepath, buffer); 

    return filepath; 

};

const createPDF = async (imagePaths) => {

    const doc = new PDFDocument();

    const pdfPath = './manga.pdf';

    const writeStream = createWriteStream(pdfPath);

    doc.pipe(writeStream);

    for (const imagePath of imagePaths) {

        doc.addPage();

        doc.image(imagePath, { fit: [500, 700], align: 'center', valign: 'center' });

    }

    doc.end();

    return new Promise((resolve, reject) => {

        writeStream.on('finish', () => {

            resolve(pdfPath);

        });

        writeStream.on('error', reject);

    });

};

let handler = async (m, { conn, args }) => {

    if (!args[0]) return conn.reply(m.chat, '🚩 Por favor, ingresa el ID del manga que deseas descargar.', m);

    

    const mangaId = args[0];

    const apiUrl = `https://api.mangadex.org/manga/${mangaId}/feed`;

    try {

        await m.react('🕓');

        const response = await fetch(apiUrl, {

            method: 'GET',

            headers: {

                'Content-Type': 'application/json'

            }

        });

        

        if (!response.ok) throw new Error('No se pudo obtener información del manga.');

        const data = await response.json();

        const chapters = data.data;

        if (!chapters || chapters.length === 0) return conn.reply(m.chat, '🚩 No se encontraron capítulos para este manga.', m);

        const imagePaths = [];

        for (const chapter of chapters) {

            const chapterId = chapter.id;

            const chapterDetailsResponse = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);

            const chapterDetails = await chapterDetailsResponse.json();

            if (!chapterDetails.chapter) {

                console.error(`Detalles del capítulo no encontrados para ID: ${chapterId}`);

                continue; 

            }

            const host = chapterDetails.baseUrl;

            const chapterHash = chapterDetails.chapter.hash;

            const images = chapterDetails.chapter.data;

            for (const image of images) {

                const imageUrl = `${host}/data/${chapterHash}/${image}`;

                

                const imagePath = await downloadImage(imageUrl);

                imagePaths.push(imagePath);

            }

        }

        // Intentar crear y enviar el PDF

        if (imagePaths.length === 0) {

            return conn.reply(m.chat, '🚩 No se encontraron imágenes para crear el PDF.', m);

        }

        const pdfPath = await createPDF(imagePaths);

        await conn.sendMessage(m.chat, { document: { url: pdfPath }, mimetype: 'application/pdf', fileName: 'manga.pdf' }, { quoted: m });

        await m.react('✅');

    } catch (error) {

        console.error(error);

        await m.react('✖️');

        return conn.reply(m.chat, `🚩 Error: ${error.message}`, m);

    }

}

handler.help = ['mangadown'].map(v => v + " *<ID del manga>*");

handler.tags = ['descargas'];

handler.command = ['mangadex'];

export default handler;= ['mangadex'].map(v => v + " *<ID del manga>*");

handler.tags = ['descargas'];

handler.command = ['mangadex', 'mdex'];

export default handler;angadown'].map(v => v + " *<ID del manga>*");

handler.tags = ['descargas'];

handler.command = ['mangadex'];

export default handler;