import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let proposals = {}; 
let marriages = loadMarriages();

function loadMarriages() {
    if (fs.existsSync(marriagesFile)) {
        return JSON.parse(fs.readFileSync(marriagesFile, 'utf8'));
    }
    return {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isAccept = /^si$/i.test(command);
    const isReject = /^no$/i.test(command);
    const isDivorce = /^divorciarse$/i.test(command);

    const replyError = async (message) => {
        await conn.reply(m.chat, `🌻 Ocurrió un error: ${message}`, m);
    };

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];

            if (!proposee) throw new Error('Debes mencionar a la persona o responder a su mensaje.');
            const proposer = m.sender;

            if (userIsMarried(proposer)) throw new Error(`Ya estás casado con ${conn.getName(marriages[proposer])}.`);
            if (userIsMarried(proposee)) throw new Error(`${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}.`);
            if (proposer === proposee) throw new Error('¡No puedes proponerte matrimonio a ti mismo!');
            if (proposals[proposer]) throw new Error('Ya has propuesto matrimonio. Espera a que respondan.');

            proposals[proposer] = proposee;
            await conn.reply(m.chat, `¡${conn.getName(proposer)} te ha propuesto matrimonio! Responde en el grupo con "si" para aceptar o "no" para rechazar.`, m);

        } else if (isAccept) {
            if (userIsMarried(m.sender)) throw new Error(`Ya estás casado con ${conn.getName(marriages[m.sender])}.`);
            if (!m.quoted || !m.quoted.sender || proposals[m.quoted.sender] !== m.sender) {
                throw new Error('Debes responder al mensaje de propuesta de matrimonio para aceptarla.');
            }

            const proposerKey = m.quoted.sender;
            delete proposals[proposerKey];

            marriages[proposerKey] = m.sender;
            marriages[m.sender] = proposerKey;
            saveMarriages();

            await conn.reply(m.chat, `🎉 ¡Felicidades a ${conn.getName(proposerKey)} y ${conn.getName(m.sender)}! ¡Ahora están casados! 🎉`, m);

        } else if (isReject) {
            if (userIsMarried(m.sender)) throw new Error(`Ya estás casado con ${conn.getName(marriages[m.sender])}.`);
            if (!m.quoted || !m.quoted.sender || proposals[m.quoted.sender] !== m.sender) {
                throw new Error('Debes responder al mensaje de propuesta de matrimonio para rechazarla.');
            }

            const rejectProposerKey = m.quoted.sender;
            delete proposals[rejectProposerKey];

            await conn.reply(m.chat, `${conn.getName(m.sender)} ha rechazado la propuesta de matrimonio de ${conn.getName(rejectProposerKey)}.`, m);

        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('No estás casado con nadie.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat, `💔 ${conn.getName(m.sender)} y ${conn.getName(partner)} se han divorciado. 💔`, m);
        }
    } catch (error) {
        await replyError(error.message);
    }
}

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'si', 'no', 'divorciarse'];
handler.command = ['marry', 'si', 'no', 'divorciarse'];
handler.group = true;

export default handler;
