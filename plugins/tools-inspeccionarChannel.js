import fetch from 'node-fetch';

function reportError(error) {
  console.error("Se ha producido un error:", error);
  // Aquí puedes agregar más lógica, como enviar un mensaje a un canal de soporte
}

let handler = async (m, { conn, text }) => {
  let newsletterInfo;
  const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
  
  if (!channelUrl) {
    return await conn.reply(m.chat, "*Verifique que sea un enlace de canal de WhatsApp.*", m);
  }
  
  try {
    newsletterInfo = await conn.newsletterMetadata("invite", channelUrl).catch(e => null);
    if (!newsletterInfo) {
      return await conn.reply(m.chat, "*No se encontró información del canal.* Verifique que el enlace sea correcto.", m);
    }
    
    let caption = "*Inspector de enlaces de Canales*\n\n" + processObject(newsletterInfo, "", newsletterInfo?.preview);
    let pp = newsletterInfo?.preview ? getUrlFromDirectPath(newsletterInfo.preview) : thumb;
    
    if (channelUrl && newsletterInfo) {
      await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
          mentionedJid: conn.parseMention(caption),
          externalAdReply: {
            title: "Inspector de Canales",
            body: packname,
            thumbnailUrl: pp,
            sourceUrl: text,
            mediaType: 1,
            showAdAttribution: false,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: fkontak });
      
      if (newsletterInfo.id) {
        conn.sendMessage(m.chat, { text: newsletterInfo.id }, { quoted: null });
      }
    }
  } catch (e) {
    reportError(e);
  }
};

handler.command = ['id', 'inspeccionarchanel'];
handler.register = true;
export default handler;

function formatDate(n, locale = "es", includeTime = true) {
  if (n > 1e12) {
    n = Math.floor(n / 1000);  // Convertir de milisegundos a segundos
  } else if (n < 1e10) {
    n = Math.floor(n * 1000);  // Convertir de segundos a milisegundos
  }
}

function newsletterKey(key) {
  return _.startCase(key.replace(/_/g, " "))
    .replace("Id", "Identificador")
    .replace("State", "Estado")
    .replace("Creation Time", "Fecha de creación")
    .replace("Name Time", "✏️ Fecha de modificación del nombre")
    .replace("Name", "Nombre")
    .replace("Description Time", "Fecha de modificación de la descripción")
    .replace("Description", "Descripción")
    .replace("Invite", "Invitación")
    .replace("Handle", "Alias")
    .replace("Picture", "Imagen")
    .replace("Preview", "Vista previa")
    .replace("Reaction Codes", "Reacciones")
    .replace("Subscribers", "Suscriptores")
    .replace("Verification", "✅ Verificación")
    .replace("Viewer Metadata", "Datos avanzados");
}

function processObject(obj, prefix = "", preview) {
  let caption = "";
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length > 0) {
        const sectionName = newsletterKey(prefix + key);
        caption += `\n*\`${sectionName}\`*\n`;
        caption += processObject(value, `${prefix}${key}_`);
      }
    } else {
      const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key;
      const displayValue = formatValue(shortKey, value, preview);
      const translatedKey = newsletterKey(shortKey);
      caption += `- *${translatedKey}:*\n${displayValue}\n\n`;
    }
  });
  return caption.trim();
}
