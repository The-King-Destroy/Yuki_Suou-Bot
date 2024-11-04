export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    const userId = m.messageStubParameters[0];
    console.log('ID del usuario:', userId);

    const images = {
        welcome: 'https://qu.ax/xzbBy.jpg', // Imagen de bienvenida
        goodbye: 'https://qu.ax/iSUCQ.jpg'  // Imagen de despedida
    };

    // Obtiene la imagen de perfil o usa la imagen de bienvenida por defecto
    let pp = await fetchProfilePicture(userId);
    let img = pp ? await fetchImage(pp) : await fetchImage(images.welcome); // Usa imagen de perfil o imagen de bienvenida

    let chat = global.db.data.chats[m.chat];
    const fkontak = createContact();

    if (chat.welcome) {
        if (m.messageStubType === 27) { // Tipo de mensaje para bienvenida
            // Si no se obtiene la imagen de perfil, usa la imagen de bienvenida
            if (!pp) {
                img = await fetchImage(images.welcome);
            }
            await sendMessage(m.chat, createWelcomeMessage(userId, groupMetadata.subject), img, fkontak);
        } else if (m.messageStubType === 28 || m.messageStubType === 32) { // Tipo de mensaje para despedida
            // Si no se obtiene la imagen de perfil, usa la imagen de despedida
            img = await fetchImage(images.goodbye);
            await sendMessage(m.chat, createGoodbyeMessage(userId), img, fkontak);
        }
    }
}

async function fetchProfilePicture(userId) {
    try {
        return await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
        return null; // Retorna null si hay un error
    }
}

async function fetchImage(url) {
    try {
        const response = await fetch(url);
        return await response.arrayBuffer();
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return null; // Retorna null si hay un error
    }
}

function createContact() {
    return {
        key: { fromMe: false, participant: '0@s.whatsapp.net' },
        message: {
            contactMessage: {
                displayName: 'Bot',
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Bot;;;\nFN:Bot\nitem1.TEL;waid=1234567890:1234567890\nitem1.X-ABLabel:Mobile\nEND:VCARD'
            }
        }
    };
}

function createWelcomeMessage(userId, groupName) {
    return `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨
│「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 😁 」
└┬★ 「 @${userId.split`@`[0]} 」 // Tag del usuario
   │🌹  𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀
   │🌹  ${groupName} // Nombre del grupo
   └───────────────┈ ⳹`;
}

function createGoodbyeMessage(userId) {
    return `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨
│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」
└┬★ 「 @${userId.split`@`[0]} 」 // Tag del usuario
   │😒  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎
   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í
   └───────────────┈ ⳹`;
}

async function sendMessage(chatId, message, img, fkontak) {
    if (!img) {
        img = await fetchImage('https://qu.ax/xzbBy.jpg'); // Imagen de respaldo si img es null
    }
    await conn.sendMini(chatId, packname, dev, message, img, img, channel, fkontak);
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
