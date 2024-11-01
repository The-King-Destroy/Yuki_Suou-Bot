import fetch from "node-fetch"

const isYouTubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
const formats = [{
  label: "MP3",
  value: "mp3",
  isAudio: true
}, {
  label: "M4A",
  value: "m4a",
  isAudio: true
}, {
  label: "WEBM",
  value: "webm",
  isAudio: true
}, {
  label: "AAC",
  value: "aac",
  isAudio: true
}, {
  label: "FLAC",
  value: "flac",
  isAudio: true
}, {
  label: "OPUS",
  value: "opus",
  isAudio: true
}, {
  label: "OGG",
  value: "ogg",
  isAudio: true
}, {
  label: "WAV",
  value: "wav",
  isAudio: true
}, {
  label: "MP4 (360p)",
  value: "360",
  isAudio: false
}, {
  label: "MP4 (480p)",
  value: "480",
  isAudio: false
}, {
  label: "MP4 (720p)",
  value: "720",
  isAudio: false
}, {
  label: "MP4 (1080p)",
  value: "1080",
  isAudio: false
}, {
  label: "MP4 (1440p)",
  value: "1440",
  isAudio: false
}, {
  label: "WEBM (4K)",
  value: "4k",
  isAudio: false
}]

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const text = args.length ? args.join(" ") : m.quoted?.text || null
  if (!text) return m.reply(`Ingresa el link de Youtube.\n🌹 Ejemplo:\n*${usedPrefix}${command}* <url>`)
  await m.reply("🌹 Espere un momento ...")

  const [ytUrl, qualityLabel] = text.split(" ")
  if (!isYouTubeUrl.test(ytUrl)) return m.reply(`Ingresa un link de Youtube valido.\n✧ Ejemplo:\n*${usedPrefix}${command}* <url>`)

  const foundFormat = qualityLabel ? formats.find(f => f.value === qualityLabel) : { value: "1440", isAudio: false }
  if (!foundFormat) return m.reply(`La calidad elegida no es válida: ${formats.map(f => f.label).join(", ")}`)

  const loader = new Loader()
  const results = await loader.load(ytUrl, foundFormat.value)

  if (!results || !results.download_url) return m.reply("No se pudo obtener la info del video.")

  const selectedQualityUrl = results.download_url
  const isAudio = foundFormat.isAudio

  if (selectedQualityUrl) {
    await conn.sendMessage(m.chat, {
      [isAudio ? "audio" : "video"]: { url: selectedQualityUrl },
      mimetype: isAudio ? "audio/mpeg" : "video/mp4",
      caption: results.text || ""
    }, { quoted: m })
  } else {
    m.reply("Error/Api down.")
  }
}

handler.help = ["loaderto"].map(v => `${v} <url>`)
handler.tags = ["descargas"]
handler.command = /^(loaderto)$/i

export default handler

class Loader {
  async load(ytUrl, format) {
    const downloadUrl = new URL("https://ab.cococococ.com/ajax/download.php")
    downloadUrl.searchParams.set("format", format)
    downloadUrl.searchParams.set("url", ytUrl)

    const response = await fetch(downloadUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://en.loader.to/4/"
      },
      compress: true
    })

    const json = await response.json()
    if (!json.id) return null

    const progressUrl = new URL("https://p.oceansaver.in/ajax/progress.php")
    progressUrl.searchParams.set("id", json.id)

    const timeout = 60000
    const interval = 2000
    const startTime = Date.now()

    while (true) {
      const progressResponse = await fetch(progressUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0",
          Referer: "https://en.loader.to/4/"
        },
        compress: true
      })
      
      const progressData = await progressResponse.json()
      if (progressData.progress >= 1000) return progressData

      if (Date.now() - startTime > timeout) return null
      await new Promise(resolve => setTimeout(resolve, interval))
    }
  }
}