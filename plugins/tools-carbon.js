import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, 'Proporcione algún texto para generar la imagen del código..', m)
  }

  let codeText = args.join(' ')

  try {
    let response = await fetch('https://carbonara.solopov.dev/api/cook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: codeText,
        backgroundColor: '#1F816D',
      }),
    });

    if (!response.ok) {
      throw new Error('No se pudo generar la imagen del código.')
    }

    let imageBuffer = await response.buffer();
    conn.sendFile(m.chat, imageBuffer, 'code.png', 'Aquí está la imagen del código.:', m)
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Se produjo un error al generar la imagen del código..', m)
  }
}

handler.help = ['.carbon <code>']
handler.tags = ['tools']
handler.command = /^carbon$/i;

export default handler
