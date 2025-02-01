import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
  const key = m.chat;
  conn.chess = conn.chess || {};
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, players, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();

  if (feature === 'eliminar') {
    delete conn.chess[key];
    return conn.reply(m.chat, '🏳️ *El juego de ajedrez se detuvo.*', m);
  }

  if (feature === 'crear') {
    if (gameData) {
      return conn.reply(m.chat, '⚠️ *Juego ya en progreso.*', m);
    }
    chessData.gameData = { status: 'Espera', black: null, white: null };
    return conn.reply(m.chat, '🎮 *Empezó la partida de ajedrez.*\nEsperando que se unan otros jugadores.', m);
  }

  if (feature === 'unirse') {
    const senderId = m.sender;
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '🙅‍♂️ *Ya te has unido a este juego.*', m);
    }
    if (!gameData || gameData.status !== 'espera') {
      return conn.reply(m.chat, '⚠️ *Actualmente no hay ningún juego de ajedrez esperando jugadores.*', m);
    }
    if (players.length >= 2) {
      return conn.reply(m.chat, '👥 *Los jugadores ya son suficientes.*\nEl juego comenzará automáticamente.', m);
    }
    players.push(senderId);
    hasJoined.push(senderId);
    if (players.length === 2) {
      gameData.status = 'listos';
      const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
      gameData.black = black;
      gameData.white = white;
      chessData.currentTurn = white;
      return conn.reply(m.chat, `🙌 *2 jugadores Listos:*\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n*negro:* @${black.split('@')[0]}\n*blanco:* @${white.split('@')[0]}\n\nPor favor use*'chess start'* para iniciar el juego.`, m, { mentions: hasJoined });
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *Te has unido al juego de ajedrez.*\nEsperando que se unan otros jugadores.', m);
    }
  }

  if (feature === 'iniciar') {
    if (gameData.status !== 'listos') {
      return conn.reply(m.chat, '⚠️ *No se puede iniciar el juego. Espera a que se unan dos jugadores..*', m);
    }
    gameData.status = 'jugando';
    const senderId = m.sender;
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      const encodedFen = encodeURIComponent(fen);
      const turn = `🎲 *Turno:* Blanco @${gameData.white.split('@')[0]}`;
      const flipParam = senderId === gameData.black ? '' : '&flip=true';
      const flipParam2 = senderId === gameData.black ? '' : '-flip';
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] });
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.black] });
      }
      return;
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *Te has unido al juego de ajedrez.*\nEsperando que se unan otros jugadores.', m);
    }
  }

  if (args[0] && args[1]) {
    const senderId = m.sender;
    if (!gameData || gameData.status !== 'jugando') {
      return conn.reply(m.chat, '⚠️ *El juego aún no ha comenzado.*', m);
    }
    if (currentTurn !== senderId) {
      return conn.reply(m.chat, `⏳ *es actualmente ${chessData.currentTurn === gameData.white ? 'blanco' : 'negro'}'s girar para moverse.*`, m, {
        contextInfo: {
          mentionedJid: [currentTurn]
        }
      });
    }
    const chess = new Chess(fen);
    if (chess.isCheckmate()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `⚠️ *Jaque mate del juego.*\n🏳️ *El juego de ajedrez se detuvo..*\n*Ganador:* @${m.sender.split('@')[0]}`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }
    if (chess.isDraw()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `⚠️ *Sorteo del juego.*\n🏳️ *El juego de ajedrez se detuvo.*\n*Jugadores:* ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`, m, {
        contextInfo: {
          mentionedJid: hasJoined
        }
      });
    }
    const [from, to] = args;
    try {
      chess.move({ from, to, promotion: 'q' });
    } catch (e) {
      return conn.reply(m.chat, '❌ *Movimiento Invalido.*', m);
    }
    chessData.fen = chess.fen();
    const currentTurnIndex = players.indexOf(currentTurn);
    const nextTurnIndex = (currentTurnIndex + 1) % 2;
    chessData.currentTurn = players[nextTurnIndex];
    const encodedFen = encodeURIComponent(chess.fen());
    const currentColor = chessData.currentTurn === gameData.white ? 'White' : 'Black';
    const turn = `🎲 *Turn:* ${currentColor} @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`;
    const flipParam = senderId === gameData.black ? '' : '&flip=true';
    const flipParam2 = senderId === gameData.black ? '' : '-flip';
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
    try {
      await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [chessData.currentTurn] });
    } catch (error) {
      const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
      await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [chessData.currentTurn] });
    }
    chess.deleteComment();
    return;
  }

  if (feature === 'help') {
    return conn.reply(m.chat, `
      🌟 *Comandos del juego de ajedrez:*

*chess create* - Iniciar una partida de ajedrez
*chess join* - Únete a una partida de ajedrez en espera
*chess start* - Comienza la partida de ajedrez si se han unido dos jugadores
*chess delete* - Detener el juego de ajedrez
*chess [from] [to]* - MHaz un movimiento en el juego de ajedrez

*Ejemplo:*
Escribe *chess create* para iniciar una partida de ajedrez.
Escribe *chess join* para unirte a una partida de ajedrez en espera.
    `, m);
  }
  return conn.reply(m.chat, '❓ Comando inválido. Utilice *"chess help"* para ver los comandos disponibles.', m);
};

handler.help = ['chess [from to]', 'chess delete', 'chess join', 'chess start'];
handler.tags = ['game'];
handler.command = /^(chess|chatur)$/i;

export default handler;
