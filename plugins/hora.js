import fetch from "node-fetch";
import moment from "moment-timezone";
import axios from "axios";

const imgUrl = "https://qu.ax/npRA.jpg";

let handler = async (m, { conn, args }) => {
  let clockString = "";

  let wib = moment.tz("Africa/Casablanca").format("HH:mm:ss");

  let peru = moment.tz("America/Lima").format("HH:mm:ss");
  let chile = moment.tz("America/Santiago").format("HH:mm:ss");
  let argentina = moment
    .tz("America/Argentina/Buenos_Aires")
    .format("HH:mm:ss");
  let espana = moment.tz("Europe/Madrid").format("HH:mm:ss");
  let paraguay = moment.tz("America/Asuncion").format("HH:mm:ss");
  let mexico = moment.tz("America/Mexico_City").format("HH:mm:ss");
  let colombia = moment.tz("America/Bogota").format("HH:mm:ss");
  let venezuela = moment.tz("America/Caracas").format("HH:mm:ss");
  let cuba = moment.tz("America/Havana").format("HH:mm:ss");
  let ecuador = moment.tz("America/Guayaquil").format("HH:mm:ss");
  let bolivia = moment.tz("America/La_Paz").format("HH:mm:ss");
  let uruguay = moment.tz("America/Montevideo").format("HH:mm:ss");
  let honduras = moment.tz("America/Tegucigalpa").format("HH:mm:ss");
  let nicaragua = moment.tz("America/Managua").format("HH:mm:ss");
  let guatemala = moment.tz("America/Guatemala").format("HH:mm:ss");
  let costa_rica = moment.tz("America/Costa_Rica").format("HH:mm:ss");
  let republica_dominicana = moment
    .tz("America/Santo_Domingo")
    .format("HH:mm:ss");
  let puerto_rico = moment.tz("America/Puerto_Rico").format("HH:mm:ss");

  clockString += `🇲🇦 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙲𝚊𝚜𝚊𝚋𝚕𝚊𝚗𝚌𝚊, Á𝚏𝚛𝚒𝚌𝚊: ${wib}\n─────────────────\n`;
  clockString += `🇵🇪 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙻𝚒𝚖𝚊, 𝙿𝚎𝚛ú: ${peru}\n─────────────────\n`;
  clockString += `🇨🇱 𝙷𝚘𝚛𝚊 𝚎𝚗 𝚂𝚊𝚗𝚝𝚒𝚊𝚐𝚘, 𝙲𝚑𝚒𝚕𝚎: ${chile}\n─────────────────\n`;
  clockString += `🇦🇷 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙱𝚞𝚎𝚗𝚘𝚜 𝙰𝚒𝚛𝚎𝚜, 𝙰𝚛𝚐𝚎𝚗𝚝𝚒𝚗𝚊: ${argentina}\n─────────────────\n`;
  clockString += `🇪🇸 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙼𝚊𝚍𝚛𝚒𝚍, 𝙴𝚜𝚙𝚊ñ𝚊: ${espana}\n─────────────────\n`;
  clockString += `🇵🇾 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙰𝚜𝚞𝚗𝚌𝚒ó𝚗, 𝙿𝚊𝚛𝚊𝚐𝚞𝚊𝚢: ${paraguay}\n─────────────────\n`;
  clockString += `🇲🇽 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙲𝚒𝚞𝚍𝚊𝚍 𝚍𝚎 𝙼é𝚡𝚒𝚌𝚘, 𝙼é𝚡𝚒𝚌𝚘: ${mexico}\n─────────────────\n`;
  clockString += `🇨🇴 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙱𝚘𝚐𝚘𝚝á, 𝙲𝚘𝚕𝚘𝚖𝚋𝚒𝚊: ${colombia}\n─────────────────\n`;
  clockString += `🇻🇪 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙲𝚊𝚛𝚊𝚌𝚊𝚜, 𝚅𝚎𝚗𝚎𝚣𝚞𝚎𝚕𝚊: ${venezuela}\n─────────────────\n`;
  clockString += `🇨🇺 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙻𝚊 𝙷𝚊𝚋𝚊𝚗𝚊, 𝙲𝚞𝚋𝚊: ${cuba}\n─────────────────\n`;
  clockString += `🇪🇨 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙶𝚞𝚊𝚢𝚊𝚚𝚞𝚒𝚕, 𝙴𝚌𝚞𝚊𝚍𝚘𝚛: ${ecuador}\n─────────────────\n`;
  clockString += `🇧🇴 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙻𝚊 𝙿𝚊𝚣, 𝙱𝚘𝚕𝚒𝚟𝚒𝚊: ${bolivia}\n─────────────────\n`;
  clockString += `🇺🇾 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙼𝚘𝚗𝚝𝚎𝚟𝚒𝚍𝚎𝚘, 𝚄𝚛𝚞𝚐𝚞𝚊𝚢: ${uruguay}\n─────────────────\n`;
  clockString += `🇭🇳 𝙷𝚘𝚛𝚊 𝚎𝚗 𝚃𝚎𝚐𝚞𝚌𝚒𝚐𝚊𝚕𝚙𝚊, 𝙷𝚘𝚗𝚍𝚞𝚛𝚊𝚜: ${honduras}\n─────────────────\n`;
  clockString += `🇳🇮 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙼𝚊𝚗𝚊𝚐𝚞𝚊, 𝙽𝚒𝚌𝚊𝚛𝚊𝚐𝚞𝚊: ${nicaragua}\n─────────────────\n`;
  clockString += `🇬🇹 𝙷𝚘𝚛𝚊 𝚎𝚗 𝙲𝚒𝚞𝚍𝚊𝚍 𝚍𝚎 𝙶𝚞𝚊𝚝𝚎𝚖𝚊𝚕𝚊, 𝙶𝚞𝚊𝚝𝚎𝚖𝚊𝚕𝚊: ${guatemala}\n─────────────────\n`;
  clockString += `🇨🇷 𝙷𝚘𝚛𝚊 𝚎𝚗 𝚂𝚊𝚗 𝙹𝚘𝚜é, 𝙲𝚘𝚜𝚝𝚊 𝚁𝚒𝚌𝚊: ${costa_rica}\n─────────────────\n`;
  clockString += `🇩🇴 𝙷𝚘𝚛𝚊 𝚎𝚗 𝚂𝚊𝚗𝚝𝚘 𝙳𝚘𝚖𝚒𝚗𝚐𝚘, 𝚁𝚎𝚙ú𝚋𝚕𝚒𝚌𝚊 𝙳𝚘𝚖𝚒𝚗𝚒𝚌𝚊𝚗𝚊: ${republica_dominicana}\n─────────────────\n`;
  clockString += `🇵🇷 𝙷𝚘𝚛𝚊 𝚎𝚗 𝚂𝚊𝚗 𝙹𝚞𝚊𝚗, 𝙿𝚞𝚎𝚛𝚝𝚘 𝚁𝚒𝚌𝚘: ${puerto_rico}\n─────────────────\n`;

  try {
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile(
      m.chat,
      responseImg.data,
      "thumbnail.png",
      clockString + "\n\n`𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 𝚋𝚢 ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜`",
      m,
    );

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply("Hubo un error al enviar la imagen.");
  }
};

handler.help = ["hora"];
handler.tags = ["tools"];
handler.command = /^(hora)$/i;
handler.register = true;

export default handler;
