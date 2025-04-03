import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'
const MAX_SIZE_MB = 100

const handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text.trim()) {
    return conn.reply(m.chat, `❀ Por favor, ingresa el nombre de la música a descargar.`, m)
  }
  try {
    const search = await yts(text)
    if (!search.all.length) {
      return m.reply('✧ No se encontraron resultados para tu búsqueda.')
    }

    const videoInfo = search.all[0]
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo
    const vistas = formatViews(views)
    const canal = author.name || 'Desconocido'
    const infoMessage = `「✦」Descargando *<${title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${views}*\n> ⴵ Duración » *${timestamp}*\n> ✐ Publicación » *${ago}*\n> 🜸 Link » ${url}`

    const thumb = (await conn.getFile(thumbnail)).data

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)

    let api, result, fileSizeMB
    if (command === 'mp3' || command === 'playaudio') {
      api = await fetchAPI(url, 'audio')
      result = api.download || api.data.url
      fileSizeMB = await getFileSize(result)

      if (fileSizeMB > MAX_SIZE_MB) {
        await conn.sendMessage(m.chat, { document: { url: result }, fileName: `${api.title || api.data.filename}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      } else {
        await conn.sendMessage(m.chat, { audio: { url: result }, fileName: `${api.title || api.data.filename}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      }
    } else if (command === 'mp4' || command === 'playvideo') {
      api = await fetchAPI(url, 'video')
      result = api.download || api.data.url
      fileSizeMB = await getFileSize(result)

      if (fileSizeMB > MAX_SIZE_MB) {
        await conn.sendMessage(m.chat, { document: { url: result }, fileName: `${api.title || api.data.filename}.mp4`, mimetype: 'video/mp4' }, { quoted: m })
      } else {
        await conn.sendMessage(m.chat, { video: { url: result }, fileName: api.title || api.data.filename, mimetype: 'video/mp4', caption: title, thumbnail: api.thumbnail || thumb }, { quoted: m })
      }
    } else {
      throw new Error("✧ Comando no reconocido.")
    }

  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error.message}`)
  }
}

const fetchAPI = async (url, type) => {
    const fallbackEndpoints = {
      audio: `https://api.neoxr.eu/api/youtube?url=${url}&type=audio&quality=128kbps&apikey=Paimon`,
      video: `https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=720p&apikey=Paimon`,
    }
    const response = await fetch(fallbackEndpoints[type])
    return await response.json()
}

const getFileSize = async (url) => {
  try {
    const response = await axios.head(url)
    const sizeInBytes = response.headers['content-length'] || 0
    return parseFloat((sizeInBytes / (1024 * 1024)).toFixed(2))
  } catch (error) {
    return 0
  }
}
handler.command = handler.help = ['playaudio', 'mp3', 'playvideo', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}
