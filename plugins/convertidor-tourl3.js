import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from 'path';

const uploadImageHandler = async (message, { args, command, usedPrefix }) => {
  // Determinar el mensaje a utilizar (el citado o el actual)
  let q = message.quoted ? message.quoted : message;
  let mime = (q.msg || q).mimetype || '';

  // Validar el tipo de contenido
  if (!mime || !mime.startsWith('image/')) {
    throw `✳️ Por favor, envía una imagen.`;
  }

  // Obtener la imagen
  let media = await q.download();
  let tempFilePath = path.join(os.tmpdir(), 'uploaded_image');

  // Escribir la imagen en un archivo temporal
  fs.writeFileSync(tempFilePath, media);

  // Preparar el formulario para la carga
  let form = new FormData();
  form.append('image', fs.createReadStream(tempFilePath));

  try {
    // Realizar la solicitud de carga a ImgBB
    let response = await axios.post('https://api.imgbb.com/1/upload?key=1f55ea75f24df783643940f3eacbbc96', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    // Validar la respuesta
    if (!response.data || !response.data.data || !response.data.data.url) {
      throw '❌ Error al subir el archivo';
    }

    // Obtener el enlace de la imagen
    let link = response.data.data.url;

    // Eliminar el archivo temporal
    fs.unlinkSync(tempFilePath);

    // Responder al usuario con el enlace
    message.reply(`❖ ${media.length} Byte(s)\n❖ (Archivo subido a ImgBB)\n❖ *URL:* ${link}`);
  } catch (error) {
    console.error('Error al subir el archivo:', error.message);
    throw '❌ Error al subir el archivo a ImgBB';
  }
}

uploadImageHandler.help = ['tourl3'];
uploadImageHandler.tags = ['transformador'];
uploadImageHandler.command = ['upload', 'tourl3'];

export default uploadImageHandler;
