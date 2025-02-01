import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { text }) => {
	if (!text) return conn.reply(m.chat, `🍬 Ingresa lo que quieres buscar en Wikipedia`, m)
	
    try {
	const link =  await axios.get(`https://es.wikipedia.org/wiki/${text}`)
	const $ = cheerio.load(link.data)
	let wik = $('#firstHeading').text().trim()
	let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
	m.reply(`▢ *Wikipedia*

‣ Buscado : ${wik}

${resulw}`)
} catch (e) {
  m.reply('🍭 NINGUN RESULTADO ')
}
}
handler.help = ['wikipedia']
handler.tags = ['tools']
handler.command = ['wiki', 'wikipedia'] 

export default handler
