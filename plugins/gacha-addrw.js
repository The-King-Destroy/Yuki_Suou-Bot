/* Código creado por @Emma (Violet's Versión) @Elpapiema

Parchado y adaptado por @The-King-Destroy. */

import fetch from 'node-fetch'

const handler = async (m, { text, usedPrefix, command, conn }) => {
    const args = text.split(',').map(arg => arg.trim())

    if (args.length < 7) {
        return m.reply(`❀ Por favor ingresé la info del personaje.\n✧ Ejemplo: ${usedPrefix}${command} <Nombre del personaje>, <Género>, <Valor>, <Origen>, <Enlace de imagen 1>, <Enlace de imagen 2>, <Enlace de imagen 3>\n\n> Nota: los links deben estar en catbox.moe o en qu.ax si se usa qu.ax se debe configurar como permanente.`)
    }

    const [name, gender, value, source, img1, img2, img3] = args

    if (!img1.startsWith('http') || !img2.startsWith('http') || !img3.startsWith('http')) {
        return m.reply('✧ Por favor, proporciona enlaces válidos para las imágenes.')
    }

    const characterData = {
        id: Date.now().toString(),
        name,
        gender,
        value,
        source,
        img: [img1, img2, img3],
        vid: [],
        user: null,
        status: "Libre",
        votes: 0
    }

    const tagNumber = '573154062343@s.whatsapp.net'

    const jsonMessage = `❀ Nuevo personaje añadido ❀\n\n\`\`\`${JSON.stringify(characterData, null, 2)}\`\`\``
    await conn.sendMessage(tagNumber, { text: jsonMessage })

    m.reply(`❀ El personaje *"${name}"* se envió al staff para su posterior adicción.`)
}

handler.command = ['addcharacter', 'addrw']

export default handler