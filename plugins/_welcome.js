import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    const welc = 'https://qu.ax/xzbBy.jpg'; // Ruta de la imagen de bienvenida
    const adi = 'https://qu.ax/iSUCQ.jpg';  // Ruta de la imagen de despedida
    const chat = global.db.data.chats[m.chat];

    const getMentionedJid = () => {
        return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
    };

    const userId = m.messageStubParameters[0] + '@s.whatsapp.net';

    // Validar existencia del usuario
    let user;
    try {
        user = global.db.data.users[userId];
        userName = user ? user.name : await conn.getName(userId);
    } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
        userName = 'Usuario desconocido';
    }

    let groupName = groupMetadata.subject || 'Grupo desconocido'; // Nombre del grupo

    // Validar si el chat permite mensajes de bienvenida
    if (chat.welcome) {
        if (m.messageStubType === 27) { // Bienvenida
            const welcomeMessage = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨
│「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 😁 」
└┬★ 「 @${userId.split`@`[0]} 」 // Tag del usuario
   │🌹  𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀
   │🌹  ${groupName} // Nombre del grupo
   └───────────────┈ ⳹`;

            try {
                await conn.sendMessage(m.chat, { text: welcomeMessage, mentions: getMentionedJid() }, { quoted: m });
            } catch (error) {
                console.error('Error al enviar el mensaje de bienvenida:', error);
            }
        } else if (m.messageStubType === 28 || m.messageStubType === 32) { // Despedida
            const goodbyeMessage = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨
│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」
└┬★ 「 @${userId.split`@`[0]} 」 // Tag del usuario
   │😒  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎
   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í
   └───────────────┈ ⳹`;

            try {
                await conn.sendMessage(m.chat, { text: goodbyeMessage, mentions: getMentionedJid() }, { quoted: m });
            } catch (error) {
                console.error('Error al enviar el mensaje de despedida:', error);
            }
        }
    }
}

/*import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://qu.ax/bsNq.mp3';
  let vn2 = 'https://qu.ax/EuNQ.mp3';
  let welc = welcome;
  let adi = adios;
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, {
      audio: { url: vn },
      contextInfo: {
        mentionedJid: getMentionedJid(),
        "externalAdReply": {
          "thumbnail": welc,
          "title": "  ͟͞ 𝐁 𝐈 𝐄 𝐍 𝐕 𝐄 𝐍 𝐈 𝐃 𝐎 ͟͞  ",
          "body": `${userName}!`,
          "previewType": "PHOTO",
          "thumbnailUrl": null,
          "showAdAttribution": true,
          sourceUrl: [yt, md, channel].sort(() => 0.5 - Math.random())[0]
        }
      },
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'welcome.mp3'
    }, { quoted: fkontak });
  }

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, {
      audio: { url: vn2 },
      contextInfo: {
        mentionedJid: getMentionedJid(),
        "externalAdReply": {
        "thumbnail": adi,
        "title": '  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  ',
        "body": `${userName}, se despide.`,
        "previewType": "PHOTO",
          "showAdAttribution": true,
          "containsAutoReply": true,
         "thumbnailUrl": null,
          "showAdAttribution": true,
          "sourceUrl": redes
        }
      },
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'bye.mp3'
    }, { quoted: fkontak });
  }
}*/
