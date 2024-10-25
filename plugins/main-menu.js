import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '♡⃝𝕴𝖓𝖋𝖔-𝕭𝖔𝖙ᚐ҉ᚐ',
  'info': '♡⃝𝕴𝖓𝖋𝖔𝖗𝖒𝖆𝖈𝖎ó𝖓ᚐ҉ᚐ',
  'rg': '♡⃝𝕽𝖊𝖌𝖎𝖘𝖙𝖗𝖔ᚐ҉ᚐ',
  'nable': '♡⃝𝕺𝖋𝖋/𝕺𝖓ᚐ҉ᚐ',
  'fun': '♡⃝𝕯𝖎𝖛𝖊𝖗𝖘𝖎ó𝖓ᚐ҉ᚐ',
  'game': '♡⃝𝕵𝖚𝖊𝖌𝖔𝖘ᚐ҉ᚐ',
  'emox': '♡⃝𝕰𝖒𝖔𝖏𝖎-𝕬𝖓𝖎𝖒𝖊ᚐ҉ᚐ',
  'rollwaifu': '♡⃝𝕽𝖔𝖑𝖑𝖜𝖆𝖎𝖋𝖚𝖘ᚐ҉ᚐ',
  'economy': '♡⃝𝕰𝖈𝖔𝖓𝖔𝖒í𝖆ᚐ҉ᚐ',
  'rpg': '♡⃝×𝕽×𝕻×𝕲×ᚐ҉ᚐ',
  'jadibot': '♡⃝𝕾𝖊𝖗𝖇𝖔𝖙/𝕮𝖔𝖉𝖊ᚐ҉ᚐ',
  'buscador': '♡⃝𝕭𝖚𝖘𝖈𝖆𝖉𝖔𝖗𝖊𝖘ᚐ҉ᚐ',
  'descargas': '♡⃝𝕯𝖊𝖘𝖈𝖆𝖗𝖌𝖆𝖘ᚐ҉ᚐ',
  'ai': '♡⃝×𝕬×𝕴×ᚐ҉ᚐ',
  'grupo': '♡⃝𝕲𝖗𝖚𝖕𝖔𝖘ᚐ҉ᚐ',
  'tools': '♡⃝𝕳𝖊𝖗𝖗𝖆𝖒𝖎𝖊𝖓𝖙𝖆𝖘',
  'transformador': '♡⃝𝕮𝖔𝖓𝖛𝖊𝖗𝖙𝖎𝖉𝖔𝖗𝖊𝖘ᚐ҉ᚐ',
  'sticker': '♡⃝𝕾𝖙𝖎𝖈𝖐𝖊𝖗𝖘ᚐ҉ᚐ',
  'anime': '♡⃝𝕬𝖓𝖎𝖒𝖊ᚐ҉ᚐ',
  'nsfw': '♡⃝𝕹𝕾𝕱𝖂ᚐ҉ᚐ',
  'audio': '♡⃝𝕬𝖚𝖉𝖎𝖔𝖘ᚐ҉ᚐ',
  'mods': '♡⃝𝕾𝖙𝖆𝖋𝖋ᚐ҉ᚐ',
  'owner': '♡⃝𝕮𝖗𝖊𝖆𝖉𝖔𝖗ᚐ҉ᚐ',
}

