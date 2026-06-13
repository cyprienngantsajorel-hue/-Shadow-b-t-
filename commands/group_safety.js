module.exports = {
  name: "group-safety",

  execute: async (msg, client) => {
    if (!msg.isGroup) return;

    const text = (msg.body || "").toLowerCase();

    let risk = 0;

    // ⚠️ contenus qui augmentent les signalements
    const riskyKeywords = [
      "spam", "scam", "hack", "leak", "nude", "porn",
      "fraud", "fake", "virus", "malware"
    ];

    riskyKeywords.forEach(w => {
      if (text.includes(w)) risk++;
    });

    // ⚠️ liens suspects (fort risque de signalement)
    if (text.includes("http") || text.includes("bit.ly") || text.includes("grabify")) {
      risk += 2;
    }

    // ⚠️ spam massif (mentions abusives)
    if (msg.mentionedJid && msg.mentionedJid.length > 5) {
      risk += 2;
    }

    // 🚨 niveau de risque élevé
    if (risk >= 3) {
      try {
        // suppression du message
        await client.sendMessage(msg.chat, {
          delete: msg.key
        });

        // avertissement groupe
        await client.sendMessage(msg.chat, {
          text: "⚠️ Message supprimé pour sécurité du groupe.\nVeuillez respecter les règles pour éviter des restrictions."
        });

        // sanction utilisateur
        await client.groupParticipantsUpdate(
          msg.chat,
          [msg.sender],
          "remove"
        );

      } catch (e) {
        console.log("group-safety error:", e);
      }
    }
  }
};