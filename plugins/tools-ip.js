import axios from 'axios';

let handler = async (m, { conn, text }) => {
  await m.reply("👨‍💻 Buscando...");
  if (!text) return conn.reply(m.chat, "Ingrese una direcci贸n IP v谩lida", m);

  try {
    let res = await axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`);
    const data = res.data;

    if (data.status !== "success") {
      return conn.reply(m.chat, data.message || "Fall贸", m);
    }

    let ipsearch = ` 
    饾悎饾悘 饾悎饾悕饾悈饾悗

    IP : ${data.query}
    Pa铆s : ${data.country}
    C贸digo de Pa铆s : ${data.countryCode}
    Provincia : ${data.regionName}
    C贸digo de Provincia : ${data.region}
    Ciudad : ${data.city}
    Distrito : ${data.district}
    C贸digo Postal : ${data.zip}
    Coordenadas : ${data.lat}, ${data.lon}
    Zona Horaria : ${data.timezone}
    ISP : ${data.isp}
    Organizaci贸n : ${data.org}
    AS : ${data.as}
    Mobile : ${data.mobile ? "Si" : "No"}
    Hosting : ${data.hosting ? "Si" : "No"}
    `.trim();

    await conn.reply(m.chat, ipsearch, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ocurri贸 un error al obtener la informaci贸n de la IP.', m);
  }
}
handler.help = ["IPdoxx"]
handler.tags = ["tools"]
handler.command = /^(ip|ipcheck|ipcek)$/i;
handler.owner = true;

export default handler;
