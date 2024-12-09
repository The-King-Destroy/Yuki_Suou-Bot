import fs from 'fs';  
import path from 'path';  

let handler = async (m, { conn, isRowner }) => {

  if (!m.quoted || !/image/.test(m.quoted.mimetype)) return m.reply('✐ Por favor, responde a una imagen con el comando *setbanner* para actualizar la foto del menú.');

  try {

    const media = await m.quoted.download();

    if (!isImageValid(media)) {
      return m.reply('✧ El archivo enviado no es una imagen válida.');
    }

    global.imagen1 = media;  

    await conn.sendFile(m.chat, media, 'banner.jpg', '✐ Banner actualizado.', m);

  } catch (error) {
    console.error(error);
    m.reply('✧ Hubo un error al intentar cambiar el banner.');
  }
};


const isImageValid = (buffer) => {
  const magicBytes = buffer.slice(0, 4).toString('hex');


  if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2') {
    return true;
  }


  if (magicBytes === '89504e47') {
    return true;
  }


  if (magicBytes === '47494638') {
    return true;
  }

  return false; 
};

handler.help = ['setbanner'];
handler.tags = ['tools'];
handler.command = ['setbanner'];
handler.rowner = false;

export default handler;
