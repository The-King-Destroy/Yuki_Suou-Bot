const items = ['yenes'];
const confirmation = {};
const DEBT_INCREMENT = 10;
const DEBT_INTERVAL = 5 * 60 * 60 * 1000; // 5 horas
const MIN_AMOUNT = 10;

async function handler(m, { conn, args, command }) {
  const user = global.db.data.users[m.sender];

  if (command === 'prestar') {
    await handleLoan(m, conn, args, user);
  } else if (command === 'pagar') {
    await handlePayment(m, conn, user, args);
  } else if (command === 'deuda') {
    await handleDebt(m, conn, user);
  }
}

async function handleLoan(m, conn, args, user) {
  const loanedUser = args[1] ? args[1].replace(/[@ .+-]/g, '') + '@s.whatsapp.net' : '';
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(MIN_AMOUNT, (isNumber(args[0]) ? parseInt(args[0]) : MIN_AMOUNT))) * 1;

  if (!loanedUser) {
    return conn.sendMessage(m.chat, { text: '*👤 Menciona al usuario que desea recibir yenes.*' }, { quoted: m });
  }

  if (!(loanedUser in global.db.data.users)) {
    return conn.sendMessage(m.chat, { text: `*👤 El usuario ${loanedUser} no está en la base de datos.*` }, { quoted: m });
  }

  if (user.yenes < count) {
    return conn.sendMessage(m.chat, { text: '*💰 No tienes suficientes yenes para prestar.*' }, { quoted: m });
  }

  if (confirmation[loanedUser]) {
    return conn.sendMessage(m.chat, { text: '*💰 Ya hay una solicitud de préstamo pendiente para este usuario.*' }, { quoted: m });
  }

  const lenderTag = `@${m.sender.split('@')[0]}`;
  const confirmMessage = `*${lenderTag} desea prestarte ${count} yenes. ¿Aceptarás?* 
*—◉ Tienes 60 segundos para confirmar.*
*—◉ Escribe:* 
*◉ Si = para aceptar*
*◉ No = para cancelar*`.trim();

  await conn.sendMessage(m.chat, { text: confirmMessage, mentions: [m.sender] }, { quoted: m });

  confirmation[loanedUser] = {
    sender: m.sender,
    to: loanedUser,
    count,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, { text: '*⌛ Se acabó el tiempo, no se obtuvo respuesta. Préstamo cancelado.*', mentions: [loanedUser] }, { quoted: m });
      delete confirmation[loanedUser];
    }, 60 * 1000)
  };
}

async function handlePayment(m, conn, user, args) {
  const amountToPay = Math.min(Number.MAX_SAFE_INTEGER, Math.max(MIN_AMOUNT, (isNumber(args[0]) ? parseInt(args[0]) : MIN_AMOUNT))) * 1;

  if (!user.debts || Object.keys(user.debts).length === 0) {
    return conn.sendMessage(m.chat, { text: '*💳 No tienes yenes en deuda para pagar.*' }, { quoted: m });
  }

  const totalDebt = Object.values(user.debts).reduce((acc, debt) => acc + debt.amount, 0);

  if (amountToPay < MIN_AMOUNT) {
    return conn.sendMessage(m.chat, { text: `*💰 La cantidad mínima para pagar es ${MIN_AMOUNT} yenes.*` }, { quoted: m });
  }

  if (amountToPay > totalDebt) {
    return conn.sendMessage(m.chat, { text: `*💰 No puedes pagar más de ${totalDebt} yenes.*` }, { quoted: m });
  }

  // Realizar el pago
  for (const lender of Object.keys(user.debts)) {
    const debt = user.debts[lender];
    if (amountToPay <= debt.amount) {
      debt.amount -= amountToPay;
      if (debt.amount <= 0) {
        delete user.debts[lender];
      }
      break;
    }
    amountToPay -= debt.amount;
    delete user.debts[lender];
  }

  conn.sendMessage(m.chat, { text: `*💸 Pago realizado: ${amountToPay} yenes.*` }, { quoted: m });

  if (Object.keys(user.debts).length === 0) {
    conn.sendMessage(m.chat, { text: '*🎉 Ya no debes nada.*' }, { quoted: m });
  }
}

async function handleDebt(m, conn, user) {
  if (!user.debts || Object.keys(user.debts).length === 0) {
    return conn.sendMessage(m.chat, { text: '*💳 No tienes deudas pendientes.*' }, { quoted: m });
  }

  let debtMessage = '*💳 Deudas pendientes:*\n';
  const mentions = [];

  for (const [lender, debt] of Object.entries(user.debts)) {
    debtMessage += `*— @${lender.split('@')[0]} ${debt.amount} Yenes*\n`;
    mentions.push(lender);
  }

  conn.sendMessage(m.chat, { text: debtMessage, mentions }, { quoted: m });
}

handler.before = async (m) => {
  if (m.isBaileys) return;
  if (!(m.sender in confirmation)) return;
  if (!m.text) return;

  const { timeout, to, count } = confirmation[m.sender];
  const loanedUser = global.db.data.users[to];

  if (/^No$/i.test(m.text)) {
    clearTimeout(timeout);
    delete confirmation[to];
    return conn.sendMessage(m.chat, { text: '*🔴 Cancelado, el préstamo no se realizará.*' }, { quoted: m });
  }

  if (/^Si$/i.test(m.text)) {
    const lender = global.db.data.users[m.sender];
    loanedUser.yenes += count;
    loanedUser.debts = loanedUser.debts || {};
    if (!loanedUser.debts[m.sender]) {
      loanedUser.debts[m.sender] = { amount: 0 }; // Inicializa la deuda si no existe
    }
    loanedUser.debts[m.sender].amount += count; // Guarda la cantidad adeudada

    conn.sendMessage(m.chat, { text: `*💱 Se prestaron correctamente ${count} yenes a @${to.split('@')[0]}.*`, mentions: [to] }, { quoted: m });

    setInterval(() => {
      loanedUser.debts[m.sender].amount += DEBT_INCREMENT;
      conn.sendMessage(m.chat, { text: `*💸 La deuda ha sido aumentada en ${DEBT_INCREMENT} yenes.*`, mentions: [to] }, { quoted: m });
    }, DEBT_INTERVAL);

    clearTimeout(timeout);
    delete confirmation[to];
  }
};

handler.help = ['prestar', 'pagar', 'deuda'].map((v) => v + ' [cantidad] [@tag]');
handler.tags = ['economy'];
handler.command = ['prestar', 'pagar', 'deuda'];
handler.disabled = false;
handler.group = true;
handler.register = true;

export default handler;

function isNumber(x) {
  return !isNaN(x);
}
