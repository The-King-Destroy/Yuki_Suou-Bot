import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
global.fotoperfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
let userNationalityData = api.data.result
global.userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
let user = global.db.data.users[who]
let pushname = m.pushName || 'Sin nombre'

//creador y otros
global.creador = 'Wa.me/584120346669'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/584128382768'
global.namechannel = '♡⃝𝒞𝐻𝒜𝒩𝒩𝐸𝐿 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰ᚐ҉ᚐ'
global.namechannel2 = '╰•:･ﾟ✿:･ﾟ✧ 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰 𝐵𝒪𝒯 ✧ﾟ･:✿ﾟ･:•╯'
global.namegrupo = '♡⃝𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾 𝓑𝓸𝓽 𝓞𝓯𝓲𝓬𝓲𝓪𝓵ᚐ҉ᚐ'
global.namecomu = '❦𝒴𝓊𝓀𝒾 𝒮𝓊𝑜𝓊 𝐵𝑜𝓉 𝑀𝒟☙'
global.namecomu2 = 'Bʀᴀᴡʟɪɢʜᴛ x ♡⃝𝓨𝓤𝓚𝓘_𝓢𝓤𝓞𝓤-𝓑𝓞𝓣ᚐ҉ᚐ'
global.colab1 = 'Emma-Violets-Versión'
global.colab2 = 'Niño Piña'
global.colab3 = 'Legendary'

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

//Emojis determinado de Ai Yaemori
global.emoji = '🌸'
global.emoji2 = '🌷'
global.emoji3 = '🌹'
global.emoji4 = '🍒'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

//mensaje en espera
global.wait = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗮 ...*';
global.waitt = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗮 ...*';
global.waittt = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗮 ...*';
global.waitttt = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗮 ...*';

//Enlaces
var grupo = 'https://chat.whatsapp.com/E78uEs2qJIE0apCLB7rSQZ'
var canal = 'https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T'  
var git = 'https://github.com/The-King-Destroy' 
var youtube = 'https://youtube.com/@user-the-king-destroy' 
var github = 'https://github.com/The-King-Destroy/Yuki_Suou-Bot' 
let correo = 'thekingdestroy507@gmail.com'

global.redes = [canal, grupo, git, youtube, github, correo].getRandom()

//Imagen
let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌃'; break; case 1: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌃'; break; case 2: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌃'; break; case 3: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break; case 4: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break; case 5: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break; case 6: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break; case 7: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌅'; break; case 8: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break; case 9: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break; case 10: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌤'; break; case 11: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌤'; break; case 12: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌤'; break; case 13: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌤'; break; case 14: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌆'; break; case 15: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌆'; break; case 16: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌆'; break; case 17: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌆'; break; case 18: hour = '𝓛𝓲𝓷𝓭𝓪 𝓝𝓸𝓬𝓱𝓮 🌃'; break; case 19: hour = '𝓛𝓲𝓷𝓭𝓪 𝓝𝓸𝓬𝓱𝓮 🌃'; break; case 20: hour = '𝓛𝓲𝓷𝓭𝓪 𝓝𝓸𝓬𝓱𝓮 🌃'; break; case 21: hour = '𝓛𝓲𝓷𝓭𝓪 𝓝𝓸𝓬𝓱𝓮 🌃'; break; case 22: hour = '𝓛𝓲𝓷𝓭𝓪 𝓝𝓸𝓬𝓱𝓮 🌃'; break; case 23: hour = '𝓛𝓲𝓷𝓭𝓪 𝓝𝓸𝓬𝓱𝓮 🌃'; break;}
global.saludo = hour;

//tags
global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

//Fakes
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

// global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${packname}`, orderTitle: 'Bang', thumbnail: icons, sellerJid: '0@s.whatsapp.net'}}}

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363322713003916@newsletter', newsletterName: "⏤͟͞ू⃪𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭✰⃔࿐", serverMessageId: -1 }
}}, { quoted: m }

global.icono = [ 
'https://files.catbox.moe/028uxb.jpg',
'https://files.catbox.moe/jh2rwk.jpg',
'https://files.catbox.moe/guvo2k.jpg',
'https://files.catbox.moe/xuwxy7.jpg',
'https://files.catbox.moe/tp697d.jpg',
'https://files.catbox.moe/qpkq55.jpg'
].getRandom()

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363322713003916@newsletter", serverMessageId: 100, newsletterName: namechannel, }, externalAdReply: { showAdAttribution: true, title: textbot, body: '🌹 ♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ', mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, }, }}

export default handler
