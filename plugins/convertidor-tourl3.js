
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from 'path';

const IMGBB_API_KEY = '1f55ea75f24df783643940f3eacbbc96'; // Reemplaza con tu propia API key si es necesario

let handler = async (m, { args, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  // Verificar si el tipo de archivo es una imagen
  if (!mime.startsWith('image/')) {
    throw `✳️ Por favor, envía una imagen.`;
  }

  // Verificar que se haya proporcionado un texto
  if (!args[0]) {
    throw `\`\`\`[ 🌺 ] Ingresa un texto para guardar la imagen. Ejemplo:\n${usedPrefix + command} Yuki\`\`\``;
  }

  try {
    let media = await q.download();
    let tempFilePath = path.join(os.tmpdir(), `${args[0]}.jpg`); // Guardar con el nombre proporcionado
    fs.writeFileSync(tempFilePath, media);

    let form = new FormData();
    form.append('image', fs.createReadStream(tempFilePath));

    let response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, form, {
      headers: {
        ...form.getHeaders()
      }
    });

    if (!response.data || !response.data.data || !response.data.data.url) {
      throw '❌ Error al subir el archivo a ImgBB';
    }
    
    let link = response.data.data.url;
    fs.unlinkSync(tempFilePath); // Eliminar archivo temporal

    m.reply(`❖ *${args[0]}* ha sido guardado como imagen.\n❖ (Archivo subido a ImgBB)\n❖ *URL:* ${link}`);
  } catch (error) {
    console.error('Error al subir el archivo:', error.message);
    throw '❌ Ocurrió un error al procesar la imagen.';
  }
}

handler.help = ['to/up'];
handler.tags = ['transformador'];
handler.command = ['up', 'to'];

export default handler;
