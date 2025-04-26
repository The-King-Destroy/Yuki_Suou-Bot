import acrcloud from "acrcloud"

const acr = new acrcloud({
   host: "identify-ap-southeast-1.acrcloud.com",
   access_key: "ee1b81b47cf98cd73a0072a761558ab1",
   access_secret: "ya9OPe8onFAnNkyf9xMTK8qRyMGmsghfuHrIMmUI"
})

let handler = async(m, { conn, text }) => {
   let q = m.quoted ? m.quoted : m
   if (!q.mimetype || !q.mimetype.includes("audio")) {
      return m.reply("❀ Por favor, responde al audio del cual deseas buscar el título.")
   }
   m.react('🕒')
   let buffer = await q.download()
   try {
      let data = await whatmusic(buffer)
      if (!data.length) return m.reply("✧ No se encontraron datos de la canción")

      let cap = "乂 S H A Z A M - M U S I C 乂\n\n"
      for (let result of data) {
         cap += `> ✐ Título » ${result.title}\n`
         cap += `> ✦ Artista » ${result.artist}\n`
         cap += `> ⴵ Duración » ${result.duration}\n`
         cap += `> 🜸 Enlace » ${result.url.filter(x => x).map(i => `\n${i}`).join("\n")}\n\n`
      }
      conn.relayMessage(m.chat, {
         extendedTextMessage: {
            text: cap + dev,
            contextInfo: {
               mentionedJid: conn.parseMention(cap),
               externalAdReply: {
                  title: '✧ Whats • Music ✧',
                  mediaType: 1,
                  previewType: 0,
                  renderLargerThumbnail: true,
                  thumbnail: await (await fetch('https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742781294508.jpeg')).buffer(),
                  sourceUrl: ''
               }
            }
         }
      }, { quoted: m })
      m.react('✅')
   } catch (error) {
      m.reply("⚠︎ Ocurrió un error.")
   }
}

handler.command = ["whatmusic", "shazam"]
handler.help = ["whatmusic"]
handler.tags = ["tools"]
export default handler

async function whatmusic(buffer) {
   let data = (await acr.identify(buffer)).metadata
   if (!data.music) return []

   return data.music.map(a => ({
      title: a.title,
      artist: a.artists[0].name,
      duration: toTime(a.duration_ms),
      url: Object.keys(a.external_metadata).map(i =>
         i === "youtube"
            ? "https://youtu.be/" + a.external_metadata[i].vid
            : i === "deezer"
               ? "https://www.deezer.com/us/track/" + a.external_metadata[i].track.id
               : i === "spotify"
                  ? "https://open.spotify.com/track/" + a.external_metadata[i].track.id
                  : ""
      )
   }))
}

function toTime(ms) {
   let m = Math.floor(ms / 60000) % 60
   let s = Math.floor(ms / 1000) % 60
   return [m, s].map(v => v.toString().padStart(2, "0")).join(":")
}