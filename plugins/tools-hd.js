import FormData from "form-data"
import Jimp from "jimp"
import uploadImage from '../lib/uploadImage.js'
import fetch from "node-fetch"

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime) {
      return m.reply(`❀ Por favor, envie una imagen o responda a la imagen utilizando el comando.`)
    }

    if (!/image\/(jpe?g|png)/.test(mime)) {
      return m.reply(`✧ El formato del archivo (${mime}) no es compatible, envía o responde a una imagen.`)
    }

    conn.reply(m.chat, '✧ Mejorando la calidad de la imagen....', m)
    let imgBuffer = await q.download()
    let image = await Jimp.read(imgBuffer)
    image.resize(800, Jimp.AUTO)
    let processedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG)

    let imageUrl = await uploadImage(processedImageBuffer)
    let enhancedImageUrl = await enhanceImage(imageUrl)

    await conn.sendFile(m.chat, enhancedImageUrl, "out.png", "", fkontak)
  } catch (error) {
    return conn.reply(m.chat, `⚠︎ Ocurrió un error: ${error.message}`, m)
  }
}

handler.help = ["hd"]
handler.tags = ["tools"]
handler.command = ["remini", "hd", "enhance"]
handler.group = true

export default handler

async function enhanceImage(imageUrl) {
  try {
    const response = await fetch(
      `https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(imageUrl)}`,
      {
        method: "GET"
      }
    )

    if (!response.ok) {
      throw new Error(
        `Error al procesar la imagen: ${response.status} - ${response.statusText}`
      )
    }

    const result = await response.buffer()
    return result
  } catch (error) {
    throw new Error(
      `Error al mejorar la calidad de la imagen: ${error.message}`
    )
  }
}
