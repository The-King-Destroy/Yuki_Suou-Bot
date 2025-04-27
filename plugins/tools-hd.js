import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import Jimp from "jimp"
import FormData from "form-data"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const handler = async (m, { conn }) => {
  try {
    let q = m.quoted || m
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime) {
      return m.reply(`❀ Por favor, envie una imagen o responda a la imagen utilizando el comando.`)
    }

    if (!/image\/(jpe?g|png)/.test(mime)) {
      return m.reply(`✧ El formato del archivo (${mime}) no es compatible, envía o responde a una imagen.`)
    }

    conn.reply(m.chat, '✧ Mejorando la calidad de la imagen....', m)
    let buffer = await q.download()
    let image = await Jimp.read(buffer)
    image.resize(800, Jimp.AUTO)

    let tmp = path.join(__dirname, `tmp_${Date.now()}.jpg`)
    await image.writeAsync(tmp)

    let url = await uploadToUguu(tmp)
    if (!url) throw new Error('Lo sentimos no se pudo procesar la imagen.')

    let enhanced = await upscaleImage(url)
    await conn.sendFile(m.chat, enhanced, "hd.jpg", "", fkontak)
  } catch (err) {
    conn.reply(m.chat, `⚠︎ Ocurrio un error: ${err.message}`, m)
  }
}

handler.help = ['upscale']
handler.tags = ['tools']
handler.command = ['hd', 'remini', 'upscale']

export default handler

async function uploadToUguu(filePath) {
  const form = new FormData()
  form.append("files[]", fs.createReadStream(filePath))

  try {
    const res = await fetch("https://uguu.se/upload.php", {
      method: "POST",
      headers: form.getHeaders(),
      body: form
    })

    const json = await res.json()
    await fs.promises.unlink(filePath)
    return json.files?.[0]?.url
  } catch {
    await fs.promises.unlink(filePath)
    return null
  }
}

async function upscaleImage(url) {
  const res = await fetch(`https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(url)}`)
  if (!res.ok) throw new Error("No se pudo mejorar la imagen.")
  return await res.buffer()
}
