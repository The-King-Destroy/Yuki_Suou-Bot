/*⚠ PROHIBIDO EDITAR ⚠

Este codigo fue modificado, adaptado y mejorado por
- ReyEndymion >> https://github.com/ReyEndymion

El codigo de este archivo esta inspirado en el codigo original de:
- Aiden_NotLogic >> https://github.com/ferhacks

*El archivo original del MysticBot-MD fue liberado en mayo del 2024 aceptando su liberacion*

El codigo de este archivo fue parchado en su momento por:
- BrunoSobrino >> https://github.com/BrunoSobrino

Contenido adaptado para GataBot-MD por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
*/

const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import("@whiskeysockets/baileys");
import _0x19d2fd from 'qrcode';
import _0xe3c119 from 'node-cache';
import _0x1b3d66 from 'fs';
import 'path';
import _0x2073a8 from 'pino';
import 'util';
import 'ws';
const {
  child,
  spawn,
  exec
} = await import("child_process");
import { makeWASocket } from '../lib/simple.js';
if (global.conns instanceof Array) {
  console.log();
} else {
  global.conns = [];
}
let handler = async (_0x1f703f, {
  conn: _0x4d3e5b,
  args: _0x163213,
  usedPrefix: _0x3b5ef5,
  command: _0x13a388,
  isOwner: _0x2c66ee
}) => {
  if (!global.db.data.settings[_0x4d3e5b.user.jid].jadibotmd) {
    return _0x4d3e5b.reply(_0x1f703f.chat, "🍬 Este Comando está deshabilitado por mi creador.", _0x1f703f, rcanal);
  }
  const _0x3f86eb = _0x163213[0x0] && /(--code|code)/.test(_0x163213[0x0].trim()) ? true : !!(_0x163213[0x1] && /(--code|code)/.test(_0x163213[0x1].trim()));
  let _0xf20c46;
  let _0x17cf1c;
  let _0x49062c;
  let _0xab885c = _0x1f703f.mentionedJid && _0x1f703f.mentionedJid[0x0] ? _0x1f703f.mentionedJid[0x0] : _0x1f703f.fromMe ? _0x4d3e5b.user.jid : _0x1f703f.sender;
  let _0xa8b6c4 = '' + _0xab885c.split`@`[0x0];
  if (_0x3f86eb) {
    _0x163213[0x0] = _0x163213[0x0].replace(/^--code$|^code$/, '').trim();
    if (_0x163213[0x1]) {
      _0x163213[0x1] = _0x163213[0x1].replace(/^--code$|^code$/, '').trim();
    }
    if (_0x163213[0x0] == '') {
      _0x163213[0x0] = undefined;
    }
  }
  if (!_0x1b3d66.existsSync('./' + jadi + '/' + _0xa8b6c4)) {
    _0x1b3d66.mkdirSync('./' + jadi + '/' + _0xa8b6c4, {
      'recursive': true
    });
  }
  if (_0x163213[0x0] && _0x163213[0x0] != undefined) {
    _0x1b3d66.writeFileSync('./' + jadi + '/' + _0xa8b6c4 + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(_0x163213[0x0], "base64").toString("utf-8")), null, "\t"));
  } else {
    '';
  }
  if (_0x1b3d66.existsSync('./' + jadi + '/' + _0xa8b6c4 + "/creds.json")) {
    let _0x1e58a9 = JSON.parse(_0x1b3d66.readFileSync('./' + jadi + '/' + _0xa8b6c4 + "/creds.json"));
    if (_0x1e58a9) {
      if (_0x1e58a9.registered = false) {
        _0x1b3d66.unlinkSync('./' + jadi + '/' + _0xa8b6c4 + "/creds.json");
      }
    }
  }
  const _0x188c2 = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", 'base64');
  exec(_0x188c2.toString("utf-8"), async (_0x175495, _0x5034dc, _0x340928) => {
    const _0x5129c4 = Buffer.from("CkphZGlib3QsIEhlY2hvIHBvciBAQWlkZW5fTm90TG9naWM", 'base64');
    async function _0x3d0599() {
      let _0x30abaa = _0x1f703f.mentionedJid && _0x1f703f.mentionedJid[0x0] ? _0x1f703f.mentionedJid[0x0] : _0x1f703f.fromMe ? _0x4d3e5b.user.jid : _0x1f703f.sender;
      let _0x399b85 = '' + _0x30abaa.split`@`[0x0];
      if (!_0x1b3d66.existsSync('./' + jadi + '/' + _0x399b85)) {
        _0x1b3d66.mkdirSync('./' + jadi + '/' + _0x399b85, {
          'recursive': true
        });
      }
      if (_0x163213[0x0]) {
        _0x1b3d66.writeFileSync('./' + jadi + '/' + _0x399b85 + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(_0x163213[0x0], 'base64').toString("utf-8")), null, "\t"));
      } else {
        '';
      }
      let {
        version: _0x281d24,
        isLatest: _0x5bf1db
      } = await fetchLatestBaileysVersion();
      const _0x2aecd6 = _0x3604c0 => {};
      const _0x5d2b76 = new _0xe3c119();
      const {
        state: _0x546abe,
        saveState: _0x2c37e5,
        saveCreds: _0x3a09b5
      } = await useMultiFileAuthState('./' + jadi + '/' + _0x399b85);
      const _0x63e935 = {
        'printQRInTerminal': false,
        'logger': _0x2073a8({
          'level': "silent"
        }),
        'auth': {
          'creds': _0x546abe.creds,
          'keys': makeCacheableSignalKeyStore(_0x546abe.keys, _0x2073a8({
            'level': 'silent'
          }))
        },
        'msgRetry': _0x2aecd6,
        'msgRetryCache': _0x5d2b76,
        'version': [0x2, 0xbb8, 0x3c8d6c7b],
        'syncFullHistory': true,
        'browser': _0x3f86eb ? ["Ubuntu", "Chrome", "110.0.5585.95"] : ["Yuki (Sub Bot)", "Chrome", '2.0.0'],
        'defaultQueryTimeoutMs': undefined,
        'getMessage': async _0x5bf562 => {
          if (store) {}
          return {
            'conversation': "Yuki-Suou-Bot"
          };
        }
      };
      let _0x11bc9d = makeWASocket(_0x63e935);
      _0x11bc9d.isInit = false;
      let _0x2aca88 = true;
      async function _0x31d12a(_0x25d978) {
        const {
          connection: _0x1c3fa8,
          lastDisconnect: _0x5217f5,
          isNewLogin: _0x67bde1,
          qr: _0x2b9520
        } = _0x25d978;
        if (_0x67bde1) {
          _0x11bc9d.isInit = false;
        }
        if (_0x2b9520 && !_0x3f86eb) {
          _0x49062c = await _0x4d3e5b.sendMessage(_0x1f703f.chat, {
            'image': await _0x19d2fd.toBuffer(_0x2b9520, {
              'scale': 0x8
            }),
            'caption': "🌸 S E R B O T - S U B B O T 🌸\n\n*Escanea este QR para ser un Sub Bot*\n\n🍬 Pasos para escanear:\n\n`1` : Haga click en los 3 puntos\n\n`2` : Toque dispositivos vinculados\n\n`3` : Escanea este QR\n\n> *Nota:* Este código QR expira en 30 segundos.\n" + _0x5129c4.toString("utf-8")
          }, {
            'quoted': _0x1f703f
          });
          setTimeout(() => {
            _0x4d3e5b.sendMessage(_0x1f703f.sender, {
              'delete': _0x49062c.key
            });
          }, 0x7530);
          return;
        }
        if (_0x2b9520 && _0x3f86eb) {
          _0xf20c46 = await _0x4d3e5b.sendMessage(_0x1f703f.chat, {
            'text': "🌸 S E R B O T - S U B B O T 🌸\n\n*Usa este Código para convertirte en un Sub Bot*\n\n🍬 Pasos:\n\n`1` : Haga click en los 3 puntos\n\n`2` : Toque dispositivos vinculados\n\n`3` : Selecciona Vincular con el número de teléfono\n\n`4` : Escriba el Codigo\n\n> *Nota:* Este Código solo funciona en el número que lo solicito.\n" + _0x5129c4.toString("utf-8")
          }, {
            'quoted': _0x1f703f
          });
          await sleep(0xbb8);
          let _0xa01723 = await _0x11bc9d.requestPairingCode(_0x1f703f.sender.split`@`[0x0]);
          _0x17cf1c = await _0x1f703f.reply(_0xa01723);
        }
        setTimeout(() => {
          _0x4d3e5b.sendMessage(_0x1f703f.sender, {
            'delete': _0xf20c46.key
          });
        }, 0x7530);
        setTimeout(() => {
          _0x4d3e5b.sendMessage(_0x1f703f.sender, {
            'delete': _0x17cf1c.key
          });
        }, 0x7530);
        const _0x1a8b6f = _0x5217f5?.["error"]?.["output"]?.['statusCode'] || _0x5217f5?.["error"]?.["output"]?.["payload"]?.["statusCode"];
        console.log(_0x1a8b6f);
        const _0x34bb93 = async _0x528b0c => {
          if (!_0x528b0c) {
            try {
              _0x11bc9d.ws.close();
            } catch {}
            _0x11bc9d.ev.removeAllListeners();
            let _0x3a3d55 = global.conns.indexOf(_0x11bc9d);
            if (_0x3a3d55 < 0x0) {
              return;
            }
            delete global.conns[_0x3a3d55];
            global.conns.splice(_0x3a3d55, 0x1);
          }
        };
        const _0x4cdff9 = _0x5217f5?.["error"]?.['output']?.["statusCode"] || _0x5217f5?.["error"]?.["output"]?.['payload']?.["statusCode"];
        if (_0x1c3fa8 === "close") {
          console.log(_0x4cdff9);
          if (_0x4cdff9 == 0x195) {
            await _0x1b3d66.unlinkSync('./' + jadi + '/' + _0x399b85 + "/creds.json");
            return await _0x1f703f.reply("🍬 Reenvia nuevamente el comando.");
          }
          if (_0x4cdff9 === DisconnectReason.restartRequired) {
            _0x3d0599();
            return console.log("\n⌛ Tiempo de conexión agotado, reconectando...");
          } else {
            if (_0x4cdff9 === DisconnectReason.loggedOut) {
              sleep(0xfa0);
              return _0x1f703f.reply("🍭 *Tu dispositivo se ha deconectado*\n\nTendras que volver a conectarte usando:\n#deletesesion (Para borrar datos y poder volver a solita el QR o el code)");
            } else {
              if (_0x4cdff9 == 0x1ac) {
                await _0x34bb93(false);
                return _0x1f703f.reply("🍭 La conexión se ha cerrado de manera inesperada, intentaremos reconectar...");
              } else {
                if (_0x4cdff9 === DisconnectReason.connectionLost) {
                  await _0x3d0599();
                  return console.log("\n⚠️ Conexión perdida con el servidor, reconectando....");
                } else {
                  if (_0x4cdff9 === DisconnectReason.badSession) {
                    return await _0x1f703f.reply("🍧 La conexión se ha cerrado, deberá de conectarse manualmente usando el comando *#serbot* y reescanear el nuevo *QR.* Que fué enviada la primera vez que se hizo *SubBot*");
                  } else {
                    if (_0x4cdff9 === DisconnectReason.timedOut) {
                      await _0x34bb93(false);
                      return console.log("\n⌛ Tiempo de conexión agotado, reconectando....");
                    } else {
                      console.log("\n⚠️❗ Razón de la desconexión desconocida: " + (_0x4cdff9 || '') + " >> " + (_0x1c3fa8 || ''));
                    }
                  }
                }
              }
            }
          }
        }
        if (global.db.data == null) {
          loadDatabase();
        }
        if (_0x1c3fa8 == "open") {
          _0x11bc9d.isInit = true;
          global.conns.push(_0x11bc9d);
          await _0x4d3e5b.sendMessage(_0x1f703f.chat, {
            'text': _0x163213[0x0] ? "⚪ *Está conectado(a)!! Por favor espere se está cargando los mensajes...*\n\n♻️ *Opciones Disponibles:*\n*» " + _0x3b5ef5 + "pausarsb _(Detener la función Sub Bot)_*\n*» " + _0x3b5ef5 + "eliminarsesion _(Borrar todo rastro de Sub Bot)_*\n*» " + _0x3b5ef5 + "serbot _(Nuevo código QR o Conectarse si ya es Sub Bot)_*" : "🌸 Conexión con éxito!!! Puede conectarse usando:" + (" " + (_0x3b5ef5 + _0x13a388))
          }, {
            'quoted': _0x1f703f
          });
          let _0x5e2b27 = ("\n🍬 *Bot* » Wa.me/" + _0x1f703f.sender.split`@`[0x0] + "\n👤 *Dueño* » " + (_0x1f703f.pushName || "Anónimo") + "\n🔑 *Método de conexión* » " + (_0x3f86eb ? "Código de 8 dígitos" : "Código QR") + "\n💻 *Browser* » " + (_0x3f86eb ? "Ubuntu" : "Chrome") + "\n⭐️ *Versión Sub-Bot* » " + vsJB + "\n").trim();
          await sleep(0xbb8);
          await _0x4d3e5b.sendMessage(global.channelid, {
            'text': _0x5e2b27,
            'contextInfo': {
              'externalAdReply': {
                'title': "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
                'body': "🌸 ¡Nuevo Sub-Bot encontrado!",
                'thumbnailUrl': fotoperfil,
                'sourceUrl': redes,
                'mediaType': 0x1,
                'showAdAttribution': false,
                'renderLargerThumbnail': false
              }
            }
          }, {
            'quoted': null
          });
          if (!_0x163213[0x0]) {
            _0x4d3e5b.sendMessage(_0x1f703f.chat, {
              'text': _0x3b5ef5 + _0x13a388 + " " + Buffer.from(_0x1b3d66.readFileSync('./' + jadi + '/' + _0x399b85 + "/creds.json"), "utf-8").toString("base64")
            }, {
              'quoted': _0x1f703f
            });
          }
        }
      }
      setInterval(async () => {
        if (!_0x11bc9d.user) {
          try {
            _0x11bc9d.ws.close();
          } catch (_0x3c3d7c) {
            console.log(await _0x546f26(true)['catch'](console.error));
          }
          _0x11bc9d.ev.removeAllListeners();
          let _0x1815f4 = global.conns.indexOf(_0x11bc9d);
          if (_0x1815f4 < 0x0) {
            return;
          }
          delete global.conns[_0x1815f4];
          global.conns.splice(_0x1815f4, 0x1);
        }
      }, 0xea60);
      let _0x46340f = await import('../handler.js');
      let _0x546f26 = async function (_0x2b7b86) {
        try {
          const _0x22f6f8 = await import("../handler.js?update=" + Date.now())["catch"](console.error);
          if (Object.keys(_0x22f6f8 || {}).length) {
            _0x46340f = _0x22f6f8;
          }
        } catch (_0x1c58d8) {
          console.error(_0x1c58d8);
        }
        if (_0x2b7b86) {
          const _0x15f08e = _0x11bc9d.chats;
          try {
            _0x11bc9d.ws.close();
          } catch {}
          _0x11bc9d.ev.removeAllListeners();
          _0x11bc9d = makeWASocket(_0x63e935, {
            'chats': _0x15f08e
          });
          _0x2aca88 = true;
        }
        if (!_0x2aca88) {
          _0x11bc9d.ev.off('messages.upsert', _0x11bc9d.handler);
          _0x11bc9d.ev.off("connection.update", _0x11bc9d.connectionUpdate);
          _0x11bc9d.ev.off("creds.update", _0x11bc9d.credsUpdate);
        }
        const _0x406753 = new Date();
        const _0x2298a6 = new Date(_0x11bc9d.ev * 0x3e8);
        if (_0x406753.getTime() - _0x2298a6.getTime() <= 0x493e0) {
          console.log("Leyendo mensaje entrante:", _0x11bc9d.ev);
          Object.keys(_0x11bc9d.chats).forEach(_0x479a2b => {
            _0x11bc9d.chats[_0x479a2b].isBanned = false;
          });
        } else {
          console.log(_0x11bc9d.chats, "🍭 Omitiendo mensajes en espera.", _0x11bc9d.ev);
          Object.keys(_0x11bc9d.chats).forEach(_0x58c123 => {
            _0x11bc9d.chats[_0x58c123].isBanned = true;
          });
        }
        _0x11bc9d.handler = _0x46340f.handler.bind(_0x11bc9d);
        _0x11bc9d.connectionUpdate = _0x31d12a.bind(_0x11bc9d);
        _0x11bc9d.credsUpdate = _0x3a09b5.bind(_0x11bc9d, true);
        _0x11bc9d.ev.on('messages.upsert', _0x11bc9d.handler);
        _0x11bc9d.ev.on('connection.update', _0x11bc9d.connectionUpdate);
        _0x11bc9d.ev.on("creds.update", _0x11bc9d.credsUpdate);
        _0x2aca88 = false;
        return true;
      };
      _0x546f26(false);
    }
    _0x3d0599();
  });
};
handler.help = ['serbot', "serbot --code"];
handler.tags = ['serbot'];
handler.command = ['jadibot', "serbot"];
export default handler;
function sleep(_0x42a8b8) {
  return new Promise(_0x37afe5 => setTimeout(_0x37afe5, _0x42a8b8));
}
