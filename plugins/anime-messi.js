import axios from 'axios'

let handler = async(m, { conn, usedPrefix, command }) => {
let res = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/Messi.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendFile(m.chat, url, 'error.jpg', `*Messi*`, m, null, rcanal)} 
//conn.sendButton(m.chat, "*Messi*", author, url, [['⚽ NEXT ⚽', `${usedPrefix + command}`]], m)}

handler.help = ['messi']
handler.tags = ['anime']
handler.command = /^(messi)$/i

export default handler
