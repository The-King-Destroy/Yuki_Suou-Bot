import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command, conn }) => {
if (!text) return m.reply("🌸 ingresa un texto")
    
try {
let api = await fetch(`https://tools.betabotz.eu.org/tools/openai?q=${text}`)
let json = await api.json()
m.reply(json.result)
    
} catch (error) {
console.error(error)
}}

handler.command = ['openai']

export default handler