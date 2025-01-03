import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("🍬 Ingresa un link de YouTube")
  }

  try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${text}`)
    let json = await api.json()
    let { quality, title, download_url } = json.result

    await conn.sendMessage(m.chat, { 
      document: { url: download_url }, 
      caption: `${title}`, 
      mimetype: 'video/mp4', 
      fileName: `${title}.mp4`
    }, { quoted: m })
  } catch (error) {
    console.error(error)
  }
}

handler.command = /^(ytmp4doc)$/i
handler.group = true
handler.limit = 10

export default HS
