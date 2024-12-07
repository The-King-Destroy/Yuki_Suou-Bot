import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) { if ((q.msg || q).seconds > 20) return m.reply('[❗] el video o audio no debe durar mas de 10/20 segundos.') 
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) throw msg
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `乂✰ resultados ღ
乂✰ artista: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Not found'} ღ
乂✰ nombre: ${title.name|| 'not found'} ॐ
乂✰ album: ${album.name || 'Not found'}
乂✰ genero: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'Not found'} ღ
乂✰ publicado: ${release_date || 'Not found'} ღ`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else throw '❌ocurrió un error, vuelva a intentar❌'
}
handler.command = /^quemusica|quemusicaes|whatmusic$/i
handler.register = false;
handler.group = true;
export default handler
