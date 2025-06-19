import axios from 'axios'
import baileys from '@whiskeysockets/baileys'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`❀ Por favor, ingresa lo que deseas buscar por Pinterest.`)

  try {
    m.react('🕒')
    let results = await pins(text)

    if (!results.length) return conn.reply(m.chat, `✧ No se encontraron resultados para "${text}".`, m)

    const medias = results.slice(0, 10).map(img => ({ type: 'image', data: { url: img.hd } }))

    await conn.sendSylphy(m.chat, medias, {
      caption: `❀  Pinterest  -  Search  ❀\n\n✧ Búsqueda » "${text}"\n✐ Resultados » ${medias.length}\n\n${dev}`,
      quoted: m
    })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (error) {
    conn.reply(m.chat, `⚠︎ Error:\n\n${error.message}`, m)
  }
}

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ['dl']

export default handler

const pins = async (query) => {
  try {
    const { data } = await axios.get(`https://api.stellarwa.xyz/search/pinterest?query=${query}`)

    if (data?.status && data?.data?.length) {
      return data.data.map(item => ({
        hd: item.hd,
        mini: item.mini
      }))
    }

    return []
  } catch (error) {
    console.error("Error al obtener imágenes de Pinterest:", error)
    return []
  }
}