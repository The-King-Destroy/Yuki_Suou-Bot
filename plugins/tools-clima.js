import axios from "axios";

let handler = async (m, { args }) => {
  if (!args[0]) throw "*𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚒𝚗𝚍𝚒𝚌𝚊 𝚞𝚗 𝚕𝚞𝚐𝚊𝚛 𝚙𝚊𝚛𝚊 𝚋𝚞𝚜𝚌𝚊𝚛*";
  
  try {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = await response;
    
    const name = res.data.name;
    const Country = res.data.sys.country;
    const Weather = res.data.weather[0].description;
    const Temperature = res.data.main.temp.toFixed(1);
    const Minimum_Temperature = res.data.main.temp_min.toFixed(1);
    const Maximum_Temperature = res.data.main.temp_max.toFixed(1);
    const Humidity = res.data.main.humidity;
    const Wind = res.data.wind.speed.toFixed(1);
    
    let advice = "";
    if (Temperature < 10) {
      const coldMessages = [
        "¡𝙷𝚘𝚢 𝚑𝚊𝚌𝚎 𝚏𝚛í𝚘! ¡𝙰𝚋𝚛𝚒𝚐á𝚝𝚎 𝚋𝚒𝚎𝚗! :c",
        "¡𝙴𝚕 𝚍í𝚊 𝚎𝚜𝚝á 𝚏𝚛𝚎𝚜𝚌𝚘! 𝙽𝚘 𝚘𝚕𝚟𝚒𝚍𝚎𝚜 𝚕𝚕𝚎𝚟𝚊𝚛 𝚊𝚕𝚐𝚘 𝚍𝚎 𝚊𝚋𝚛𝚒𝚐𝚘 :3.",
        "𝙴𝚕 𝚌𝚕𝚒𝚖𝚊 𝚎𝚜𝚝á 𝚏𝚛í𝚘 𝚑𝚘𝚢, 𝚊𝚜𝚎𝚐ú𝚛𝚊𝚝𝚎 𝚍𝚎 𝚎𝚜𝚝𝚊𝚛 𝚋𝚒𝚎𝚗 𝚊𝚋𝚛𝚒𝚐𝚊𝚍𝚘 :𝟹."
      ];
      advice = coldMessages[Math.floor(Math.random() * coldMessages.length)];
    } else if (Temperature > 30) {
      const hotMessages = [
        "¡𝙷𝚘𝚢 𝚑𝚊𝚌𝚎 𝚖𝚞𝚌𝚑𝚘 𝚌𝚊𝚕𝚘𝚛! 𝙴𝚟𝚒𝚝𝚊 𝚙𝚛𝚎𝚗𝚍𝚊𝚜 𝚘𝚜𝚌𝚞𝚛𝚊𝚜 𝚢 𝚖𝚊𝚗𝚝𝚎𝚗𝚝𝚎 𝚑𝚒𝚍𝚛𝚊𝚝𝚊𝚍𝚘.",
        "¡𝙴𝚕 𝚍í𝚊 𝚎𝚜𝚝á 𝚌𝚊𝚕𝚞𝚛𝚘𝚜𝚘! 𝙿𝚛𝚘𝚌𝚞𝚛𝚊 𝚖𝚊𝚗𝚝𝚎𝚗𝚎𝚛𝚝𝚎 𝚏𝚛𝚎𝚜𝚌𝚘 𝚢 𝚝𝚘𝚖𝚊𝚛 𝚜𝚞𝚏𝚒𝚌𝚒𝚎𝚗𝚝𝚎 𝚊𝚐𝚞𝚊.",
        "𝙷𝚘𝚢 𝚑𝚊𝚌𝚎 𝚌𝚊𝚕𝚘𝚛, 𝚎𝚜 𝚛𝚎𝚌𝚘𝚖𝚎𝚗𝚍𝚊𝚋𝚕𝚎 𝚞𝚜𝚊𝚛 𝚛𝚘𝚙𝚊 𝚕𝚒𝚐𝚎𝚛𝚊 𝚢 𝚖𝚊𝚗𝚝𝚎𝚗𝚎𝚛𝚜𝚎 𝚑𝚒𝚍𝚛𝚊𝚝𝚊𝚍𝚘."
      ];
      advice = hotMessages[Math.floor(Math.random() * hotMessages.length)];
    } else {
      const normalMessages = [
        "𝙷𝚘𝚢 𝚎𝚜 𝚞𝚗 𝚍í𝚊 𝚗𝚘𝚛𝚖𝚊𝚕, ¡𝚍𝚒𝚜𝚏𝚛ú𝚝𝚊𝚕𝚘!",
        "𝙴𝚕 𝚌𝚕𝚒𝚖𝚊 𝚍𝚎 𝚑𝚘𝚢 𝚎𝚜 𝚊𝚐𝚛𝚊𝚍𝚊𝚋𝚕𝚎, ¡𝚊𝚙𝚛𝚘𝚟𝚎𝚌𝚑𝚊 𝚙𝚊𝚛𝚊 𝚜𝚊𝚕𝚒𝚛 𝚢 𝚍𝚒𝚜𝚏𝚛𝚞𝚝𝚊𝚛!",
        "𝙽𝚘 𝚑𝚊𝚢 𝚌𝚊𝚖𝚋𝚒𝚘𝚜 𝚎𝚡𝚝𝚛𝚎𝚖𝚘𝚜 𝚎𝚗 𝚎𝚕 𝚌𝚕𝚒𝚖𝚊 𝚑𝚘𝚢, ¡𝚙𝚎𝚛𝚏𝚎𝚌𝚝𝚘 𝚙𝚊𝚛𝚊 𝚑𝚊𝚌𝚎𝚛 𝚊𝚌𝚝𝚒𝚟𝚒𝚍𝚊𝚍𝚎𝚜 𝚊𝚕 𝚊𝚒𝚛𝚎 𝚕𝚒𝚋𝚛𝚎!"
      ];
      advice = normalMessages[Math.floor(Math.random() * normalMessages.length)];
    }
    
    const border = '╭─────────────────────\n';
    const divider = '│ ─────────────────────\n';
    const footer = '╰─────────────────────';
    const space = '\n'.repeat(5); 
    
const clima = `
${space}${border}│ 🌍 𝙻𝚄𝙶𝙰𝚁: ${name}, ${Country}
${divider}│ ☁️ 𝙲𝙻𝙸𝙼𝙰: ${Weather}
${divider}│ 🌡️ 𝚃𝙴𝙼𝙿𝙴𝚁𝙰𝚃𝚄𝚁𝙰: ${Temperature}°C (Mín: ${Minimum_Temperature}°C, Máx: ${Maximum_Temperature}°C)
${divider}│ 💧 𝙷𝚄𝙼𝙴𝙽𝙳𝙰𝙳: ${Humidity}%
${divider}│ 💨 𝚅𝙸𝙴𝙽𝚃𝙾 𝚅/𝚂: ${Wind}km/h
${divider}│ 
${divider}│ 𝙴𝚙𝚊𝚊𝚊: ${advice}
${footer}`;

    m.reply(clima);
  } catch {
    return "*Ha ocurrido un error al obtener el clima*";
  }
};

handler.help = ['weather *<lugar>*'];
handler.tags = ['herramientas'];
handler.command = ['clima', 'weather', 'tiempo', 'pronostico'];
handler.register = true

export default handler;
