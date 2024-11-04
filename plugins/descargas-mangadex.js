import fetch from 'node-fetch';
import { createWriteStream } from 'fs';
import { promises as fsPromises } from 'fs';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = async (url, filename) => {
    const filePath = path.join(__dirname, `temp_image_${filename}`);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`No se pudo descargar la imagen: ${url}`);
        const stream = createWriteStream(filePath);
        response.body.pipe(stream);
        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(filePath));
            stream.on('error', reject);
        });
    } catch (error) {
        console.error(error);
        return null; // Retornar null en caso de error
    }
};

const createPDF = async (images, part) => {
    const pdfPath = path.join(__dirname, `manga_part_${part}.pdf`);
    const doc = new PDFDocument();
    const stream = createWriteStream(pdfPath);
    doc.pipe(stream);
    for (const image of images) {
        doc.addPage().image(image, { fit: [500, 700], align: 'center', valign: 'center' });
    }
    doc.end();
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(pdfPath));
        stream.on('error', reject);
    });
};

const filterChaptersByLanguage = (chapters, langCode) => {
    return langCode
        ? chapters.filter(ch => ch.attributes.translatedLanguage === langCode)
        : chapters.filter(ch => ch.attributes.translatedLanguage === 'es' || ch.attributes.translatedLanguage === 'en');
};

let handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        return conn.reply(m.chat, '🚩 Por favor, ingresa el nombre del manga y el número del capítulo. Ejemplo: .mangad Naruto 1', m);
    }
    
    const mangaName = args.slice(0, -2).join(' ');
    const chapterRequested = args[args.length - 2];
    const langCode = args.length === 3 ? args[args.length - 1].toLowerCase() : null;

    const validLanguages = ['es', 'en', 'ja', 'es-la'];
    if (langCode && !validLanguages.includes(langCode)) {
        return conn.reply(m.chat, '🚩 Idioma no válido. Usa (es) para español, (en) para inglés, (ja) para japonés o (es-la) para español latinoamericano.', m);
    }

    try {
        await m.react('🕓');

        const searchResponse = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(mangaName)}`);
        if (!searchResponse.ok) throw new Error('No se pudo encontrar el manga.');
        const { data: mangaList } = await searchResponse.json();
        if (!mangaList.length) return conn.reply(m.chat, '🚩 Manga no encontrado.', m);
        
        const mangaId = mangaList[0].id;

        const chaptersResponse = await fetch(`https://api.mangadex.org/chapter?manga=${mangaId}&limit=100`);
        if (!chaptersResponse.ok) throw new Error('No se pudieron obtener los capítulos.');
        const { data: chapters } = await chaptersResponse.json();

        const filteredChapters = filterChaptersByLanguage(chapters, langCode);
        const chapterData = filteredChapters.find(ch => ch.attributes.chapter === chapterRequested);
        if (!chapterData) return conn.reply(m.chat, `🚩 Capítulo ${chapterRequested} no encontrado en ${mangaName}.`, m);
        
        const images = [];
        const chapterId = chapterData.id;

        const imageResponse = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
        if (!imageResponse.ok) throw new Error('No se pudo obtener información del capítulo.');
        const imageData = await imageResponse.json();
        if (!imageData.chapter) throw new Error('No se pudo obtener información del capítulo.');

        const { baseUrl, chapter: { hash, data } } = imageData;
        const downloadPromises = data.map(filename => {
            const imageUrl = `${baseUrl}/data/${hash}/${filename}`;
            return downloadImage(imageUrl, filename);
        });

        const downloadedImages = await Promise.all(downloadPromises);
        const validImages = downloadedImages.filter(img => img !== null); // Filtrar imágenes que no se descargaron correctamente

        const pdfPath = await createPDF(validImages, chapterRequested);
        await conn.sendMessage(m.chat, { document: { url: pdfPath }, mimetype: 'application/pdf', fileName: `${mangaName}_Capítulo_${chapterRequested}.pdf` }, { quoted: m });

        await Promise.all(validImages.map(img => fsPromises.unlink(img)));

        await m.react('✅');
    } catch (error) {
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 Error: ${error.message}`, m);
    }
};

handler.help = ["mangad <nombre del manga> <número del capítulo> [es/en/ja/es-la]"];
handler.tags = ['tools'];
handler.command = /^(mangad)$/i;

export default handler;
