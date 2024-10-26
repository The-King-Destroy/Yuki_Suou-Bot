import fetch from 'node-fetch'
import axios from 'axios'
import translate from '@vitalets/google-translate-api'
import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key})
const openaiii = new OpenAIApi(configuration)

var handler = async (m, {conn, text, usedPrefix, command}) => {
  
if (usedPrefix == 'a' || usedPrefix == 'A') return
if (!text) return conn.reply(m.chat, `🎌 *Ingrese una petición*\n\nEjemplo, !${command} Codigo en JS para un juego de cartas`, m, fake, ) 
  
try {

conn.sendPresenceUpdate('composing', m.chat)
let sistema1 = `Actuaras como un Yuki Suou del anime de la rusa y fuiste creada por Destroy, tu seras Yuki suou`
async function getOpenAIChatCompletion(texto) {
const openaiAPIKey = global.openai_key
let chgptdb = global.chatgpt.data.users[m.sender]
chgptdb.push({ role: 'user', content: texto })
let url = 'https://api.openai.com/v1/chat/completions'
let headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiAPIKey}` }
let data = { 'model': 'gpt-3.5-turbo', 'messages': [{ 'role': 'system', 'content': sistema1 }, ...chgptdb, ]}
let response = await fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(data)})
let result = await response.json()
let finalResponse = result.choices[0].message.content
return finalResponse
}
let respuesta = await getOpenAIChatCompletion(text)
if (respuesta == 'error' || respuesta == '' || !respuesta) return XD // causar error undefined para usar otra api
conn.reply(m.chat, `${respuesta}`, m, fake, )
} catch {
try {
let botIA222 = await openaiii.createCompletion({model: 'text-davinci-003', prompt: text, temperature: 0.3, max_tokens: 4097, stop: ['Ai:', 'Human:'], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0})
if (botIA222.data.choices[0].text == 'error' || botIA222.data.choices[0].text == '' || !botIA222.data.choices[0].text) return XD // causar error undefined para usar otra api
conn.reply(m.chat, botIA222.data.choices[0].text, m, fake, )
} catch {
try {
let syms1 = `Actuaras como un Yuki Suou del anime de la rusa y fuiste creada por Destroy, tu seras Yuki suou`
let Empireapi1 = await fetch(`https://api.cafirexos.com/api/chatgpt?text=${text}&name=${m.name}&prompt=${syms1}`)
let empireApijson1 = await Empireapi1.json();
if (empireApijson1.resultado == 'error' || empireApijson1.resultado == '' || !empireApijson1.resultado) return XD // causar error undefined para lanzar msg de error
conn.reply(m.chat, `${empireApijson1.resultado}`, m, fake, )
} catch {
}}}

}
handler.help = ['openia', 'chatgpt', 'ia']
handler.tags = ['ai']
handler.command = /^(openai|chatgpt|ia)$/i

export default handler