import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let proposals = {}; 

function loadMarriages() {
    if (fs.existsSync(marriagesFile)) {
        return JSON.parse(fs.readFileSync(marriagesFile, 'utf8'));
    }
    return {};
}

function saveMarriages(marriages) {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

let marriages = loadMarriages(); 

const handler = async (m, { conn, command, usedPrefix }) => {
    const proposeCmd = /^marry$/i.test(command);
    const acceptCmd = /^aceptar$/i.test(command);
    const rejectCmd = /^rechazar$/i.test(command);
    const divorceCmd = /^divorciarse$/i.test(command);

    const reportError = async (message) => {
        await m.reply(`🌸 Ocurrió un error: ${message}`);
    };

    const isUserMarried = (user) => marriages[user] !== undefined;

    try {
        if (proposeCmd) {
            let proposee;

            if (m.quoted && m.quoted.sender) {
                proposee = m.quoted.sender;
            } else if (m.mentionedJid && m.mentionedJid.length > 0) {
                proposee = m.mentionedJid[0];
            } else {
                throw new Error('Debes mencionar a la persona o responder a su mensaje.');
            }

            const proposer = m.sender;

            if (isUserMarried(proposer)) throw new Error(`Ya estás casado con ${conn.getName(marriages[proposer])}.`);
            if (isUserMarried(proposee)) throw new Error(`${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}.`);
            if (proposer === proposee) throw new Error('¡No puedes proponerte matrimonio a ti mismo!');
            if (proposals[proposer]) throw new Error('Ya has propuesto matrimonio. Espera a que respondan.');

            proposals[proposer] = proposee;
            await conn.reply(proposee, `¡${conn.getName(proposer)} te ha propuesto matrimonio! Responde a este mensaje con *${usedPrefix}aceptar* o *${usedPrefix}rechazar*.`, m);
            await m.reply('Tu propuesta de matrimonio ha sido enviada. Espera a que respondan.');

        } else if (acceptCmd) {
            if (isUserMarried(m.sender)) throw new Error(`Ya estás casado con ${conn.getName(marriages[m.sender])}.`);

            if (!m.quoted || !m.quoted.sender || !proposals[m.quoted.sender] || proposals[m.quoted.sender] !== m.sender) {
                throw new Error('Debes responder al mensaje de propuesta de matrimonio para aceptarla.');
            }

            const proposerKey = m.quoted.sender;
            delete proposals[proposerKey];

            marriages[proposerKey] = m.sender;
            marriages[m.sender] = proposerKey;
            saveMarriages(marriages);

            await conn.reply(m.chat, `🎉 ¡Felicidades a ${conn.getName(proposerKey)} y ${conn.getName(m.sender)}! ¡Ahora están casados! 🎉`, m);

        } else if (rejectCmd) {
            if (isUserMarried(m.sender)) throw new Error(`Ya estás casado con ${conn.getName(marriages[m.sender])}.`);

            if (!m.quoted || !m.quoted.sender || !proposals[m.quoted.sender] || proposals[m.quoted.sender] !== m.sender) {
                throw new Error('Debes responder al mensaje de propuesta de matrimonio para rechazarla.');
            }

            const rejectProposerKey = m.quoted.sender;
            delete proposals[rejectProposerKey];

            await conn.reply(rejectProposerKey, `${conn.getName(m.sender)} ha rechazado tu propuesta de matrimonio.`, m);
            await m.reply(`Has rechazado la propuesta de matrimonio de ${conn.getName(rejectProposerKey)}.`);

        } else if (divorceCmd) {
            if (!isUserMarried(m.sender)) throw new Error('No estás casado con nadie.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages(marriages);

            await conn.reply(m.chat, `💔 ${conn.getName(m.sender)} y ${conn.getName(partner)} se han divorciado. 💔`, m);
        }
    } catch (error) {
        await reportError(error.message);
    }
}

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'aceptar', 'rechazar', 'divorciarse'];
handler.command = ['marry', 'aceptar', 'rechazar', 'divorciarse'];
handler.group = true;

export default handler;
