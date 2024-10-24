var handler  = async (m, { conn }) => {

let texto = `💖 *Instalación de Yuki-Bot 🌹*

⬡ Dudas: ${creador}
⬡ Tutoríal: *¡Pronto!*

*Comandos de instalación via Termux ✏️*

termux-setup-storage

apt-get update -y && apt-get upgrade -y

pkg install -y git nodejs ffmpeg imagemagick && pkg install yarn

git clone https://github.com/The-King-Destroy/Yuki_Suou-Bot && cd Yuki_Suou-Bot && yarn install && npm install 

ls

npm start

_Utilice "comandos" para enviarle los comandos uno por uno 💖_`

conn.reply(m.chat, texto, m, rcanal )

handler.before = async m => {

if (/^comandos$/i.test(m.text) ) {
m.reply('termux-setup-storage')
await delay(1000 * 1)
m.reply('apt-get update -y && apt-get upgrade -y')
await delay(1000 * 1)
m.reply('pkg install -y git nodejs ffmpeg imagemagick && pkg install yarn')
await delay(1000 * 1)
m.reply('git clone https://github.com/The-King-Destroy/Yuki_Suou-Bot && cd Yuki_Suou-Bot && yarn install && npm install ')
await delay(1000 * 1)
m.reply('ls')
await delay(1000 * 1)
m.reply('npm start')
}

}
handler.help = ['instalaryuki']
handler.tags = ['info']
handler.command = /^(instalaryuki|instalarbot)/i

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
