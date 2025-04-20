let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply(`❀ Por favor, envie una imagen o responda a la imagen utilizando el comando.`)
  const imageBuffer = await m.quoted.download()
  m.react("🕒")
  try {
    const r = await Upscale(imageBuffer)
    if (!r) throw "Error al mejorar la imagen."
    await conn.sendFile(m.chat, r, 'image.jpg', '', m)
    m.react("✅")
  } catch (e) {
    m.reply("Ocurrió un error al procesar la imagen: " + e)
  }
}
handler.command = ["hd", "hdr", "remini"]
handler.help = ["remini"]
handler.tags = ["tools"]
export default handler

async function Upscale(imageBuffer) {
  try {
    const response = await fetch("https://lexica.qewertyy.dev/upscale", {
      body: JSON.stringify({
        image_data: imageBuffer.toString("base64"),
        format: "binary",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
    return Buffer.from(await response.arrayBuffer())
  } catch (e) {
    return null
  }
}
