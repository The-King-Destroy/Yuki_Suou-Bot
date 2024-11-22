import fetch from 'node-fetch'

let handler = async (m, { args, conn }) => {
if (!args[0]) return m.reply("🌸 *ingresa un enlace de capcut*")
    
try {
let api = await fetch(`https://tools.betabotz.eu.org/tools/capcutdl?url=${args[0]}`)
let json = await api.json()
let { title, description, video_ori, cover:img, author_profile } = json.result   
let JT = `🌷 *Titulo :* ${title}
📖 *Descripcion :* ${description}`
await conn.sendFile(m.chat , video_ori, 'Yuki.mp4', JT, m)
} catch (error) {
console.error(error)
}}

handler.command = ['capcut']

export default handler