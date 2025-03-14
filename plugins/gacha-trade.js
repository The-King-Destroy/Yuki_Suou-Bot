import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('No se pudo cargar el archivo characters.json.')
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8')
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json.')
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2))
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo harem.json.')
    }
}

let handler = async (m, { conn, args }) => {
    const userId = m.sender

    if (args.length < 3) {
        await conn.reply(m.chat, '《✧》Debes especificar dos personajes para intercambiarlos.\n\n> ✐ Ejemplo: *#trade Personaje1 / Personaje2*\n> Donde "Personaje1" es el personaje que quieres intercambiar y "Personaje2" es el personaje que quieres recibir.', m)
        return
    }

    const myCharacterName = args.slice(0, args.indexOf('/')).join(' ').trim()
    const theirCharacterName = args.slice(args.indexOf('/') + 1).join(' ').trim()

    try {
        const characters = await loadCharacters()
        const myCharacter = characters.find(c => c.name.toLowerCase() === myCharacterName.toLowerCase() && c.user === userId)
        const theirCharacter = characters.find(c => c.name.toLowerCase() === theirCharacterName.toLowerCase())

        if (!myCharacter) {
            await conn.reply(m.chat, `《✧》*${myCharacterName}* no está reclamado por ti.`, m)
            return
        }

        if (!theirCharacter) {
            await conn.reply(m.chat, `《✧》*${theirCharacterName}* no está disponible para el intercambio.`, m)
            return
        }

        const tradeRequestMessage = `「✐」@${theirCharacter.user.split('@')[0]}, @${userId.split('@')[0]} te ha enviado una solicitud de intercambio.\n\n` +
            `✦ [@${userId.split('@')[0]}] *${myCharacter.name}* (${myCharacter.id})\n` +
            `✦ [@${theirCharacter.user.split('@')[0]}] *${theirCharacter.name}* (${theirCharacter.id})\n\n` +
            `✐ Para aceptar el intercambio responde a este mensaje con "Aceptar". La solicitud expira en 60 segundos.`;

        await conn.reply(m.chat, tradeRequestMessage, m, { mentions: [theirCharacter.user, userId] })

        const timeout = setTimeout(async () => {
            await conn.reply(m.chat, `《✧》La solicitud de intercambio ha expirado.`, m, { mentions: [theirCharacter.user, userId] })
        }, 60000)

        const responseMessage = await conn.waitForMessage(m.chat)

        const response = responseMessage.body.toLowerCase().trim()
        if (responseMessage.sender === theirCharacter.user) {
            if (response === 'aceptar') {
                clearTimeout(timeout)
                myCharacter.user = theirCharacter.user
                theirCharacter.user = userId
                await saveCharacters(characters)

                const harem = await loadHarem()
                const myUserEntryIndex = harem.findIndex(entry => entry.userId === userId)
                const theirUserEntryIndex = harem.findIndex(entry => entry.userId === theirCharacter.user)

                if (myUserEntryIndex !== -1) {
                    harem[myUserEntryIndex].characterId = theirCharacter.id
                } else {
                    harem.push({ userId: userId, characterId: theirCharacter.id, lastClaimTime: Date.now() })
                }

                if (theirUserEntryIndex !== -1) {
                    harem[theirUserEntryIndex].characterId = myCharacter.id
                } else {
                    harem.push({ userId: theirCharacter.user, characterId: myCharacter.id, lastClaimTime: Date.now() })
                }

                await saveHarem(harem)
                await conn.reply(m.chat, `✰ Intercambio aceptado: *${myCharacter.name}* ha sido intercambiado con *${theirCharacter.name}*!`, m, { mentions: [theirCharacter.user, userId] })
            } else {
                await conn.reply(m.chat, `Respuesta no válida. Solo se puede responder con "Aceptar".`, m)
            }
        } else {
            await conn.reply(m.chat, `《✧》Solo *@${theirCharacter.user.split('@')[0]}* puede aceptar la solicitud de intercambio.`, m)
        }

    } catch (error) {
        await conn.reply(m.chat, `✘ Error al procesar el intercambio: ${error.message}`, m)
    }
}

handler.help = ['trade <tu personaje> / <personaje del usuario>']
handler.tags = ['anime']
handler.command = ['trade']
handler.group = true

export default handler
