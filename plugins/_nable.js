import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = command.toLowerCase();
  let isAll = false, isUser = false;
  let isEnable = chat[type] || false;

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
  } else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false;
  } else {
    const estado = isEnable ? '✓ Activado' : '✗ Desactivado';
    return conn.reply(m.chat, `「✦」Un administrador puede activar o desactivar el *${command}* utilizando:\n\n> ✐ *${usedPrefix}${command} on* para activar.\n> ✐ *${usedPrefix}${command} off* para desactivar.\n\n✧ Estado actual » *${estado}*`, m);
  }

  const checkAndRespond = (currentState) => {
    if (currentState === isEnable) {
      return conn.reply(m.chat, `《✧》 *${type}* ya estaba *${isEnable ? 'activado' : 'desactivado'}*`, m);
    }
  };

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.welcome);
      chat.welcome = isEnable;
      break;

    case 'antiprivado':
    case 'antipriv':
    case 'antiprivate':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      checkAndRespond(bot.antiPrivate);
      bot.antiPrivate = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      checkAndRespond(bot.restrict);
      bot.restrict = isEnable;
      break;

    case 'autolevelup':
    case 'autonivel':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.autolevelup);
      chat.autolevelup = isEnable;
      break;

    case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.autosticker);
      chat.autosticker = isEnable;
      break;

    case 'antibot':
    case 'antibots':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antiBot);
      chat.antiBot = isEnable;
      break;

    case 'autoaceptar':
    case 'aceptarauto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.autoAceptar);
      chat.autoAceptar = isEnable;
      break;

    case 'autorechazar':
    case 'rechazarauto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.autoRechazar);
      chat.autoRechazar = isEnable;
      break;

    case 'autoresponder':
    case 'autorespond':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.autoresponder);
      chat.autoresponder = isEnable;
      break;

    case 'antisubbots':
    case 'antisub':
    case 'antisubot':
    case 'antibot2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antiBot2);
      chat.antiBot2 = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.modoadmin);
      chat.modoadmin = isEnable;
      break;

    case 'autoread':
    case 'autoleer':
    case 'autover':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      checkAndRespond(global.opts['autoread']);
      global.opts['autoread'] = isEnable;
      break;

    case 'antiver':
    case 'antiocultar':
    case 'antiviewonce':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.antiver);
      chat.antiver = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
    case 'emojis':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.reaction);
      chat.reaction = isEnable;
      break;

    case 'nsfw':
    case 'nsfwhot':
    case 'nsfwhorny':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.nsfw);
      chat.nsfw = isEnable;
      break;

    case 'antispam':
    case 'antiSpam':
    case 'antispamosos':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      checkAndRespond(bot.antiSpam);
      bot.antiSpam = isEnable;
      break;

    case 'antidelete': 
    case 'antieliminar': 
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.delete);
      chat.delete = isEnable;
      break;

    case 'jadibotmd':
    case 'modejadibot':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      checkAndRespond(bot.jadibotmd);
      bot.jadibotmd = isEnable;
      break;

    case 'detect':
    case 'configuraciones':
    case 'avisodegp':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.detect);
      chat.detect = isEnable;
      break;

    case 'detect2':
    case 'avisos':
    case 'eventos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.detect2);
      chat.detect2 = isEnable;
      break;

    case 'autosimi':
    case 'simsimi':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      checkAndRespond(chat.simi);
      chat.simi = isEnable;
      break;

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antiLink);
      chat.antiLink = isEnable;
      break;

    case 'antilink2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antiLink2);
      chat.antiLink2 = isEnable;
      break;

    case 'antitoxic': 
    case 'antitoxicos':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antitoxic);
      chat.antitoxic = isEnable;
      break;

    case 'antitrabas': 
    case 'antitraba':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antiTraba);
      chat.antiTraba = isEnable;
      break;

    case 'antifake': 
    case 'antivirtuales':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      checkAndRespond(chat.antifake);
      chat.antifake = isEnable;
      break;
  }

  conn.reply(m.chat, `《✦》La función *${type}* se *${isEnable ? 'activó' : 'desactivó'}* ${isAll ? 'para este Bot' : isUser ? '' : 'para este chat'}`, m);
};

handler.help = ['welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'autosticker', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antisub', 'antisubot', 'antibot2', 'modoadmin', 'soloadmin', 'autoread', 'autoleer', 'autover', 'antiver', 'antiocultar', 'antiviewonce', 'reaction', 'reaccion', 'emojis', 'nsfw', 'nsfwhot', 'nsfwhorny', 'antispam', 'antiSpam', 'antispamosos', 'antidelete', 'antieliminar', 'delete', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'configuraciones', 'avisodegp', 'detect2', 'avisos', 'eventos', 'simi', 'autosimi', 'simsimi', 'antilink', 'antilink2', 'antitoxic', 'antitoxicos', 'antitraba', 'antitrabas', 'antifake', 'antivirtuales']
handler.tags = ['nable'];
handler.command = ['welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'autosticker', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antisub', 'antisubot', 'antibot2', 'modoadmin', 'soloadmin', 'autoread', 'autoleer', 'autover', 'antiver', 'antiocultar', 'antiviewonce', 'reaction', 'reaccion', 'emojis', 'nsfw', 'nsfwhot', 'nsfwhorny', 'antispam', 'antiSpam', 'antispamosos', 'antidelete', 'antieliminar', 'delete', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'configuraciones', 'avisodegp', 'detect2', 'avisos', 'eventos', 'simi', 'autosimi', 'simsimi', 'antilink', 'antilink2', 'antitoxic', 'antitoxicos', 'antitraba', 'antitrabas', 'antifake', 'antivirtuales']

export default handler;
