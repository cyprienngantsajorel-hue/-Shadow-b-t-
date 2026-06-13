module.exports = {
  name: "vv",

  execute: async (msg, client) => {
    try {
      // 🔍 Vérifie si message est view once
      if (!msg.message) return;

      const isViewOnce =
        msg.message.viewOnceMessage ||
        msg.message.imageMessage?.viewOnce ||
        msg.message.videoMessage?.viewOnce;

      if (!isViewOnce) {
        return "ℹ️ Ce message n'est pas en view once.";
      }

      // ⚠️ Alerte info
      await client.sendMessage(msg.chat, {
        text: "📌 Message View Once détecté.\n⚠️ Contenu à vue unique (non stocké automatiquement)."
      });

      return "📌 Analyse VV terminée.";

    } catch (e) {
      return "❌ Erreur lors de la détection VV.";
    }
  }
};