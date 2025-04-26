global.math = global.math ? global.math : {};
const handler = async (m, {conn, args, usedPrefix, command}) => {
  const mat =`${emoji} Por favor, ingresa la dificulta con la que desea jugar.

*Dificultades Disponibles: ${Object.keys(modes).join(' | ')}*
*Ejemplo de uso: ${usedPrefix}mates medium*
`.trim();
  if (args.length < 1) return await conn.reply(m.chat, mat, m);

  const mode = args[0].toLowerCase();
  if (!(mode in modes)) return await conn.reply(m.chat, mat, m);

  const id = m.chat;
  if (id in global.math) return conn.reply(m.chat, `${emoji2} Todavía hay un juego en proceso en este chat.`, global.math[id][0]);
  const math = genMath(mode);
  global.math[id] = [
    await conn.reply(m.chat, `${emoji} Cuanto es el resultado de ${math.str}?\n\n🕒 Tiempo: ${(math.time / 1000).toFixed(2)} segundos\n*${emoji2} Premio: ${math.bonus} XP*`, m),
    math, 4,
    setTimeout(() => {
      if (global.math[id]) {
        conn.reply(m.chat, `${emoji} Se a finalizado el tiempo para responder.\n\n> ${emoji2} La respuesta es ${math.result}`, m),

        delete global.math[id];
      }
    }, math.time),
  ];
};
handler.help = ['math <mode>'];
handler.tags = ['game'];
handler.command = ['matemáticas', 'mates', 'math']
handler.group = true
handler.register = true

export default handler;

const modes = {
  noob: [-3, 3, -3, 3, '+-', 15000, 10],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000],
};

const operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
};

function genMath(mode) {
  const [a1, a2, b1, b2, ops, time, bonus] = modes[mode];
  let a = randomInt(a1, a2);
  const b = randomInt(b1, b2);
  const op = pickRandom([...ops]);
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))();
  if (op == '/') [a, result] = [result, a];
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result,
  };
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from];
  from = Math.floor(from);
  to = Math.floor(to);
  return Math.floor((to - from) * Math.random() + from);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}