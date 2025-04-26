import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) return conn.reply(m.chat, `❀ Por favor, responde a un archivo válido (imagen, video, etc.).`, m);
  
  await m.react(rwait);
  
  try {
    let media = await q.download();
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let { link, name } = await megaUpload(media);
    
    let txt = `*乂 M E G A - U P L O A D E R 乂*\n\n`;
    txt += `*» Enlace* : ${link || 'No disponible'}\n`;
    txt += `*» Nombre* : ${name}\n`;
    txt += `*» Tamaño* : ${formatBytes(media.length)}\n`;
    txt += `*» Expiración* : ${isTele ? 'No expira' : 'Desconocido'}\n\n`;
    txt += `> *${dev}*`;
    
    await conn.sendFile(m.chat, media, 'thumbnail.jpg', txt, m, fkontak);
    
    await m.react(done);
  } catch {
    await m.react(error);
  }
};

handler.help = ['up'];
handler.tags = ['transformador'];
handler.command = ['up', 'to'];

export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function megaUpload(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

  const response = await fetch("https://cdnmega.vercel.app/upload", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  const result = await response.json();
  
  if (result.success && result.files.length > 0) {
    return { link: result.files[0].url, name: randomBytes + "." + ext };
  } else {
    return { link: null, name: randomBytes + "." + ext };
  }
}
