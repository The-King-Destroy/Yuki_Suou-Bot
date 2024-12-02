import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let proposals = {}; 
let marriages = loadMarriages();
const confirmation = {};

function loadMarriages() {
    return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorciarse$/i.test(command);

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            const proposer = m.sender;

            if (!proposee) throw new Error('Debes mencionar a la persona o responder a su mensaje.');
            if (userIsMarried(proposer)) throw new Error(`Ya estás casado con ${conn.getName(marriages[proposer])}.`);
            if (userIsMarried(proposee)) throw new Error(`${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}.`);
            if (proposer === proposee) throw new Error('¡No puedes proponerte matrimonio a ti mismo!');
            if (proposals[proposer]) throw new Error('Ya has propuesto matrimonio. Espera a que respondan.');

            proposals[proposer] = proposee;
            const proposerName = conn.getName(proposer);
            const proposeeName = conn.getName(proposee);
            const confirmationMessage = `*${proposerName} te ha propuesto matrimonio! a ti ${proposeeName}*\nResponde con "Si" para aceptar o "No" para rechazar.`;
            await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });

            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, { text: '*⌛ Se acabó el tiempo, no se obtuvo respuesta. Propuesta cancelada.*' }, { quoted: m });
                    delete confirmation[proposee];
                }, 60000)
            };

        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('No estás casado con nadie.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat, `💔 ${conn.getName(m.sender)} y ${conn.getName(partner)} se han divorciado. 💔`, m);
        }
    } catch (error) {
        await conn.reply(m.chat, `🌻 Ocurrió un error: ${error.message}`, m);
    }
}

handler.before = async (m) => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;

    const { proposer, timeout } = confirmation[m.sender];

    if (/^No$/i.test(m.text)) {
        clearTimeout(timeout);
        delete confirmation[m.sender];
        return conn.sendMessage(m.chat, { text: '*🔴 Cancelado, la propuesta de matrimonio no se realizará.*' }, { quoted: m });
    }

    if (/^Si$/i.test(m.text)) {
        delete proposals[proposer];
        marriages[proposer] = m.sender;
        marriages[m.sender] = proposer;
        saveMarriages();

        conn.sendMessage(m.chat, { text: `🎉 ¡Felicidades a ${conn.getName(proposer)} y ${conn.getName(m.sender)}! ¡Ahora están casados! 🎉`, mentions: [proposer, m.sender] }, { quoted: m });

        clearTimeout(timeout);
        delete confirmation[m.sender];
    }
};

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'divorciarse'];
handler.command = ['marry', 'divorciarse'];
handler.group = true;

export default handler;
