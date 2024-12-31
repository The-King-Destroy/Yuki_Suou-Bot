import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
let formatos = ["mp3", "mp4", "mp3doc", "mp4doc"]
let [feature, ...query] = text.split(" ")

if (!formatos.includes(feature)) {
return conn.reply(m.chat, `❀ Ingresa el formato y el texto de lo que quieres buscar\n\n*❀ ejemplo :*\n*${usedPrefix + command}* mp3 *<txt>*\n\n*❀ Formatos disponibles* :\n\n*${usedPrefix + command}* mp3\n*${usedPrefix + command}* mp3doc\n*${usedPrefix + command}* mp4\n*${usedPrefix + command}* mp4doc`, m)
}

if (!query.length) {
return conn.reply(m.chat, `❀ ingresa el texto de lo que quieres buscar\n\n*❀ ejemplo :*\n*${usedPrefix + command}* mp3 *<txt>*`, m)
}

let res = await yts(query.join(" "))
let vid = res.videos[0]
let txt = `- *Título*: ${vid.title}
- *Duración*: ${vid.timestamp}
- *Visitas*: ${toNum(vid.views)}
- *Autor*: ${vid.author.name}
- *Publicado*: ${eYear(vid.ago)}
- *Url*: https://youtu.be/${vid.videoId}`

await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m)
  
try {
let api = await fetch(`https://api.giftedtech.my.id/api/download/ytdl?apikey=gifted&url=${vid.url}`)
let json = await api.json()


let dl_url = feature.includes('mp3') ? json.result.audio_url : json.result.video_url
let fileType = feature.includes('mp3') ? 'audio/mp3' : 'video/mp4'
let fileName = `${json.result.title}.${feature.includes('mp3') ? 'mp3' : 'mp4'}`

let isDoc = feature.includes('doc')
let file = { url: dl_url }

await conn.sendMessage(m.chat, { [isDoc ? 'document' : feature.includes('mp3') ? 'audio' : 'video']: file,  mimetype: fileType,  fileName: fileName  }, { quoted: m })
    
} catch (error) {
console.error(error)
}}


handler.command = ['play1']
export default handler

function eYear(txt) {
    if (!txt) return '×'
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' dia'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' dias'
        return L
    }
    return txt
}


function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
    }
