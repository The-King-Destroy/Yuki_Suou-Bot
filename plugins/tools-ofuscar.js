import JavaScriptObfuscator from 'javascript-obfuscator'

var handler = async(m, { conn, text }) => {
if (!text) return m.reply(`*[❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙴𝙻 𝙲𝙾𝙳𝙸𝙶𝙾 𝚀𝚄𝙴 𝚅𝙰𝚂 𝙰 𝙾𝙵𝚄𝚂𝙲𝙰𝚁 ?*`) 
function obfuscateCode(code) {
  return JavaScriptObfuscator.obfuscate(code, { compact: false, controlFlowFlattening: true, deadCodeInjection: true, simplify: true, numbersToExpressions: true }).getObfuscatedCode();
}
let obfuscatedCode = await obfuscateCode(text);
conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m});
}
handler.command = /^(ofuscar|ofuscador)$/i
export default handler
