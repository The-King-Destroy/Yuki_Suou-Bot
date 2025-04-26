import { tmpdir } from 'os'
import path from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Ingresa la ruta y el nombre del archivo que deseas eliminar.`, m)
    
    const file = text.trim()
    if (!existsSync(file)) return conn.reply(m.chat, `${emoji2} Archivo no encontrado.`, m)
    
    unlinkSync(file)
    conn.reply(m.chat, `${done} El archivo *${file}* ha sido eliminado con éxito.`, m)
}
handler.tags = ['owner']
handler.help = ['deletefile']
handler.command = ['deletefile']
handler.rowner = true

export default handler