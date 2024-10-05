// creado por Angel-OFC 
// no modifiques los créditos
import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '*\`Ingresa el link de la imagen a descargar ✨\`*', m, fake);
    }

    try {
        await m.react('🕒');        
        const response = await axios.get(args[0]);
        const $ = cheerio.load(response.data);
        
        const imgUrl = $('meta[property="og:image"]').attr('content'); 

        if (!imgUrl) {
            throw new Error('No se encontró la imagen.');
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await m.react('✅');
        await conn.sendFile(m.chat, imgUrl, 'imagen.jpg', '*\`[ IMAGEN DE THREADS ]\`*', null, m, fake);
    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, '*\`Error al descargar la imagen. Asegúrate de que el link sea correcto.\`*', m);
    }
}

handler.help = ['threads *<link>*'];
handler.corazones = 2;
handler.tags = ['descargas'];
handler.command = ['threads', 'thdl', 'thread'];

export default handler;
