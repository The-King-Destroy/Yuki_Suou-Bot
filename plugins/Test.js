import fetch from "node-fetch";

async function fetchTruecallerData(phoneNumber) {
    const installationId = "a1i0D--jTBiKAks-Y9FHnPk_XG-YIsKEIa_eWiBwjH68LKn-zKRx9vaZq731KL0x";
    const apiUrl = `https://truecaller-api.vercel.app/search?phone=${encodeURIComponent(phoneNumber)}&id=${installationId}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al obtener datos de Truecaller. Código de estado: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error al obtener datos de Truecaller: ${error.message}`);
    }
}

function formatTruecallerData(data) {
    let formattedData = "";
    for (const prop in data) {
        if (prop === "flagURL") continue;
        
        formattedData += `⚝ *${prop}:* ${formatPropertyValue(data[prop])}\n`;
    }
    return formattedData;
}

function formatPropertyValue(value) {
    if (Array.isArray(value)) {
        return value.join(", ");
    } else if (typeof value === "object") {
        return formatObjectPropertyValue(value);
    }
    return value;
}

function formatObjectPropertyValue(obj) {
    let formattedValue = "";
    for (const key in obj) {
        formattedValue += `${key}: ${obj[key]}\n`;
    }
    return formattedValue;
}

async function handler(m, { text, quoted, mentionedJid }) {
    let phoneNumber = "";
    if (text) {
        phoneNumber = text.replace(/[^0-9]/g, "");
    } else if (quoted) {
        phoneNumber = quoted.sender.replace(/[^0-9]/g, "");
    } else if (mentionedJid && mentionedJid[0]) {
        phoneNumber = mentionedJid[0].replace(/[^0-9]/g, "");
    } else {
        throw `Proporcione un número en formato internacional sin +, cite un usuario o mencione un usuario`;
    }

    try {
        const truecallerData = await fetchTruecallerData(phoneNumber);
        truecallerData.creator = "Gabriel Curi BY REM-BOT";
        const formattedData = formatTruecallerData(truecallerData);
        m.reply(formattedData);
    } catch (error) {
        console.error(error);
        throw "Ocurrió un error al obtener los datos de Truecaller";
    }
}

handler.help = ["true"];
handler.tags = ["tools"];
handler.command = ['truecaller'];

export default handler;
