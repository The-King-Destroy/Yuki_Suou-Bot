import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'

let tags = {
'main': '𝙸𝙽𝙵𝙾',
'buscador': '𝙱𝚄́𝚂𝚀𝚄𝙴𝙳𝙰𝚂',
'fun': '𝙹𝚄𝙴𝙶𝙾𝚂',
'gacha': '𝙶𝙰𝙲𝙷𝙰',
'serbot': '𝙹𝙰𝙳𝙸𝙱𝙾𝚃𝚂',
'rpg': '𝚁𝙿𝙶',
'rg': '𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾',
'xp': '𝙴𝚇𝙿',
'anime': '𝙰𝙽𝙸𝙼𝙴𝚂',
'fix': '𝙵𝙸𝚇𝙶𝙼𝚂𝙴𝚂𝙿𝙴𝙴𝙰',
'grupo': '𝙶𝚁𝚄𝙿𝙾𝚂',
'nable': '𝙴𝙽𝙰𝙱𝙻𝙴 - 𝙳𝙸𝚂𝙰𝙱𝙻𝙴', 
'descargas': '𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂',
'tools': '𝙷𝙴𝚁𝚁𝙰𝙼𝙸𝙴𝙽𝚃𝙰𝚂',
'info': '𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾́𝙽',
'nsfw': '𝙽𝚂𝙵𝚆', 
'owner': '𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾', 
'audio': '𝙰𝚄𝙳𝙸𝙾𝚂', 
'ai': '𝙸𝙰 - 𝙰𝙸',
'transformador': '𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙳𝙾𝚁𝙴𝚂',
}

const defaultMenu = {
  before: `Hola %taguser 👋, Soy YaemoriBot

 ︿︿︿︿︿︿︿︿︿︿︿︿
┊ ❀ 「 \`𝙸𝙽𝙵𝙾 - 𝚄𝚂𝙴𝚁\` 」 ❀
 ︶︶︶︶︶︶︶︶︶︶︶︶ 
*┊ ✦* Cliente » %name
*┊ ✦* Exp » %exp
*┊ ✦* Género » %genre
*┊ ✦* Pareja » %pareja
*┊ ✦* Pais » %pais
*┊ ✦* Chocolates » %chocolates
*┊ ✦* Nivel » %level
*┊ ✦* Rango » %role
 ︶︶︶︶︶︶︶︶︶︶︶︶
 ︿︿︿︿︿︿︿︿︿︿︿︿
┊ ❀ 「 \`𝙸𝙽𝙵𝙾 - 𝙱𝙾𝚃\` 」 ❀
 ︶︶︶︶︶︶︶︶︶︶︶︶
*┊ ✦* Made by » @DevDiego
*┊ ✦* Bot » %botofc
*┊ ✦* Fecha » %fecha
*┊ ✦* Actividad » %muptime
*┊ ✦* Usuarios » %totalreg
 ︶︶︶︶︶︶︶︶︶︶︶︶
`.trimStart(),
    header: ' ︿︿︿︿︿︿︿︿︿︿︿︿\n┊ ❀ 「 `%category` 」❀\n ︶︶︶︶︶︶︶︶︶︶︶︶',
  body: '*┊ ✦* _%cmd_',
  footer: ' ︶︶︶︶︶︶︶︶︶︶︶︶\n',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, chocolates, genre, marry, level, role } = global.db.data.users[m.sender]
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
    let num = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + num.replace('@s.whatsapp.net', '')).getNumber('international')}`)
     let userNationalityData = api.data.result
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        yenes: plugin.yenes,
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
botofc: (conn.user.jid == global.conn.user.jid ? 'Oficial' : 'SubBot'), 
genre: genre || 'No especificado',
pareja: marry || 'No especificado',
pais: userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido',
fecha: moment.tz('America/Bogota').format('DD/MM/YY'), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, yenes, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let img = ['https://qu.ax/zzWdD.jpg', 'https://qu.ax/LkHoh.jpg', 'https://qu.ax/JceST.jpg']

await m.react(emojis) 

await conn.sendMessage(m.chat, { image: { url: img.getRandom() }, caption: text.trim(), contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '𝙔𝙖𝙚𝙢𝙤𝙧𝙞𝘽𝙤𝙩-𝙈𝘿 🌻✨', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })

  } catch (e) {
    await m.react(error)
    conn.reply(m.chat, `「✘」 *Ocurrió un error al enviar el menú*\n\n${e}`, m, fake, )
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenu', 'allmenú', 'menucompleto', 'menúcompleto'] 
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
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;