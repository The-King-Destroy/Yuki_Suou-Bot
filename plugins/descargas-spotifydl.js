import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return m.reply(`Ingresa un enlace de Spotify`)
    
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/spotifydlv2?url=${args[0]}`)
let json = await api.json()
let { data } = json
let { title, artist, image, cover, url, album, duration, publish, popularity, preview, download } = data

let JT = `*Titulo:* ${title}
*autor:* ${artist}
*Album :* ${album}
*Duracion :* ${duration}
*Publicado :* ${publish}
*Popularidad :* ${popularity}`


await conn.sendFile(m.chat, image, `HasumiBotFreeCodes.jpeg`, JT, m);
await conn.sendFile(m.chat, download, 'hasumiBotFreeCodes.mp3', null, m)

} catch (error) {
console.error(error)
}}

handler.command = /^(spotifydl)$/i

export default handler
