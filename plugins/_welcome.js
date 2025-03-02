import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
    let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let img2 = await (await fetch(`${pp2}`)).buffer()

  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let wel = `❀ *Bienvenido* a ${groupMetadata.subject}\n ✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom1}\n •(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak)
  }

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
   let bye = `❀ *Adiós* de ${groupMetadata.subject}\n ✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom2}\n •(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak)
  }

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
   let bye = `❀ *Adiós* de ${groupMetadata.subject}\n ✰ @${m.messageStubParameters[0].split`@`[0]}\n${global.welcom2}\n •(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak)
  }}
