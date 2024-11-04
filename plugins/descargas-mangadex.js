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
    const response = await fetch(url);
    if (!response.ok) throw new Error(`No se pudo descargar la imagen: ${url}`);
    const stream = createWriteStream(filePath);
    response.body.pipe(stream);
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
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

let handler = async (m, { conn, args }) => {
    if (args.length < 2) return conn.reply(m.chat, '🚩 Por favor, ingresa el nombre del manga y el número del capítulo. Ejemplo: .mangad Naruto 1 es', m);
    
    const mangaName = args.slice(0, -2).join(' ');
    const chapterRequested = args[args.length - 2];
    const langCode = args[args.length - 1].toLowerCase(); // Obtener el código del idioma

    const validLanguages = ['es', 'en', 'ja'];
    if (!validLanguages.includes(langCode)) return conn.reply(m.chat, '🚩 Idioma no válido. Usa (es) para español, (en) para inglés, o (ja) para japonés.', m);

    const langQuery = langCode === 'es' ? 'translatedLanguage[]=es' : langCode === 'en' ? 'translatedLanguage[]=en' : 'translatedLanguage[]=ja';

    try {
        await m.react('🕓');

        // Buscar el manga por nombre
        const searchResponse = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(mangaName)}`);
        if (!searchResponse.ok) throw new Error('No se pudo encontrar el manga.');
        const { data: mangaList } = await searchResponse.json();
        if (!mangaList.length) return conn.reply(m.chat, '🚩 Manga no encontrado.', m);
        
        const mangaId = mangaList[0].id;

        // Obtener capítulos del manga
        const chaptersResponse = await fetch(`https://api.mangadex.org/chapter?manga=${mangaId}&limit=100&${langQuery}`);
        if (!chaptersResponse.ok) throw new Error('No se pudieron obtener los capítulos.');
        const { data: chapters } = await chaptersResponse.json();
        
        // Buscar el capítulo solicitado
        const chapterData = chapters.find(ch => ch.attributes.chapter === chapterRequested);
        if (!chapterData) return conn.reply(m.chat, `🚩 Capítulo ${chapterRequested} no encontrado en ${mangaName}.`, m);
        
        const images = [];
        const chapterId = chapterData.id;

        // Obtener URLs de las imágenes del capítulo
        const imageResponse = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
        if (!imageResponse.ok) throw new Error('No se pudo obtener información del capítulo.');
        const imageData = await imageResponse.json();
        if (!imageData.chapter) throw new Error('No se pudo obtener información del capítulo.');

        const { baseUrl, chapter: { hash, data } } = imageData;
        for (const filename of data) {
            const imageUrl = `${baseUrl}/data/${hash}/${filename}`;
            const imagePath = await downloadImage(imageUrl, filename);
            images.push(imagePath);
        }

        // Crear PDF
        const pdfPath = await createPDF(images, chapterRequested);
        await conn.sendMessage(m.chat, { document: { url: pdfPath }, mimetype: 'application/pdf', fileName: `${mangaName}_Capítulo_${chapterRequested}.pdf` }, { quoted: m });

        // Eliminar archivos temporales
        await Promise.all(images.map(img => fsPromises.unlink(img)));

        await m.react('✅');
    } catch (error) {
        await m.react('✖️');
        return conn.reply(m.chat, `🚩 Error: ${error.message}`, m);
    }
};

handler.help = ["mangad <nombre del manga> <número del capítulo> <es/en/ja>"];
handler.tags = ['tools'];
handler.command = /^(mangad)$/i;

export default handler;
