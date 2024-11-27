export default handler

import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return m.reply('Ingresa un texto para buscar la letra de la canción.')

try {
let api = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(text)}`)
let { image, title, artist, lyrics } = await api.json()
        

let JT = `*Título:* ${title}
*Artista:* ${artist}

*Letra:*
${lyrics}`

await conn.sendFile(m.chat, image, 'HasumiBotFreeCodes.jpg', JT, m)
} catch (error) {
console.error(error)
}}

handler.command = ['lyrics'] 

export default handler