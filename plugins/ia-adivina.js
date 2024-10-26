import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let preguntas = [
        '¿Estás pensando en algo en particular?',
        '¿Es algo que te preocupa?',
        '¿Estás pensando en alguien?',
        '¿Es algo que te hace feliz?',
        '¿Es algo que te hace triste?',
        '¿Es algo que te estás planteando hacer?',
        '¿Es algo que ya has hecho?',
        '¿Es algo que te gustaría hacer?',
        '¿Es algo que te gustaría cambiar?',
        '¿Es algo que te gustaría saber?',
    ]

    let respuesta = await conn.sendMessage(m.chat, '¡Hablemos! Estoy listo para adivinar lo que estás pensando.', m)

    let respuestaAnterior
    while (true) {
        let preguntaActual = preguntas[Math.floor(Math.random() * preguntas.length)]

        let respuestaActual = await conn.sendMessage(m.chat, preguntaActual, m)

        if (respuestaAnterior) {
            if (respuestaAnterior.startsWith('Sí')) {
                respuestaAnterior = '¡Genial! Ahora te haré otra pregunta...'
                respuestaActual = await conn.sendMessage(m.chat, respuestaAnterior, respuestaActual)
                respuestaAnterior = respuestaActual
            } else if (respuestaAnterior.startsWith('No')) {
                respuestaAnterior = '¡Okay! Ahora te haré otra pregunta...'
                respuestaActual = await conn.sendMessage(m.chat, respuestaAnterior, respuestaActual)
                respuestaAnterior = respuestaActual
            } else {
                respuestaAnterior = '¡Entendido! Ahora te haré otra pregunta...'
                respuestaActual = await conn.sendMessage(m.chat, respuestaAnterior, respuestaActual)
                respuestaAnterior = respuestaActual
            }
        }

        respuestaAnterior = await conn.sendFile(m.chat, 'media/image/emoji/thinking-face.png', '', '', false, { 
            caption: '¡Espera un momento...!',
        }, { 
            quoted: respuestaActual
        })
    }
}

handler.help = ['.adivina'];
handler.tags = ['ai'];
handler.command = ['adivina'];
handler.group = true;

export default handler;