const defaultMenu = {
  before: `╰•:･✿:･✧𝐵𝒾𝑒𝓃𝓋𝑒𝓃𝒾𝒹𝑜 𝒶𝓁 𝓂𝑒𝓃𝓊✧･:✿･:•╯

“ 👋 ¡𝓗𝓸𝓵𝓪! 𝓒ó𝓶𝓸 𝓔𝓼𝓽á𝓼 𝓮𝓵 𝓓í𝓪 𝓭𝓮 𝓗𝓸𝔂 *%name* 𝓢𝓸𝔂 *𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾*, %greeting ”

✧･ﾟ: *･ﾟ:*𝕴𝖓𝖋𝖔 𝖉𝖊 𝖑𝖆 𝕭𝖔𝖙*:･ﾟ*:･ﾟ✧
❦👑 *𝕮𝖗𝖊𝖆𝖉𝖔𝖗:* ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜
❦🕹️ *𝕸𝖔𝖉𝖔:* Público
❦🌠 *𝕭𝖆𝖎𝖑𝖊𝖞𝖘:* Multi Device
❦⏱️ *𝕬𝖈𝖙𝖎𝖛𝖆𝖉𝖔:* %muptime
❦👤 *𝖀𝖘𝖚𝖆𝖗𝖎𝖔𝖘:* %totalreg

%readmore
✧･ﾟ: *･ﾟ:*𝕴𝖓𝖋𝖔 𝖉𝖊 𝖀𝖘𝖚𝖆𝖗𝖎𝖔*:･ﾟ*:･ﾟ✧
❦👤 *𝕮𝖑𝖎𝖊𝖓𝖙𝖊:* %name
❦✨ *𝕰𝖃𝕻:* %exp
❦🍪 *𝕮𝖔𝖔𝖐𝖎𝖊𝖘:* %cookies
❦🛡 *𝕹𝖎𝖛𝖊𝖑:* %level
❦💫 *𝕽𝖆𝖓𝖌𝖔:* %role

\t*【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】* 
`.trimStart(),
      header: '「 %category 」\n',
  body: '❦ %cmd\n',
  footer: '',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, cookies, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? '🌟 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙱𝙾𝚃 𝙾𝙵𝙲' : `🌟 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙳𝙴: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, cookies, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  let category = "video"
  const db = './src/database/db.json'
  const db_ = JSON.parse(fs.readFileSync(db))
  const random = Math.floor(Math.random() * db_.links[category].length)
  const rlink = db_.links[category][random]
  global.vid = rlink
  const response = await fetch(vid)
  const gif = await response.buffer()
 // const img = imagen1

/*await conn.reply(m.chat, '╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹*\n├ ⚘݄𖠵⃕⁖𖥔.𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎,  ꪶꪾ❍̵̤̂̂ꫂ\n├𝐀𝐆𝐔𝐀𝐑𝐃𝐄 𝐔𝐍 𝐌𝐎𝐌𝐄𝐍𝐓𝐎❞\n╰ׁ̻─ׅׄ─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪', m, { contextInfo:{ forwardingScore: 2024, isForwarded: true, externalAdReply: {title: namechannel, body: dev, sourceUrl: channel, thumbnail: icons }}})*/

// await conn.reply(m.chat, '🍟 Enviando el menú.....', m, rcanal)

await m.react('🌹') 

//await conn.sendFile(m.chat, imagen1, 'yaemori.jpg', text.trim(), fkontak, null, rcanal)

await conn.sendMessage(
  m.chat,
  { video: { url: vid }, caption: text.trim(),
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363322713003916@newsletter',
      newsletterName: '⏤͟͞ू⃪ ፝͜⁞𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭/ᥫᩣⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜',
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: '⏤͟͞ू⃪ ፝͜⁞𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉✰⃔࿐',
      body: dev,
      thumbnailUrl: icono,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  },

  gifPlayback: true, gifAttribution: 0 },
  { quoted: fkontak })

  } catch (e) {
    conn.reply(m.chat, '🔵 Lo sentimos, el menú tiene un error', m, rcanal, )
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'menuall', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌙'; break;
  case 1: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 💤'; break;
  case 2: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🦉'; break;
  case 3: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 ✨'; break;
  case 4: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 💫'; break;
  case 5: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌅'; break;
  case 6: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌄'; break;
  case 7: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌅'; break;
  case 8: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 💫'; break;
  case 9: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 ✨'; break;
  case 10: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌞'; break;
  case 11: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌨'; break;
  case 12: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 ❄'; break;
  case 13: hour = '𝓑𝓾𝓮𝓷𝓸𝓼 𝓓í𝓪𝓼 🌤'; break;
  case 14: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌇'; break;
  case 15: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🥀'; break;
  case 16: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌹'; break;
  case 17: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓣𝓪𝓻𝓭𝓮𝓼 🌆'; break;
  case 18: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌙'; break;
  case 19: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌃'; break;
  case 20: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌌'; break;
  case 21: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌃'; break;
  case 22: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌙'; break;
  case 23: hour = '𝓑𝓾𝓮𝓷𝓪𝓼 𝓝𝓸𝓬𝓱𝓮𝓼 🌃'; break;
}
  var greeting = hour;
