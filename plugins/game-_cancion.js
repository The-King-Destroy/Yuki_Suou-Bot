import similarity from 'similarity';
const threshold = 0.72;

const answerHandler = {
  async before(m) {
    const id = m.chat;

    // Verifica que el mensaje sea una respuesta a la pregunta de adivinanza
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/ADIVINA EL TITULO DE LA CANCION/i.test(m.quoted.text)) return true;

    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {};
    if (!(id in this.tebaklagu)) return m.reply('El juego ha terminado');

    if (m.quoted.id == this.tebaklagu[id][0].id) {
      const json = this.tebaklagu[id][1];
      
      // Compara la respuesta del usuario con la respuesta correcta
      const userAnswer = m.text.toLowerCase().trim();
      const correctAnswer = json.jawaban.toLowerCase().trim();

      if (userAnswer === correctAnswer) {
        global.db.data.users[m.sender].cookies += this.tebaklagu[id][2];
        m.reply(`✅ Correcto!\n+${this.tebaklagu[id][2]} Cookies`);
        clearTimeout(this.tebaklagu[id][3]);
        delete this.tebaklagu[id];
      } else if (similarity(userAnswer, correctAnswer) >= threshold) {
        m.reply(`Casi!`);
      } else {
        m.reply(`❌ Incorrecto!`);
      }
    }
    return true;
  },
  exp: 0,
};

export default answerHandler;
