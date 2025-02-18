import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply('⚠ Mi Paquete')
  let stiker = false
  try {
   await m.react(rwait)
    let [packsticker, ...packsticker2] = text.split('|')
    packsticker2 = (packsticker2 || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply(`${emoji} Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.\nEjemplo: *${usedPrefix + command} Nuevo Nombre*`)
    let img = await m.quoted.download()
    if (!img) return m.reply(`${emoji} Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.\nEjemplo: *${usedPrefix + command} Nuevo Nombre*`)
    stiker = await addExif(img, packsticker || '', packsticker2 || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
     if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
  await m.react(done)
     throw `${msm} La conversión falló.`
  }
}
handler.help = ['take *<nombre>|<autor>*']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler
