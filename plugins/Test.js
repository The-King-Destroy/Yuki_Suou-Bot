import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, 'Por favor proporcione una palabra para buscar.', m);

  const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    return conn.reply(m.chat, `Ocurrió un error: ${json.message}`, m);
  }

  if (!json.list.length) {
    return conn.reply(m.chat, 'Palabra no encontrada en el diccionario.', m);
  }

  const firstEntry = json.list[0];
  const definition = firstEntry.definition;
  const example = firstEntry.example ? `*Ejemplo:* ${firstEntry.example}` : '';

  const message = `*Word:* ${text}\n*Definicion:* ${definition}\n${example}`;
  return conn.reply(m.chat, message, m);
};

handler.help = ['define <word>'];
handler.tags = ['tools'];
handler.command = ['define'];

export default handler;
