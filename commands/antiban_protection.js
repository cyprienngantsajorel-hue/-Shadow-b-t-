module.exports = {
  name: "antiban",

  execute: async (msg, client) => {
    if (!msg) return;

    const text = msg.body || "";

    // 🚫 Bloque les messages trop longs (spam potentiel)
    if (text.length > 3000) {
      return;
    }

    // 🚫 Bloque les mentions massives (risque de spam)
    if (msg.mentionedJid && msg.mentionedJid.length > 10) {
      await client.sendMessage(msg.chat, {
        text: "⚠️ Action bloquée (risque de spam détecté)"
      });
      return;
    }

    // 🚫 Bloque les envois rapides suspects (si ton bot déclenche trop)
    const now = Date.now();
    if (!global.lastMsgTime) global.lastMsgTime = {};

    const user = msg.sender;
    const diff = now - (global.lastMsgTime[user] || 0);

    if (diff < 1500) {
      await client.sendMessage(msg.chat, {
        text: "⚠️ Trop rapide, action ignorée pour sécurité"
      });
      return;
    }

    global.lastMsgTime[user] = now;
  }
};