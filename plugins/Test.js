import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor proporcione una palabra para buscar.';

  const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw `Ocurrió un error: ${json.message}`;
  }

  if (!json.list.length) {
    throw 'Palabra no encontrada en el diccionario.';
  }

  const firstEntry = json.list[0];
  const definition = firstEntry.definition;
  const example = firstEntry.example ? `*Ejemplo:* ${firstEntry.example}` : '';

  const message = `*Word:* ${text}\n*Definicion:* ${definition}\n${example}`;
  conn.sendMessage(m.chat, { text: message }, 'mensaje de texto extendido', { quoted: m });
};

handler.help = ['define <word>'];
handler.tags = ['tools'];
handler.command = /^define/i;

export default handler;
