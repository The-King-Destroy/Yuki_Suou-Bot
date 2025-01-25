// Creditos del codigo a @Gatito-kw //

/* GitHub: https://github.com/Gatito-kw */

/* Bot: https://github.com/Gatito-kw/nekobot-md */

import {WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, {conn, participants}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const groupName = (await conn.groupMetadata(m.chat)).subject;
  const groupAdmins = participants.filter((p) => p.admin);
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.jpg';
  const img = await (await fetch(pp)).buffer();
  const chat = global.db.data.chats[m.chat];
  const mentionsString = [m.sender, m.messageStubParameters[0], ...groupAdmins.map((v) => v.id)];
  const mentionsContentM = [m.sender, m.messageStubParameters[0]];
  const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};

  if (chat.detect2 && m.messageStubType == 29) {
    let txt1 = `*𝘏𝘢𝘺 𝘜𝘯 𝘕𝘶𝘦𝘷𝘰 𝘈𝘥𝘮𝘪𝘯 𝘌𝘯 𝘌𝘭 𝘎𝘳𝘶𝘱𝘰.*\n\n`;
    txt1 += `*◦ 🌹 𝙂𝙧𝙪𝙥𝙤:* ${groupName}\n`;
    txt1 += `*◦ 🌹 𝙉𝙪𝙚𝙫𝙤 𝘼𝙙𝙢𝙞𝙣:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    txt1 += `*◦ 🌹 𝙇𝙚 𝘿𝙞𝙤́ 𝘼𝙙𝙢𝙞:* @${m.sender.split`@`[0]}`;
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt1, fkontak2, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }

  if (chat.detect2 && m.messageStubType == 30) {
    let txt2 = `*𝘍𝘶𝘦́ 𝘏𝘦𝘤𝘩𝘢𝘥𝘰 𝘋𝘦 𝘈𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳.*\n\n`;
    txt2 += `*◦ 🌹 𝙂𝙧𝙪𝙥𝙤:* ${groupName}\n`;
    txt2 += `*◦ 🌹 𝙎𝙚 𝙌𝙪𝙞𝙩𝙤 𝘼:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    txt2 += `*◦ 🌹 𝙃𝙚𝙘𝙝𝙤 𝙋𝙤𝙧:* @${m.sender.split`@`[0]}`;
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt2, fkontak2, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }

  if (chat.detect2 && m.messageStubType == 27) {
    let txt3 = `*𝘏𝘢 𝘓𝘭𝘦𝘨𝘢𝘥𝘰 𝘜𝘯 𝘕𝘶𝘦𝘷𝘰 𝘗𝘢𝘳𝘵𝘪𝘤𝘪𝘱𝘢𝘯𝘵𝘦 𝘈𝘭 𝘎𝘳𝘶𝘱𝘰,𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰(𝘈).*\n\n`;
    txt3 += `*◦ 🌹 𝙂𝙧𝙪𝙥𝙤:* ${groupName}\n`;
    if (!m.sender.endsWith('@g.us')) {
      txt3 += `*◦ 🌹 𝙎𝙚 𝘼𝙣̃𝙖𝙙𝙞𝙤 𝘼:* @${m.messageStubParameters[0].split`@`[0]}\n`;
      txt3 += `*◦ 🌹 𝘼𝙘𝙚𝙥𝙩𝙖𝙙𝙤 𝙋𝙤𝙧:* @${m.sender.split`@`[0]}`;
    } else {
      txt3 += `*◦  𝙎𝙚 𝘼𝙣̃𝙖𝙙𝙞𝙤:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt3, fkontak2, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }

  if (chat.detect2 && m.messageStubType == 28) {
    let txt4 = `*𝘜𝘯 𝘗𝘢𝘳𝘵𝘪𝘤𝘪𝘱𝘢𝘯𝘵𝘦 𝘔𝘦𝘯𝘰𝘴 𝘌𝘯 𝘌𝘭 𝘎𝘳𝘶𝘱𝘰, 𝘈𝘥𝘪𝘰𝘴 𝘍𝘢𝘯𝘴 𝘋𝘦 𝘉𝘵𝘴.*\n\n`;
    txt4 += `*◦ 🌹 𝙂𝙧𝙪𝙥𝙤:* ${groupName}\n`;
    if (!m.sender.endsWith('@g.us')) {
      txt4 += `*◦ 🌹 𝙋𝙖𝙧𝙩𝙞𝙘𝙞𝙥𝙖𝙣𝙩𝙚 𝙀𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤:* @${m.messageStubParameters[0].split`@`[0]}\n`;
      txt4 += `*◦ 🌹 𝙃𝙚𝙘𝙝𝙤 𝙋𝙤𝙧:* @${m.sender.split`@`[0]}`;
    } else {
      txt4 += `*◦ 🌹 𝙎𝙚 𝙀𝙡𝙞𝙢𝙞𝙣𝙤 𝘼:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt4, fkontak2, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }

  if (chat.detect2 && m.messageStubType == 32) {
    let ax;
    if (m.messageStubParameters[0] === m.sender) {
      ax = 'salido';
    } else {
      ax = 'eliminado';
    }
    let txt5 = `*𝘙𝘦𝘤𝘪𝘦𝘯𝘵𝘦𝘮𝘦𝘯𝘵𝘦 𝘚𝘦 𝘏𝘢 ${ax} 𝘜𝘯  𝘔𝘪𝘦𝘮𝘣𝘳𝘰 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰.*\n\n`;
    txt5 += `*◦ 🌹 𝙂𝙧𝙪𝙥𝙤:* ${groupName}\n`;
    if (ax === 'eliminado') {
      txt5 += `*◦ 🌹 𝙎𝙚 𝙀𝙡𝙞𝙢𝙞𝙣𝙤 𝘼:* @${m.messageStubParameters[0].split`@`[0]}\n`;
      txt5 += `*◦ 🌹 𝙃𝙚𝙘𝙝𝙤 𝙋𝙤𝙧:* @${m.sender.split`@`[0]}`;
    } else {
      txt5 += `*◦ 🌹 𝙎𝙚 𝙎𝙖𝙡𝙞𝙤:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt5, fkontak2, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }

  if (chat.detect2 && m.messageStubType == 26) {
    let accion;
    if (m.messageStubParameters[0].split`@`[0] === 'on') {
      accion = 'cerrado';
    } else {
      accion = 'abierto';
    }
    let txt6 = `*𝘚𝘦 𝘈 𝘏𝘦𝘤𝘩𝘰 𝘜𝘯𝘢 𝘕𝘶𝘦𝘷𝘢 𝘊𝘰𝘯𝘧𝘪𝘨𝘶𝘳𝘢𝘤𝘪𝘰́𝘯 𝘈𝘭 𝘎𝘳𝘶𝘱𝘰.*\n\n`;
    txt6 += `*◦ 🌹 𝙂𝙧𝙪𝙥𝙤:* ${groupName}\n`;
    txt6 += `*◦ 🌹 𝙀𝙡 𝙂𝙧𝙪𝙥𝙤 𝙎𝙚 𝘼:* ${'```' + accion + '```'}\n`;
    txt6 += `*◦ 🌹 𝙀𝙟𝙚𝙘𝙪𝙩𝙖𝙙𝙤 𝙋𝙤𝙧:* @${m.sender.split`@`[0]}`;
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt6, fkontak6, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }

  if (chat.detect2 && m.messageStubType == 21) {
    let txt7 = `*𝘚𝘦 𝘏𝘢 𝘊𝘢𝘮𝘣𝘪𝘢𝘥𝘰 𝘌𝘭 𝘕𝘰𝘮𝘣𝘳𝘦 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰.*\n\n`;
    txt7 += `*◦ 🌹 𝙉𝙪𝙚𝙫𝙤 𝙉𝙤𝙢𝙗𝙧𝙚:* ${'```' + groupName + '```'}\n`;
    txt7 += `*◦ 🌹 𝙃𝙚𝙘𝙝𝙤 𝙋𝙤𝙧:* @${m.sender.split`@`[0]}`;
    await conn.sendFile(m.chat, banner, 'yue.jpg', txt7, fkontak2, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Eventos`,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: catalogo 
}}
}, { mentions: mentionsContentM })
  }
} /* Cierre del comando */
