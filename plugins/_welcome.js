import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let userName = await conn.getName(who + '@s.whatsapp.net')
  let taguser = `@${who.split('@')[0]}`

  let chat = global.db.data.chats[m.chat]

  if (chat.welcome) {
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
    let img = await (await fetch(pp)).buffer().catch(() => null) || await (await fetch('https://qu.ax/QGAVS.jpg')).buffer();

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom1}\n •(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `❀ *Adiós* De ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom2}\n •(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}
