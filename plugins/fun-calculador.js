const handler = async (m, { conn, command, text }) => {
  let target;
  if (m.mentionedJid[0]) {
    target = await conn.getName(m.mentionedJid[0]);
  } else if (text) {
    target = text;
  } else {
    return conn.reply(m.chat, `❀ Por favor, menciona a un Usuario o escribe un nombre para comprobar su test.`, m);
  }

  const percentages = Math.floor(Math.random() * 101);
  let emoji = '';
  let description = '';

  switch (command) {
    case 'gay':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `💙 Los cálculos han arrojado que ${target} es *${percentages}%* Gay ${emoji}\n> ✰ Eso es bajo, ¡Tú eres Joto, no Gay!`;
      } else {
        description = `🖤 Los cálculos han arrojado que ${target} es *${percentages}%* Gay ${emoji}\n> ✰ Lo tuyo, lo tuyo es que eres Gay.`;
      }
      break;

    case 'lesbiana':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `👻 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n✰ Quizás necesites más películas románticas en tu vida.`;
      } else {
        description = `💗 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén el amor floreciendo!`;
      }
      break;

    case 'pajero':
    case 'pajera':
      emoji = '😏💦';
      if (percentages < 50) {
        description = `🧡 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Tal vez necesites más hobbies!`;
      } else {
        description = `💞 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén el buen trabajo (en solitario).`;
      }
      break;

    case 'puto':
    case 'puta':
      emoji = '🔥🥵';
      if (percentages < 50) {
        description = `😼 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✧ ¡Más suerte en tu próxima conquista!`;
      } else {
        description = `😺 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén ese encanto ardiente!`;
      }
      break;

    case 'manco':
    case 'manca':
      emoji = '💩';
      if (percentages < 50) {
        description = `🌟 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡No eres el único en ese club!`;
      } else {
        description = `🥷 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén esa actitud valiente!`;
      }
      break;

    case 'rata':
      emoji = '🐁';
      if (percentages < 50) {
        description = `💥 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Nada de malo en disfrutar del queso!`;
      } else {
        description = `👑 Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Come queso con responsabilidad!`;
      }
      break;

    case 'prostituto':
    case 'prostituta':
      emoji = '🫦👅';
      if (percentages < 50) {
        description = `❀ Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ El mercado está en auge!`;
      } else {
        description = `✨️ Los cálculos han arrojado que ${target} es *${percentages}%* ${command} ${emoji}\n> ✰ Siempre es hora de negocios!`;
      }
      break;

    default:
      return m.reply(`🍭 Comando inválido.`);
  }

  const responses = [
    "El universo ha hablado.",
    "Los científicos lo confirman.",
    "¡Sorpresa!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];

  const cal = `💫 *CALCULADORA*\n\n${description}\n\n➤ ${response}`.trim();

  async function loading() {
    var hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];
    let { key } = await conn.sendMessage(m.chat, { text: `🤍 ¡Calculando Porcentaje!` }, { quoted: fkontak });
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key }, { quoted: fkontak });
    }
    await conn.sendMessage(m.chat, { text: cal, edit: key }, { quoted: fkontak });
  }
  loading();
};

handler.help = ['gay <@tag>|<nombre>', 'lesbiana <@tag>|<nombre>', 'pajero <@tag>|<nombre>', 'pajera <@tag>|<nombre>', 'puto <@tag>|<nombre>', 'puta <@tag>|<nombre>', 'manco <@tag>|<nombre>', 'manca <@tag>|<nombre>', 'rata <@tag>|<nombre>', 'prostituta <@tag>|<nombre>', 'prostituto <@tag>|<nombre>'];
handler.tags = ['fun'];
handler.register = true;
handler.group = true;
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'];

export default handler;