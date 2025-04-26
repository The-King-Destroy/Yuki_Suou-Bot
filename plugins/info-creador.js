import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  m.react('👋');
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let pp = await conn.profilePictureUrl(who).catch(_ => 'https://qu.ax/PRgfc.jpg');
  let biografia = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(_ => 'Sin Biografía');
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => 'Sin Biografía');
  let bio = biografia.status?.toString() || 'Sin Biografía';
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía';
  let name = await conn.getName(who);

  await sendContactArray(conn, m.chat, [
    [`${suittag}`, `ᰔᩚ Propietario`, botname, `❀ No Hacer Spam`, correo, `⊹˚• Venezuela •˚⊹`, md, bio],
    [`${conn.user.jid.split('@')[0]}`, `✦ Es Un Bot`, packname, dev, correo, `Sabra Dios 🫏`, channel, biobot]
  ], m);
}

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
  let contacts = [];
  for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
    number = number.replace(/[^0-9]/g, '');
    let njid = number + '@s.whatsapp.net';
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim();
    contacts.push({ vcard, displayName: name });
  }
  return await conn.sendMessage(jid, {
    contacts: {
      displayName: (contacts.length > 1 ? `Contactos` : contacts[0].displayName) || null,
      contacts,
    }
  }, {
    quoted,
    ...options
  });
}
