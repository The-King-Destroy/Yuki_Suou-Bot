import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return m.reply(`Ingresa un enlace de Instagram`)
    
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/instagram?url=${args[0]}`)
let json = await api.json()
let { data } = json
let JT = data
for (let i = 0; i < JT.length; i++) {
let HFC = JT[i];
if (HFC.type === "image") {
await conn.sendMessage(m.chat, { image: { url: HFC.url } }, { quoted: m })
} else if (HFC.type === "video") {
await conn.sendMessage(m.chat, { video: { url: HFC.url } }, { quoted: m })
}}
} catch (error) {
console.error(error)
}}

handler.command = /^(igdl|ig|instagramdl|instagram)$/i

export default handler
