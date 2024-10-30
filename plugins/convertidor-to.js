import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from 'path';

let handler = async (m, { args, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw `*[🌹] Responde al archivo multimedia que deseas convertir en enlace.*`;
  let media = await q.download();
  let tempFilePath = path.join(os.tmpdir(), 'Yuki');
  fs.writeFileSync(tempFilePath, media);

  let form = new FormData();
  form.append('image', fs.createReadStream(tempFilePath));

  try {
    let response = await axios.post('https://api.imgbb.com/1/upload?key=1f55ea75f24df783643940f3eacbbc96', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    if (!response.data || !response.data.data || !response.data.data.url) throw global.errori;
    
    let link = response.data.data.url;
    fs.unlinkSync(tempFilePath);

    m.reply(`

*[🌹] Archivo subido con éxito.*

*🔗.- URL:* ${link}
*💾.- Peso:* ${media.length} Byte(s)
    `);
  } catch (error) {
    console.error('Error al subir el archivo:', error.message);
    throw global.errori;
  }
}

handler.help = ['to <reply image>'];
handler.tags = ['transformador'];
handler.command = ['up', 'to'];

export default handler;
