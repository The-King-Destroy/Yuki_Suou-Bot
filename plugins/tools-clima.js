import axios from "axios";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    let resp = `${emoji} Ingrese el nombre de su País o Ciudad.`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
    return;
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = response.data;
    const name = res.name;
    const Country = res.sys.country;
    const Weather = res.weather[0].description;
    const Temperature = res.main.temp + "°C";
    const Minimum_Temperature = res.main.temp_min + "°C";
    const Maximum_Temperature = res.main.temp_max + "°C";
    const Humidity = res.main.humidity + "%";
    const Wind = res.wind.speed + "km/h";
    const wea = `「 📍 」LUGAR: ${name}\n「 🗺️ 」PAIS: ${Country}\n「 🌤️ 」TIEMPO: ${Weather}\n「 🌡️ 」TEMPERATURA: ${Temperature}\n「 💠 」TEMPERATURA MINIMA: ${Minimum_Temperature}\n「 📛 」TEMPERATURA MAXIMA: ${Maximum_Temperature}\n「 💦 」HUMEDAD: ${Humidity}\n「 🌬️ 」VIENTO: ${Wind}`.trim();

    let txt = '';
    let count = 0;
    for (const c of wea) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
  } catch (e) {
    let resp = `${msm} Error!\n No se encontraron resultados, trate de escribir un país o ciudad existente.`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
  }
};

handler.help = ['clima *<ciudad/país>*'];
handler.tags = ['herramientas'];
handler.command = ['clima', 'tiempo']
export default handler;