var handler  = async (m, { conn }) => {

let texto = `🍒 *Instalación de Yuki Suou 🌹*

⬡ Dudas: ${creador}
⬡ Tutoríal: *¡Próximamente!* 

*Comandos de instalación via Termux ✏️*

termux-setup-storage

apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn

git clone https://github.com/The-King-Destroy/Yuki_Suou-Bot && cd Yuki_Suou-Bot

yarn install && npm install

npm start

*Nota: Si aparece (Y/I/N/O/D/Z) [default=N] ? use la letra "y" + "ENTER" para continuar con la instalación*

_Utilice "comandos" para enviarle los comandos uno por uno 🌸_`

conn.reply(m.chat, texto, m, rcanal )

handler.before = async m => {

if (/^comandos$/i.test(m.text) ) {
conn.reply(m.chat, 'termux-setup-storage', m, rcanal)
await delay(1000 * 1)
conn.reply(m.chat, 'apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn', m, rcanal)
await delay(1000 * 1)
conn.reply(m.chat, 'git clone https://github.com/The-King-Destroy/Yuki_Suou-Bot && cd Yuki_Suou-Bot', m, rcanal)
await delay(1000 * 1)
conn.reply(m.chat, 'yarn install && npm install', m, rcanal)
await delay(1000 * 1)
conn.reply(m.chat, 'npm start', m, rcanal)
}

handler.help = ['instalaryuki']
handler.tags = ['info']
handler.command = ['instalarbot', 'instalar', 'botinstalar', 'instalaryuki', 'yukiinstalar']
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))