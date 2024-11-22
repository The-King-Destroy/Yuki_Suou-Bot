import fetch from 'node-fetch'

let handler = async (m, { text, conn }) => {
if (!text) return m.reply("🌸 ingresa un texto")

try {
let api = await fetch(`https://api-lenwy.vercel.app/ai4chat?text=${text}`)
let JT = await api.json()
m.reply(JT.data)
} catch (error) {
console.error(error)
}}

handler.command = ['ai4', 'chatgpt4']