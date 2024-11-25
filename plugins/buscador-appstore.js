import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`🌸 *Ingresa el nombre de una aplicacion*\n *Ejemplo: /appstore WhatsApp*`)

try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/search/appstore?q=${encodeURIComponent(text)}`)
let json = await api.json()

let JT = '🌐 AppStore  -  Search 🌐';
json.forEach((app, index) => {
      JT += `\n\n══════════════════════`;
      JT += `\n🌹 *Nro :* ${index + 1}`
      JT += `\n⚜️ *Titulo:* ${app.title}`
      JT += `\n👨‍💻 *Desarrollador:* ${app.developer}`
      JT += `\n📱 *Genero:* ${app.genre.join(', ')}`
      JT += `\n📆 *Fecha de lanzamiento:* ${app.released}`
      JT += `\n🚀 *Ultima Actualizacion:*  ${app.updated}`
      JT += `\n📚 *Version:* ${app.version}`
      JT += `\n📊 *Tamaño:* ${app.size}`
      JT += `\n⭐ *Puntuacion:* ${app.score} ( ${app.reviews} )`
      JT += `\n🔗 *Link:* [ ${app.title} ]( ${app.url} )`
})

m.reply(JT)
} catch (error) {
console.error(error)
}}

handler.command = /^(appstore)$/i

export default handler
