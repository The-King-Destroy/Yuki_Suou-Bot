import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from 'path';

const uploadImageHandler = async (message, { args, command, usedPrefix }) => {
  // Verificar si hay un mensaje citado o usar el mensaje actual
  let q = message.quoted ? message.quoted : message;
  let mime = (q.msg || q).mimetype || '';

  // Validar el tipo de contenido
  if (!mime || !mime.startsWith('image/')) {
    throw `✳️ Por favor, envía una imagen para subir.`;
  }

  // Descargar la imagen
  let media = await q.download();
  let tempFilePath = path.join(os.tmpdir(), `image_${Date.now()}.jpg`);

  // Guardar la imagen en un archivo temporal
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
      throw '❌ Error al subir el archivo. Inténtalo de nuevo.';
    }

    // Obtener el enlace de la imagen
    let link = response.data.data.url;

    // Eliminar el archivo temporal
    fs.unlinkSync(tempFilePath);

    // Responder al usuario con el enlace
    message.reply(`❖ ${media.length} Byte(s)\n❖ (Archivo subido a ImgBB)\n❖ *URL:* ${link}`);
  } catch (error) {
    console.error('Error al subir el archivo:', error.message);
    throw '❌ Error al subir el archivo a ImgBB. Por favor, inténtalo más tarde.';
  }
}

// Definir la ayuda y comandos
uploadImageHandler.help = ['tourl3'];
uploadImageHandler.tags = ['transformador'];
uploadImageHandler.command = ['upload', 'tourl3'];

// Exportar el manejador
export default uploadImageHandler;
