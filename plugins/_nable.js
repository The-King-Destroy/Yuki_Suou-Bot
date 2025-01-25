import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = command.toLowerCase();
  let isAll = false, isUser = false;
  let isEnable = false;

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
      isEnable = chat.welcome = !chat.welcome;
      break;

    case 'antiprivado':
    case 'antipriv':
    case 'antiprivate':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      isEnable = bot.antiPrivate = !bot.antiPrivate;
      break;

    case 'restrict':
    case 'restringir':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      isEnable = bot.restrict = !bot.restrict;
      break;

    case 'autolevelup':
    case 'autonivel':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.autolevelup = !chat.autolevelup;
      break;

    case 'antibot':
    case 'antibots':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.antiBot = !chat.antiBot;
      break;

    case 'autoaceptar':
    case 'aceptarauto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.autoAceptar = !chat.autoAceptar;
      break;

    case 'autorechazar':
    case 'rechazarauto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.autoRechazar = !chat.autoRechazar;
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
      isEnable = chat.autoresponder = !chat.autoresponder;
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
      isEnable = chat.antiBot2 = !chat.antiBot2;
      break;

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.modoadmin = !chat.modoadmin;
      break;

    case 'autoread':
    case 'autoleer':
    case 'autover':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      isEnable = global.opts['autoread'] = !global.opts['autoread'];
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
      isEnable = chat.antiver = !chat.antiver;
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
      isEnable = chat.reaction = !chat.reaction;
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
      isEnable = chat.nsfw = !chat.nsfw;
      break;

    case 'antispam':
    case 'antiSpam':
    case 'antispamosos':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      isEnable = bot.antiSpam = !bot.antiSpam;
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
      isEnable = chat.delete = !chat.delete;
      break;

    case 'jadibotmd':
    case 'modejadibot':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      isEnable = bot.jadibotmd = !bot.jadibotmd;
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
      isEnable = chat.detect = !chat.detect;
      break;

    case 'simi':
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
      isEnable = chat.simi = !chat.simi;
      break;

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.antiLink = !chat.antiLink;
      break;
        case 'antidelete': 
        
    case 'antitoxic': 
    case 'antitoxicos':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.antitoxic = !chat.antitoxic;
      break;
      
      case 'antitrabas': 
      case 'antitraba':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.antiTraba = !chat.antiTraba;
      break;
      
      case 'antifake': 
      case 'antivirtuales':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      isEnable = chat.antifake = !chat.antifake;
      break;
  }

  conn.reply(m.chat, `🍬 La función *${type}* se *${isEnable ? 'activó' : 'desactivó'}* ${isAll ? 'para este Bot' : isUser ? '' : 'para este chat'}`, m);
};

handler.help = ['welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antisub', 'antisubot', 'antibot2', 'modoadmin', 'soloadmin', 'autoread', 'autoleer', 'autover', 'antiver', 'antiocultar', 'antiviewonce', 'reaction', 'reaccion', 'emojis', 'nsfw', 'nsfwhot', 'nsfwhorny', 'antispam', 'antiSpam', 'antispamosos', 'antidelete', 'antieliminar', 'delete', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'configuraciones', 'avisodegp', 'simi', 'autosimi', 'simsimi', 'antilink', 'antitoxic', 'antitoxicos', 'antitraba', 'antitrabas', 'antifake', 'antivirtuales']
handler.tags = ['nable'];
handler.command = ['welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antisubbots', 'antisub', 'antisubot', 'antibot2', 'modoadmin', 'soloadmin', 'autoread', 'autoleer', 'autover', 'antiver', 'antiocultar', 'antiviewonce', 'reaction', 'reaccion', 'emojis', 'nsfw', 'nsfwhot', 'nsfwhorny', 'antispam', 'antiSpam', 'antispamosos', 'antidelete', 'antieliminar', 'delete', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'configuraciones', 'avisodegp', 'simi', 'autosimi', 'simsimi', 'antilink', 'antitoxic', 'antitoxicos', 'antitraba', 'antitrabas', 'antifake', 'antivirtuales']
export default handler
