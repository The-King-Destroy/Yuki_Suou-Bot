import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileTypeFromBuffer } from 'file-type';

async function searchManga(title) {
    try {
        const response = await axios.get(`https://api.mangadex.org/manga`, {
            params: { title, limit: 1 },
        });

        const mangaList = response.data.data;
        if (!mangaList.length) throw new Error('Manga no encontrado.');

        return mangaList[0];
    } catch (error) {
        console.error(`Error searching manga: ${error.message}`);
        throw error;
    }
}

async function getMangaChapters(mangaId) {
    try {
        const response = await axios.get(`https://api.mangadex.org/chapter`, {
            params: { manga: mangaId, limit: 100 },
        });

        const chapters = response.data.data;
        if (!chapters.length) throw new Error('Capítulos no encontrados.');

        return chapters;
    } catch (error) {
        console.error(`Error fetching manga chapters: ${error.message}`);
        throw error;
    }
}

async function getChapterImages(chapterId) {
    try {
        const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
        const chapterData = response.data;
        const baseUrl = chapterData.baseUrl;
        const chapterHash = chapterData.chapter.hash;
        const imageList = chapterData.chapter.data;

        return imageList.map(image => `${baseUrl}/data/${chapterHash}/${image}`);
    } catch (error) {
        console.error(`Error fetching chapter images: ${error.message}`);
        throw error;
    }
}

async function createMangaPdf(imageUrls, outputPath) {
    const pdfDoc = await PDFDocument.create();

    for (const imageUrl of imageUrls) {
        try {
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imageResponse.data);

            const fileType = await fileTypeFromBuffer(imageBuffer);
            let image;
            if (fileType && fileType.mime === 'image/jpeg') {
                image = await pdfDoc.embedJpg(imageBuffer);
            } else if (fileType && fileType.mime === 'image/png') {
                image = await pdfDoc.embedPng(imageBuffer);
            } else {
                console.warn(`Skipping unsupported image type: ${fileType ? fileType.mime : 'unknown'}`);
                continue;
            }

            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
        } catch (error) {
            console.error(`Error processing image: ${imageUrl}. Skipping...`);
            continue;
        }
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
}

const handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        return m.reply('✦ Uso del comando: .mangad <título del manga> <número del capítulo>\nEjemplo: .mangad One Piece 10');
    }

    const mangaTitle = args.slice(0, -1).join(' ');
    const chapterRequested = args[args.length - 1];
    
    try {
        const manga = await searchManga(mangaTitle);
        const mangaId = manga.id;
        m.reply(`✦ Manga encontrado: ${manga.attributes.title.en}`);
        
        const chapters = await getMangaChapters(mangaId);
        const chapterData = chapters.find(ch => ch.attributes.chapter === chapterRequested);
        
        if (!chapterData) return m.reply(`Capítulo ${chapterRequested} no encontrado en el manga ${mangaTitle}.`);
        
        const imageUrls = await getChapterImages(chapterData.id);
        const outputPath = path.join('/tmp', `${manga.attributes.title.en} - Capitulo ${chapterRequested}.pdf`);
        await createMangaPdf(imageUrls, outputPath);

        await conn.sendMessage(m.chat, {
            document: { url: outputPath },
            fileName: `${manga.attributes.title.en} - Capitulo ${chapterRequested}.pdf`,
            mimetype: 'application/pdf',
        }, { quoted: m });
        
        fs.unlinkSync(outputPath); // Eliminar el archivo temporal después de enviar
    } catch (error) {
        m.reply(`⚠️ Error: ${error.message}`);  // Mensaje específico para el usuario
    }
};

handler.help = ['mangad'];
handler.tags = ['descargas'];
handler.command = /^mangad$/i;
export default handler;
