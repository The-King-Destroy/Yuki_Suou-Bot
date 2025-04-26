import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(`${emoji} Ingresa la Ruta y el nombre del Archivo junto al comando.`)
try {
if (!m.quoted.text) return m.reply(`${emoji2} Responde al mensaje.`)
let path = `${text}.js`
await fs.writeFileSync(path, m.quoted.text)
m.reply(`${emoji} Guardado en *${path}*.`)
} catch {
await m.reply(`Responde al mensaje.`)
}}
handler.tags = ['owner']
handler.help = ["savefile <ruta/nombre>"]
handler.command = ["savefile", "savejs", "savecmd"]
handler.rowner = true

export default handler