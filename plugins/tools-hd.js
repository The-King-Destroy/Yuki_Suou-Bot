import FormData from "form-data"
import Jimp from "jimp"
const handler = async (m, {conn, usedPrefix, command}) => {
  try {    
  await m.react('🕓')
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ""
  if (!mime) return conn.reply(m.chat, `❀ Por favor, envie una imagen o responda a la imagen utilizando el comando.`, m)
  if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`✧ El formato del archivo (${mime}) no es compatible, envía o responde a una imagen.`)
  conn.reply(m.chat, `✧ Mejorando la calidad de la imagen....`, m)  
  let img = await q.download?.()
  let pr = await remini(img, "enhance")
  await conn.sendFile(m.chat, pr, 'thumbnail.jpg', listo, m, null)
  await m.react('✅')
  } catch {
  await m.react('✖️')
}}
handler.help = ["hd"]
handler.tags = ["tools"]
handler.command = ["remini", "hd", "enhance"]

export default handler

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (availableOperations.includes(operation)) {
      operation = operation
    } else {
      operation = availableOperations[0]
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    )
  })
}
